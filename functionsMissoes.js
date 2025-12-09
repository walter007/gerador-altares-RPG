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

  // --- Sorteios coerentes ---
  let p, o, s, l;
  do {
    p = precisa[rolarD20()-1];
    o = objeto[rolarD20()-1];
    s = situacao[rolarD20()-1];
  } while (!validarCoerencia(p, o, s));
  l = local[rolarD20()-1];

  // --- descrição avançada (IA leve) ---
  const descricao = gerarDescricaoAvancada(p, o, s, l);

  const categoria = classificarMissao(p, o, s, l);
  const etapas = gerarEtapasPorCategoria(categoria, o, l);

  const missao = {
    id: "MIS-" + Math.floor(Math.random()*999999),
    titulo: gerarTituloAvancado(p, o),
    descricao,
    categoria,
    dificuldade: calcularDificuldadeBase(categoria),
    etapas,
    destino: null,
    poiLigado: null,
    expiracao: null,
    ativa: true,
    dataCriacao: Date.now()
  };

  // salva temporariamente na campanha para persistência antes da integração com o mapa
  //data.missoesAtivas.push(missao);
  //salvarCampanhas();
  //atualizarListasMissoes();

  // chama a sua integração com mapa — mantenha essa função existente
  // OBS: você pediu que integrarMissaoAoMapa continuasse funcionando; aqui chamamos.
  if (typeof integrarMissaoAoMapa === "function") {
    integrarMissaoAoMapa(missao);
  } else {
    console.warn("integrarMissaoAoMapa não encontrada. Missão criada mas não ligada ao mapa.");
  }
  console.log(missao.descricao)  
  //return missao;
}


