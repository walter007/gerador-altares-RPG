    let terrenos = {};
    const hexW = 528;
    const hexH = 459;

    // # de colunas/linhas
    const cols = 25;
    const rows = 25;
    const escalaGlobal = 0.35;

    //const startQ = Math.floor(cols / 2);
    //const startR = Math.floor(rows / 2);
    //let posAtual = { q: startQ, r: startR };
    let posAtual = null;


    let maxPM = 999;     // PM total do personagem por dia
    let pm = maxPM; 

    const mapa = document.getElementById("mapa");

    function getTerrenoVizinho(q, r) {
      const dirs = neighborDeltas(q);
      for (const [dq, dr] of dirs) {
        const k = key(q + dq, r + dr);
        if (terrenos[k]) return terrenos[k].terreno;
      }
      return "Planície";
    }

    function moverParaOld(q, r) {
      posAtual = { q, r };
      marcarPosicaoAtual();
    }

    function moverPara(q, r) {
        if (!posAtual) return; // segurança

        const qAtual = posAtual.q;
        const rAtual = posAtual.r;

        // 1) impedir mover para qualquer lugar que não seja um hex vizinho
        if (!ehVizinho(qAtual, rAtual, q, r)) {
            console.log("Movimento inválido: só é possível andar 1 hex por vez.");
            return;
        }

        const k = key(q, r);
        const info = terrenos[k];
        if (!info) return;

        // 2) custo correto do terreno de destino
        const custo = custoMovimento[info.terreno] ?? 1;

        // 3) verificar PM
        if (pm < custo) {
            console.log("Sem PM suficiente.");
            return;
        }

        // 4) consumir PM
        pm -= custo;
        updateHUD();

        // 5) atualizar posição
        posAtual = { q, r };
        marcarPosicaoAtual();

        // 🔥 salva posição na campanha
        if (campanhaAtual && campanhas[campanhaAtual]) {
            campanhas[campanhaAtual].mapa.jogador = { q, r };
            salvarCampanhas();
        }
    }
    
    
    function moverParaOld(q, r) {
        const k = key(q, r);
        const info = terrenos[k];
        if (!info) return;

        // custo do terreno-alvo
        const custo = custoMovimento[info.terreno] ?? 1;

        // verifica se pode mover
        if (pm < custo) {
            console.log("Sem PM suficiente.");
            return;
        }

        // consome PM
        pm -= custo;
        updateHUD()

        // faz o movimento normalmente
        posAtual = { q, r };
        marcarPosicaoAtual();
    }

    function marcarPosicaoAtual() {
      document.querySelectorAll(".hex").forEach(h => h.classList.remove("selecionado"));
      const atual = document.querySelector(`.hex[data-q="${posAtual.q}"][data-r="${posAtual.r}"]`);
      if (atual) atual.classList.add("selecionado");
      centralizarCamera(atual);
      positionToken()
      atualizarBotaoCidadeAtual();
      atualizarBotaoPOIAtual();
      atualizarBotaoDungeonAtual();
      atualizarBotaoAventura();
    }

    function centralizarCamera(elemento) {
      const viewport = document.getElementById("viewport");
      const rect = elemento.getBoundingClientRect();
      const vrect = viewport.getBoundingClientRect();

      viewport.scrollTo({
        left: viewport.scrollLeft + rect.left - vrect.left - vrect.width / 2 + rect.width / 2,
        top: viewport.scrollTop + rect.top - vrect.top - vrect.height / 2 + rect.height / 2,
        behavior: "smooth"
      });
    }

    function positionToken() {
      const hex = document.querySelector(`.hex[data-q="${posAtual.q}"][data-r="${posAtual.r}"]`);
      if (!hex) return;

      const x = hex.offsetLeft + hex.offsetWidth / 2;
      const y = hex.offsetTop + hex.offsetHeight / 2;

      token.style.left = (x * escalaGlobal - token.offsetWidth / 2) + "px";
      token.style.top = (y * escalaGlobal - token.offsetHeight / 2) + "px";
    }

    window.addEventListener('keydown', (e) => {
    if (document.activeElement.tagName === 'INPUT') return;

    // bloqueia se acabou PM
    if (pm <= 0) {
        console.log("Você está exausto.");
        return;
    }

    const d = neighborDeltas(posAtual.q);
    switch (e.key) {
        case 'ArrowRight': case 'd': moverPara(posAtual.q + d[0][0], posAtual.r + d[0][1]); break;
        case 'ArrowUp': case 'w': moverPara(posAtual.q + d[1][0], posAtual.r + d[1][1]); break;
        case 'ArrowLeft': case 'a': moverPara(posAtual.q + d[3][0], posAtual.r + d[3][1]); break;
        case 'ArrowDown': case 's': moverPara(posAtual.q + d[4][0], posAtual.r + d[4][1]); break;
        case 'q': moverPara(posAtual.q + d[2][0], posAtual.r + d[2][1]); break;
        case 'e': moverPara(posAtual.q + d[5][0], posAtual.r + d[5][1]); break;
    }
});

    function neighborDeltas(q) {
      if ((q % 2) === 1) return [[1, -1], [0, -1], [-1, -1], [-1, 0], [0, 1], [1, 0]];
      return [[1, 0], [0, -1], [-1, 0], [-1, 1], [0, 1], [1, 1]];
    }

    function parseInterval(intervalo) {
  if (!intervalo) return null;
  if (intervalo.includes("-")) {
    const [min, max] = intervalo.split("-").map(Number);
    return [min, max];
  }
  const value = Number(intervalo);
  return [value, value];
}

