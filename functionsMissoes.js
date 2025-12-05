let missoesAtivas = JSON.parse(localStorage.getItem("missoesAtivas") || "[]");
let missoesConcluidas = JSON.parse(localStorage.getItem("missoesConcluidas") || "[]");


function gerarMissaoOld() {
  const data = campanhas[campanhaAtual];
  let p = precisa[rolarD20()-1];
  let o = objeto[rolarD20()-1];
  let s = situacao[rolarD20()-1];
  let l = local[rolarD20()-1];
  let texto = `Os heróis precisam <strong>${p}</strong> um(a) <strong>${o}</strong> que foi <strong>${s}</strong> e está <strong>${l}</strong>.`;
  data.missoesAtivas.push(texto);
  salvarCampanhas();
  atualizarListasMissoes();
}


function gerarMissao() {
  const data = campanhas[campanhaAtual];

  // Sorteios
  const p = precisa[rolarD20()-1];
  const o = objeto[rolarD20()-1];
  const s = situacao[rolarD20()-1];
  const l = local[rolarD20()-1];

  // Descrição simples (como já existia)
  const descricao = `Os heróis precisam <strong>${p}</strong> um(a) <strong>${o}</strong> que foi <strong>${s}</strong> e está <strong>${l}</strong>.`;

  // Determinar categoria
  const categoria = classificarMissao(p, o, s, l);

  // Gerar etapas com base na categoria
  const etapas = gerarEtapasPorCategoria(categoria, o, l);

  const missao = {
    id: "MIS-" + Math.floor(Math.random()*99999),
    titulo: gerarTituloMissao(p, o),
    descricao,
    categoria,
    dificuldade: calcularDificuldadeBase(categoria),
    etapas,
    destino: null,     // será preenchido na fase 3
    poiLigado: null,   // idem
    expiracao: null,
    ativa: true,
    dataCriacao: Date.now()
  };

  //data.missoesAtivas.push(missao);
  //salvarCampanhas();
  //atualizarListasMissoes();
  integrarMissaoAoMapa(missao);
}


function concluirMissao(i) {
  const data = campanhas[campanhaAtual];
  const m = data.missoesAtivas.splice(i,1)[0];
  data.missoesConcluidas.push(m);
  removerMissaoDoHex();
  salvarCampanhas();
  atualizarListasMissoes();
}

function salvarMissoes() {
  localStorage.setItem("missoesAtivas", JSON.stringify(missoesAtivas));
  localStorage.setItem("missoesConcluidas", JSON.stringify(missoesConcluidas));
}

function limparHistoricoMissoes() {
  if (!confirm("Tem certeza que deseja apagar todas as missões da campanha?")) return;
  if (!campanhaAtual || !campanhas[campanhaAtual]) return;

  campanhas[campanhaAtual].missoesAtivas = [];
  campanhas[campanhaAtual].missoesConcluidas = [];

  salvarCampanhas();
  atualizarListasMissoes();

  alert("Histórico de missões apagado com sucesso!");
}

function atualizarListasMissoes() {
  const data = campanhas[campanhaAtual];

  const ulAtivas = document.getElementById("listaMissoesAtivasModal");
  const ulConcluidas = document.getElementById("listaMissoesConcluidasModal");

  ulAtivas.innerHTML = "";
  data.missoesAtivas.forEach((m,i) => {
    ulAtivas.innerHTML += `
    <li class="list-group-item">
      <strong>${m.titulo}</strong><br>
      <small>${m.descricao}</small>
      <span class="badge bg-info ms-2">${m.categoria}</span>
      <button class="btn btn-sm btn-success float-end" onclick="concluirMissao(${i})">Concluir</button>
    </li>`;
  });

  ulConcluidas.innerHTML = "";
  data.missoesConcluidas.forEach(m => {
    ulConcluidas.innerHTML += `<li class="list-group-item text-muted">${m}</li>`;
  });
}



/* =========================
   FASE 1 - Estrutura de Missões
   ========================= */

