let editandoCenaIndex = null;

function novaCena() {
  editandoCenaIndex = null;
  document.getElementById("diarioTitulo").value = "";
  document.getElementById("diarioTexto").value = "";
  document.getElementById("editorCena").style.display = "block";
}

function cancelarCena() {
  editandoCenaIndex = null;
  document.getElementById("editorCena").style.display = "none";
}

function salvarCena() {
  const titulo = document.getElementById("diarioTitulo").value.trim();
  const texto = document.getElementById("diarioTexto").value.trim();

  if (!titulo) return alert("Digite um título para a cena!");
  if (!texto) return alert("Digite o texto da cena!");

  const campanha = campanhas[campanhaAtual];
  if (!campanha.cenas) campanha.cenas = [];

  if (editandoCenaIndex !== null) {
    campanha.cenas[editandoCenaIndex].titulo = titulo;
    campanha.cenas[editandoCenaIndex].texto = texto;
  } else {
    campanha.cenas.push({ titulo, texto, data: new Date().toLocaleString() });
  }

  salvarCampanhas();
  atualizarListaCenas();
  atualizarCenaAtual();

  document.getElementById("editorCena").style.display = "none";
}

function atualizarListaCenas() {
  const campanha = campanhas[campanhaAtual];

  const ul = document.getElementById("listaCenas");
  ul.innerHTML = "";

  if (!campanha.cenas || campanha.cenas.length === 0) {
    ul.innerHTML = `<li class="list-group-item"><i>Nenhuma cena registrada.</i></li>`;
    return;
  }

  campanha.cenas.forEach((cena, index) => {
    ul.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <b>${cena.titulo}</b><br>
          <small>${cena.data}</small>
        </div>
        <div class="d-flex gap-2">
          <button class="btn btn-sm btn-outline-primary" onclick="verCena(${index})">📄 Ver</button>
          <button class="btn btn-sm btn-outline-warning" onclick="editarCena(${index})">✏️ Editar</button>
          <button class="btn btn-sm btn-outline-danger" onclick="excluirCena(${index})">🗑️ Excluir</button>
        </div>
      </li>
    `;
  });
}

function verCena(index) {
  const campanha = campanhas[campanhaAtual];
  const cena = campanha.cenas[index];

  alert(`📘 ${cena.titulo}\n\n${cena.texto}`);
}

function editarCena(index) {
  const campanha = campanhas[campanhaAtual];
  const cena = campanha.cenas[index];

  editandoCenaIndex = index;

  document.getElementById("diarioTitulo").value = cena.titulo;
  document.getElementById("diarioTexto").value = cena.texto;

  document.getElementById("editorCena").style.display = "block";
}

function excluirCena(index) {
  const campanha = campanhas[campanhaAtual];

  if (!confirm(`Excluir a cena "${campanha.cenas[index].titulo}"?`)) return;

  campanha.cenas.splice(index, 1);
  salvarCampanhas();
  atualizarListaCenas();
}

function limparCenas() {
  if (!confirm("Apagar TODAS as cenas desta campanha?")) return;

  campanhas[campanhaAtual].cenas = [];
  salvarCampanhas();
  atualizarListaCenas();
}

function atualizarCenaAtual() {
  const campanha = campanhas[campanhaAtual];

  if (!campanha.cenas || campanha.cenas.length === 0) {
    document.getElementById("cenaAtualBox").style.display = "none";
    return;
  }

  const cena = campanha.cenas[campanha.cenas.length - 1];

  document.getElementById("cenaAtualTexto").innerText = `${cena.titulo} — ${cena.texto}`;
  document.getElementById("cenaAtualBox").style.display = "block";
}