// Converte toda a tabela em forma utilizável (intervalos numéricos)
const tabelaTerrenos = geracaoTerrenos.map(grupo => {
  return {
    terrenoPredominante: grupo.terrenoPredominante,
    chanceTerreno: grupo.chanceTerreno
      .filter(item => item.intervalo !== null)
      .map(item => ({
        nome: item.nome,
        intervalo: parseInterval(item.intervalo)
      }))
  };
});

// Busca o grupo correspondente ao terreno predominante
function getGrupoTerreno(terrenoPredominante) {
  return tabelaTerrenos.find(g => g.terrenoPredominante === terrenoPredominante);
}

// Função para rolar d20
function rolarD20() {
  return Math.floor(Math.random() * 20) + 1;
}

// Função principal: gera o terreno com base no predominante
function gerarTerreno(terrenoPredominante) {
  const grupo = getGrupoTerreno(terrenoPredominante);

  // Caso não encontrar grupo, assume Planície
  if (!grupo) return "Planície";

  const roll = rolarD20();

  for (const item of grupo.chanceTerreno) {
    const [min, max] = item.intervalo;
    if (roll >= min && roll <= max) {
      return item.nome;
    }
  }

  // Se não achou (falha na tabela), retorna o terreno predominante
  return terrenoPredominante;
}

// =============================
//  EXEMPLO DE USO NO HEX ENGINE
// =============================

// Ao gerar um novo hex baseado em um vizinho:
function gerarHex(q, r, s, vizinho) {
  const terrenoBase = vizinho?.terreno || "Planície";
  const novoTerreno = gerarTerreno(terrenoBase);
}

const tabelaChancePOI = chancePontoInteresse.map(t => {
  return {
    terreno: t.terreno,
    intervalo: parseInterval(t.chance.B) // sempre usando a coluna A
  };
});

const tabelaTipoPOI = chanceTipoPontoInteresse.map(t => {
  return {
    terreno: t.terreno,
    tipos: t.tipoPI.map(tp => ({
      nome: tp.nome,
      intervalo: parseInterval(tp.chance)
    }))
  };
});

function gerarPontoInteresseMapa(terreno) {
  const entrada = tabelaChancePOI.find(t => t.terreno === terreno);
  if (!entrada) return null;

  const [min, max] = entrada.intervalo;
  const roll = rolarD20();
  //console.log("Rolagem POI=" + roll)
  //console.log("Tipo Terreno=" + terreno)
  //console.log("min" + min)
  //console.log("min" + max)
  

  return (roll >= min && roll <= max);
}

function sortearTipoPontoInteresse(terreno) {
  const entrada = tabelaTipoPOI.find(t => t.terreno === terreno);
  if (!entrada) return null;

  const roll = rolarD20();

  for (const tipo of entrada.tipos) {
    const [min, max] = tipo.intervalo;
    if (roll >= min && roll <= max) return tipo.nome;
  }

  return null;
}

function adicionarIconePOI(divHex, tipoPOI) {
  const icone = document.createElement("img");
  icone.src = `assets/icons/${tipoPOI}.png`; // coloque seu PNG na pasta icons/
  icone.className = "poiIcone";

  icone.style.position = "absolute";
  icone.style.width = "250px";
  icone.style.height = "250px";
  icone.style.left = "50%";
  icone.style.top = "50%";
  icone.style.transform = "translate(-50%, -50%)";
  icone.style.pointerEvents = "none";
  icone.style.zIndex = 15;

  divHex.appendChild(icone);
}

