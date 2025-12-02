function gerarCidade() {
  const roll = Math.floor(Math.random() * 18);
  const cidade = tabelaCidade[roll];

  const nome = cidade.p1 + cidade.p2;
  const listaBase = estabelecimentosPorTipo[cidade.tipo];
  let estabelecimentos = [];

  for (const item of listaBase) {
    if (typeof item === "string") {
      estabelecimentos.push(item);
    } else if (item.simples) {
      for (let i = 0; i < item.simples; i++) {
        const r = Math.floor(Math.random() * 6);
        estabelecimentos.push(tabelaEstabelecimentos[r].simples);
      }
    } else if (item.decente) {
      for (let i = 0; i < item.decente; i++) {
        const r = Math.floor(Math.random() * 6);
        estabelecimentos.push(tabelaEstabelecimentos[r].decente);
      }
    } else if (item.nobre) {
      for (let i = 0; i < item.nobre; i++) {
        const r = Math.floor(Math.random() * 6);
        estabelecimentos.push(tabelaEstabelecimentos[r].nobre);
      }
    }
  }

  // Define apelido automático (A, B, C, ...)
  const cidades = campanhas[campanhaAtual].cidades || [];
  const apelido = String.fromCharCode(65 + cidades.length); // 65 = 'A'

  const cidadeObj = {
    nome,
    tipo: cidade.tipo,
    estabelecimentos,
    apelido
  };

  campanhas[campanhaAtual].cidades.push(cidadeObj);
  salvarCampanhas();
  atualizarListaCidades();
  mostrarDetalhesCidade(cidadeObj);
}

function mostrarDetalhesCidade(cidadeObj) {
  const texto = `
    🏙️ <b>${cidadeObj.nome}</b> (${cidadeObj.tipo})<br>
    <b>Apelido:</b> ${cidadeObj.apelido}<br><br>
    <b>Estabelecimentos:</b><br>• ${cidadeObj.estabelecimentos.join("<br>• ")}
  `;
  document.getElementById("textoCidade").innerHTML = texto;
  document.getElementById("resultadoCidade").style.display = "block";
}

function verCidade(index) {
  const cidade = campanhas[campanhaAtual].cidades[index];
  if (!cidade) return alert("Cidade não encontrada!");
  mostrarDetalhesCidade(cidade);
}

function atualizarListaCidades() {
  const data = campanhas[campanhaAtual];
  const ul = document.getElementById("listaCidades");
  ul.innerHTML = "";

  if (!data.cidades.length) {
    ul.innerHTML = `<li class="list-group-item"><i>Nenhuma cidade registrada.</i></li>`;
    return;
  }

  data.cidades.forEach((c, i) => {
    ul.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <b>${c.apelido}:</b> ${c.nome} (${c.tipo})
          <br><small>${c.estabelecimentos.length} estabelecimentos</small>
        </div>
        <div class="d-flex align-items-center gap-2">
          <input type="text" value="${c.apelido}" maxlength="2"
                 style="width:50px;text-align:center;"
                 oninput="editarApelidoCidade(${i}, this.value)">
          <button class="btn btn-sm btn-outline-primary"
                onclick="verCidade(${i})">
                Ver
          </button>
        </div>
      </li>
    `;
  });
}

// Edita apelido e salva
function editarApelidoCidade(index, novoApelido) {
  campanhas[campanhaAtual].cidades[index].apelido = novoApelido.toUpperCase();
  salvarCampanhas();
}

function limparCidades() {
  campanhas[campanhaAtual].cidades = [];
  salvarCampanhas();
  atualizarListaCidades();
}

function limparCidadesOld() {
  if (!confirm("Deseja remover TODAS as cidades desta campanha?")) return;
  campanhas[campanhaAtual].cidades = [];
  salvarCampanhas();
  atualizarListaCidades();
}



function atualizarListaCidadesOld() {
  const data = campanhas[campanhaAtual];
  const ul = document.getElementById("listaCidades");
  ul.innerHTML = "";

  data.cidades.forEach((c, i) => {
    ul.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <b>${c.apelido}:</b> ${c.nome} (${c.tipo})
          <br><small>${c.estabelecimentos.length} estabelecimentos</small>
        </div>
        <div>
          <input type="text" value="${c.apelido}" maxlength="2"
                 style="width:50px;text-align:center;"
                 oninput="editarApelidoCidade(${i}, this.value)">
        </div>
      </li>
    `;
  });
}

