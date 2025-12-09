const precisa = [
  "Recuperar","Proteger","Investigar","Destruir","Libertar","Escoltar","Resgatar","Impedir",
  "Descobrir","Purificar","Capturar","Entregar","Explorar","Reativar","Roubar","Convencer",
  "Selar","Libertar","Despertar","Erradicar"
];

const objeto = [
  "Artefato","Espírito","Monstro","Cidade","Relíquia","Maldição","Amigo","Livro","Herdeiro","Animal",
  "Pessoa","Feiticeiro","Herói","Vilão","Monstro","Fortaleza","Cidade","Orbe","Portal","Arma"
];

const situacao = [
  "Roubado","Perdido","Corrompido","Esquecido","Selado","Destruído","Invocado","Traído","Profanado","Escondido",
  "Transformado","Atacado","Amaldiçoado","Guardado","Contaminado","Raptado","Enfeitiçado","Silenciado","Dividido","Preso"
];

const local = [
  "Em uma floresta","Em uma planície","Em uma montanha","Em um deserto","Em um pântano","Em uma caverna","Sob as águas","Em uma cidade",
  "Em uma caverna","Em uma Dungeon","Em um templo","Em um Ponto Geográfico","Em um Ponto Militar","Em um Ponto Monstruoso","Em uma vila",
  "Em uma aldeia","Em um local esquecido","Em outro Plano","Em um Ponto Mágico","Submerso"
];

const nomesEspecificos = {
  "Artefato": ["Lança Solar", "Coroa de Sangue", "Ídolo Esquecido", "Tomo do Crepúsculo"],
  "Espírito": ["Guardião de Cinzas", "Eco Perdido", "O Sussurrante"],
  "Animal": ["Lobo Alabastro", "Falcão Rubro", "Hidra Menor"],
  "Fortaleza": ["Castelo Mirrath", "Torre Sombria", "Ruína Cinzenta"],
  "Cidade": ["Eldenford", "Mirrakesh", "Brumavil", "Varnhold"],
  "Pessoa": ["Sábio Roderik", "Mestre Illian", "Lady Vesper"]
};

// --- RESTRIÇÕES DE COERÊNCIA ---
const proibicoes = {
  "Animal": ["Selado", "Construído"],
  "Cidade": ["Roubado", "Capturar"],
  "Portal": ["Resgatado", "Traído"],
  "Pessoa": ["Destruído"]
};

// --- GANCHOS NARRATIVOS ---
const ganchoAntes = [
  "Rumores dizem que forças misteriosas estão envolvidas.",
  "Um aliado envia um pedido urgente.",
  "Um viajante relata algo estranho acontecendo no local.",
  "Um presságio sombrio antecede o incidente."
];

const ganchoDurante = [
  "Inimigos patrulham os arredores.",
  "A magia local parece instável.",
  "Fenômenos sobrenaturais dificultam o caminho.",
  "O clima muda repentinamente."
];

const ganchoDepois = [
  "A ação pode chamar atenção de forças maiores.",
  "Uma nova ameaça pode emergir futuramente.",
  "A região se tornará mais segura por algumas semanas.",
  "Uma facção ganhará favor com os heróis."
];

function validarCoerencia(p, o, s) {
  if (!proibicoes[o]) return true;
  return !proibicoes[o].includes(s);
}

function nomearObjeto(o) {
  if (!nomesEspecificos[o]) return o;
  const lista = nomesEspecificos[o];
  return lista[Math.floor(Math.random() * lista.length)];
}

function criarDescricaoIA(p, objeto, situacao, local) {
  const nomeFinal = nomearObjeto(objeto);

  const parte1 = `Os heróis devem <strong>${p}</strong> o(a) <strong>${nomeFinal}</strong>,`;
  const parte2 = `que se encontra <strong>${situacao}</strong>.`;
  const parte3 = `As pistas indicam que ele está <strong>${local}</strong>.`;

  const pre = Math.random() < 0.35 ? ganchoAntes[Math.floor(Math.random()*ganchoAntes.length)] : null;
  const meio = Math.random() < 0.30 ? ganchoDurante[Math.floor(Math.random()*ganchoDurante.length)] : null;
  const pos = Math.random() < 0.30 ? ganchoDepois[Math.floor(Math.random()*ganchoDepois.length)] : null;

  let final = `${parte1} ${parte2} ${parte3}`;

  if (pre) final += `<br><em>${pre}</em>`;
  if (meio) final += `<br><em>${meio}</em>`;
  if (pos) final += `<br><em>${pos}</em>`;

  return final;
}