function atualizarUI() {
  document.getElementById("pmAtual").textContent = pm;
}

function custoDoHex(q, r) {
  const info = terrenos[key(q, r)];
  if (!info) return 999; // segurança
  return custoMovimento[info.terreno] ?? 1;
}

function descansar() {
  let biomaC
  const h = terrenos[key(posAtual.q, posAtual.r)];
  pm = maxPM;
  updateHUD();
  console.log("Você descansou e recuperou todos os PM.");
  console.log(h.terreno);
  document.getElementById("encontroBiomaDisplay").innerHTML = h.terreno;

    if(h.terreno === "Planície") biomaC = "planicie"
    if(h.terreno === "Pântano") biomaC = "pantano"
    if(h.terreno === "Aquático") biomaC = "marinho"
    if(h.terreno === "Montanha") biomaC = "montanha"
    if(h.terreno === "Deserto") biomaC = "deserto"
    if(h.terreno === "Colina") biomaC = "colina"
    if(h.terreno === "Selva") biomaC = "selva"
    if(h.terreno === "Floresta") biomaC = "floresta"

  document.getElementById("listaInimigosAtivosUI").innerHTML = "";

  if(h.poi === "Cidade"){
    descansoSeguroMapa();
  }else{
    gerarEncontro(biomaC);
  }
}

function attachTerrainTooltip(hexElement, terrenoData) {
    hexElement.addEventListener("mousemove", (e) => {
        const tooltip = document.getElementById("terrainTooltip");
        
        tooltip.innerHTML = `
            <b>${terrenoData.nome}</b><br>
            Custo: ${terrenoData.custoPM} PM
        `;

        tooltip.style.left = (e.clientX + 15) + "px";
        tooltip.style.top = (e.clientY + 15) + "px";
        tooltip.style.display = "block";
    });

    hexElement.addEventListener("mouseleave", () => {
        const tooltip = document.getElementById("terrainTooltip");
        tooltip.style.display = "none";
    });
}

function updateHUD() {
    const percent = (pm / maxPM) * 100;

    document.getElementById("pmBar").style.width = percent + "%";
    document.getElementById("pmText").innerText =
        `PM: ${pm} / ${maxPM}`;

    // muda cor se estiver baixo
    if (percent <= 25) {
        pmBar.style.background = "red";
    } else if (percent <= 50) {
        pmBar.style.background = "orange";
    } else {
        pmBar.style.background = "limegreen";
    }
}

function adicionarIconeCidade(divHex) {
    const icone = document.createElement("img");
    icone.src = "assets/icons/Cidade.png";  // coloque Cidade.png na pasta icons/
    icone.className = "poiIcone";

    icone.style.position = "absolute";
    icone.style.width = "250px";
    icone.style.height = "250px";
    icone.style.left = "50%";
    icone.style.top = "50%";
    icone.style.transform = "translate(-50%, -50%)";
    icone.style.pointerEvents = "none";
    icone.style.zIndex = 15;

    divHex.appendChild(icone);
}

const EH_VIZINHO_DEBUG = true;

function offsetToCube(q, r) {
  // assumimos layout ODD-Q (colunas ímpares deslocadas para baixo)
  // fórmula: x = q; z = r - floor((q - (q&1)) / 2); y = -x - z
  const x = q;
  const z = r - Math.floor((q - (q & 1)) / 2);
  const y = -x - z;
  return { x, y, z };
}

function cubeDistance(a, b) {
  return (Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z)) / 2;
}

function ehVizinho(q1, r1, q2, r2) {
  // segurança: tipos numéricos
  q1 = Number(q1); r1 = Number(r1); q2 = Number(q2); r2 = Number(r2);

  const a = offsetToCube(q1, r1);
  const b = offsetToCube(q2, r2);
  const dist = cubeDistance(a, b);

  const ok = dist === 1;

  if (!ok && EH_VIZINHO_DEBUG) {
    // info útil para você copiar pro chat
    console.group(`ehVizinho DEBUG: (${q1},${r1}) -> (${q2},${r2}) => dist=${dist}`);
    console.log("offsetToCube a:", a);
    console.log("offsetToCube b:", b);
    console.log("dist (hex):", dist);
    console.log("neighborDeltas(q1) returned:", neighborDeltas(q1));
    // também mostro os vizinhos calculados a partir de neighborDeltas para comparação
    const deltas = neighborDeltas(q1);
    const vizinhosCoord = deltas.map(([dq, dr]) => ({ q: q1 + dq, r: r1 + dr }));
    console.log("vizinhos segundo neighborDeltas(q1):", vizinhosCoord);
    console.groupEnd();
  }

  return ok;
}