function editarApelidoCidade(index, novoApelido) {
  campanhas[campanhaAtual].cidades[index].apelido = novoApelido.toUpperCase();
  salvarCampanhas();
}


function limparCidades() {
  if (!confirm("Deseja remover TODAS as cidades desta campanha?")) return;
  campanhas[campanhaAtual].cidades = [];
  salvarCampanhas();
  atualizarListaCidades();
}

function gerarCidadeMapa() {
  const roll = Math.floor(Math.random() * 18);
  const cidade = tabelaCidade[roll];

  const nome = cidade.p1 + cidade.p2;
  const listaBase = estabelecimentosPorTipo[cidade.tipo];
  let estabelecimentos = [];

  for (const item of listaBase) {
    if (typeof item === "string") {
      estabelecimentos.push(item);
    } else if (item.simples) {
      for (let i = 0; i < item.simples; i++) {
        const r = Math.floor(Math.random() * 6);
        estabelecimentos.push(tabelaEstabelecimentos[r].simples);
      }
    } else if (item.decente) {
      for (let i = 0; i < item.decente; i++) {
        const r = Math.floor(Math.random() * 6);
        estabelecimentos.push(tabelaEstabelecimentos[r].decente);
      }
    } else if (item.nobre) {
      for (let i = 0; i < item.nobre; i++) {
        const r = Math.floor(Math.random() * 6);
        estabelecimentos.push(tabelaEstabelecimentos[r].nobre);
      }
    }
  }

  const cidades = campanhas[campanhaAtual].cidades || [];
  const apelido = String.fromCharCode(65 + cidades.length);

  const cidadeObj = {
    nome,
    tipo: cidade.tipo,
    estabelecimentos,
    apelido
  };

  campanhas[campanhaAtual].cidades.push(cidadeObj);
  salvarCampanhas();
  atualizarListaCidades();

  // ← IMPORTANTE: retornar o objeto criado
  return cidadeObj;
}

function gerarCidadeSilenciosa() {
  const roll = Math.floor(Math.random() * 18);
  const cidade = tabelaCidade[roll];

  const nome = cidade.p1 + cidade.p2;
  const listaBase = estabelecimentosPorTipo[cidade.tipo];
  let estabelecimentos = [];

  for (const item of listaBase) {
    if (typeof item === "string") {
      estabelecimentos.push(item);
    } else if (item.simples) {
      for (let i = 0; i < item.simples; i++) {
        const r = Math.floor(Math.random() * 6);
        estabelecimentos.push(tabelaEstabelecimentos[r].simples);
      }
    } else if (item.decente) {
      for (let i = 0; i < item.decente; i++) {
        const r = Math.floor(Math.random() * 6);
        estabelecimentos.push(tabelaEstabelecimentos[r].decente);
      }
    } else if (item.nobre) {
      for (let i = 0; i < item.nobre; i++) {
        const r = Math.floor(Math.random() * 6);
        estabelecimentos.push(tabelaEstabelecimentos[r].nobre);
      }
    }
  }

  const cidades = campanhas[campanhaAtual].cidades || [];

  const apelido = String.fromCharCode(65 + cidades.length);

  const cidadeObj = {
    nome,
    tipo: cidade.tipo,
    estabelecimentos,
    apelido
  };

  cidades.push(cidadeObj);
  campanhas[campanhaAtual].cidades = cidades;

  return cidadeObj;
}
