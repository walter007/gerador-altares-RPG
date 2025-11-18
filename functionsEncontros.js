function gerarEncontro() {
  const bioma = document.getElementById('biomaSelect').value;
  const r = rolarD20();
  let resultado = '';

  if (r <= 5) resultado = 'Nenhum encontro — Descanso Seguro.';
  else if (r <= 10) resultado = 'Nenhum encontro — Viagem Tranquila.';
  else if (r <= 12) resultado = 'Nenhum encontro — Tensão Crescente (próxima rolagem com desvantagem).';
  else if (r <= 14) resultado = gerarNPCEncontro();
  else if (r <= 17) resultado = gerarMonstroEstrada(bioma);
  else if (r === 18) return gerarEncontroAmbiental(bioma);
  else if (r === 19) return gerarEncontroEspecial();
  else {
    let nova;
    do { nova = rolarD20(); } while (nova <= 12);
    if (nova <= 14) resultado = gerarNPCEncontro() + ' (Surpresa)';
    else resultado = gerarMonstroEncontro(bioma) + ' (Surpresa)';
  }

  const box = document.getElementById('resultadoEncontro');
  box.style.display = 'block';
  box.innerHTML = `
  <div class="card mt-3">
    <div class="card-body">
      <h5 class="card-title">⚔️ Encontro</h5>
      <p>${resultado}</p>
    </div>
  </div>`;
}

function gerarEncontroAmbiental(bioma) {
  let tabela = (bioma === "planicie") ? cenasPlanicie :
             (bioma === "floresta") ? cenasFloresta :
             (bioma === "selva") ? cenasSelva :
             (bioma === "costeiro") ? cenasCosteiras :
             (bioma === "marinho") ? cenasAquaticas :
             (bioma === "colina") ? cenasColinas :
             (bioma === "montanha") ? cenasMontanha :
             (bioma === "deserto") ? cenasDeserto :
             (bioma === "pantano") ? cenasPantano :
             null;
  const lugar = tabela[rolar2d6Key()].lugar;
  const curiosidade = tabela[rolar2d6Key()].curiosidade;
  const obstaculoRaw = tabela[rolar2d6Key()].obstaculo;

  const obstaculo = obstaculoRaw.replace(/\[(.*?)\]/g, 
    `<button class="btn btn-sm btn-danger" onclick="gerarMonstroEncontroCenas('${bioma}')">$1</button>`);

  const box = document.getElementById('resultadoEncontro');
  box.style.display = 'block';
  box.innerHTML = `
  <div class="card mt-3"><div class="card-body">
    <h4>🌿 Cena Ambiental (${bioma})</h4>
    <b>Lugar:</b> ${lugar}<br>
    <b>Curiosidade:</b> ${curiosidade}<br>
    <b>Obstáculo:</b> ${obstaculo}<br><br>
    <button class="btn btn-sm btn-warning" onclick="gerarComplicacaoAmbiental('${bioma}')">Gerar Complicação</button>
  </div></div>`;
}

function gerarComplicacaoAmbiental(bioma) {
  let tabela = (bioma === "planicie") ? complicacoesPlanicie :
             (bioma === "floresta") ? complicacoesFloresta :
             (bioma === "selva") ? complicacoesSelva :
             (bioma === "costeiro") ? complicacoesCosteiras :
             (bioma === "marinho") ? complicacoesAquaticas :
             (bioma === "colina") ? complicacoesColinas :
             (bioma === "montanha") ? complicacoesMontanha :
             (bioma === "deserto") ? complicacoesDeserto :
             (bioma === "pantano") ? complicacoesPantano :
             null;
  const c = tabela[rolar2d6Key()];

  const comp = c.comp.replace(/\[(.*?)\]/g, 
    `<button class="btn btn-sm btn-danger" onclick="gerarMonstroEncontroCenas('${bioma}')">$1</button>`);

  const box = document.getElementById('resultadoEncontro');
  box.style.display = 'block';
  box.innerHTML += `
  <div class="card mt-3"><div class="card-body">
    <h5>⚠️ Complicação</h5>
    <b>${comp}</b><br>
    <small>${c.t1} — ${c.t2}</small>
  </div></div>`;
}