/*
 Exemplo de formato de missão (nova estrutura):
 {
   id: "uuid",
   titulo: "Recuperar Artefato Perdido",
   categoria: "resgate",            // tentativa automática (ex: resgate, investigacao, entrega, exploracao, caça, divina)
   fraseNarrativa: "Os heróis precisam ...", // a frase gerada (flavor)
   origem: { q, r },                // opcional: hex origem (se gerada no mapa)
   destino: { q, r, tipo, descricao } // destino apontado no mapa / POI
   etapas: [ { id, tipo, descricao, concluida:false } ],
   recompensa: { xp: 0, ouro:0, itens: [] },
   expiraEmTurnos: null,           // null ou número de turnos/dias
   status: "ativa" | "suspensa" | "concluida" | "falhada",
   criadoEm: 1670000000000
 }
*/

// util: uuid fallback
function _uuid() {
  if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
  // fallback simples (não-crítico)
  return 'id-' + Math.random().toString(36).slice(2,9);
}

// guarda a missão na campanha atual
function salvarMissaoNaCampanha(missaoObj) {
  if (!campanhaAtual || !campanhas[campanhaAtual]) {
    console.warn("Nenhuma campanha ativa para salvar missão.");
    return false;
  }
  const data = campanhas[campanhaAtual];
  data.missoesAtivas = data.missoesAtivas || [];
  data.missoesAtivas.push(missaoObj);
  salvarCampanhas && salvarCampanhas();
  return true;
}

// cria a estrutura base de missão a partir de campos
function criarMissao({ titulo, categoria = "geral", fraseNarrativa = "", origem = null, destino = null, etapas = null, recompensa = null, expiraEmTurnos = null }) {
  const id = _uuid();
  const criadoEm = Date.now();
  const tituloSafe = titulo || (fraseNarrativa ? fraseNarrativa.substring(0,40) + "…" : "Missão sem título");
  const etapasPadrao = etapas || [{ id: _uuid(), tipo: "objetivo", descricao: fraseNarrativa || "Cumprir a missão", concluida: false }];

  const recompensaPadrao = recompensa || { xp: 0, ouro: 0, itens: [] };

  return {
    id,
    titulo: tituloSafe,
    categoria,
    fraseNarrativa,
    origem,      // {q,r} ou null
    destino,     // {q,r,tipo,descricao} ou null
    etapas: etapasPadrao,
    recompensa: recompensaPadrao,
    expiraEmTurnos,
    status: "ativa",
    criadoEm
  };
}

// tentativa simples de categorizar a missão usando palavras-chave (fase1 heurística)
function categorizarMissao(frase, objetoStr, localStr) {
  const f = (frase || "").toLowerCase();
  const o = (objetoStr || "").toLowerCase();
  const l = (localStr || "").toLowerCase();

  if (/\b(resgatar|resgato|resgatar|resgato|resgatar)\b/.test(f) || /\b(resgatar|resgatar|resgate)\b/.test(o)) return "resgate";
  if (/\b(entregar|levar|entrega)\b/.test(f) || /\b(entregar|entrega)\b/.test(o)) return "entrega";
  if (/\b(investigar|investig|investigação)\b/.test(f) || /\b(investigar)\b/.test(o)) return "investigacao";
  if (/\b(explorar|exploração|explorar)\b/.test(f) || /\b(explorar)\b/.test(l)) return "exploracao";
  if (/\b(dungeon|masmorra)\b/.test(l) || /\b(dungeon|masmorra)\b/.test(f)) return "dungeon";
  if (/\b(portal|mágic|magico|feitiço|orbe|artefato)\b/.test(f + o + l)) return "magico";
  // default
  return "geral";
}

