let dungeonAtual = null;
let contadorSalas = 0;

function gerarSalaDungeonOld() {
  if (!dungeonAtual) {
    alert("Crie uma dungeon antes de gerar salas!");
    return;
  }

  const tipo = document.getElementById("dungeonSelect").value;
  const tabela = tabelasDungeon[tipo];
  const chave = rolar2d6();


  if (!tabela) {
    alert("Tabela de dungeon não encontrada!");
    return;
  }

  const sala = tabela[chave];
  if (!sala) {
    console.warn("Chave não encontrada:", chave);
    return;
  }

  // Rola formato
  const rolagem = rolarD6();
  const resultado = rolagem + contadorSalas;
  const formato = tabelaFormatos[resultado] || tabelaFormatos[12];

  contadorSalas++;
  const id = String.fromCharCode(64 + contadorSalas); // A, B, C...

  const novaSala = {
    id: id,
    formato: formato,
    lugar: sala.lugar,
    curiosidade: sala.curiosidade,
    obstaculo: sala.obstaculo
  };

  dungeonAtual.salas.push(novaSala);
  atualizarDungeonAtual();
}


function gerarSalaDungeonOld2() {
  if (!dungeonAtual) {
    alert("Entre em uma dungeon antes de gerar salas!");
    return;
  }

  const tipo = dungeonAtual.tipo;
  const tabela = tabelasDungeon[tipo];
  const chave = rolar2d6();

  if (!tabela) {
    alert("Tabela de dungeon não encontrada!");
    return;
  }

  const sala = tabela[chave];
  if (!sala) return;

  // Formato
  const rolagem = rolarD6();
  const resultado = rolagem + contadorSalas;
  const formato = tabelaFormatos[resultado] || tabelaFormatos[12];

  contadorSalas++;
  const id = String.fromCharCode(64 + contadorSalas);

  dungeonAtual.salas.push({
    id,
    formato,
    lugar: sala.lugar,
    curiosidade: sala.curiosidade,
    obstaculo: sala.obstaculo
  });

  atualizarDungeonAtual();
}

function gerarSalaDungeon() {
  if (!dungeonAtual) {
    alert("Entre em uma dungeon antes de gerar salas!");
    return;
  }

  const tipo = dungeonAtual.tipo || dungeonAtual.tipo; // já existe como 'tipo' (ex: "criptaAssombrada")
  const tabela = tabelasDungeon[tipo];
  const chave = rolar2d6();

  if (!tabela) {
    alert("Tabela de dungeon não encontrada para o tipo: " + tipo);
    return;
  }

  const sala = tabela[chave];
  if (!sala) {
    console.warn("Sala não encontrada na tabela para chave:", chave);
    return;
  }

  // Rola formato
  const rolagem = rolarD6();
  const resultado = rolagem + contadorSalas;
  const formato = tabelaFormatos[resultado] || tabelaFormatos[12];

  contadorSalas++;
  const id = String.fromCharCode(64 + contadorSalas); // A, B, C...

  const novaSala = {
    id: id,
    formato: formato,
    lugar: sala.lugar,
    curiosidade: sala.curiosidade,
    obstaculo: sala.obstaculo
  };

  if (!dungeonAtual.salas) dungeonAtual.salas = [];
  dungeonAtual.salas.push(novaSala);

  // grava também no hex para persistência imediata
  if (posAtual) {
    const h = terrenos[key(posAtual.q, posAtual.r)];
    if (h && h.dadosPOI && h.dadosPOI.tipo === "dungeon") {
      h.dadosPOI.pi = dungeonAtual;
    }
  }

  //atualizarDungeonAtual();
  renderDungeonUI();
}

function atualizarDungeonAtual() {
  const div = document.getElementById("dungeonAtual");
  if (!dungeonAtual) {
    div.style.display = "none";
    return;
  }

  div.innerHTML = `
    <h5>🏰 ${dungeonAtual.nome} (${dungeonAtual.tipo})</h5>
    <ul class="list-group">
      ${dungeonAtual.salas
        .map(
          (s) => `
        <li class="list-group-item">
          <strong>🧩 Sala ${s.id}</strong> — ${s.formato}<br>
          <strong>📍 Lugar:</strong> ${s.lugar}<br>
          <strong>👁️ Curiosidade:</strong> ${s.curiosidade}<br>
          <strong>⚠️ Obstáculo:</strong> ${s.obstaculo}
        </li>
      `
        )
        .join("")}
    </ul>
  `;
}