function gerarNPCEncontro() {
  const rolagemNPC = rolarD20();
  let tipo;
  if (rolagemNPC <= 3) tipo = 'Moradores Desaparecidos';
  else if (rolagemNPC <= 6) tipo = 'Caravana Possuída';
  else if (rolagemNPC <= 9) tipo = 'Aventureiro Ferido';
  else if (rolagemNPC <= 12) tipo = 'Vítima de Afogamento';
  else if (rolagemNPC <= 15) tipo = 'Eremita Misterioso';
  else if (rolagemNPC <= 18) tipo = 'Aventureiro Perdido';
  else tipo = 'Briga entre Moradores';
  console.log(tipo)
  console.log(rolagemNPC)

  // Por enquanto, apenas retorna o tipo e permite continuar manualmente
  return `NPC Encontrado: <b>${tipo}</b><br><small>(Gerar detalhes clicando no botão abaixo)</small><br><button class="btn btn-sm btn-outline-secondary mt-2" onclick="detalharNPC('${tipo}')">Gerar Detalhes</button>`;
}

function detalharNPC(tipo) {
  let texto = '';
 if (tipo === 'Moradores Desaparecidos') {
  const d = rolarD6();

  const circunstancias = [
    { nome: "Encontro Amoroso", desc: "Estão escondidos por romance proibido." },
    { nome: "Perdidos", desc: "Desorientados pela névoa, floresta ou magia." },
    { nome: "Fuga", desc: "Fugiram de dívidas, crimes ou responsabilidades." },
    { nome: "Escondidos", desc: "Evitam uma ameaça ou perseguição." },
    { nome: "Feridos", desc: "Atacados e feridos por uma criatura próxima." },
    { nome: "Mortos", desc: "Restam apenas rastros ou corpos." }
  ];

  const c = circunstancias[d-1];

  texto += `
    <div>👥 <b>Moradores Desaparecidos</b></div>
    <b>Circunstância (d6 = ${d}):</b> <u>${c.nome}</u><br>
    <i>${c.desc}</i><br><br>
    <button class="btn btn-sm btn-success" onclick="concluirMoradoresDesaparecidos()">Concluir Resgate</button>
  `;
}
  else if (tipo === 'Caravana Possuída') {
    const d = rolarD6();
    texto += `<div>🛻 <b>Caravana Possuída</b></div>`;
    switch(d) {
      case 1: texto += `Caravana Real — apenas um grupo assustado. Pode gerar comércio.`; break;
      case 2: texto += `A caravana ignora o grupo, silenciosa e fria.`; break;
      case 3: texto += `A caravana atravessa os personagens! Todos sofrem <b>1d4 dano espiritual</b>.`; break;
      case 4:
        const t = rolarD6();
        const d2 = Math.random() < 0.5 ? 'Armadura Mágica Amaldiçoada' : 'Arma Mágica Amaldiçoada';
        texto += `Deixa um item amaldiçoado para trás:<br><b>🩸 ${d2}</b><br>Tipo do Tesouro (d6): ${t} → ${gerarTesouro()}`;
        break;
      case 5: texto += `A caravana oferece um aviso sombrio — <b>gancho de missão</b>.`; break;
      case 6: texto += `A caravana ataca! <b>Espíritos ou mortos-vivos</b> emergem.`; break;
    }
  }
  else if (tipo === 'Aventureiro Ferido') {
  texto += `<div>⚔️ <b>Aventureiro Ferido</b></div>`;
  texto += `<div class="mt-2">O que o grupo fará?</div>`;
  texto += `<button class="btn btn-sm btn-success mt-2" onclick="ajudarAventureiro()">Ajudar</button> `;
  texto += `<button class="btn btn-sm btn-danger mt-2" onclick="ignorarAventureiro()">Ignorar</button>`;
}
    else if (tipo === 'Vítima de Afogamento') {
    texto += `<div>🌊 <b>Vítima de Afogamento</b></div>`;
    texto += `<div class="mt-2">O grupo vê alguém lutando para não se afogar.</div>`;
    texto += `<button class="btn btn-sm btn-success mt-2" onclick="ajudarAfogamento()">Ajudar</button> `;
    texto += `<button class="btn btn-sm btn-danger mt-2" onclick="ignorarAfogamento()">Ignorar</button>`;
    }
    else if (tipo === 'Eremita Misterioso') {
  const r = rolarD6();
  const naturezas = [
    "Sábio Isolado — Guarda segredos ou magia antiga.",
    "Louco Visionário — Fala em profecias desconexas.",
    "Exilado — Fugiu de crimes ou maldições.",
    "Guardião Natural — Protege uma área sagrada.",
    "Curandeiro — Pode ajudar com doenças e ferimentos.",
    "Cultista — Pertence a uma seita perigosa disfarçado."
  ];

  texto += `<div>🧙 <b>Eremita Misterioso</b></div>`;
  texto += `<div>Natureza (d6 = ${r}): <b>${naturezas[r-1]}</b></div>`;
  texto += `<div class="mt-2">Como o grupo reage?</div>`;
  texto += `<button class="btn btn-sm btn-primary mt-2" onclick="interagirEremita(${r})">Conversar / Negociar</button> `;
  texto += `<button class="btn btn-sm btn-danger mt-2" onclick="hostilizarEremita(${r})">Ameaçar / Confrontar</button> `;
  texto += `<button class="btn btn-sm btn-secondary mt-2" onclick="ignorarEremita()">Ignorar e Seguir Caminho</button>`;
}

else if (tipo === 'Aventureiro Perdido') {
  const r = rolarD6();
  const motivo = [
    "Separado do Grupo — Companheiros mortos ou desaparecidos.",
    "Perdeu o Caminho — Mapas incorretos ou magia distorceu rotas.",
    "Amnésico — Não lembra quem é ou o que fazia.",
    "Caçado — Fugindo de um inimigo poderoso.",
    "Desafiador — Quer provar sua força em duelo amistoso.",
    "Possuído — Espírito maligno controla suas ações."
  ];

  texto += `<div> <b>Aventureiro Perdido</b></div>`;
  texto += `<div>Motivo (d6 = ${r}): <b>${motivo[r-1]}</b></div>`;
}
else if (tipo === 'Briga entre Moradores') {
  const r = rolarD4();
  const tipo = [
    "Discussão Simples — Mal-entendido que pode ser resolvido com diplomacia.",
    "Disputa Territorial — Envolve terras, gado ou fronteiras.",
    "Briga Armada — Facas ou armas leves em uso, risco de mortes.",
    "Motim — Revolta popular contra uma autoridade local."
  ];

  texto += `<div> <b>Briga entre Moradores</b></div>`;
  texto += `<div>Tipo Conflito (d4 = ${r}): <b>${tipo[r-1]}</b></div>`;
}
else {
    
texto = `Detalhamento para ${tipo} será implementado na próxima etapa.`;
  }

  const box = document.getElementById('resultadoEncontro');
  box.style.display = 'block';
  box.innerHTML += `<div class="card mt-3"><div class="card-body"><h5>Detalhes do NPC</h5>${texto}</div></div>`;
}