function key(q, r) { return `${q},${r}`; }

function gerarNovoMapaParaCampanhaOld(){
for (let r = 0; r < rows; r++) {
      for (let q = 0; q < cols; q++) {

        let terrenoBase = getTerrenoVizinho(q, r);
        let terrenoFinal = gerarTerreno(terrenoBase);

        const k = key(q, r);
        terrenos[k] = { terreno: terrenoFinal, poi: null };

        const div = document.createElement("div");
        div.className = "hex";

        div.style.setProperty("--w", hexW + "px");
        div.style.setProperty("--h", hexH + "px");

        div.style.backgroundImage = `url('assets/terrenos/${terrenoFinal}.png')`;

        const x = q * (hexW * 0.75);
        const y = (r * hexH) + ((q % 2) * (hexH * 0.5));

        div.style.left = `${x}px`;
        div.style.top = `${y}px`;

        div.dataset.q = q;
        div.dataset.r = r;

          const custoPM = custoMovimento[terrenoFinal] ?? 1;

        // tooltip
        attachTerrainTooltip(div, {
            nome: terrenoFinal,
            custoPM: custoPM
        });

        //div.onclick = () => moverPara(q, r);

        div.onclick = () => {
            moverPara(q, r);

            const k = key(q,r);
            const hex = terrenos[k];

            if (hex.poi === "Cidade" && hex.dadosPOI && hex.dadosPOI.cidade) {
                mostrarDetalhesCidade(hex.dadosPOI.cidade);
            }
        };

        if (gerarPontoInteresseMapa(terrenoFinal)) {
            const tipo = sortearTipoPontoInteresse(terrenoFinal);
            if (tipo) {
                terrenos[k].poi = tipo;
                adicionarIconePOI(div, tipo);
            }
        }       

        mapa.appendChild(div);
      }
    }

    let startQ = 0;
    let startR = 0;
    let encontrou = false;

    for (let r = 0; r < rows && !encontrou; r++) {
        for (let q = 0; q < cols && !encontrou; q++) {
            const info = terrenos[key(q, r)];
            if (info.terreno === "Planície") {
                startQ = q;
                startR = r;
                encontrou = true;
            }
        }
    }

    posAtual = { q: startQ, r: startR };

    // Marcar POI da Cidade no hex inicial
    terrenos[key(startQ, startR)].poi = "Cidade";
    const hexInicial = document.querySelector(`.hex[data-q="${startQ}"][data-r="${startR}"]`);
    adicionarIconeCidade(hexInicial);

    marcarPosicaoAtual();
    updateHUD()
}

function gerarNovoMapaParaCampanha() {
    const mapaData = campanhas[campanhaAtual].mapa;

    if (!mapaData) return;

    reconstruirMapaVisual(mapaData);
}

