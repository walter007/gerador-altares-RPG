let dungeonAtual = null;
let contadorSalas = 0;

function gerarSalaDungeon() {
  if (!dungeonAtual) {
    alert("Crie uma dungeon antes de gerar salas!");
    return;
  }

  const tipo = document.getElementById("dungeonSelect").value;
  const tabela = tabelasDungeon[tipo];
  const chave = rolar2d6();


  if (!tabela) {
    alert("Tabela de dungeon não encontrada!");
    return;
  }

  const sala = tabela[chave];
  if (!sala) {
    console.warn("Chave não encontrada:", chave);
    return;
  }

  // Rola formato
  const rolagem = rolarD6();
  const resultado = rolagem + contadorSalas;
  const formato = tabelaFormatos[resultado] || tabelaFormatos[12];

  contadorSalas++;
  const id = String.fromCharCode(64 + contadorSalas); // A, B, C...

  const novaSala = {
    id: id,
    formato: formato,
    lugar: sala.lugar,
    curiosidade: sala.curiosidade,
    obstaculo: sala.obstaculo
  };

  dungeonAtual.salas.push(novaSala);
  atualizarDungeonAtual();
}

function atualizarDungeonAtual() {
  const div = document.getElementById("dungeonAtual");
  if (!dungeonAtual) {
    div.style.display = "none";
    return;
  }

  div.innerHTML = `
    <h5>🏰 ${dungeonAtual.nome} (${dungeonAtual.tipo})</h5>
    <ul class="list-group">
      ${dungeonAtual.salas
        .map(
          (s) => `
        <li class="list-group-item">
          <strong>🧩 Sala ${s.id}</strong> — ${s.formato}<br>
          <strong>📍 Lugar:</strong> ${s.lugar}<br>
          <strong>👁️ Curiosidade:</strong> ${s.curiosidade}<br>
          <strong>⚠️ Obstáculo:</strong> ${s.obstaculo}
        </li>
      `
        )
        .join("")}
    </ul>
  `;
}

function finalizarDungeon() {
  if (!dungeonAtual || dungeonAtual.salas.length === 0) {
    alert("Crie pelo menos uma sala antes de finalizar!");
    return;
  }

  const campanha = campanhas[campanhaAtual];
  if (!campanha.dungeons) campanha.dungeons = []; // ✅ Garantia retroativa

  campanha.dungeons.push(dungeonAtual);
  salvarCampanhas();

  alert(`Dungeon "${dungeonAtual.nome}" salva na campanha "${campanhaAtual}".`);
  dungeonAtual = null;
  contadorSalas = 0;

  atualizarDungeonAtual();
  atualizarListaDungeons();
}

function atualizarListaDungeons() {
  const lista = document.getElementById("listaDungeons");
  lista.innerHTML = "";

  const campanha = campanhas[campanhaAtual];
  if (!campanha || !campanha.dungeons || campanha.dungeons.length === 0) {
    lista.innerHTML = "<p>Nenhuma dungeon criada nesta campanha.</p>";
    return;
  }

  campanha.dungeons.forEach((d, i) => {
    const div = document.createElement("div");
    div.className = "card mb-2 p-2 shadow-sm";

    const nomeDungeon = d.nome || `Dungeon ${i + 1}`;
    const tipoDungeon = d.tipo || "Desconhecido";

    div.innerHTML = `
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <strong>🕍 ${nomeDungeon}</strong><br>
          <small>Tipo: ${tipoDungeon}</small>
        </div>
        <div class="d-flex gap-2">
          <button class="btn btn-sm btn-outline-primary" onclick="verDetalhesDungeon(${i})">📜 Ver Detalhes</button>
          <button class="btn btn-sm btn-outline-danger" onclick="excluirDungeon(${i})">🗑️ Excluir</button>
        </div>
      </div>
    `;
    lista.appendChild(div);
  });
}

function excluirDungeon(index) {
  const campanha = campanhas[campanhaAtual];
  if (!campanha || !campanha.dungeons[index]) return;

  const dungeon = campanha.dungeons[index];
  const nome = dungeon.nome || `Dungeon ${index + 1}`;

  if (!confirm(`Tem certeza que deseja excluir "${nome}" desta campanha?`)) return;

  campanha.dungeons.splice(index, 1);
  salvarCampanhas();
  atualizarListaDungeons();

  alert(`Dungeon "${nome}" removida com sucesso!`);
}

function verDetalhesDungeon(index) {
  const campanha = campanhas[campanhaAtual];
  const dungeon = campanha.dungeons[index];
  if (!dungeon) return;

  let texto = `
    <h4>${dungeon.nome} (${dungeon.tipo})</h4>
    <hr>
    <strong>Salas:</strong><br>
  `;

  dungeon.salas.forEach((sala, i) => {
    texto += `
      <div class="mb-2">
        <strong>🧩 Sala ${i + 1}</strong><br>
        📐 <em>${sala.formato}</em><br>
        📍 ${sala.lugar}<br>
        👁️ ${sala.curiosidade}<br>
        ⚠️ ${sala.obstaculo}<br>
      </div>
      <hr>
    `;
  });

  const resultado = document.getElementById("dungeonAtual");
  resultado.style.display = "block";
  document.getElementById("dungeonAtual").innerHTML = texto;
}

function novaDungeon() {
  const tipoSelect = document.getElementById("dungeonSelect");
  const tipo = tipoSelect ? tipoSelect.value : "Desconhecida";
  const nome = prompt("Digite o nome da dungeon:");

  if (!nome) return;

  dungeonAtual = {
    nome: nome,
    tipo: tipo,
    salas: []
  };

  contadorSalas = 0;
  atualizarDungeonAtual();
  document.getElementById("dungeonAtual").style.display = "block";
  alert(`Nova dungeon iniciada: ${nome} (${tipo})`);
}