function gerarMonstroEstrada(bioma) {
  const roll = rolarD20();
  console.log("Rolagem gerarMontros estrada= " + roll)
  let tipo = "";
  
  if (roll <= 2) tipo = "Patrulha de Gigantes";
  else if (roll === 3) tipo = "Arremesso de Pedras";
  else if (roll <= 6) tipo = "Bandidos Insanos";
  else if (roll === 7) tipo = "Passagem de Dragão";
  else tipo = "Monstro Errante";

  if (tipo === "Monstro Errante") {
    return gerarMonstroErrante(bioma);
  }

  return `
    🐾 <b>Encontro com Monstros</b><br>
    Tipo: <b>${tipo}</b><br>
    <button class="btn btn-sm btn-outline-secondary mt-2" onclick="detalharMonstro('${tipo}', '${bioma}')">Gerar Detalhes</button>
  `;
}

function gerarMonstroEstradaCenas(bioma) {
  const roll = rolarD20();
  let tipo = "";
  
  if (roll <= 2) tipo = "Patrulha de Gigantes";
  else if (roll === 3) tipo = "Arremesso de Pedras";
  else if (roll <= 6) tipo = "Bandidos Insanos";
  else if (roll === 7) tipo = "Passagem de Dragão";
  else tipo = "Monstro Errante";

  if (tipo === "Monstro Errante") {
    return gerarMonstroErrante(bioma);
  }

  return `
    🐾 <b>Encontro com Monstros</b><br>
    Tipo: <b>${tipo}</b><br>
    <button class="btn btn-sm btn-outline-secondary mt-2" onclick="detalharMonstro('${tipo}', '${bioma}')">Gerar Detalhes</button>
  `;
}