function reconstruirMapaVisual(mapaData) {
  // usa suas variáveis globais (hexW, hexH, mapa(dom), escalaGlobal, etc)
  mapa.innerHTML = ''; // limpa DOM
  // fallback para cols/rows
  const _cols = mapaData.cols ?? cols;
  const _rows = mapaData.rows ?? rows;

  // limpa/reescreve o objeto 'terrenos' usado pelo resto do engine
  terrenos = {};

  for (let r = 0; r < _rows; r++) {
    for (let q = 0; q < _cols; q++) {
      const k = `${q},${r}`;
      const hexData = mapaData.hexes && mapaData.hexes[k];

      const terreno = hexData ? hexData.terreno : "Planície";
      const custoPM = hexData && hexData.custoPM ? hexData.custoPM : (custoMovimento[terreno] ?? 1);

      // mantém a estrutura interna 'terrenos'
      terrenos[k] = {
        terreno,
        poi: hexData ? hexData.poi : null,
        dadosPOI: hexData ? hexData.dadosPOI : null,
        custoPM
      };

      // cria o elemento visual (mantém seu estilo atual)
      const div = document.createElement("div");
      div.className = "hex";
      div.style.setProperty("--w", hexW + "px");
      div.style.setProperty("--h", hexH + "px");
      div.style.backgroundImage = `url('assets/terrenos/${terreno}.png')`;

      const x = q * (hexW * 0.75);
      const y = (r * hexH) + ((q % 2) * (hexH * 0.5));
      div.style.left = `${x}px`;
      div.style.top = `${y}px`;

      div.dataset.q = q;
      div.dataset.r = r;

      // tooltip
      attachTerrainTooltip(div, { nome: terreno, custoPM });

      // clique
      //div.onclick = () => moverPara(q, r);

      div.onclick = () => {
        moverPara(q, r);

        const k = key(q,r);
        const hex = terrenos[k];

        if (hex.poi === "Cidade" && hex.dadosPOI && hex.dadosPOI.cidade) {
            mostrarDetalhesCidade(hex.dadosPOI.cidade);
        }
    };

      // se já tem POI, desenha ícone
      if (terrenos[k].poi) {
        adicionarIconePOI(div, terrenos[k].poi);
      }

      const marker = document.createElement("div");
      marker.className = "missao-marker";
      marker.innerHTML = `❗<span class="count" style="display:none">0</span>`;
      div.appendChild(marker);

      // se já existe missões no dados do hex (persistidos), atualiza o marcador
      if (terrenos[k].missoes && terrenos[k].missoes.length > 0) {
        marker.style.display = "block";
        const cnt = marker.querySelector('.count');
        cnt.style.display = "inline-block";
        cnt.innerText = terrenos[k].missoes.length;
      }

      mapa.appendChild(div);
    }
  }

  // posiciona jogador se tiver
  if (mapaData.jogador) {
    posAtual = { q: mapaData.jogador.q, r: mapaData.jogador.r };
  } else {
    // fallback: procura primeira planície
    for (let r = 0; r < _rows && !posAtual; r++) {
      for (let q = 0; q < _cols; q++) {
        if (terrenos[`${q},${r}`] && terrenos[`${q},${r}`].terreno === "Planície") {
          posAtual = { q, r };
          break;
        }
      }
    }
    if (!posAtual) posAtual = { q: Math.floor(_cols/2), r: Math.floor(_rows/2) };
  }

  marcarPosicaoAtual();
  updateHUD && updateHUD();
  atualizarMarcadoresMissoes();
}

function gerarMapaDados() {
    const hexes = {};

    let startQ = 0;
    let startR = 0;
    let encontrouStart = false;

    for (let r = 0; r < rows; r++) {
        for (let q = 0; q < cols; q++) {

            const terrenoBase = getTerrenoVizinho(q, r);
            const terrenoFinal = gerarTerreno(terrenoBase);
            const custoPM = custoMovimento[terrenoFinal] ?? 1;

            const k = key(q, r);

            let poi = null;
            let dadosPOI = null;

            // gera POI
            /*if (gerarPontoInteresseMapa(terrenoFinal)) {
                const tipo = sortearTipoPontoInteresse(terrenoFinal);
                if (tipo) {
                    poi = tipo;
                }
            }*/

            if (gerarPontoInteresseMapa(terrenoFinal)) {
                const tipo = sortearTipoPontoInteresse(terrenoFinal);
                if (tipo) {

                    // BLOQUEIO ANTI-CIDADE
                    if (tipo === "Cidade" && cidadeAdjacente(q, r)) {
                        // NÃO GERA NADA, só ignora esse POI
                        console.log("Cidade bloqueada por estar adjacente a outra.");
                    } else {
                        poi = tipo
                    }
                }
            }

            // primeira planície vira cidade inicial (ponto de spawn)
            if (!encontrouStart && terrenoFinal === "Planície") {
                startQ = q;
                startR = r;
                encontrouStart = true;
                poi = "Cidade";
            }

            console.log("POI na hora de montar o mapa= " + poi)
            if (poi === "Cidade") {
                dadosPOI = {
                    tipo: "Cidade",
                    cidade: gerarCidadeSilenciosa()
                };
            }
            if (poi === "Monstruoso") {
                const pi = gerarPISilencioso("monstruoso", terrenoFinal.toLowerCase());
                if (pi) dadosPOI = { tipo: "monstruoso", pi };
            }

            if (poi === "NPC") {
                const pi = gerarPISilencioso("npc", terrenoFinal.toLowerCase());
                if (pi) dadosPOI = { tipo: "npc", pi };
            }

            if (poi === "Divino") {
                const pi = gerarPISilencioso("divino", terrenoFinal.toLowerCase());
                if (pi) dadosPOI = { tipo: "divino", pi };
            }

            if (poi === "Mágico") {
                const pi = gerarPISilencioso("magico", terrenoFinal.toLowerCase());
                if (pi) dadosPOI = { tipo: "magico", pi };
            }

            if (poi === "Militar") {
                const pi = gerarPISilencioso("militar", terrenoFinal.toLowerCase());
                if (pi) dadosPOI = { tipo: "militar", pi };
            }

            if (poi === "Geográfico") {
                const pi = gerarPISilencioso("geografico", terrenoFinal.toLowerCase());
                if (pi) dadosPOI = { tipo: "geografico", pi };
            }

            
            if (poi === "Dungeon") {
                const pi = gerarDungeonAutomatica();
                if (pi) dadosPOI = { tipo: "dungeon", pi };
            }

            if (poi === "Aventura") {
                const pi =  GerarAventura(terrenoFinal);
                if (pi) dadosPOI = { tipo: "aventura", pi };
            }

            hexes[k] = {
                terreno: terrenoFinal,
                poi,
                dadosPOI,
                custoPM,
                missoes: []
            };
        }
    }

    return {
        cols,
        rows,
        hexes,
        jogador: { q: startQ, r: startR }
    };
}