/* --- Compat: gerarMissao (antigo) -> novo formato
   Esta função encapsula o gerador antigo e cria a missão nova.
*/
function gerarMissaoFase1() {
  if (!campanhaAtual || !campanhas[campanhaAtual]) {
    alert("Nenhuma campanha carregada.");
    return;
  }
  // mantém compatibilidade com rolagens atuais
  const p = precisa[rolarD20() - 1];
  const o = objeto[rolarD20() - 1];
  const s = situacao[rolarD20() - 1];
  const l = local[rolarD20() - 1];

  const frase = `Os heróis precisam <strong>${p}</strong> um(a) <strong>${o}</strong> que foi <strong>${s}</strong> e está <strong>${l}</strong>.`;

  // heurística de título simples (p + o)
  const titulo = `${p} ${o}`;

  // categoria simples
  const categoria = categorizarMissao(frase, o, l);

  // etapas preliminares — só 1 etapa com a frase por enquanto
  const etapas = [
    { id: _uuid(), tipo: "principal", descricao: frase.replace(/<[^>]+>/g,''), concluida: false }
  ];

  // cria missão
  const missao = criarMissao({
    titulo,
    categoria,
    fraseNarrativa: frase,
    origem: null,
    destino: null,
    etapas,
    recompensa: { xp: 0, ouro: 0, itens: [] },
    expiraEmTurnos: null
  });

  // salva
  salvarMissaoNaCampanha(missao);

  // atualiza visual (modal)
  atualizarListasMissoesModal && atualizarListasMissoesModal();

  return missao;
}

/* --- funções de gerenciamento básicas --- */

// procura missão por id na campanha atual (ativas e concluídas)
function buscarMissaoPorId(id) {
  const data = campanhas[campanhaAtual];
  if (!data) return null;
  const ativa = (data.missoesAtivas || []).find(m => m.id === id);
  if (ativa) return { missao: ativa, tipo: "ativa" };
  const concluida = (data.missoesConcluidas || []).find(m => m.id === id);
  if (concluida) return { missao: concluida, tipo: "concluida" };
  return null;
}

// marcar etapa concluída
function concluirEtapa(missaoId, etapaId) {
  const b = buscarMissaoPorId(missaoId);
  if (!b) return false;
  const m = b.missao;
  const e = m.etapas.find(x => x.id === etapaId);
  if (!e) return false;
  e.concluida = true;

  // se todas concluídas, marcar missão concluída
  const todas = m.etapas.every(x => x.concluida);
  if (todas) {
    concluirMissaoPorId(missaoId);
  } else {
    salvarCampanhas && salvarCampanhas();
  }
  atualizarListasMissoesModal && atualizarListasMissoesModal();
  return true;
}

// concluir missão por id (move de ativas para concluidas)
function concluirMissaoPorId(id) {
  const data = campanhas[campanhaAtual];
  if (!data) return false;
  data.missoesAtivas = data.missoesAtivas || [];
  data.missoesConcluidas = data.missoesConcluidas || [];
  const idx = data.missoesAtivas.findIndex(m => m.id === id);
  if (idx === -1) return false;
  const [m] = data.missoesAtivas.splice(idx, 1);
  m.status = "concluida";
  data.missoesConcluidas.push(m);
  salvarCampanhas && salvarCampanhas();
  atualizarListasMissoesModal && atualizarListasMissoesModal();
  return true;
}

// remover missão ativa sem concluir (opcional)
function removerMissaoPorId(id) {
  const data = campanhas[campanhaAtual];
  if (!data) return false;
  const idx = (data.missoesAtivas || []).findIndex(m => m.id === id);
  if (idx === -1) return false;
  data.missoesAtivas.splice(idx, 1);
  salvarCampanhas && salvarCampanhas();
  atualizarListasMissoesModal && atualizarListasMissoesModal();
  return true;
}

