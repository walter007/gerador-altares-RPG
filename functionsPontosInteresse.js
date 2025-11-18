function gerarPontoInteresse() {
  const tipo = document.getElementById('tipoPiSelect').value;
  const bioma = document.getElementById('biomaSelectPI').value;

  const data = campanhas[campanhaAtual];

  // garantir estrutura
  if (!data.pontosInteresse) {
    data.pontosInteresse = {
      monstruoso: [], geografico: [], npc: [],
      divino: [], magico: [], militar: []
    };
  }

  // mágicos e militares têm tabelas fixas
  if (tipo === "magico") {
    gerarPontoInteresseUnico(piMagico, "magico");
    return;
  }

  if (tipo === "militar") {
    gerarPontoInteresseUnico(piMilitar, "militar");
    return;
  }

  const tabela = tabelasPI[bioma]?.[tipo];
  if (!tabela) {
    alert("Tabela não encontrada para esse bioma e tipo.");
    return;
  }

  gerarPontoInteresseUnico(tabela, tipo, bioma);
}

function gerarPontoInteresseUnico(tabela, tipo, bioma = "") {
  const data = campanhas[campanhaAtual];
  if (!data.pontosInteresse) return;

  let pi;
  let tentativas = 0;

  // impedir duplicatas
  do {
    tentativas++;
    pi = tabela[rolarD12() - 1];
  } while (
    data.pontosInteresse[tipo].some(p => p.descricao === pi.descricao) &&
    tentativas < 20
  );

  if (tentativas >= 20) {
    alert("Todos os pontos desse tipo já foram descobertos!");
    return;
  }

  const apelido = String.fromCharCode(65 + data.pontosInteresse[tipo].length);
  const piObj = { ...pi, apelido, tipo, bioma };

  data.pontosInteresse[tipo].push(piObj);
  salvarCampanhas();
  atualizarListaPI();
  mostrarDetalhesPI(piObj);
}

function atualizarListaPI() {
  const data = campanhas[campanhaAtual];
  const container = document.getElementById("listaPI");
  container.innerHTML = "";

  if (!data.pontosInteresse) return;

  Object.keys(data.pontosInteresse).forEach(tipo => {
    const lista = data.pontosInteresse[tipo];
    if (!lista.length) return;

    container.innerHTML += `<h5 class="mt-3 text-capitalize">${tipo}</h5><ul class="list-group mb-3" id="pi-${tipo}"></ul>`;
    const ul = document.getElementById(`pi-${tipo}`);

    lista.forEach((pi, i) => {
      ul.innerHTML += `
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <b>${pi.apelido}:</b> ${pi.descricao}
            <br><small>${pi.bioma ? `Bioma: ${pi.bioma}` : ""}</small>
          </div>
          <div class="d-flex align-items-center gap-2">
            <input type="text" value="${pi.apelido}" maxlength="2"
                   style="width:50px;text-align:center;"
                   oninput="editarApelidoPI('${tipo}', ${i}, this.value)">
            <button class="btn btn-sm btn-outline-primary" onclick="verPI('${tipo}', ${i})">Ver</button>
          </div>
        </li>
      `;
    });
  });
}

function verPI(tipo, index) {
  const pi = campanhas[campanhaAtual].pontosInteresse[tipo][index];
  mostrarDetalhesPI(pi);
}

function mostrarDetalhesPI(pi) {
  const texto = `
    <h5>${pi.apelido} — ${pi.descricao}</h5>
    <strong>Tipo:</strong> ${pi.tipo}<br>
    ${pi.bioma ? `<strong>Bioma:</strong> ${pi.bioma}<br>` : ""}
    <strong>Combate:</strong> ${pi.combate}<br>
    <strong>Paz:</strong> ${pi.paz}<br>
    <strong>Ganchos:</strong> ${pi.ganchos}<br>
    <strong>Variações:</strong> ${pi.variacoes}
  `;
  document.getElementById("textoPI").innerHTML = texto;
  document.getElementById("resultadoPI").style.display = "block";
}

function editarApelidoPI(tipo, index, novoApelido) {
  campanhas[campanhaAtual].pontosInteresse[tipo][index].apelido = novoApelido.toUpperCase();
  salvarCampanhas();
}

function limparPI() {
  if (!confirm("Deseja apagar todos os pontos de interesse da campanha?")) return;
  const data = campanhas[campanhaAtual];
  Object.keys(data.pontosInteresse).forEach(tipo => data.pontosInteresse[tipo] = []);
  salvarCampanhas();
  atualizarListaPI();
}