function abrirMapa() {

    const mapaData = campanhas[campanhaAtual].mapa;

    if (!mapaData) {
        // segurança: se faltar, gera agora
        campanhas[campanhaAtual].mapa = gerarMapaDados();
        salvarCampanhas();
    }

    reconstruirMapaVisual(campanhas[campanhaAtual].mapa);
}

function regenerarMapa() {
    if (!confirm("Tem certeza? Isso apagará o mapa atual e gerará um novo.")) {
        return;
    }

    if (!campanhaAtual || !campanhas[campanhaAtual]) {
        alert("Nenhuma campanha carregada.");
        return;
    }

    limparCidades();
    limparPI();

    // 1. gera novos dados lógicos do mapa
    const novoMapa = gerarMapaDados();

    // 2. salva dentro da campanha
    campanhas[campanhaAtual].mapa = novoMapa;

    // 3. salva no Firebase/Local
    salvarCampanhas();

    // 4. reconstrói visual
    reconstruirMapaVisual(novoMapa);

    alert("Mapa regenerado com sucesso!");
}

function cidadeAdjacente(q, r) {
    const viz = neighborDeltas(q);

    for (const [dq, dr] of viz) {
        const q2 = q + dq;
        const r2 = r + dr;

        const k2 = key(q2, r2);
        if (terrenos[k2] && terrenos[k2].poi === "Cidade") {
            return true; // achou cidade vizinha
        }
    }

    return false; // tudo livre
}


function obterDadosCidadeDoHex(q, r) {
  const info = terrenos[key(q, r)];
  if (!info) return null;

  const dados = info.dadosPOI || null;

  // ---- 1. Estrutura que você realmente usa ----
  // dadosPOI: { tipo: "Cidade", cidade: {...} }
  if (dados && dados.tipo === "Cidade" && typeof dados.cidade === "object") {
    return { cidadeObj: dados.cidade, cidadeIndex: null };
  }

  // ---- 2. Se um dia você usar índice (compatibilidade futura) ----
  if (dados && Number.isInteger(dados.cidadeIndex)) {
    const idx = dados.cidadeIndex;
    const cidade = campanhas[campanhaAtual].cidades[idx];
    if (cidade) return { cidadeObj: cidade, cidadeIndex: idx };
  }

  return null;
}