function gerarMonstroErrante(bioma) {
  // Usa a tabela que já criamos!
  return gerarMonstroEncontro(bioma);
}

function gerarMonstroEncontro(bioma) {
    console.log("entrou aqui")
  const tabela = encontrosPorBioma[bioma];
  const linha = rolarD4() - 1;
  const dificuldade = rolarD20();

  let categoria = 0; // Fácil
  if (dificuldade > 8 && dificuldade <= 18) categoria = 1; // Médio
  else if (dificuldade > 18) categoria = 2; // Difícil

  const encontro = tabela[linha][categoria];

  return `
  👹 <b>Monstro Errante</b> (Bioma: <b>${bioma}</b>)<br>
  Rolagens → d4 = ${linha+1}, d20 = ${dificuldade}<br>
  <div class="mt-2"><b>➡ Resultado:</b> ${encontro}</div>`;
}

function gerarMonstroEncontroCenas(bioma) {
  const tabela = encontrosPorBioma[bioma];
  const linha = rolarD4() - 1;
  const dificuldade = rolarD20();
  let categoria = dificuldade > 18 ? 2 : dificuldade > 8 ? 1 : 0;
  const encontro = tabela[linha][categoria];

  const box = document.getElementById('resultadoEncontro');
  box.style.display = 'block';
  box.innerHTML += `
  <div class="card mt-3"><div class="card-body">
    👹 <b>Monstro Errante</b> (Bioma: <b>${bioma}</b>)<br>
    d4 = ${linha+1}, d20 = ${dificuldade}<br>
    ➡ <b>${encontro}</b>
  </div></div>`;
}

// --- AVENTUREIRO FERIDO ---
function ajudarAventureiro() {
  const tipo = ['Carregar — Deve ser levado até a cidade mais próxima','Curar Ferimentos — Precisa de magia ou poção','Remover Veneno — Toxina rara','Curar Doença — Praga ou maldição'];
  const r = rolarD4();
  document.getElementById('resultadoEncontro').style.display = 'block';
  document.getElementById('resultadoEncontro').innerHTML  += `<div class="card mt-2"><div class="card-body" id="af-help">💚 <b>Ajuda Necessária (d4 = ${r})</b><br>${tipo[r-1]}<br><button class='btn btn-sm btn-primary mt-2' onclick='concluirAjudaAventureiro()'>Concluir Ajuda</button></div></div>`;
}

function concluirAjudaAventureiro() {
  const resultado = ['🙏 Gratidão Sincera — sem recompensa','🎁 Recompensa — Tesouro Aleatório: ' + gerarTesouro(),'🤝 Ele ajudará o grupo na próxima batalha','🏛️ Reputação Positiva — Histórias heroicas se espalham'];
  const r = rolarD4();
  document.getElementById('af-help').innerHTML = `<b>Resultado da Ajuda (d4 = ${r})</b><br>${resultado[r-1]}`;
}

