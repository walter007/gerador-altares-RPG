// ====== SISTEMA DE CAMPANHAS ======
let campanhas = JSON.parse(localStorage.getItem("campanhasAltaris") || "{}");
let campanhaAtual = localStorage.getItem("campanhaAtualAltaris") || null;

//const snap = await getDoc(doc(db, "altaris", "dadosDoUsuario"));
//if (snap.exists()) {
    //campanhas = snap.data().campanhas || {};
    //campanhaAtual = snap.data().campanhaAtual || null;
//} else {
    //campanhas = {};
    //campanhaAtual = null;
//}

//async function carregarDados() {
  //const ref = doc(db, "altaris", "dadosDoUsuario");
  //const snap = await getDoc(ref);

  //if (snap.exists()) {
    //const data = snap.data();
    //campanhas = data.campanhas || {};
    //campanhaAtual = data.campanhaAtual || null;
  //} else {
    //campanhas = {};
    //campanhaAtual = null;
  //}
//}


// Se ainda não existir nenhuma campanha → cria uma padrão
if (!campanhaAtual || !campanhas[campanhaAtual]) {
  campanhaAtual = "Campanha Padrão";
  campanhas[campanhaAtual] = { 
    missoesAtivas: [], 
    missoesConcluidas: [], 
    rumores: [], 
    cidades: [], 
    dungeons: [],
    cenas: [], // ✅ Adicionado aqui também!
    tramas: [],
    tabelaPNJ: [],
    tabelaPJ: [],
    pnjs: [],
    pjs: [],
    pontosInteresse: {
      monstruoso: [],
      geografico: [],
      npc: [],
      divino: [],
      magico: [],
      militar: []
    }
  };
  salvarCampanhas();
}

function salvarCampanhas() {
  localStorage.setItem("campanhasAltaris", JSON.stringify(campanhas));
  localStorage.setItem("campanhaAtualAltaris", campanhaAtual);
}

async function salvarCampanhasOld() {
  await setDoc(doc(db, "altaris", "dadosDoUsuario"), {
    campanhas,
    campanhaAtual
  });
}

function carregarCampanha(nome) {
  campanhaAtual = nome;
  salvarCampanhas();
  atualizarListasMissoes();
  atualizarListaRumores();
  mostrarCampanhas();
  atualizarListaDungeons();
  atualizarListaCenas();
  atualizarListaCidades();
  atualizarListaPI();
  atualizarTabelasOraculo();
  atualizarCenaAtual();
  atualizarPJs();
}

function criarCampanha() {
  const nome = document.getElementById("novaCampanhaNome").value.trim();
  if (!nome) return alert("Digite um nome.");

  if (campanhas[nome]) return alert("Já existe uma campanha com esse nome.");

   const novaCampanhaBase = {
        missoesAtivas: [],
        missoesConcluidas: [],
        rumores: [],
        cidades: [],
        dungeons: [], // ✅ Adicionado!
        cenas: [],
        tramas: [],
        tabelaPNJ: [],
        tabelaPJ: [],
        pnjs: [],
        pjs: [], 
        pontosInteresse: {
            monstruoso: [],
            geografico: [],
            npc: [],
            divino: [],
            magico: [],
            militar: []
        }
    };

  // ✅ AQUI ESTAVA FALTANDO
  campanhas[nome] = novaCampanhaBase;
  campanhaAtual = nome;

  salvarCampanhas();
  mostrarCampanhas();
  document.getElementById("novaCampanhaNome").value = "";

  alert(`Campanha "${nome}" criada e selecionada!`);
}

function excluirCampanha(nome) {
  if (nome === campanhaAtual) return alert("Não é possível excluir a campanha atual.");
  if (!confirm(`Excluir campanha "${nome}" definitivamente?`)) return;
  delete campanhas[nome];
  salvarCampanhas();
  mostrarCampanhas();
}

function mostrarCampanhas() {
  document.getElementById("campanhaAtualNome").innerText = campanhaAtual;

  const ul = document.getElementById("listaCampanhas");
  ul.innerHTML = "";

  Object.keys(campanhas).forEach(nome => {
    ul.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        ${nome}
        <span>
          <button class="btn btn-sm btn-primary" onclick="carregarCampanha('${nome}')">Carregar</button>
          <button class="btn btn-sm btn-danger" onclick="excluirCampanha('${nome}')">Excluir</button>
        </span>
      </li>
    `;
  });
}