/* --- UI helper: renderiza modal com o novo formato
   Substitui/integra com sua função atualizarListasMissoes() atual.
*/
function atualizarListasMissoesModal() {
  const data = campanhas[campanhaAtual] || novaCampanhaBase();
  const ulAtivas = document.getElementById("listaMissoesAtivasModal");
  const ulConcluidas = document.getElementById("listaMissoesConcluidasModal");
  if (!ulAtivas || !ulConcluidas) return;

  ulAtivas.innerHTML = "";
  (data.missoesAtivas || []).forEach((m, i) => {
    const etapasHtml = (m.etapas || []).map(et => {
      return `<div style="font-size:0.9rem; margin-top:6px;">
                <input type="checkbox" ${et.concluida ? "checked" : ""} onchange="concluirEtapa('${m.id}','${et.id}')">
                <span style="${et.concluida ? 'text-decoration:line-through;color:#777' : ''}"> ${escapeHtml(et.descricao)}</span>
              </div>`;
    }).join("");

    ulAtivas.innerHTML += `<li class="list-group-item">
      <div style="display:flex; justify-content:space-between; align-items:center">
        <div>
          <b>${escapeHtml(m.titulo)}</b><br>
          <small class="text-muted">${m.categoria} • Criada ${new Date(m.criadoEm).toLocaleString()}</small>
          <div style="margin-top:6px">${m.fraseNarrativa}</div>
          ${etapasHtml}
        </div>
        <div style="display:flex; flex-direction:column; gap:6px; margin-left:10px">
          <button class="btn btn-sm btn-success" onclick="concluirMissaoPorId('${m.id}')">Concluir</button>
          <button class="btn btn-sm btn-outline-danger" onclick="removerMissaoPorId('${m.id}')">Remover</button>
        </div>
      </div>
    </li>`;
  });

  ulConcluidas.innerHTML = "";
  (data.missoesConcluidas || []).forEach(m => {
    ulConcluidas.innerHTML += `<li class="list-group-item text-muted">
      <b>${escapeHtml(m.titulo)}</b> <small>• concluída ${new Date(m.criadoEm).toLocaleString()}</small><br>
      <div style="margin-top:6px">${m.fraseNarrativa}</div>
    </li>`;
  });
}