function ignorarAventureiro() {
  const cons = ['Nada acontece','Rumores negativos se espalham','Desagrada uma facção influente','Ele sobrevive e buscará vingança depois','Morre em paz — nenhum impacto imediato','Testemunhas espalham histórias de crueldade'];
  const r = rolarD6();
  const box = document.getElementById('resultadoEncontro');
  box.innerHTML += `<div class="card mt-2"><div class="card-body">💔 <b>Ignorar (d6 = ${r})</b><br>${cons[r-1]}</div></div>`;
}

function ajudarAfogamento() {
  const resultadosAjuda = [
    "🙏 Gratidão — nenhuma recompensa",
    "🎁 Recompensa — Tesouro Aleatório: " + gerarTesouro(),
    "🤝 Ele ajudará o grupo na próxima batalha",
    "🏛️ Reputação Local — moradores respeitam o grupo"
  ];
  
  const r = rolarD4();
  document.getElementById('resultadoEncontro').innerHTML += `
    <div class="card mt-2"><div class="card-body">
      💧 <b>Ajudar (d4 = ${r})</b><br>${resultadosAjuda[r-1]}
    </div></div>`;
}

function ignorarAfogamento() {
  const cons = [
    "Nada acontece — ninguém viu.",
    "Rumores — aldeões falam da crueldade do grupo.",
    "Vingança — a vítima sobrevive e caçará o grupo futuramente.",
    "Espírito Vingativo — começará a assombrar o grupo em sonhos.",
    "Punição Divina — deidade das águas impõe uma maldição.",
    "O afogado morre e sua alma se une a espíritos que atacarão o grupo futuramente."
  ];

  const r = rolarD6();
  document.getElementById('resultadoEncontro').innerHTML += `
    <div class="card mt-2"><div class="card-body">
      💀 <b>Ignorar (d6 = ${r})</b><br>${cons[r-1]}
    </div></div>`;
}

function interagirEremita(tipo) {
  const resultados = [
    "💬 Ele compartilha uma história antiga — o grupo ganha um <b>gancho de missão</b>.",
    "📜 Ele revela parte de uma profecia — o grupo recebe <b>informação útil</b>.",
    "🪬 Ele oferece proteção espiritual — grupo tem <b>vantagem na próxima rolagem de resistência</b>.",
    "🌿 Ele cura ferimentos leves — cada herói recupera <b>1d6 PV</b>.",
    "💊 Ele cura doença / veneno, se presente.",
    "👁️ Ele observa o grupo em silêncio… algo está errado (⚠️ pode ser cultista — consequência futura)."
  ];

  document.getElementById('resultadoEncontro').innerHTML += `
    <div class="card mt-2"><div class="card-body">
      🤝 <b>Conversar com o Eremita</b><br>${resultados[tipo-1]}
    </div></div>`;
}

function hostilizarEremita(tipo) {
  const reacoes = [
    "Ele foge rapidamente e desaparece na mata.",
    "Ele grita bênçãos confusas — nenhum efeito.",
    "Ele amaldiçoa o grupo — <b>desvantagem na próxima viagem</b>.",
    "Animais da floresta defendem o eremita — <b>encontro imediato</b>.",
    "Ele convoca espíritos curadores para lutar.",
    "Ele revela-se um cultista — <b>combate começa</b>."
  ];

  const r = rolarD6();
  document.getElementById('resultadoEncontro').innerHTML += `
    <div class="card mt-2"><div class="card-body">
      ⚔️ <b>Confronto com o Eremita (d6 = ${r})</b><br>${reacoes[r-1]}
    </div></div>`;
}

function ignorarEremita() {
  document.getElementById('resultadoEncontro').innerHTML += `
    <div class="card mt-2"><div class="card-body">
      🚶 O grupo segue viagem sem mais eventos.
    </div></div>`;
}

