// -------------------------------------------------
// 📌 Resolve o destino usando destinoTabela
// -------------------------------------------------

function consultarDestino() {

  console.log("Entrou no oraculo")

  const prob = document.getElementById("oraculoProbModal").value;
  const caos = parseInt(document.getElementById("oraculoChaosModal").value);

  console.log(prob)
  console.log(caos)

  if (!destinoTabela[prob]) {
    alert("Probabilidade inválida!");
    return;
  }

  // ------------------------------
  // 🎲 Rolagem REAL: apenas 2d10
  // ------------------------------
  const d1 = Math.floor(Math.random() * 10); // dezenas
  const d2 = Math.floor(Math.random() * 10); // unidades

  // Converte 2d10 → d100 estilo Mythic
  let fate = d1 * 10 + d2;
  if (fate === 0) fate = 100;

  // -------------------------------------
  // 🎯 Determinar EVENTO ALEATÓRIO
  // doubles E >= fator de caos
  // -------------------------------------
  const eventoAleatorio = (d1 === d2 && d1 >= caos);

  // Pegar limites da Tabela do Destino
  const linha = destinoTabela[prob][caos];
  const [simEx, sim, naoEx] = linha;

  // -------------------------------------
  // ✨ Determinação do destino
  // -------------------------------------
  let resposta = "";
  if (fate <= simEx) resposta = "SIM EXCEPCIONAL";
  else if (fate <= sim) resposta = "SIM";
  else if (fate >= naoEx) resposta = "NÃO EXCEPCIONAL";
  else resposta = "NÃO";

  // -------------------------------------
  // SE houver evento → interpretar foco
  // usando o MESMO "fate"
  // -------------------------------------
  let focoData = null;
  let eventoResultado = null;

  if (eventoAleatorio) {
    focoData = determinarFocoEvento(fate); // usa o mesmo 1-100

    // Se o foco pedir rolagem numa tabela (PNJ/PJ/Trama)
    if (focoData.tipo !== "nenhum") {
      eventoResultado = sortearEmTabela(focoData.tipo);
    }
  }

  // -------------------------------------
  // Montar a saída para o HTML
  // -------------------------------------
  let html = `
    <div class="card p-3 mt-3 rpg-card">
      <h5>🔮 Resultado do Destino</h5>

      <b>Probabilidade:</b> ${destinoProbabilidades[prob]}<br>
      <b>Fator Caos:</b> ${caos}<br>

      <b>Rolagem (2d10):</b> ${d1} e ${d2}<br>
      <b>Total (d100):</b> ${fate}<br>

      <b>Resultado:</b> 
      <span class="fw-bold text-primary">${resposta}</span><br>
  `;

  // -------------------------------------
  // EVENTO ALEATÓRIO — exibição
  // -------------------------------------
  if (eventoAleatorio) {
    html += `
      <div class="alert alert-danger mt-3 rpg-card">
        ⚠️ <b>EVENTO ALEATÓRIO!</b><br>
        Dados repetidos (${d1}, ${d2}) ≥ Caos (${caos})<br>
        <b>Foco (${focoData.d100}):</b> ${focoData.foco}<br>
    `;

    if (eventoResultado) {
      html += `
        <b>Resultado do Foco:</b> ${eventoResultado}<br>
      `;
    }

    html += `</div>`;
  }

  html += `</div>`;

  const box = document.getElementById("resultadoOraculoModal");
  box.innerHTML = html;
  box.style.display = "block";

  document.getElementById("salvarOraculoBtn").style.display = "inline-block";
}

// -----------------------------------------------------
// 📌 Tabela de Foco — interpretador
// -----------------------------------------------------

function determinarFocoEvento(n) {
  let foco = "";
  let tipo = ""; // usado para identificar qual tabela rolar

  if (n <= 5) { foco = "Evento Remoto"; tipo = "nenhum"; }
  else if (n <= 10) { foco = "Evento Ambíguo"; tipo = "nenhum"; }
  else if (n <= 20) { foco = "Nova PNJ"; tipo = "nenhum"; }
  else if (n <= 40) { foco = "Ação de PNJ"; tipo = "pnj"; }
  else if (n <= 45) { foco = "Negativo para PNJ"; tipo = "pnj"; }
  else if (n <= 50) { foco = "Positivo para PNJ"; tipo = "pnj"; }
  else if (n <= 55) { foco = "Avançar a Trama"; tipo = "trama"; }
  else if (n <= 65) { foco = "Recuar a Trama"; tipo = "trama"; }
  else if (n <= 70) { foco = "Encerrar a Trama"; tipo = "trama"; }
  else if (n <= 80) { foco = "Negativo para PJ"; tipo = "pj"; }
  else if (n <= 85) { foco = "Positivo para PJ"; tipo = "pj"; }
  else { foco = "Contexto Atual"; tipo = "nenhum"; }

  return { d100: n, foco, tipo };
}

function sortearEmTabela(tipo) {
  const camp = campanhas[campanhaAtual];

  let lista = [];

  if (tipo === "pnj") lista = camp.tabelaPNJ;
  else if (tipo === "pj") lista = camp.tabelaPJ;
  else if (tipo === "trama") lista = camp.tramas;

  if (!lista || lista.length === 0) {
    return "⚠ Nenhum item cadastrado nesta tabela.";
  }

  const index = Math.floor(Math.random() * lista.length);
  return lista[index];
}

// -------------------------------------------------------
// 💾 SALVAR como Cena no Diário
// -------------------------------------------------------
function salvarResultadoOraculo() {
  const box = document.getElementById("resultadoOraculo").innerText.trim();

  const campanha = campanhas[campanhaAtual];
  campanha.cenas.push({
    titulo: "Consulta do Destino",
    texto: box,
    data: new Date().toLocaleString()
  });

  salvarCampanhas();
  atualizarListaCenas();
  alert("Resultado salvo no diário!");
}