function finalizarDungeonOld() {
  if (!dungeonAtual || dungeonAtual.salas.length === 0) {
    alert("Crie pelo menos uma sala antes de finalizar!");
    return;
  }

  const campanha = campanhas[campanhaAtual];
  if (!campanha.dungeons) campanha.dungeons = []; // ✅ Garantia retroativa

  campanha.dungeons.push(dungeonAtual);
  salvarCampanhas();

  alert(`Dungeon "${dungeonAtual.nome}" salva na campanha "${campanhaAtual}".`);
  dungeonAtual = null;
  contadorSalas = 0;

  atualizarDungeonAtual();
  atualizarListaDungeons();
}

function finalizarDungeon() {
  if (!dungeonAtual || dungeonAtual.salas.length === 0) {
    alert("Crie ao menos uma sala!");
    return;
  }

  // salvar no hex
  const h = terrenos[key(posAtual.q, posAtual.r)];
  h.dadosPOI.dungeon = dungeonAtual;

  // salvar na campanha
  const campanha = campanhas[campanhaAtual];
  if (!campanha.dungeons) campanha.dungeons = [];

  campanha.dungeons.push(JSON.parse(JSON.stringify(dungeonAtual)));

  salvarCampanhas();

  alert("Dungeon finalizada e salva!");

  dungeonAtual = null;
  contadorSalas = 0;

  atualizarDungeonAtual();
  //atualizarListaDungeons();
}

function atualizarListaDungeons() {
  const lista = document.getElementById("listaDungeons");
  lista.innerHTML = "";

  const campanha = campanhas[campanhaAtual];
  if (!campanha || !campanha.dungeons || campanha.dungeons.length === 0) {
    lista.innerHTML = "<p>Nenhuma dungeon criada nesta campanha.</p>";
    return;
  }

  campanha.dungeons.forEach((d, i) => {
    const div = document.createElement("div");
    div.className = "card mb-2 p-2 shadow-sm";

    const nomeDungeon = d.nome || `Dungeon ${i + 1}`;
    const tipoDungeon = d.tipo || "Desconhecido";

    div.innerHTML = `
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <strong>🕍 ${nomeDungeon}</strong><br>
          <small>Tipo: ${tipoDungeon}</small>
        </div>
        <div class="d-flex gap-2">
          <button class="btn btn-sm btn-outline-primary" onclick="verDetalhesDungeon(${i})">📜 Ver Detalhes</button>
          <button class="btn btn-sm btn-outline-danger" onclick="excluirDungeon(${i})">🗑️ Excluir</button>
        </div>
      </div>
    `;
    lista.appendChild(div);
  });
}

function excluirDungeon(index) {
  const campanha = campanhas[campanhaAtual];
  if (!campanha || !campanha.dungeons[index]) return;

  const dungeon = campanha.dungeons[index];
  const nome = dungeon.nome || `Dungeon ${index + 1}`;

  if (!confirm(`Tem certeza que deseja excluir "${nome}" desta campanha?`)) return;

  campanha.dungeons.splice(index, 1);
  salvarCampanhas();
  atualizarListaDungeons();

  alert(`Dungeon "${nome}" removida com sucesso!`);
}

function verDetalhesDungeon(index) {
  const campanha = campanhas[campanhaAtual];
  const dungeon = campanha.dungeons[index];
  if (!dungeon) return;

  let texto = `
    <h4>${dungeon.nome} (${dungeon.tipo})</h4>
    <hr>
    <strong>Salas:</strong><br>
  `;

  dungeon.salas.forEach((sala, i) => {
    texto += `
      <div class="mb-2">
        <strong>🧩 Sala ${i + 1}</strong><br>
        📐 <em>${sala.formato}</em><br>
        📍 ${sala.lugar}<br>
        👁️ ${sala.curiosidade}<br>
        ⚠️ ${sala.obstaculo}<br>
      </div>
      <hr>
    `;
  });

  const resultado = document.getElementById("dungeonAtual");
  resultado.style.display = "block";
  document.getElementById("dungeonAtual").innerHTML = texto;
}

function novaDungeon() {
  const tipoSelect = document.getElementById("dungeonSelect");
  const tipo = tipoSelect ? tipoSelect.value : "Desconhecida";
  const nome = prompt("Digite o nome da dungeon:");

  if (!nome) return;

  dungeonAtual = {
    nome: nome,
    tipo: tipo,
    salas: []
  };

  contadorSalas = 0;
  atualizarDungeonAtual();
  document.getElementById("dungeonAtual").style.display = "block";
  const div = document.getElementById("encontrosDungeon");
  div.innerHTML += 
  `
    <div id="listaInimigosAtivos"></div>
    <div class="d-flex mb-2">
        <button class="btn btn-primary btn-sm mb-2" onclick="abrirAdicionarInimigo()">
          Adicionar Inimigo
        </button>
        <button class="btn btn-secondary btn-sm mb-2" onclick="alternarMortos()">
            Ocultar Mortos
        </button>
    </div>
  `
  
  alert(`Nova dungeon iniciada: ${nome} (${tipo})`);
}