function detalharMonstro(tipo, bioma) {
  let texto = "";

  if (tipo === "Patrulha de Gigantes") {
    const r = rolarD20();
    const comportamento = [
      "Ignoram totalmente o grupo",
      "Arremessam pedras por diversão",
      "Arremessam pedras por diversão",
      "Arremessam pedras por diversão",
      "Arremessam pedras por diversão",
      "Arremessam pedras por diversão",
      "Arremessam pedras por diversão",
      "Arremessam pedras por diversão",
      "Arremessam pedras por diversão",
      "Fazem perguntas",
      "Fazem perguntas",
      "Lutam corpo a corpo",
      "Lutam corpo a corpo",
      "Lutam corpo a corpo",
      "Atacam à distância",
      "Atacam à distância",
      "Atacam à distância",
      "Ajudam o grupo",
      "Rerrole com vantagem",
      "Rerrole com vantagem"
    ];
    texto = `🗻 <b>Patrulha de Gigantes</b><br>Comportamento (d20 = ${r}): <b>${comportamento[r-1]}</b>`;
  }

  else if (tipo === "Arremesso de Pedras") {
    const r = rolarD20();
    const efeitos = [
      "Escoriações leves (sem dano)",
      "Perde equilíbrio — próxima rolagem com desvantagem",
      "1d4 dano","1d4 dano","1d4 dano","1d4 dano","1d4 dano","1d4 dano",
      "1d4 dano","1d4 dano","1d4 dano","1d4 dano","1d4 dano","1d4 dano","1d4 dano",
      "1d6 dano","1d6 dano","1d6 dano","1d6 dano + fica Lento"
    ];
    texto = `🪨 <b>Arremesso de Pedras</b><br>Efeito (d20 = ${r}): <b>${efeitos[r-1]}</b>`;
  }

  else if (tipo === "Bandidos Insanos") {
    const r = rolarD20();
    const ações = [
      "Questionam os heróis",
      "Atacam normalmente","Atacam normalmente","Atacam normalmente","Atacam normalmente",
      "Atacam normalmente","Atacam normalmente","Atacam normalmente","Atacam normalmente",
      "Atacam desorganizados (desvantagem)",
      "Atacam desorganizados (desvantagem)",
      "Atacam com fúria (dano dobrado)",
      "Atacam com fúria (dano dobrado)",
      "Atacam com fúria (dano dobrado)",
      "Ficam distraídos (heróis têm vantagem)",
      "Ficam distraídos (heróis têm vantagem)",
      "Ficam distraídos (heróis têm vantagem)",
      "Fogem",
      "Rerrole com vantagem",
      "Rerrole com vantagem"
    ];
    texto = `🏴‍☠️ <b>Bandidos Insanos</b><br>Comportamento (d20 = ${r}): <b>${ações[r-1]}</b>`;
  }

  else if (tipo === "Passagem de Dragão") {
    const rA = rolarD6();
    const rT = rolarD6();
    const ações = ["Ignora o grupo","Usa arma de sopro casualmente","Pousa e faz perguntas","Pousa e ataca","Ataca do ar","Ajuda o grupo"];
    const dragões = ["Branco","Dourado","Negro","Prateado","Verde","Vermelho"];
    texto = `🐉 <b>Passagem de Dragão</b><br>Ação (d20 = ${rA}): <b>${ações[rA -1]}</b><br>Tipo de Dragão (d20 = ${rT}): <b>${dragões[rT -1]}</b>`;
  }

  document.getElementById('resultadoEncontro').innerHTML += `
    <div class="card mt-3"><div class="card-body"><h5>Detalhes do Encontro</h5>${texto}</div></div>`;
}

function mostrarMonstrosComImagem(texto) {
  const partes = texto.toLowerCase().split(" e ");
  let html = "";

  partes.forEach((parte) => {
    const match = parte.match(/(\d+)\s+(.*)/);
    if (!match) return;

    const quantidade = parseInt(match[1], 10);
    const nome = match[2].trim();

    const imgSrc = imagensMonstros[nome]; // pega o PNG no objeto
    if (!imgSrc) {
      html += `<div class="alert alert-warning">⚠️ Imagem não encontrada para: ${nome}</div>`;
      return;
    }

    // Nome bonitinho
    const nomeFormatado = nome
      .split(" ")
      .map(p => p.charAt(0).toUpperCase() + p.slice(1))
      .join(" ");

    html += `
      <div class="card my-3">
        <div class="card-body text-center">
          <h4 class="mb-2">${nomeFormatado} <span class="text-muted">(x${quantidade})</span></h4>
          <img src="${imgSrc}" style="width:100%;max-width:900px;height:auto;display:block;margin:auto;">
        </div>
      </div>
    `;
  });

  return html;
}