// abre modal preenchendo os dados
function abrirModalCidadePorHex(q, r) {
  const lookup = obterDadosCidadeDoHex(q, r);
  if (!lookup || !lookup.cidadeObj) {
    alert("Dados da cidade não encontrados (dadosPOI ausente).");
    return;
  }
  const cidade = lookup.cidadeObj;
  const cidadeIndex = lookup.cidadeIndex;

  // campos
  document.getElementById("cidadeNome").innerText = cidade.nome || "Cidade sem nome";
  document.getElementById("cidadeTipo").innerText = cidade.tipo || "—";
  document.getElementById("cidadeApelidoInput").value = cidade.apelido || "";
  document.getElementById("cidadeResumo").innerText = cidade.resumo || (cidade.tipo ? `Cidade do tipo ${cidade.tipo}` : "");

  // lista estabelecimentos
  const cont = document.getElementById("listaEstabelecimentos");
  cont.innerHTML = "";
  (cidade.estabelecimentos || []).forEach(est => {
    const card = document.createElement("div");
    card.className = "estab-card";

    // tenta carregar icone por nome (normaliza)
    const iconPath = `assets/icons/${est}.png`;
    const img = document.createElement("img");
    img.src = iconPath;
    img.onerror = () => { img.src = "assets/icons/Assentamento.png"; }; // fallback
    const txt = document.createElement("div");
    txt.innerHTML = `<div class="estab-name">${est}</div><div class="estab-sub">Estabelecimento</div>`;

    card.appendChild(img);
    card.appendChild(txt);
    cont.appendChild(card);
  });

  // salvar apelido handler
  const btnSalvar = document.getElementById("salvarApelidoCidade");
  btnSalvar.onclick = () => {
    const novo = document.getElementById("cidadeApelidoInput").value.trim().toUpperCase();
    if (!novo) return alert("Apelido inválido.");
    if (cidadeIndex !== null && cidadeIndex !== undefined) {
      // usa a função já existente que salva e atualiza listas
      editarApelidoCidade(cidadeIndex, novo);
      alert("Apelido salvo.");
      // atualiza campo local
      document.getElementById("cidadeApelidoInput").value = novo;
    } else {
      // se cidade não estiver no array (dados inline), salva o apelido no objeto e tenta persistir no mapa/campanha
      cidade.apelido = novo;
      // tenta salvar no array de cidades da campanha (sempre criará uma entrada nova)
      campanhas[campanhaAtual].cidades.push(cidade);
      salvarCampanhas();
      alert("Cidade adicionada à campanha e apelido salvo.");
    }
    atualizarListaCidades && atualizarListaCidades();
  };

  // abrir modal
  //document.getElementById("modalCidade").style.display = "block";
  abrirModalS("modalCidade");
}

// fechar modal
document.getElementById("fecharModalCidade").onclick =
document.getElementById("fecharModalCidadeBtn").onclick = function () {
  document.getElementById("modalCidade").style.display = "none";
};

// botão flutuante - aparece quando jogador está sobre hex com cidade
const btnVerCidade = document.getElementById("btnVerCidade");
btnVerCidade.addEventListener("click", () => {
  if (!posAtual) return;
  abrirModalCidadePorHex(posAtual.q, posAtual.r);
});

// função que atualiza visibilidade do botão de cidade quando o jogador se move
function atualizarBotaoCidadeAtual() {
  const mapaAtivo = document.getElementById("sec-mapa")?.style.display !== "none";

    if (!mapaAtivo) {
        btnVerCidade.style.display = "none";
        return;
    }
  if (!posAtual) {
    btnVerCidade.style.display = "none";
    return;
  }
  const info = terrenos[key(posAtual.q, posAtual.r)];
  if (info && info.poi === "Cidade") {
    btnVerCidade.style.display = "block";
  } else {
    btnVerCidade.style.display = "none";
  }
}

// hook: chame atualizarBotaoCidadeAtual() dentro de marcarPosicaoAtual()
// (se já existir marcarPosicaoAtual, apenas adicione a chamada no final)
(function patchMarcarPosicaoAtual() {
  const orig = window.marcarPosicaoAtual;
  if (typeof orig === 'function') {
    window.marcarPosicaoAtual = function () {
      orig();
      atualizarBotaoCidadeAtual();
      atualizarBotaoPOIAtual();
    };
  } else {
    // se marcarPosicaoAtual ainda não definida quando este bloco rodar, podemos sobrescrever depois.
    // mas normalmente seu código já tem a função quando adicionamos este script.
  }
})();

function abrirModalPOIPorHex(q, r) {
  const h = terrenos[key(q, r)];
  if (!h || !h.dadosPOI || !h.dadosPOI.pi) {
    alert("Nenhum Ponto de Interesse neste hex.");
    return;
  }

  const pi = h.dadosPOI.pi;
  const tipo = pi.tipo;
  const bioma = pi.bioma;
  const apelido = pi.apelido;

  document.getElementById("poiTitulo").innerText = pi.descricao || "Ponto de Interesse";
  document.getElementById("poiTipo").innerText = tipo;
  document.getElementById("poiBioma").innerText = bioma;
  document.getElementById("poiApelidoInput").value = apelido || "";

  document.getElementById("poiDescricao").innerText = pi.descricao || "";
  document.getElementById("poiCombate").innerText = pi.combate || "";
  document.getElementById("poiPaz").innerText = pi.paz || "";
  document.getElementById("poiGanchos").innerText = pi.ganchos || "";
  document.getElementById("poiVariacoes").innerText = pi.variacoes || "";

  abrirModalS("modalPOI");
}