function atualizarTabelasOraculo() {
  const data = campanhas[campanhaAtual];

  // TRAMAS
  const ulT = document.getElementById("listaTramas");
  ulT.innerHTML = "";
  data.tramas.forEach((t, i) => {
    ulT.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        ${t}
        <button class="btn btn-sm btn-danger" onclick="removerTrama(${i})">✖</button>
      </li>`;
  });

  // PNJ
  const ulN = document.getElementById("listaPNJ");
  ulN.innerHTML = "";
  data.tabelaPNJ.forEach((p, i) => {
    ulN.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        ${p}
        <button class="btn btn-sm btn-danger" onclick="removerPNJ(${i})">✖</button>
      </li>`;
  });

  // PJ
  const ulJ = document.getElementById("listaPJ");
  ulJ.innerHTML = "";
  data.tabelaPJ.forEach((p, i) => {
    ulJ.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        ${p}
        <button class="btn btn-sm btn-danger" onclick="removerPJ(${i})">✖</button>
      </li>`;
  });
}


function adicionarTrama() {
  const txt = document.getElementById("novaTrama").value.trim();
  if (!txt) return;

  campanhas[campanhaAtual].tramas.push(txt);
  salvarCampanhas();
  document.getElementById("novaTrama").value = "";
  atualizarTabelasOraculo();
}

function removerTrama(i) {
  campanhas[campanhaAtual].tramas.splice(i, 1);
  salvarCampanhas();
  atualizarTabelasOraculo();
}

function adicionarPNJ() {
  const txt = document.getElementById("novoPNJ").value.trim();
  if (!txt) return;

  campanhas[campanhaAtual].tabelaPNJ.push(txt);
  salvarCampanhas();
  document.getElementById("novoPNJ").value = "";
  atualizarTabelasOraculo();
}

function removerPNJ(i) {
  campanhas[campanhaAtual].tabelaPNJ.splice(i, 1);
  salvarCampanhas();
  atualizarTabelasOraculo();
}

function adicionarPJ() {
  const txt = document.getElementById("novoPJ").value.trim();
  if (!txt) return;

  campanhas[campanhaAtual].tabelaPJ.push(txt);
  salvarCampanhas();
  document.getElementById("novoPJ").value = "";
  atualizarTabelasOraculo();
}

function removerPJ(i) {
  campanhas[campanhaAtual].tabelaPJ.splice(i, 1);
  salvarCampanhas();
  atualizarTabelasOraculo();
}

// ===================================================
// 🔧 ACESSO AOS PNJs NA CAMPANHA ATUAL
// ===================================================
function getPNJs() {
  return campanhas[campanhaAtual].tabelaPNJ || [];
}

function setPNJs(lista) {
  campanhas[campanhaAtual].tabelaPNJ = lista;
  salvarCampanhas();
}

document.getElementById("temaDescritorModal").addEventListener("change", function() {
    const tema = this.value;
    const selectTabela = document.getElementById("tabelaDescritorModal");

    selectTabela.innerHTML = "";

    if (!tema || !tabelasDescritores[tema]) {
        selectTabela.innerHTML = `<option value="">Escolha um tema primeiro</option>`;
        return;
    }

    const tbs = tabelasDescritores[tema].tabelas;

    Object.keys(tbs).forEach(key => {
        const opt = document.createElement("option");
        opt.value = key;
        opt.textContent = tbs[key].nome;
        selectTabela.appendChild(opt);
    });
});

function gerarDescritor() {
    const tema = document.getElementById("temaDescritorModal").value;
    const tabelaKey = document.getElementById("tabelaDescritorModal").value;
    const box = document.getElementById("resultadoDescritorModal");

    if (!tema || !tabelaKey) {
        alert("Escolha um tema e uma tabela primeiro!");
        return;
    }

    const tabela = tabelasDescritores[tema].tabelas[tabelaKey].dados;

    function rolar() {
        const n = Math.floor(Math.random() * 100) + 1;
        const obj = tabela.find(e => e.valor === n);
        return obj ? obj.item : "—";
    }

    const palavra1 = rolar();
    const palavra2 = rolar();

    box.innerHTML = `
        <div class="alert alert-info rpg-card">
            <h5>🎲 Descritor Gerado</h5>
            <b>${palavra1}</b> — <b>${palavra2}</b>
        </div>
    `;

    box.style.display = "block";
}

const tabelasDescritores = {
    acao: {
        nome: "Ações",
        tabelas: {
            acao1: { nome: "Ação 1", dados: acao1 },
            acao2: { nome: "Ação 2", dados: acao2 }
        }
    },

    descritor: {
        nome: "Descrições",
        tabelas: {
            descritor1: { nome: "Descritor Geral 1", dados: descritor1 },
            descritor2: { nome: "Descritor Geral 2", dados: descritor2 },
            descritoresCidade: { nome: "Cidades", dados: descritoresCidade },
            civilizacao: { nome: "civilização", dados: civilizacao },
            lendas: { nome: "Lendas", dados: lendas },
            sonhosVisoes: { nome: "Sonhos e Visões", dados: sonhosVisoes }
            // continue conforme suas tabelas
        }
    },

    elemento: {
        nome: "Elementos",
        tabelas: {
            localidade: { nome: "Localidade", dados: localidade },
            personagem: { nome: "Personagem", dados: personagem },
            objetoCena: { nome: "Objetos", dados: objetoCena },
            efeitosMagia: { nome: "Efeitos de Magia", dados: efeitosMagia },
            maldicoes: { nome: "Maldições", dados: maldicoes }
            // continue conforme suas tabelas
        }
    }
};