// util pequeno para escapar HTML em strings de título/etapa
function escapeHtml(s) {
  if (!s) return "";
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

/* --- Migração: converte missões antigas (strings simples) em novo formato
   Use isso uma vez quando quiser migrar dados existentes.
*/
function migrarMissoesAntigasParaNovaEstrutura() {
  if (!campanhaAtual || !campanhas[campanhaAtual]) return;
  const data = campanhas[campanhaAtual];

  data.missoesAtivas = data.missoesAtivas || [];
  data.missoesConcluidas = data.missoesConcluidas || [];

  const migradas = [];

  // ativa
  data.missoesAtivas = data.missoesAtivas.map(item => {
    if (typeof item === "string") {
      const frase = item;
      const titulo = frase.replace(/<\/?[^>]+(>|$)/g, "").slice(0,40);
      const categoria = categorizarMissao(frase);
      const novo = criarMissao({ titulo, categoria, fraseNarrativa: frase });
      migradas.push(novo.id);
      return novo;
    }
    return item;
  });

  // concluidas
  data.missoesConcluidas = data.missoesConcluidas.map(item => {
    if (typeof item === "string") {
      const frase = item;
      const titulo = frase.replace(/<\/?[^>]+(>|$)/g, "").slice(0,40);
      const categoria = categorizarMissao(frase);
      const novo = criarMissao({ titulo, categoria, fraseNarrativa: frase });
      novo.status = "concluida";
      migradas.push(novo.id);
      return novo;
    }
    return item;
  });

  salvarCampanhas && salvarCampanhas();
  console.log("Migração concluída. missões migradas:", migradas.length);
  atualizarListasMissoesModal && atualizarListasMissoesModal();
}

/* === Exports / atalhos úteis (callers) ===
 - gerarMissaoFase1()    -> gera missão usando tabelas antigas mas salva no novo formato
 - atualizarListasMissoesModal() -> renderiza modal com novo formato
 - migrarMissoesAntigasParaNovaEstrutura() -> roda migração
 - criarMissao({...}) -> cria objeto missão sem salvar
 - salvarMissaoNaCampanha(missao) -> salva missão previamente criada
*/

/* Se quiser chamar a renderização no load do modal, faça:
document.getElementById('fecharModalMissoes').onclick = () => fechar... // já presente no seu código
// E ao abrir modal:
function abrirModalMissoes() {
  atualizarListasMissoesModal();
  abrirModalS('modalMissoes'); // sua função de abrir modal
}
*/

function classificarMissao(p, o, s, l) {
  if (["Resgatar", "Proteger", "Escoltar"].includes(p)) return "Resgate";
  if (["Investigar", "Descobrir", "Convencer"].includes(p)) return "Investigação";
  if (["Explorar"].includes(p)) return "Exploração";
  if (["Destruir", "Erradicar", "Impedir"].includes(p)) return "Combate";
  if (["Recuperar", "Roubar", "Entregar"].includes(p)) return "Recuperação";
  if (["Purificar", "Selar", "Despertar"].includes(p)) return "Sagrado";

  return "Geral";
}

function gerarEtapasPorCategoria(cat, objeto, local) {
  switch(cat) {
    case "Resgate":
      return [
        { descricao: `Localizar o(a) ${objeto}`, concluida: false },
        { descricao: `Viajar até ${local}`, concluida: false },
        { descricao: `Trazer o(a) ${objeto} em segurança`, concluida: false }
      ];

    case "Recuperação":
      return [
        { descricao: `Encontrar pistas sobre o(a) ${objeto}`, concluida: false },
        { descricao: `Localizar ${local}`, concluida: false },
        { descricao: `Recuperar o objeto`, concluida: false }
      ];

    case "Exploração":
      return [
        { descricao: `Viajar até ${local}`, concluida: false },
        { descricao: `Mapear a área`, concluida: false },
        { descricao: `Retornar ao ponto de origem`, concluida: false }
      ];

    case "Combate":
      return [
        { descricao: `Localizar o alvo em ${local}`, concluida: false },
        { descricao: `Derrotar o inimigo`, concluida: false },
        { descricao: `Confirmar a eliminação da ameaça`, concluida: false }
      ];

    case "Investigação":
      return [
        { descricao: `Investigar o que deixou o(a) ${objeto} ${local}`, concluida: false },
        { descricao: `Descobrir a verdade sobre o caso`, concluida: false },
        { descricao: `Reportar ou agir sobre o descoberto`, concluida: false }
      ];

    case "Sagrado":
      return [
        { descricao: `Viajar até ${local}`, concluida: false },
        { descricao: `Realizar o ritual com o(a) ${objeto}`, concluida: false },
        { descricao: `Selar definitivamente o problema`, concluida: false }
      ];

    default:
      return [
        { descricao: `Ir até ${local}`, concluida: false },
        { descricao: `Lidar com o(a) ${objeto}`, concluida: false }
      ];
  }
}

function calcularDificuldadeBase(cat) {
  switch(cat) {
    case "Resgate": return 2;
    case "Recuperação": return 2;
    case "Exploração": return 1;
    case "Investigação": return 1;
    case "Combate": return 3;
    case "Sagrado": return 3;
    default: return 1;
  }
}

function gerarTituloMissao(p, o) {
  return `${p} o(a) ${o}`;
}

const HEX_DIRECTIONS = {
  N:  { q: 0,  r: -1 },
  NE: { q: 1,  r: -1 },
  SE: { q: 1,  r: 0 },
  S:  { q: 0,  r: 1 },
  SW: { q: -1, r: 1 },
  NW: { q: -1, r: 0 }
};

function sortearDirecao() {
  const d = ["N","NE","SE","S","SW","NW"];
  return d[Math.floor(Math.random()*6)];
}

function sortearDistancia() {
  return Math.floor(Math.random()*8) + 3; // 3 a 10 hex
}

function moverNaDirecao(q, r, direcao, distancia) {
  const d = HEX_DIRECTIONS[direcao];
  return {
    q: q + d.q * distancia,
    r: r + d.r * distancia
  };
}

function tipoNecessarioParaMissao(localTexto) {

  console.log("Texto da missão= " + localTexto)

  if (localTexto.includes("planície")) return { tipo: "bioma", valor: "Planície" };
  if (localTexto.includes("floresta")) return { tipo: "bioma", valor: "Floresta" };
  if (localTexto.includes("montanha")) return { tipo: "bioma", valor: "Montanha" };
  if (localTexto.includes("deserto")) return { tipo: "bioma", valor: "Deserto" };
  if (localTexto.includes("pântano")) return { tipo: "bioma", valor: "Pântano" };
  if (localTexto.includes("Sob as águas")) return { tipo: "bioma", valor: "marinho" };


  
  

  if (localTexto.includes("cidade") || localTexto.includes("vila")) 
    return { tipo: "poi", categoria: "Cidade" };

  if (localTexto.includes("Dungeon"))
    return { tipo: "poi", categoria: "Dungeon" };

  if (localTexto.includes("caverna"))
    return { tipo: "poi", categoria: "Geográfico" };

  if (localTexto.includes("templo") || localTexto.includes("divino"))
    return { tipo: "poi", categoria: "Divino" };

  if (localTexto.includes("Ponto Militar"))
    return { tipo: "poi", categoria: "Militar" };

  if (localTexto.includes("Ponto Mágico"))
    return { tipo: "poi", categoria: "Mágico" };

   if (localTexto.includes("Ponto Geográfico"))
    return { tipo: "poi", categoria: "Geográfico" };

  return { tipo: "bioma", valor: null }; // fallback


}

function encontrarNoMapa(campanha, tipo, valor, destino) {
  const mapa = campanha.mapa || {};

  // 1) Procurar por POI primeiro (se for POI)
  if (tipo === "poi") {
    // tenta lista centralizada primeiro (campanha.pontosInteresse[tipoNome])
    const listaGlobal = campanha.pontosInteresse && campanha.pontosInteresse[valor];

    /*if (Array.isArray(listaGlobal)) {
      for (const poi of listaGlobal) {
        if (poi.q === destino.q && poi.r === destino.r) {
          return { encontrado: true, poi, origem: "global" };
        }
      }
    }*/

    // fallback: varre o mapa.hexes (objeto chaveado) procurando dadosPOI compatível
    if (mapa.hexes && typeof mapa.hexes === "object") {
      for (const keyHex of Object.keys(mapa.hexes)) {
        const hex = mapa.hexes[keyHex];
        if (!hex || !hex.dadosPOI) continue;

        // estrutura que você usa: dadosPOI: { tipo: "monstruoso", pi: {...} }
        const tipoHex = hex.dadosPOI.tipo || (hex.dadosPOI.pi && hex.dadosPOI.pi.tipo);
        if (!tipoHex) continue;

        // converte chave "q,r" caso o mapa use esse formato
        let q = hex.q, r = hex.r;
        if (q === undefined || r === undefined) {
          const parts = keyHex.split(/[,_]/).map(n => Number(n));
          if (parts.length >= 2) { q = parts[0]; r = parts[1]; }
        }

        if (tipoHex.toLowerCase() === valor.toLowerCase()
            && Number(q) === Number(destino.q)
            && Number(r) === Number(destino.r)) {
          // devolve o objeto pi (dadosPOI.pi) se disponível, senão o dadosPOI inteiro
          return { encontrado: true, poi: hex.dadosPOI.pi || hex.dadosPOI, origem: "mapa", q, r };
        }
      }
    }

    return { encontrado: false };
  }

  // ---------- procura por bioma ----------
  // normaliza mapa para iterável
  let mapaArray = [];

  // caso: mapa já é array de hexes [{q,r,terreno}, ...]
  if (Array.isArray(mapa)) {
    mapaArray = mapa;
  }
  // caso: mapa.hexes é array
  else if (mapa.hexes && Array.isArray(mapa.hexes)) {
    mapaArray = mapa.hexes;
  }
  // caso: mapa.hexes é objeto chaveado { "q,r": hex, ... }
  else if (mapa.hexes && typeof mapa.hexes === "object") {
    mapaArray = Object.entries(mapa.hexes).map(([k, h]) => {
      // tenta extrair q,r do próprio hex, se não existir usa a chave
      if (h && (h.q === undefined || h.r === undefined)) {
        const parts = k.split(/[,_]/).map(n => Number(n));
        if (parts.length >= 2) {
          h = Object.assign({ q: parts[0], r: parts[1] }, h);
        }
      }
      return h;
    });
  }
  // caso: mapa é um objeto chaveado direto (sem prop hexes)
  else if (typeof mapa === "object") {
    mapaArray = Object.values(mapa);
  }

  if (tipo === "bioma") {
    const hex = mapaArray.find(h => Number(h.q) === Number(destino.q) && Number(h.r) === Number(destino.r));
    if (!hex) return { encontrado: false };
    if (valor === null || hex.terreno === valor) {
      return { encontrado: true, hex };
    }
    return { encontrado: false };
  }

  return { encontrado: false };
}



function criarPOIProcedural(campanha, categoria, destino) {
  console.log("entrou no criarPOIProcedural")
  console.log("campanha= " + campanha)
  console.log(campanha)
  console.log("categoria= " + categoria)
  console.log("destino= " + destino)
  console.log(destino)
  const novo = {
    id: "POI-" + Math.floor(Math.random()*99999),
    nome: categoria + " Desconhecido",
    descricao: "Criado automaticamente pela missão.",
    q: destino.q,
    r: destino.r
  };

  campanha.pontosInteresse[categoria].push(novo);
  return novo;
}

function integrarMissaoAoMapa(missao) {

  console.log("Missão ao entrar no integrarMissãoAoMapa")
  console.log(missao)

  const campanha = campanhas[campanhaAtual];

  // posição do grupo / jogador  
  //const origem = campanha.mapa.find(h => h.ehInicio) || campanha.mapa[0]; 
  const origem = campanha.mapa.jogador

  const localTexto = missao.descricao;

  const necessidade = tipoNecessarioParaMissao(localTexto);

  console.log("Bioma da missão= " + necessidade.valor)

  const direcao = sortearDirecao();
  const distancia = sortearDistancia();

  const destino = moverNaDirecao(origem.q, origem.r, direcao, distancia);

  missao.destino = { ...destino, direcao, distancia };

  const achado = encontrarNoMapa(
    campanha,
    necessidade.tipo,
    necessidade.valor || necessidade.categoria,
    destino
  );

   let mapaArray = [];

  // Caso 1 -> Já é array
  if (Array.isArray(campanha.mapa)) {
    mapaArray = campanha.mapa;

  // Caso 2 -> Objeto com .hexas
  } else if (Array.isArray(campanha.mapa.hexes)) {
    mapaArray = campanha.mapa.hexes;

  // Caso 3 -> Dicionário { "q_r": hex }
  } else if (typeof campanha.mapa === "object") {
    mapaArray = Object.values(campanha.mapa);
  }

  // NÃO ENCONTROU → criar
  if (!achado.encontrado) {
    if (necessidade.tipo === "bioma") {
      // alterar o bioma no hex (pouco invasivo)
      const hex = mapaArray.find(h => h.q === destino.q && h.r === destino.r);
      if (hex) {
        hex.terreno = necessidade.valor || "Planície";
      }
      missao.poiLigado = null;
    } else {
      const poiNovo = criarPOIProcedural(campanha, necessidade.categoria, destino);
      missao.poiLigado = poiNovo.id;
    }
  } 
  else {
    missao.poiLigado =
      achado.poi?.id ||
      null;
  }

  console.log("Missão ao passar no integrarMissãoAoMapa")
  console.log(missao)

  setMissaoNoHex(missao.destino.q, missao.destino.r, missao);
  campanhas[campanhaAtual].missoesAtivas.push(missao);
  atualizarListasMissoes();
  //criarMarcadorMissaoNoMapa(missao);
  salvarCampanhas();
}

function criarMarcadorMissaoNoMapa(missao) {
  console.log("Criando marcador de missão…", missao);

  const svgHex = document.querySelector(
    `[data-q="${String(missao.destino.q).trim()}"][data-r="${String(missao.destino.r).trim()}"]`
  );

  const rect = svgHex.getBoundingClientRect();

// posição real calculada na tela
const x = rect.left + (rect.width * 0.5);
const y = rect.top + (rect.height * 0.5);

// mas como o mapa é absolute, converter para coords do mapa
const mapaRect = mapa.getBoundingClientRect();

const finalX = x - mapaRect.left;
const finalY = y - mapaRect.top;


  console.log("Posição relativa:", x, y);

  const marker = document.createElement("div");
  marker.classList.add("missao-marker");
  marker.innerHTML = "❗";

  marker.style.position = "absolute";
  marker.style.left = `${finalX}px`;
  marker.style.top  = `${finalY}px`;  
  marker.style.zIndex = "9999";
  marker.dataset.missaoId = missao.id;

  container.appendChild(marker);

  console.log("Marcador criado!", marker);
}


function key(q, r) { return `${q},${r}`; }

// coloca uma missão no hex (vincula e persiste)
function setMissaoNoHex(q, r, missaoObj) {
  if (!campanhaAtual || !campanhas[campanhaAtual]) {
    console.warn("Nenhuma campanha ativa.");
    return false;
  }

  const k = key(q, r);
  const mapa = campanhas[campanhaAtual].mapa;
  if (!mapa || !mapa.hexes || !mapa.hexes[k]) {
    console.warn("Hex inexistente no mapa:", k);
    return false;
  }

  // garante array
  mapa.hexes[k].missoes = mapa.hexes[k].missoes || [];
  terrenos[k] = terrenos[k] || {}; // garante que terrenos local exista
  terrenos[k].missoes = terrenos[k].missoes || [];

  // adiciona a missão (pode salvar só id ou o objeto inteiro)
  mapa.hexes[k].missoes.push(missaoObj.id || missaoObj);
  terrenos[k].missoes.push(missaoObj.id || missaoObj);

  // atualizar UI
  atualizarMarcadoresMissoes();

  return true;
}

// remove uma missão do hex
function removerMissaoDoHex(q, r, missaoId) {
  const k = key(q, r);
  const mapa = campanhas[campanhaAtual].mapa;
  if (!mapa || !mapa.hexes || !mapa.hexes[k]) return false;

  mapa.hexes[k].missoes = (mapa.hexes[k].missoes || []).filter(m => m !== missaoId);
  if (terrenos[k] && terrenos[k].missoes) {
    terrenos[k].missoes = terrenos[k].missoes.filter(m => m !== missaoId);
  }

  salvarCampanhas();
  atualizarMarcadoresMissoes();
  return true;
}

// varre o mapa e atualiza os marcadores das .hex já renderizadas
function atualizarMarcadoresMissoes() {
  // garante campanha/mapa carregados
  const mapaData = campanhas[campanhaAtual] && campanhas[campanhaAtual].mapa;
  if (!mapaData) return;

  // percorre todas as hex DOM e atualiza
  document.querySelectorAll('.hex').forEach(div => {
    const q = div.dataset.q;
    const r = div.dataset.r;
    const k = key(q, r);

    // tenta ler das estruturas persistidas (mapa dentro da campanha)
    const hexData = mapaData.hexes && mapaData.hexes[k];
    const missoes = (hexData && Array.isArray(hexData.missoes)) ? hexData.missoes : [];

    const marker = div.querySelector('.missao-marker');
    if (!marker) return;

    const countEl = marker.querySelector('.count');

    if (missoes.length > 0 ) {
      marker.style.display = "block";
      if (countEl) {
        countEl.style.display = "inline-block";
        countEl.innerText = missoes.length;
      }
    } else {
      marker.style.display = "none";
      if (countEl) countEl.style.display = "none";
    }
  });
}