let missoesAtivas = JSON.parse(localStorage.getItem("missoesAtivas") || "[]");
let missoesConcluidas = JSON.parse(localStorage.getItem("missoesConcluidas") || "[]");


function gerarMissao() {
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
    ulAtivas.innerHTML += `<li class="list-group-item">${m}
    <button class="btn btn-sm btn-success float-end" onclick="concluirMissao(${i})">Concluir</button></li>`;
  });

  ulConcluidas.innerHTML = "";
  data.missoesConcluidas.forEach(m => {
    ulConcluidas.innerHTML += `<li class="list-group-item text-muted">${m}</li>`;
  });
}