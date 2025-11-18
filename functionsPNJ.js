// ===================================================
// 🔮 GERAR PNJ COMPLETO
// (usa as tabelas definidas no tabelas.js)
// ===================================================
function gerarPNJ_Completo() {
  const nome = pnjNomes[Math.floor(Math.random()*pnjNomes.length)];
  const especie = pnjEspecie[Math.floor(Math.random()*pnjEspecie.length)];
  const ocupacao = pnjOcupacao[Math.floor(Math.random()*pnjOcupacao.length)];
  const temperamento = pnjTemperamento[Math.floor(Math.random()*pnjTemperamento.length)];
  const aparencia = pnjAparencia[Math.floor(Math.random()*pnjAparencia.length)];
  const perfil = pnjPerfil[Math.floor(Math.random()*pnjPerfil.length)];
  const desejo = pnjDesejo[Math.floor(Math.random()*pnjDesejo.length)];

  // 1 a 3 conhecimentos
  const qtd = Math.floor(Math.random()*3)+1;
  let conhecimentos = [];

  // obrigatório da ocupação
  if (conhecimentoPorOcupacao[ocupacao]) {
    conhecimentos.push(
      conhecimentoPorOcupacao[ocupacao][
        Math.floor(Math.random()*conhecimentoPorOcupacao[ocupacao].length)
      ]
    );
  }

  // adiciona conhecimentos livres
  while (conhecimentos.length < qtd) {
    const novo = pnjConhecimentosGerais[Math.floor(Math.random()*pnjConhecimentosGerais.length)];
    if (!conhecimentos.includes(novo)) conhecimentos.push(novo);
  }

  return {
    nome, especie, ocupacao, temperamento,
    aparencia, perfil, desejo, conhecimentos
  };
}

// ===================================================
// 🟦 INTEGRAÇÃO COM A INTERFACE
// ===================================================
function getPNJs() {
  return campanhas[campanhaAtual].pnjs || [];
}

function setPNJs(lista) {
  campanhas[campanhaAtual].pnjs = lista;
  salvarCampanhas();
}

function gerarPNJ_UI() {
  const novo = gerarPNJ_Completo();

  const lista = getPNJs();
  lista.push(novo);

  setPNJs(lista);
  listarPNJs();
}

function listarPNJs() {
  const lista = getPNJs();
  const box = document.getElementById("pnjLista");

  if (!box) return;

  if (lista.length === 0) {
    box.innerHTML = `<p class="text-muted">Nenhum PNJ criado.</p>`;
    return;
  }

  let html = "";

  lista.forEach((p, i) => {
    html += `
      <div class="card p-3 my-2">
        <b>${p.nome}</b>
        <small class="text-muted">(${p.ocupacao}, ${p.especie})</small>

        <div class="mt-2 d-flex flex-wrap gap-2">
          <button class="btn btn-sm btn-primary" onclick="detalharPNJ(${i})">📄 Detalhes</button>
          <button class="btn btn-sm btn-warning" onclick="editarPNJ(${i})">✏️ Editar</button>
          <button class="btn btn-sm btn-success" onclick="adicionarPNJ_ao_Oraculo(${i})">🔮 Oráculo</button>
          <button class="btn btn-sm btn-danger" onclick="excluirPNJ(${i})">🗑 Excluir</button>
        </div>
      </div>
    `;
  });

  box.innerHTML = html;
}

function excluirPNJ(i) {
  if (!confirm("Excluir este PNJ?")) return;

  const lista = getPNJs();
  lista.splice(i, 1);

  setPNJs(lista);
  listarPNJs();
}

function detalharPNJ(i) {
  const p = getPNJs()[i];
  if (!p) return;

  document.getElementById("conteudoDetalhesPNJ").innerHTML = `
    <b>Nome:</b> ${p.nome}<br>
    <b>Espécie:</b> ${p.especie}<br>
    <b>Ocupação:</b> ${p.ocupacao}<br>
    <b>Temperamento:</b> ${p.temperamento}<br>
    <b>Aparência:</b> ${p.aparencia}<br>
    <b>Perfil:</b> ${p.perfil}<br>
    <b>Desejo:</b> ${p.desejo}<br>
    <b>Conhecimentos:</b> ${p.conhecimentos.join(", ")}<br>
  `;

  new bootstrap.Modal(document.getElementById("modalDetalhesPNJ")).show();
}

let pnjEditando = null;

function editarPNJ(i) {
  const p = getPNJs()[i];
  if (!p) return;

  pnjEditando = i;

  document.getElementById("conteudoEditarPNJ").innerHTML = `
    Nome: <input id="editNome" class="form-control" value="${p.nome}"><br>
    Espécie: <input id="editEspecie" class="form-control" value="${p.especie}"><br>
    Ocupação: <input id="editOcupacao" class="form-control" value="${p.ocupacao}"><br>
    Temperamento: <input id="editTemperamento" class="form-control" value="${p.temperamento}"><br>
    Aparência: <input id="editAparencia" class="form-control" value="${p.aparencia}"><br>
    Perfil: <input id="editPerfil" class="form-control" value="${p.perfil}"><br>
    Desejo: <input id="editDesejo" class="form-control" value="${p.desejo}"><br>
    Conhecimentos (separados por vírgula):
    <textarea id="editConhecimentos" class="form-control">${p.conhecimentos.join(", ")}</textarea>
  `;

  new bootstrap.Modal(document.getElementById("modalEditarPNJ")).show();
}

function salvarEdicaoPNJ() {
  const lista = getPNJs();
  const p = lista[pnjEditando];

  p.nome = editNome.value.trim();
  p.especie = editEspecie.value.trim();
  p.ocupacao = editOcupacao.value.trim();
  p.temperamento = editTemperamento.value.trim();
  p.aparencia = editAparencia.value.trim();
  p.perfil = editPerfil.value.trim();
  p.desejo = editDesejo.value.trim();
  p.conhecimentos = editConhecimentos.value.split(",").map(s => s.trim());

  setPNJs(lista);
  listarPNJs();

  bootstrap.Modal.getInstance(document.getElementById("modalEditarPNJ")).hide();
}

function adicionarPNJ_ao_Oraculo(i) {
  const pnj = getPNJs()[i];
  if (!pnj) return;

  campanhas[campanhaAtual].tabelaPNJ.push(pnj.nome);
  salvarCampanhas();
  atualizarTabelasOraculo();

  alert(`PNJ "${pnj.nome}" adicionado ao Oráculo!`);
}