function gerarDungeonAutomatica() {
  const tipos = [
    "temploProfanado",
    "cidadelaAbandonada",
    "antigoLaboratorio",
    "calaboucoArruinado",
    "criptaAssombrada",
    "cavernaComum"
  ];

  const nomes = [
    "Ruína de Arkhon", "Cavernas de Mirgal", "Cripta do Eco Sombrio",
    "Túmulo de Kel’Razan", "Forte de Karrimor", "Galerias Profanadas"
  ];

  const tipo = tipos[Math.floor(Math.random() * tipos.length)];
  const nome = nomes[Math.floor(Math.random() * nomes.length)];

  return {
    nome,
    tipo,
    salas: []
  };
}



// ======= Dungeon UI helpers - integra com suas funções existentes =========

// abre UI da dungeon (chamada quando trocarSecao('sec-dungeon') ou ao entrar via mapa)
function abrirDungeonUI() {
  // assume dungeonAtual já está setado pelo abrirDungeonDoHex()
  if (!dungeonAtual) {
    console.warn("abrirDungeonUI: dungeonAtual vazio");
    return;
  }
  document.getElementById("sec-dungeon").style.display = "block";
  renderDungeonUI();
}

// renderiza toda a UI baseada em dungeonAtual
function renderDungeonUI() {
  if (!dungeonAtual) {
    // esconde seção
    document.getElementById("sec-dungeon").style.display = "none";
    return;
  }

  // título / subtítulo
  document.getElementById("dungeonTitulo").innerText = `🗝️ ${dungeonAtual.nome || "Dungeon"}`;
  document.getElementById("dungeonSubtitulo").innerText = `Tipo: ${dungeonAtual.tipo || "—"}`;

  // displays rápidos
  document.getElementById("dungeonNomeDisplay").innerText = `Nome: ${dungeonAtual.nome || "—"}`;
  document.getElementById("dungeonTipoDisplay").innerText = dungeonAtual.tipo || "—";
  document.getElementById("dungeonContadorSalas").innerText = (dungeonAtual.salas || []).length;
  document.getElementById("dungeonTipoQuick").innerText = dungeonAtual.tipo || "—";
  document.getElementById("dungeonNomeQuick").innerText = dungeonAtual.nome || "—";

  // lista de salas
  const cont = document.getElementById("dungeonSalasList");
  cont.innerHTML = "";
  (dungeonAtual.salas || []).forEach((s, idx) => {
    const li = document.createElement("div");
    li.className = "sala-item";
    li.innerHTML = `
      <div class="sala-header">
        <div><strong>🧩 Sala ${s.id}</strong> — ${s.formato}</div>
        <div class="d-flex gap-2">
          <button class="btn btn-sm btn-outline-secondary" onclick="focarSala('${s.id}')">Ver</button>
          <button class="btn btn-sm btn-outline-danger" onclick="removerSala('${s.id}')">Remover</button>
        </div>
      </div>
      <div class="sala-meta">
        <div>📍 ${s.lugar}</div>
        <div>👁️ ${s.curiosidade}</div>
        <div>⚠️ ${s.obstaculo}</div>
      </div>
    `;
    cont.appendChild(li);
  });

  // mini-map nodes
  renderMiniMapNodes();

  // inimigos/encontros
  renderInimigosUI();
}

// mini-map simples: um nó por sala
function renderMiniMapNodes() {
  const map = document.getElementById("dungeonMiniMap");
  map.innerHTML = "";
  (dungeonAtual.salas || []).forEach(s => {
    const n = document.createElement("div");
    n.className = "minimap-node";
    n.innerText = s.id;
    n.title = `${s.id} — ${s.formato}`;
    n.onclick = () => {
      // rolagem/ação ao clicar: foca a sala no list (procura e destaca)
      document.querySelectorAll("#dungeonSalasList .sala-item").forEach(el => el.style.boxShadow = "none");
      const idx = dungeonAtual.salas.findIndex(x => x.id === s.id);
      const target = document.querySelectorAll("#dungeonSalasList .sala-item")[idx];
      if (target) {
        target.style.boxShadow = "0 8px 30px rgba(0,0,0,0.6)";
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      // marca node como ativo
      document.querySelectorAll(".minimap-node").forEach(n2 => n2.classList.remove("active"));
      n.classList.add("active");
    };
    map.appendChild(n);
  });
}

// foco/rolagem para sala
function focarSala(id) {
  const idx = dungeonAtual.salas.findIndex(s => s.id === id);
  if (idx === -1) return;
  const target = document.querySelectorAll("#dungeonSalasList .sala-item")[idx];
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    target.style.boxShadow = "0 8px 30px rgba(0,0,0,0.6)";
    setTimeout(()=> target.style.boxShadow = "none", 2200);
  }
}

