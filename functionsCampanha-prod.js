// ====== SISTEMA DE CAMPANHAS ======
//let campanhas = JSON.parse(localStorage.getItem("campanhasAltaris") || "{}");
//let campanhaAtual = localStorage.getItem("campanhaAtualAltaris") || null;

let campanhas = {};
let campanhaAtual = null;

async function iniciarApp() {
    console.log("Iniciando Aplicação e Carregamento de Dados...");
    
    // As referências a db, doc, getDoc, etc., SÓ EXISTEM DENTRO das funções
    // onde são desestruturadas de window.firebaseModules.

    // 1. Carregar Dados na Inicialização
    await carregarDados(); // Aguarda o carregamento do Firebase

    // 2. Se não houver dados, criar Campanha Padrão e Salvar
    if (!campanhaAtual || !campanhas[campanhaAtual]) {
        console.log("Nenhuma campanha encontrada. Criando Campanha Padrão.");
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
        await salvarCampanhas(); // Aguardar o salvamento inicial
    }

    // 3. Chamar as funções de atualização da interface
    carregarCampanha(campanhaAtual);
    // ... chame outras funções de inicialização da interface aqui ...
}


async function carregarDados() {
    // É OBRIGATÓRIO desestruturar os módulos aqui dentro
    const { db, doc, getDoc } = window.firebaseModules;
    
    // A referência do documento
    const ref = doc(db, "altaris", "dadosDoUsuario");
    
    try {
        // Agora getDoc está definido, pois estamos dentro de uma função
        // e o await está em uma função async.
        const snap = await getDoc(ref);
        
        if (snap.exists()) {
            const data = snap.data();
            campanhas = data.campanhas || {};
            campanhaAtual = data.campanhaAtual || null;
            console.log("Dados carregados com sucesso do Firebase.");
        } else {
            console.log("Documento não encontrado no Firebase.");
            campanhas = {};
            campanhaAtual = null;
        }
    } catch (error) {
        console.error("Erro ao carregar dados do Firebase:", error);
    }
}

function salvarCampanhasOld() {
  localStorage.setItem("campanhasAltaris", JSON.stringify(campanhas));
  localStorage.setItem("campanhaAtualAltaris", campanhaAtual);
}

async function salvarCampanhas() {
    // É OBRIGATÓRIO desestruturar os módulos aqui dentro
    const { db, doc, setDoc } = window.firebaseModules;
    
    try {
        await setDoc(doc(db, "altaris", "dadosDoUsuario"), {
            campanhas,
            campanhaAtual
        });
        console.log("Dados salvos com sucesso no Firebase.");
    } catch (error) {
        console.error("Erro ao salvar dados no Firebase:", error);
    }
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