document.getElementById("salvarApelidoPOI").onclick = () => {
  const novo = document.getElementById("poiApelidoInput").value.trim().toUpperCase();
  if (!novo) return alert("Apelido inválido.");

  const h = terrenos[key(posAtual.q, posAtual.r)];
  if (!h || !h.dadosPOI || !h.dadosPOI.pi) return;

  const pi = h.dadosPOI.pi;

  pi.apelido = novo;

  salvarCampanhas(); 
  alert("Apelido salvo.");
};

const btnVerPOI = document.getElementById("btnVerPOI");
btnVerPOI.onclick = () => {
  abrirModalPOIPorHex(posAtual.q, posAtual.r);
};

function atualizarBotaoPOIAtual() {
  const mapaAtivo = document.getElementById("sec-mapa")?.style.display !== "none";

  if (!mapaAtivo) {
    btnVerPOI.style.display = "none";
    return;
  }

  if (!posAtual) {
    btnVerPOI.style.display = "none";
    return;
  }

  const h = terrenos[key(posAtual.q, posAtual.r)];

  console.log(h.poi)
  console.log(h)

  if (h && h.poi && h.poi !== "Cidade" && h.poi !== "Dungeon" && h.poi !== "Aventura") {
    btnVerPOI.style.display = "block";
  } else {
    btnVerPOI.style.display = "none";
  }
}

const btnEntrarDungeon = document.getElementById("btnEntrarDungeon");
function atualizarBotaoDungeonAtual() {
  const mapaAtivo = document.getElementById("sec-mapa")?.style.display !== "none";

  if (!mapaAtivo || !posAtual) {
    btnEntrarDungeon.style.display = "none";
    return;
  }

  const h = terrenos[key(posAtual.q, posAtual.r)];

  if (h && h.poi === "Dungeon") {
    btnEntrarDungeon.style.display = "block";
  } else {
    btnEntrarDungeon.style.display = "none";
  }
}

const btnEntrarAventura = document.getElementById("btnEntrarAventura");
function atualizarBotaoAventura() {
  const mapaAtivo = document.getElementById("sec-mapa")?.style.display !== "none";

  if (!mapaAtivo || !posAtual) {
    btnEntrarDungeon.style.display = "none";
    return;
  }

  const h = terrenos[key(posAtual.q, posAtual.r)];

  if (h && h.poi === "Aventura") {
    btnEntrarAventura.style.display = "block";
  } else {
    btnEntrarAventura.style.display = "none";
  }
}

document.getElementById("btnEntrarDungeon").onclick = abrirDungeonDoHex;

function abrirDungeonDoHex() {
  if (!posAtual) return alert("Posição do jogador desconhecida.");
  const h = terrenos[key(posAtual.q, posAtual.r)];
  if (!h || !h.dadosPOI || h.dadosPOI.tipo !== "dungeon" || !h.dadosPOI.pi) {
    alert("Nenhuma dungeon neste hex.");
    return;
  }

  // carrega a dungeon atual diretamente do dadosPOI.pi
  dungeonAtual = h.dadosPOI.pi;

  // contadorSalas deve ser a quantidade atual de salas
  contadorSalas = dungeonAtual.salas ? dungeonAtual.salas.length : 0;

  // Oculta elementos antigos da UI de criação (se existirem)

  // mostra a seção da dungeon (usa sua função de troca de seção)
  abrirSecao("sec-dungeon");

  //atualizarDungeonAtual();

  atualizarBotaoDungeonAtual()

  abrirDungeonUI()


  //document.getElementById("dungeonAtual").style.display = "block";

  /*const div = document.getElementById("encontrosDungeon");
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
  `*/
}


document.getElementById("btnEntrarAventura").onclick = abrirAventuraDoHex;

function abrirAventuraDoHex() {
  if (!posAtual) return alert("Posição do jogador desconhecida.");
  const h = terrenos[key(posAtual.q, posAtual.r)];
  if (!h || !h.dadosPOI || h.dadosPOI.tipo !== "aventura" || !h.dadosPOI.pi) {
    alert("Nenhuma aventura neste hex.");
    return;
  }

  // carrega a dungeon atual diretamente do dadosPOI.pi
  aventuraAtual = h.dadosPOI.pi;


  // Oculta elementos antigos da UI de criação (se existirem)

  // mostra a seção da dungeon (usa sua função de troca de seção)
  abrirSecao('sec-aventuras')

  //atualizarDungeonAtual();

  atualizarBotaoAventura()

}