function gerarEncontroEspecial() {
  const bioma = document.getElementById('biomaSelect').value;
  const r = rolarD20();

  let tipo = "";
  let texto = "";

  if (r <= 3) tipo = "monstruoso";
  else if (r <= 5) tipo = "geografico";
  else if (r === 6) tipo = "magico";
  else if (r <= 9) tipo = "npc";
  else tipo = "aventura";

  // --- Tipo Mágico (não depende de bioma) ---
  if (tipo === "magico") {
    const pi = piMagico[rolarD12() - 1];
    texto = `
      <h4>✨ Encontro Especial — Ponto Mágico</h4>
      <strong>Descrição:</strong> ${pi.descricao}<br>
      <strong>Combate:</strong> ${pi.combate}<br>
      <strong>Paz:</strong> ${pi.paz}<br>
      <strong>Ganchos:</strong> ${pi.ganchos}<br>
      <strong>Variações:</strong> ${pi.variacoes}
    `;
  }
  
  // --- Aventuras Aleatórias ---
  else if (tipo === "aventura") {
    const nomes = [
      "A Floresta sobre as Ruínas", "A Mansão do Lorde Fantasma", "A Montanha do Grifo",
      "A Masmorra Secreta dos Goblins", "A Caverna das Sete Cabeças", "O Vale dos Unicórnios",
      "O Pico da Sabedoria", "Os Charcos do Medo", "A Floresta do Mapinguari",
      "O Jardim Oculto", "A Maldição Guará", "O Calabouço Mortal",
      "A Orbe Dracônica", "A Coroa de Cristal", "O Deserto dos Abutres",
      "A Biblioteca Secreta", "O Templo Submerso", "A Masmorra Diabólica"
    ];

    const nome = nomes[Math.floor(Math.random()*18)];
    texto = `<h4>🗺️ Aventura Especial</h4><strong>${nome}</strong><br><small>(Detalhamento ficará para a próxima etapa)</small>`;
  }

  // --- Tipos Monstruoso / Geográfico / NPC ---
  else {

    const tabela = tabelasPI[bioma]?.[tipo];

    if (!tabela) {
      texto = `<i>Não há tabela disponível para ${tipo} em ${bioma}.</i>`;
    } else {
      const pi = tabela[rolarD12() - 1];
      texto = `
        <h4>🌟 Encontro Especial (${bioma} • ${tipo})</h4>
        <strong>Descrição:</strong> ${pi.descricao}<br>
        <strong>Combate:</strong> ${pi.combate}<br>
        <strong>Paz:</strong> ${pi.paz}<br>
        <strong>Ganchos:</strong> ${pi.ganchos}<br>
        <strong>Variações:</strong> ${pi.variacoes}
      `;
    }
  }

  document.getElementById("resultadoEncontro").style.display = "block";
  document.getElementById("resultadoEncontro").innerHTML = `
    <div class="card mt-3"><div class="card-body">${texto}</div></div>`;
}

function concluirMoradoresDesaparecidos() {
  const r = rolarD4();

  const recompensas = [
    { nome: "Apenas Gratidão", desc: "Nenhuma recompensa material." },
    { nome: "Recompensa", desc: "Tesouro Aleatório: " + gerarTesouro() },
    { nome: "Informação", desc: "Informação útil sobre a região, perigo ou segredo." },
    { nome: "Reputação", desc: "A vila comenta a boa ação; relações melhoram." }
  ];

  const recompensa = recompensas[r-1];

  document.getElementById('resultadoEncontro').innerHTML += `
    <div class="card mt-3"><div class="card-body">
      🎁 <b>Recompensa (d4 = ${r}):</b> <u>${recompensa.nome}</u><br>
      ${recompensa.desc}
    </div></div>
  `;
}