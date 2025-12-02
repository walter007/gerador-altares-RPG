let campanhas = {};
let campanhaAtual = null;

async function sha1(texto) {
    const buffer = new TextEncoder().encode(texto);
    const hashBuffer = await crypto.subtle.digest("SHA-1", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

async function salvarBackupLocal() {
    const ordenado = ordenar({ campanhas, campanhaAtual });
    const json = JSON.stringify(ordenado);
    const integridade = await sha1(json);

    localStorage.setItem("altarisBackup", JSON.stringify({
        timestamp: Date.now(),
        integridade,
        campanhas,
        campanhaAtual
    }));
}

async function carregarBackupLocal() {
    const raw = localStorage.getItem("altarisBackup");
    if (!raw) return false;

    try {
        const backup = JSON.parse(raw);
        const ordenado = ordenar({
          campanhas: backup.campanhas,
          campanhaAtual: backup.campanhaAtual
        });
        const json = JSON.stringify(ordenado);
        const hashNow = await sha1(json);

        if (hashNow !== backup.integridade) {
            console.error("❌ Backup local corrompido. Ignorando.");
            return false;
        }

        campanhas = backup.campanhas;
        campanhaAtual = backup.campanhaAtual;

        console.warn("⚠ Usando dados do backup local.");
        return true;
    } catch (err) {
        console.error("Erro ao ler backup local:", err);
        return false;
    }
}

async function iniciarApp() {
    console.log("Iniciando app...");

    const firebaseOK = await carregarDadosFirebase();

    // 1. Se Firebase falhou → fallback local
    if (!firebaseOK) {
        const localOK = await carregarBackupLocal();

        if (!localOK) {
            alert("Erro ao carregar dados. Verifique sua internet.");
            return;
        }

        carregarCampanha(campanhaAtual);
        return;
    }

    // 2. Firebase OK → se vazio, cria padrão
    if (!campanhaAtual || !campanhas[campanhaAtual]) {
        campanhaAtual = "Campanha Padrão";
        campanhas[campanhaAtual] = novaCampanhaBase();
        await salvarCampanhas();
    }

    // 3. Atualiza backup local
    await salvarBackupLocal();

    carregarCampanha(campanhaAtual);
}


async function carregarDadosFirebase() {
    const { db, doc, getDoc } = window.firebaseModules;

    try {
        const ref = doc(db, "altaris", "dadosDoUsuario");
        const snap = await getDoc(ref);

        if (!snap.exists()) {
            console.warn("Firebase vazio. Criar padrão.");
            return true;
        }

        const data = snap.data();

        // Verifica integridade se existir hash
        if (data.integridade) {
            const ordenado = ordenar({
            campanhas: data.campanhas,
            campanhaAtual: data.campanhaAtual
        });
        const json = JSON.stringify(ordenado);
        const hashNow = await sha1(json);

            if (hashNow !== data.integridade) {
                console.error("❌ Dados do Firebase corrompidos! Usando backup local.");
                return false;
            }
        }

        campanhas = data.campanhas || {};
        campanhaAtual = data.campanhaAtual || null;

        console.log("Dados carregados com integridade OK.");
        return true;

    } catch (error) {
        console.error("Erro ao carregar Firebase:", error);
        return false;
    }
}

function salvarCampanhasOld() {
  localStorage.setItem("campanhasAltaris", JSON.stringify(campanhas));
  localStorage.setItem("campanhaAtualAltaris", campanhaAtual);
}

async function salvarCampanhas() {
    const { db, doc, setDoc } = window.firebaseModules;

    // Monta JSON para salvar
    const ordenado = ordenar({ campanhas, campanhaAtual });
    const json = JSON.stringify(ordenado);
    const integridade = await sha1(json);

    try {
        await setDoc(doc(db, "altaris", "dadosDoUsuario"), {
            campanhas,
            campanhaAtual,
            integridade
        });

        console.log("Salvo no Firebase.");
        await salvarBackupLocal();

    } catch (err) {
        console.error("Erro ao salvar Firebase:", err);
        console.warn("Salvando apenas backup local.");
        await salvarBackupLocal();
    }
}

function carregarCampanha(nome) {
  campanhaAtual = nome;
  if (!campanhas[campanhaAtual].aventuras) {
      campanhas[campanhaAtual].aventuras = [];
  }

  const mapaSalvo = campanhas[campanhaAtual].mapa;
  if (mapaSalvo && mapaSalvo.hexes) {
    // reconstrói visual do mapa a partir dos dados salvos
    reconstruirMapaVisual(mapaSalvo);
    console.log("Mapa carregado da campanha.");
  } else {
    // nenhum mapa salvo — mantenha comportamento atual (gera/mostra listas etc)
    // se você tiver função que gera mapa automaticamente, chame-a aqui
    // ex: gerarMapa(cols, rows)  // opcional
    console.log("Campanha não possui mapa salvo (gera novo ou deixa vazio).");
  }

  salvarCampanhas();
  atualizarListasMissoes();
  atualizarListaRumores();
  mostrarCampanhas();
  //atualizarListaDungeons();
  atualizarListaCenas();
  atualizarListaCidades();
  atualizarListaPI();
  atualizarTabelasOraculo();
  atualizarCenaAtual();
  atualizarPJs();
}

function criarCampanha() {
    const nome = document.getElementById("novaCampanhaNome").value.trim();
    if (!nome) return alert("Digite um nome.");
    if (campanhas[nome]) return alert("Já existe uma campanha com esse nome.");

    campanhas[nome] = novaCampanhaBase();
    campanhaAtual = nome;

    const novoMapa = gerarMapaDados(); // 🔥 função nova, explicada abaixo
    campanhas[nome].mapa = novoMapa;
    salvarCampanhas();
    mostrarCampanhas();

    document.getElementById("novaCampanhaNome").value = "";
    alert(`Campanha "${nome}" criada!`);
}

function excluirCampanha(nome) {
  if (nome === campanhaAtual) return alert("Não é possível excluir a campanha atual.");
  if (!confirm(`Excluir campanha "${nome}" definitivamente?`)) return;
  delete campanhas[nome];
  salvarCampanhas();
  mostrarCampanhas();
}

function mostrarCampanhas() {
  document.getElementById("campanhaAtualNome").innerText = campanhaAtual;

  const ul = document.getElementById("listaCampanhas");
  ul.innerHTML = "";

  Object.keys(campanhas).forEach(nome => {
    ul.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        ${nome}
        <span>
          <button class="btn btn-sm btn-primary" onclick="carregarCampanha('${nome}')">Carregar</button>
          <button class="btn btn-sm btn-danger" onclick="excluirCampanha('${nome}')">Excluir</button>
        </span>
      </li>
    `;
  });
}

function novaCampanhaBase() {
    return {
        missoesAtivas: [],
        missoesConcluidas: [],
        rumores: [],
        cidades: [],
        dungeons: [],
        cenas: [],
        tramas: [],
        tabelaPNJ: [],
        tabelaPJ: [],
        pnjs: [],
        pjs: [],
        pontosInteresse: {
            monstruoso: [],
            geografico: [],
            npc: [],
            divino: [],
            magico: [],
            militar: []
        },
         aventuras: [],
         mapa: null
    };
}

function ordenar(obj) {
    if (Array.isArray(obj)) {
        return obj.map(ordenar);
    } else if (obj && typeof obj === "object") {
        return Object.keys(obj)
            .sort()
            .reduce((acc, key) => {
                acc[key] = ordenar(obj[key]);
                return acc;
            }, {});
    }
    return obj;
}

async function salvarMapaNaCampanha() {
  if (!campanhaAtual) return;
  if (!campanhas[campanhaAtual]) return;

  // garante que temos o formato esperado em 'terrenos' (se você usa objeto global 'terrenos')
  // formatos aceitos:
  //  terrenos["q,r"] = { terreno: "...", poi: ..., dadosPOI: ..., custoPM: ... }
  // se seu 'terrenos' for apenas string, converta aqui (exemplo abaixo)
  // campanhas[campanhaAtual].mapa.hexes = terrenos;

  // monta objeto mínimo do mapa (não sobrescreve se já existir extras)
  const mapa = campanhas[campanhaAtual].mapa || {};
  mapa.cols = mapa.cols || currentMapCols || 25; // ajuste currentMapCols conforme seu código
  mapa.rows = mapa.rows || currentMapRows || 25;
  mapa.jogador = posAtual ? { q: posAtual.q, r: posAtual.r } : mapa.jogador || null;

  // salva uma cópia de 'terrenos' no formato esperado
  mapa.hexes = {};
  Object.keys(terrenos).forEach(k => {
    const h = terrenos[k];
    // se você usa apenas string no 'terrenos', transforme em objeto:
    if (typeof h === 'string') {
      mapa.hexes[k] = { terreno: h, poi: null, dadosPOI: null, custoPM: custoMovimento[h] ?? 1 };
    } else {
      // copia apenas campos essenciais - evita salvar DOM refs etc
      mapa.hexes[k] = {
        terreno: h.terreno,
        poi: h.poi ?? null,
        dadosPOI: h.dadosPOI ?? null,
        custoPM: h.custoPM ?? (custoMovimento[h.terreno] ?? 1)
      };
    }
  });

  campanhas[campanhaAtual].mapa = mapa;
  await salvarCampanhas(); // persiste via firebase + backup local
  console.log("Mapa salvo na campanha.");
}