// remover sala (após confirmação)
function removerSala(id) {
  if (!confirm(`Remover a sala ${id}?`)) return;
  dungeonAtual.salas = (dungeonAtual.salas || []).filter(s => s.id !== id);
  contadorSalas = dungeonAtual.salas.length;
  renderDungeonUI();
}

// reinicia contador (útil para organizar etiquetas A/B/C)
function resetarContadorSalas() {
  if (!confirm("Reiniciar contador (A, B, C...)? Isso não renomeará automaticamente as salas existentes).")) return;
  contadorSalas = (dungeonAtual.salas || []).length;
  alert("Contador ajustado para o número atual de salas.");
}

// ========== Encontros / Inimigos UI (integra com suas funções existentes) ========

// Renderiza lista de inimigos ativos (usa #listaInimigosAtivos se existente)
function renderInimigosUI() {
  const cont = document.getElementById("listaInimigosAtivosUI");
  cont.innerHTML = "";

  // se você tem lista de inimigos no dungeonAtual, exibe; caso contrário, procura globalmente
  const inimigos = dungeonAtual.inimigos || [];
  if (inimigos.length === 0) {
    cont.innerHTML = `<div class="text-muted">Nenhum inimigo adicionado ainda.</div>`;
    return;
  }

  inimigos.forEach((inim, i) => {
    const div = document.createElement("div");
    div.className = "d-flex justify-content-between align-items-center p-2 mb-2";
    div.style.border = "1px solid rgba(255,255,255,0.03)";
    div.style.borderRadius = "8px";
    div.innerHTML = `
      <div>
        <strong>${inim.nome || "Inimigo"}</strong><br>
        <small class="text-muted">${inim.info || ""}</small>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-sm btn-outline-secondary" onclick="marcarInimigoMorto(${i})">${inim.morto ? "Reviver" : "Marcar Morto"}</button>
        <button class="btn btn-sm btn-outline-danger" onclick="removerInimigo(${i})">Remover</button>
      </div>
    `;
    if (inim.morto) div.style.opacity = "0.55";
    cont.appendChild(div);
  });
}

// usar a sua função de abrir adicionar inimigo; se não existir, abre prompt simples
function abrirAdicionarInimigo() {
  const nome = prompt("Nome do inimigo:");
  if (!nome) return;
  const info = prompt("Info/descrição curta (opcional):", "");
  dungeonAtual.inimigos = dungeonAtual.inimigos || [];
  dungeonAtual.inimigos.push({ nome, info, morto: false });
  renderInimigosUI();
}

// marcar como morto/reviver
function marcarInimigoMorto(index) {
  const inim = dungeonAtual.inimigos[index];
  inim.morto = !inim.morto;
  renderInimigosUI();
}

// remover inimigo
function removerInimigo(index) {
  if (!confirm("Remover esse inimigo?")) return;
  dungeonAtual.inimigos.splice(index,1);
  renderInimigosUI();
}

// ========= Operações utilitárias (export, remover dungeon do mapa) ========

function exportarDungeonJSON() {
  const json = JSON.stringify(dungeonAtual, null, 2);
  // abre em nova aba simples
  const w = window.open();
  w.document.title = `Dungeon - ${dungeonAtual.nome || "export"}`;
  const pre = w.document.createElement("pre");
  pre.textContent = json;
  pre.style.whiteSpace = "pre-wrap";
  w.document.body.appendChild(pre);
}

function removerDungeonAtual() {
  if (!confirm("Remover esta dungeon do mapa/campanha?")) return;
  // procura e remove do mapa (procura dentro de campanhas)
  // tentamos remover matching por nome; se não achar, apenas limpa dungeonAtual e atualiza mapa
  const camp = campanhas[campanhaAtual];
  if (camp && camp.dungeons) {
    const idx = camp.dungeons.findIndex(d => d.nome === dungeonAtual.nome && d.tipo === dungeonAtual.tipo);
    if (idx !== -1) {
      camp.dungeons.splice(idx,1);
      salvarCampanhas();
      alert("Dungeon removida da campanha.");
    }
  }
  // também limpa dadosPOI do terreno atual (se existir)
  if (posAtual) {
    const k = key(posAtual.q, posAtual.r);
    if (terrenos[k] && terrenos[k].dadosPOI) {
      delete terrenos[k].dadosPOI;
      terrenos[k].poi = null;
      // re-render do mapa
      reconstruirMapaVisual(campanhas[campanhaAtual].mapa || gerarMapaDados());
    }
  }
  dungeonAtual = null;
  renderDungeonUI();
  voltarMapa();
}