function gerarMissaoOld() {
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


function gerarMissaoOld2() {
  const data = campanhas[campanhaAtual];

  // --- Sorteios ---
  let p, o, s, l;

  // Garantir coerência
  do {
    p = precisa[rolarD20()-1];
    o = objeto[rolarD20()-1];
    s = situacao[rolarD20()-1];
  } while (!validarCoerencia(p, o, s));

  l = local[rolarD20()-1];

  // --- DESCRIÇÃO IA ---
  const descricao = criarDescricaoIA(p, o, s, l);

  // --- Categoria ---
  const categoria = classificarMissao(p, o, s, l);

  // --- Etapas baseadas na categoria ---
  const etapas = gerarEtapasPorCategoria(categoria, o, l);

  // --- Montagem final ---
  const missao = {
    id: "MIS-" + Math.floor(Math.random()*99999),
    titulo: gerarTituloMissao(p, o),
    descricao,
    categoria,
    dificuldade: calcularDificuldadeBase(categoria),
    etapas,
    destino: null,
    poiLigado: null,
    expiracao: null,
    ativa: true,
    dataCriacao: Date.now()
  };

  console.log(missao.descricao)
  // 🔥 Mantemos exatamente como você pediu
  //integrarMissaoAoMapa(missao);
}



function concluirMissao(i) {
  const data = campanhas[campanhaAtual];
  const m = data.missoesAtivas.splice(i,1)[0];
  data.missoesConcluidas.push(m);
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
  if (m && m.destino) {
    removerMissaoDoHex(m.destino.q, m.destino.r, m.id);
  }
  m.status = "concluida";
  data.missoesConcluidas.push(m);
  salvarCampanhas();
  atualizarListasMissoesModal();
  return true;
}

// remover missão ativa sem concluir (opcional)
function removerMissaoPorId(id) {
  const data = campanhas[campanhaAtual];
  if (!data) return false;
  const idx = (data.missoesAtivas || []).findIndex(m => m.id === id);
  if (idx === -1) return false;
  const m = data.missoesAtivas.splice(idx, 1);
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
          <small class="text-muted">${m.categoria} • Criada ${new Date(m.dataCriacao).toLocaleString()}</small>
          <div style="margin-top:6px">${m.descricao}</div>
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
      <b>${escapeHtml(m.titulo)}</b> <small>• concluída ${new Date(m.dataCriacao).toLocaleString()}</small><br>
      <div style="margin-top:6px">${m.descricao}</div>
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
  if (localTexto.includes("Sob as águas")) return { tipo: "bioma", valor: "Aquático" };
  if (localTexto.includes("Submerso")) return { tipo: "bioma", valor: "Aquático" };


  
  

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

  if (localTexto.includes("Ponto Monstruoso"))
    return { tipo: "poi", categoria: "monstruoso" };

  return { tipo: "bioma", valor: null }; // fallback


}



function tipoNecessarioFallbackPOI(localTexto) {

  console.log("Texto da missão= " + localTexto)

  if (localTexto.includes("Planície")) return { tipo: "bioma", valor: "planicie" };
  if (localTexto.includes("Floresta")) return { tipo: "bioma", valor: "floresta" };
  if (localTexto.includes("Montanha")) return { tipo: "bioma", valor: "montanha" };
  if (localTexto.includes("Deserto")) return { tipo: "bioma", valor: "deserto" };
  if (localTexto.includes("Pântano")) return { tipo: "bioma", valor: "pantano" };
  if (localTexto.includes("Aquático")) return { tipo: "bioma", valor: "marinho" };
  if (localTexto.includes("Selva")) return { tipo: "bioma", valor: "selva" };
  if (localTexto.includes("Colina")) return { tipo: "bioma", valor: "colina" };
  if (localTexto.includes("Costeiro")) return { tipo: "bioma", valor: "costeiro" };



  
  

  if (localTexto.includes("Cidade") || localTexto.includes("vila")) 
    return { tipo: "poi", categoria: "cidade" };

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
  console.log("Tipo= " + tipo)
  console.log("valor= " + valor)
  console.log("destinoQ= " + destino.q)
  console.log("destinoR= " + destino.r)

  const mapa = campanha.mapa || {};
  // valida destino
  if (!destino || isNaN(Number(destino.q)) || isNaN(Number(destino.r))) {
    return { encontrado: false };
  }
  const q = Number(destino.q);
  const r = Number(destino.r);

  // muro: verificar se está dentro dos limites do mapa (se disponível)
  if (mapa.cols && mapa.rows) {
    if (q < 0 || r < 0 || q >= mapa.cols || r >= mapa.rows) {
      console.log("fora dos limites")
      return { encontrado: false, motivo: "fora-limites" };
    }
  }

  const chave = key(q, r);

  // 1) POI: se pediram 'poi' procure diretamente no mapa.hexes[chave] antes de vasculhar listas
  if (tipo === "poi") {
    // 1.a: mapa.hexes
    const hex = mapa.hexes && mapa.hexes[chave];
    if (hex && hex.dadosPOI) {
      const tipoHex = (hex.dadosPOI.tipo || (hex.dadosPOI.pi && hex.dadosPOI.pi.tipo) || "").toLowerCase();
      if (tipoHex === String(valor).toLowerCase()) {
        return { encontrado: true, poi: hex.dadosPOI.pi || hex.dadosPOI, origem: "mapa", q, r };
      }
    }

    // 1.b: lista global de pontos de interesse (campanha.pontosInteresse)
    const listaGlobal = campanha.pontosInteresse && campanha.pontosInteresse[valor];
    if (Array.isArray(listaGlobal)) {
      for (const poi of listaGlobal) {
        if (Number(poi.q) === q && Number(poi.r) === r) {
          return { encontrado: true, poi, origem: "global" };
        }
      }
    }

    return { encontrado: false, hex: Object.assign({ q, r }, hex) };
  }

  // 2) BIOMA: lookup direto no mapa.hexes[chave]
  if (tipo === "bioma") {
    console.log("Entrou em bioma")
    const hex = mapa.hexes && mapa.hexes[chave];
    console.log("hex encontrado")
    console.log(hex)
    if (!hex){
      console.log("hex não encontrado")
      return { encontrado: false };
    } 
    // normaliza comparação (algumas strings têm maiúsculas)
    if (valor === null || String(hex.terreno).toLowerCase() === String(valor).toLowerCase()) {
      console.log("Terreno na variavel hex= ",hex.terreno)
      console.log("Terreno na variavel valor= ",valor)
      return { encontrado: true, hex: Object.assign({ q, r }, hex) };
    }
    return { encontrado: false, hex: Object.assign({ q, r }, hex) };
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

  //const direcao = sortearDirecao();
  //const distancia = sortearDistancia();

  //const destino = moverNaDirecao(origem.q, origem.r, direcao, distancia);

  const destinoObj = sortearDestinoPossivel(origem, campanhas[campanhaAtual].mapa);
// destinoObj tem { q, r, direcao, distancia, tentativa }

const direcao = destinoObj.direcao;
const distancia = destinoObj.distancia;
const destino = destinoObj.destino;

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
      /*const hex = mapaArray.find(h => h.q === destino.q && h.r === destino.r);
      if (hex) {
        hex.terreno = necessidade.valor || "Planície";
      }*/
     console.log("Hex dentro do NÃO ENCONTROU")
     console.log(achado.hex)
     missao = validarBiomaOuAplicarFallback(missao, achado.hex)
      missao.poiLigado = null;
    } else {
      missao = validarPoiOuAplicarFallback(missao, achado.hex)
      //const poiNovo = criarPOIProcedural(campanha, necessidade.categoria, destino);
      //missao.poiLigado = poiNovo.id;
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
  atualizarListasMissoesModal();
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
    //console.log("Tamanho das missões no array= " + missoes.length)
    //console.log(missoes)
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


function encontrarHexMaisProximoPorBioma(qOrig, rOrig, biomaDesejado, maxRadius = 12) {
  console.log("Entrou em encontrarHexMaisProximoPorBioma")
  const mapa = campanhas[campanhaAtual].mapa;
  if (!mapa || !mapa.hexes) return null;
  const biomaLower = String(biomaDesejado || "").toLowerCase();
  const origemCube = offsetToCube(Number(qOrig), Number(rOrig));

  let candidato = null;
  let melhorDist = Infinity;

  for (const [k, h] of Object.entries(mapa.hexes)) {
    if (!h) continue;

    // extrai q,r do hex (com compatibilidade caso não esteja no objeto)
    let q = h.q, r = h.r;
    if (q === undefined || r === undefined) {
      const parts = k.split(/[,_]/).map(n => Number(n));
      if (parts.length >= 2) { q = parts[0]; r = parts[1]; }
    }
    if (q === undefined || r === undefined) continue;

    // compara bioma (normalizado)
    const terreno = (h.terreno || "").toString().toLowerCase();
    if (terreno !== biomaLower) continue;
 

    const cube = offsetToCube(Number(q), Number(r));
    const dist = cubeDistance(origemCube, cube);

    if (dist < melhorDist && dist <= maxRadius) {
      melhorDist = dist;
      candidato = { q: Number(q), r: Number(r), dist };
      if (dist === 0) break; // já no mesmo hex
    }
  }
  console.log("Candidato")
  console.log(candidato)
  return candidato; // null se nenhum encontrado
}

function encontrarPoiMaisProximoPorBioma(qOrig, rOrig, poiDesejado, maxRadius = 12) {
  console.log("Entrou em encontrarPoiMaisProximoPorBioma")
  const mapa = campanhas[campanhaAtual].mapa;
  if (!mapa || !mapa.hexes) return null;
  const poiLower = String(poiDesejado || "").toLowerCase();
  const origemCube = offsetToCube(Number(qOrig), Number(rOrig));

  let candidato = null;
  let melhorDist = Infinity;

  for (const [k, h] of Object.entries(mapa.hexes)) {
    if (!h) continue;

    // extrai q,r do hex (com compatibilidade caso não esteja no objeto)
    let q = h.q, r = h.r;
    if (q === undefined || r === undefined) {
      const parts = k.split(/[,_]/).map(n => Number(n));
      if (parts.length >= 2) { q = parts[0]; r = parts[1]; }
    }
    if (q === undefined || r === undefined) continue;

    // compara bioma (normalizado)
    const poi = (h.poi || "").toString().toLowerCase();
    if (poi !== poiLower) continue;
 

    const cube = offsetToCube(Number(q), Number(r));
    const dist = cubeDistance(origemCube, cube);

    if (dist < melhorDist && dist <= maxRadius) {
      melhorDist = dist;
      candidato = { q: Number(q), r: Number(r), dist };
      if (dist === 0) break; // já no mesmo hex
    }
  }
  console.log("Candidato")
  console.log(candidato)
  return candidato; // null se nenhum encontrado
}

function validarBiomaOuAplicarFallback(missao, hexSorteado) {
    const biomaEsperado = tipoNecessarioParaMissao(missao.descricao);
    let biomaEncontrado = hexSorteado.terreno;

    //if(biomaEncontrado === "Aquático") biomaEncontrado = "Marinho"

    /*if(biomaEncontrado === "Planície") biomaEncontrado = "planicie"
    if(biomaEncontrado === "Pântano") biomaEncontrado = "pantano"
    if(biomaEncontrado === "Aquático") biomaEncontrado = "marinho"
    if(biomaEncontrado === "Montanha") biomaEncontrado = "montanha"
    if(biomaEncontrado === "Deserto") biomaEncontrado = "deserto"
    if(biomaEncontrado === "Selva") biomaEncontrado = "selva"
    if(biomaEncontrado === "Floresta") biomaEncontrado = "floresta"
    if(biomaEncontrado === "Costeiro") biomaEncontrado = "costeiro"*/
    
    
    console.log("VAriaveis dentro do validarBiomaOuAplicarFallback")
    console.log(biomaEsperado.valor)
    console.log(biomaEncontrado)


    // Caso já esteja ok
    if (biomaEsperado.valor === biomaEncontrado) {
        missao.hexDestino = hexSorteado;
        return missao;
    }

    // Tenta encontrar hex do tipo esperado perto
    const hexProximo = encontrarHexMaisProximoPorBioma(missao.destino.q,missao.destino.r,biomaEsperado.valor);

    if (hexProximo) {
        // Ótimo, usa esse hex
        console.log("entrou aqui no hexProximo")
        missao.destino = hexProximo;
        return missao;
    }

    // ------- Fallback -------
    // Usa o hex sorteado mesmo
    //missao.hexDestino = hexSorteado;

    // Atualiza textos
    atualizarDescricaoBioma(missao, biomaEsperado.valor, biomaEncontrado);

    return missao;
}


function validarPoiOuAplicarFallback(missao, hexSorteado) {
    console.log("missao.descricao= " + missao.descricao)
    const poiEsperado = tipoNecessarioParaMissao(missao.descricao);
    let poiEncontrado = "nada"
    console.log("Hex dentro do validar poi")
    console.log(hexSorteado)
    if(hexSorteado.poi !== null)
      poiEncontrado = hexSorteado.poi;

    //if(biomaEncontrado === "Aquático") biomaEncontrado = "Marinho"

    /*if(biomaEncontrado === "Planície") biomaEncontrado = "planicie"
    if(biomaEncontrado === "Pântano") biomaEncontrado = "pantano"
    if(biomaEncontrado === "Aquático") biomaEncontrado = "marinho"
    if(biomaEncontrado === "Montanha") biomaEncontrado = "montanha"
    if(biomaEncontrado === "Deserto") biomaEncontrado = "deserto"
    if(biomaEncontrado === "Selva") biomaEncontrado = "selva"
    if(biomaEncontrado === "Floresta") biomaEncontrado = "floresta"
    if(biomaEncontrado === "Costeiro") biomaEncontrado = "costeiro"*/
    
    
    console.log("VAriaveis dentro do validarBiomaOuAplicarFallback")
    console.log(poiEsperado.categoria)
    console.log(poiEncontrado)


    // Caso já esteja ok
    if (poiEsperado.categoria === poiEncontrado) {
        missao.hexDestino = hexSorteado;
        return missao;
    }

    // Tenta encontrar hex do tipo esperado perto
    const poiProximo = encontrarPoiMaisProximoPorBioma(missao.destino.q,missao.destino.r,poiEsperado.categoria);

    if (poiProximo) {
        // Ótimo, usa esse hex
        console.log("entrou aqui no hexProximo")
        missao.destino = poiProximo;
        return missao;
    }

    let poiEsperadoAux = ""
    if(poiEsperado.categoria.toLowerCase() === "geográfico" ) poiEsperadoAux = "geografico"
    else if(poiEsperado.categoria.toLowerCase() === "mágico" ) poiEsperadoAux = "magico"
    else poiEsperadoAux = poiEsperado.categoria.toLowerCase()

    let terrenoAux = tipoNecessarioFallbackPOI(hexSorteado.terreno)

    console.log("vARIAVEIS PRA GERAR O POI SILENCIOSO")
    console.log(terrenoAux)
    console.log(poiEsperadoAux)

    // ------- Fallback -------
    const piObj = gerarPISilencioso(poiEsperadoAux,terrenoAux.valor)
    console.log(piObj)

    return missao;
}

function atualizarDescricaoBioma(missao, biomaAntigo, biomaNovo) {
    // Atualiza o texto principal
    console.log("antes de ajustar a descricao")
    console.log(missao.descricao);
    missao.descricao = missao.descricao.replaceAll(biomaAntigo, biomaNovo);

    // Atualiza o objeto de destino (caso você use separado)
    //if (missao.descricaoDestino) {
        //missao.descricaoDestino = missao.descricaoDestino.replaceAll(biomaAntigo, biomaNovo);
    //}

    // Caso tenha campos estruturados
    //missao.destino = biomaNovo;
    console.log("depois de ajustar a descricao")
    console.log(missao.descricao);
    return missao;
}

function gerarDestinoValido(origem, mapa) {
  let tentativas = 0;

  while (tentativas < 20) {
    tentativas++;
    
    const destinoObj = sortearDestinoPossivel(origem, mapa);
    
    const destino = destinoObj.destino

    // Valida limites
    if (
      destino.q >= 0 && destino.r >= 0 &&
      destino.q < mapa.cols && destino.r < mapa.rows
    ) {
      return destino; // <<< Achou destino válido!
    }

    console.log(`Destino fora dos limites, tentando novamente... (tentativa ${tentativas})`);
  }

  // Fallback definitivo (muito improvável)
  console.warn("Não foi possível gerar destino válido, usando a origem mesmo.");
  return { q: origem.q, r: origem.r };
}


function gerarDestinoValido(origem, mapa, options = {}) {
  const maxTentativas = options.maxTentativas || 20;
  let ultimaTentativa = null;

  // limites fallback (se mapa não tiver cols/rows use globals)
  const maxCols = (mapa && mapa.cols) ? mapa.cols : (typeof cols !== 'undefined' ? cols : 0);
  const maxRows = (mapa && mapa.rows) ? mapa.rows : (typeof rows !== 'undefined' ? rows : 0);

  for (let tentativa = 1; tentativa <= maxTentativas; tentativa++) {
    const direcao = sortearDirecao();
    const distancia = sortearDistancia();

    const destino = moverNaDirecao(origem.q, origem.r, direcao, distancia);
    ultimaTentativa = { destino, direcao, distancia, tentativa };

    // Se mapa não tiver cols/rows definidos, assumimos que qualquer destino é aceitável
    if (!maxCols || !maxRows) {
      return ultimaTentativa;
    }

    // Validar limites
    const dentro =
      Number(ultimaTentativa.q) >= 0 &&
      Number(ultimaTentativa.r) >= 0 &&
      Number(ultimaTentativa.q) < Number(maxCols) &&
      Number(ultimaTentativa.r) < Number(maxRows);

    if (dentro) {
      return ultimaTentativa; // encontrou destino válido
    }

    // senão tenta novamente
    // (loop continua)
  }

  // fallback: não achou destino dentro do limite após tentativas
  // devolve a última tentativa (com direcao/distancia) para que o fluxo continue
  console.warn("gerarDestinoValido: não encontrou destino dentro dos limites após", maxTentativas, "tentativas. Retornando última tentativa.");
  if (ultimaTentativa) return ultimaTentativa;

  // último fallback extremo: retorna origem com nulls
  return { destino, direcao: null, distancia: null, tentativa: 0 };
}


function sortearDestinoPossivel(origem, mapa) {
  const maxCols = mapa.cols;
  const maxRows = mapa.rows;

  const direcoes = ["N","NE","SE","S","SW","NW"];

  // Lista final de destinos válidos
  const opcoes = [];

  for (const direcao of direcoes) {
    for (let distancia = 3; distancia <= 10; distancia++) {

      const destino = moverNaDirecao(origem.q, origem.r, direcao, distancia);

      const dentro =
        destino.q >= 0 &&
        destino.r >= 0 &&
        destino.q < maxCols &&
        destino.r < maxRows;

      if (dentro) {
        opcoes.push({
          destino,
          direcao,
          distancia
        });
      }
    }
  }

  // Não existe nenhuma opção válida → borda extrema
  if (opcoes.length === 0) {
    console.warn("sortearDestinoPossivel: nenhuma direção/distância válida a partir de", origem);
    return null;
  }

  // Escolhe uma aleatória
  return opcoes[Math.floor(Math.random() * opcoes.length)];
}