// ---------- utilitários ----------
function escolher(arr) { return arr[Math.floor(Math.random()*arr.length)]; }
function prob(p) { return Math.random() < p; }
function capitalizar(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

// Sinônimos e variações para enriquecer frases
const synonyms = {
  localizar: ["Localizar", "Encontrar", "Rastrear", "Revelar a posição de"],
  viajar: ["Viajar até", "Avançar até", "Seguir para"],
  lidar_com: ["Lidar com", "Enfrentar", "Tratar do assunto com"],
  confirmar: ["Confirmar", "Verificar", "Certificar-se de"]
};

// ---------- templates por categoria (placeholders: {p},{obj},{objName},{sit},{loc}) ----------
const templatesPorCategoria = {
  "Combate": [
    "{p} {objName} que foi {sit} em {loc}. Uma força hostil parece protegê-lo.",
    "A presença de um {obj} {sit} em {loc} exige que os heróis {p}.",
    "Relatos falam de um {obj} {sit} dentro de {loc} — é hora de {p}."
  ],
  "Resgate": [
    "{p} {objName} que foi {sit} e foi visto(a) em {loc}. Contam-se testemunhos urgentes.",
    "Um pedido de socorro indica que um(a) {obj} {sit} em {loc} — os heróis devem {p}.",
    "{loc} é o último ponto conhecido onde o(a) {obj} {sit}; resgatá-lo(a) é prioridade."
  ],
  "Investigação": [
    "Há indícios de que um(a) {obj} foi {sit} em {loc}. Investigue o que aconteceu.",
    "{p} pistas sobre o(a) {obj} {sit} em {loc} e descobrir a verdade.",
    "Rumores colocam um(a) {obj} {sit} em {loc}; há passos a serem seguidos para elucidar."
  ],
  "Exploração": [
    "{loc} abriga sinais de algo inusitado: um(a) {obj} {sit}. Os heróis devem {p}.",
    "Explorar {loc} pode revelar um(a) {obj} {sit} — aventureiros em busca de descobertas.",
    "{p} o desconhecido em {loc}, onde um(a) {obj} parece ter sido {sit}."
  ],
  "Recuperação": [
    "{p} o(a) {objName} que foi {sit} e, segundo pistas, está em {loc}.",
    "Objetivo claro: {p} o(a) {obj} {sit} em {loc} e trazê-lo de volta.",
    "As pistas apontam para {loc} — recupere o(a) {obj} que foi {sit}."
  ],
  "Sagrado": [
    "{loc} guarda um(a) {obj} {sit} que exige ritos; os heróis devem {p}.",
    "Forças sobrenaturais ligadas ao(a) {obj} {sit} em {loc}. Um ritual pode ser necessário.",
    "Um artefato {sit} em {loc} chama por intervenção sagrada — {p} com cuidado."
  ],
  "Geral": [
    "{p} um(a) {obj} {sit} em {loc}. Detalhes devem ser resolvidos no local.",
    "Uma tarefa simples: {p} o(a) {obj} que foi {sit} e está em {loc}.",
    "Os heróis recebem a missão de {p} o(a) {obj} encontrado(a) em {loc}."
  ]
};

// ---------- fragments opcionais (antes/durante/depois) ----------
const fragments = {
  geralAntes: [
    "Rumores redundam sobre o evento.",
    "Um informante local trouxe a história.",
    "Moradores sussurram sobre estranhos ruídos à noite."
  ],
  geralDurante: [
    "Inimigos patrulham a região.",
    "O terreno complica a abordagem.",
    "A magia local é instável."
  ],
  geralDepois: [
    "A ação pode atrair outras facções.",
    "Recompensa e notoriedade acompanham o sucesso.",
    "Consequências imprevistas podem surgir."
  ],
  // alterações por categoria (exemplos)
  combateAntes: [
    "Batedores viram grandes rastros na área.",
    "Civis foram avisados de se manterem afastados."
  ],
  resgateAntes: [
    "Um aliado implora por socorro.",
    "Vozes distantes pedem auxílio."
  ],
  investigacaoDurante: [
    "Pistas contraditórias exigem atenção aos detalhes.",
    "Registros antigos podem conter a chave."
  ],
  sagradoDurante: [
    "Sinais de ritual persistem no local.",
    "Runas apagadas sugestionam intervenção."
  ]
};

// ---------- função que injeta fragments conforme categoria e probabilidade ----------
function escolherFragments(cat) {
  const chosen = [];
  // geral antes
  if (prob(0.35)) chosen.push(escolher(fragments.geralAntes));
  // categoria-specific antes
  if (cat === "Combate" && prob(0.25)) chosen.push(escolher(fragments.combateAntes));
  if (cat === "Resgate" && prob(0.35)) chosen.push(escolher(fragments.resgateAntes));
  // during
  if (prob(0.30)) chosen.push(escolher(fragments.geralDurante));
  if (cat === "Investigação" && prob(0.30)) chosen.push(escolher(fragments.investigacaoDurante));
  if (cat === "Sagrado" && prob(0.30)) chosen.push(escolher(fragments.sagradoDurante));
  // after
  if (prob(0.28)) chosen.push(escolher(fragments.geralDepois));
  return chosen;
}

// ---------- montagem da descrição avançada ----------
function gerarDescricaoAvancada(p, obj, sit, loc) {
  // nome mais específico quando aplicável
  const objName = nomearObjeto(obj);

  // seleciona template da categoria
  const cat = classificarMissao(p, obj, sit, loc);
  const templates = templatesPorCategoria[cat] || templatesPorCategoria["Geral"];
  let template = escolher(templates);

  // variações pequenas: troque verbos por sinônimos (pode enriquecer)
  const pVar = p; // p já vem do seu sorteio (Recuperar, Destruir, etc.)
  // preenche placeholders
  let texto = template
    .replace(/\{p\}/g, pVar)
    .replace(/\{objName\}/g, objName)
    .replace(/\{obj\}/g, obj)
    .replace(/\{sit\}/g, sit)
    .replace(/\{loc\}/g, loc);

  // injeta fragments (antes/durante/depois) com quebras
  const frags = escolherFragments(cat);
  if (frags.length) {
    // insere em locais naturais: no começo e no fim para não quebrar a frase central
    // 1/3 chance de colocar o fragmento antes, 1/3 ao meio (após sentença principal), 1/3 depois
    frags.forEach(f => {
      const place = Math.floor(Math.random()*3);
      if (place === 0) texto = `<em>${f}</em><br>` + texto;
      else if (place === 1) texto = texto + `<br><em>${f}</em>`;
      else texto = texto + `<br><em>${f}</em>`;
    });
  }

  // pequenas limpezas/variações
  texto = texto.replace(/\s+/g, " ").trim();

  return texto;
}

// ---------- função que monta título melhorado (varia por categoria/objeto) ----------
function gerarTituloAvancado(p, o) {
  // exemplos: "Erradicar Culto", "Resgatar: Lança Solar", "Recuperar Orbe Perdido"
  const name = nomearObjeto(o);
  const base = `${p} ${o}`;
  // se nome específico não for igual ao tipo, prefira "p name"
  if (name && name !== o && Math.random() < 0.7) {
    return `${p} ${name}`;
  }
  return base;
}

// ---------- função de geração final (substitui sua criação simples) ----------


// ---------- export / substituição sugerida ----------
// Substitua as chamadas antigas por: gerarMissaoAvancada()
// por exemplo: botão "Gerar Missão" -> onclick="gerarMissaoAvancada()"

