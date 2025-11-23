let rumores = JSON.parse(localStorage.getItem("rumoresSalvos") || "[]");

function gerarBoato() {
  const data = campanhas[campanhaAtual];
  const r = rolarD20();
  const direcao = direcoes[Math.floor(Math.random()*direcoes.length)];
  const distancia = rolarD12();
  let texto;

  if (r <= 4) texto = `🏞️ Dizem existir ${lugaresGeograficos[rolarD6()-1]} cerca de ${distancia} hex(es) ao ${direcao}.`;
  else if (r <= 7) texto = `🐾 Estão comentando sobre ${tensaoCriaturas[rolarD6()-1]} aproximadamente ${distancia} hex(es) ao ${direcao}.`;
  else if (r <= 10) texto = `🧍 Falam de ${rumoresPessoas[rolarD6()-1]} vivendo ${distancia} hex(es) ao ${direcao}.`;
  else if (r <= 12) texto = `🏛️ Ouvi boatos de ${boatosDungeon[rolarD6()-1]} a ${distancia} hex(es) ao ${direcao}.`;
  else if (r <= 14) texto = `🕳️ Comentam sobre ${boatosCaverna[rolarD6()-1]} a ${distancia} hex(es) ao ${direcao}.`;
  else if (r === 15) texto = `✨ Um lugar onde o véu é fino está a ${distancia} hex(es) ao ${direcao}.`;
  else if (r <= 17) texto = `⚔️ Tropas foram vistas marchando cerca de ${distancia} hex(es) ao ${direcao}.`;
  else if (r === 18) texto = `🏘️ Há rumores sobre ${cidadesRumores[rolarD6()-1]}, ${distancia} hex(es) ao ${direcao}.`;
  else texto = `❓ Um boato sem fundamento circula pela região...`;

  // SALVA E ATUALIZA LISTA
  data.rumores.push(texto);
  salvarCampanhas();
  atualizarListaRumores();

  // Exibe imediatamente no card
  //document.getElementById("textoMissao").innerHTML = texto;
  //document.getElementById("resultado").style.display = "block";
}

function salvarRumores() {
  localStorage.setItem("rumoresSalvos", JSON.stringify(rumores));
}

function atualizarListaRumores() {
  const data = campanhas[campanhaAtual];
  const ul = document.getElementById("listaRumores");
  ul.innerHTML = "";
  data.rumores.forEach(r => ul.innerHTML += `<li>${r}</li>`);
}

function limparRumores() {
 if (!campanhaAtual || !campanhas[campanhaAtual]) return;

  campanhas[campanhaAtual].rumores = [];
  salvarCampanhas();
  atualizarListaRumores();

  alert("Todos os boatos da campanha foram removidos!");
}