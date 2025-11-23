function addConhecimento() {
    const select = document.getElementById("pjConhecimentoAdd");
    const valor = select.value;
    if (!valor) return;

    const lista = document.getElementById("pjListaConhecimentos");

    if (lista.children.length >= 8) return alert("Máximo de 8 conhecimentos.");

    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    const span = document.createElement("span");
    span.className = "conhecimentoTexto";
    span.textContent = valor;

    const btn = document.createElement("button");
    btn.className = "btn btn-sm btn-danger";
    btn.textContent = "X";
    btn.onclick = () => li.remove();

    li.appendChild(span);
    li.appendChild(btn);

    lista.appendChild(li);
}


function adicionarHabilidadesClasse() {
  const classe = document.getElementById("pjClasse").value;
  if (!habilidadesPorClasse[classe]) {
    return alert("Escolha uma classe primeiro.");
  }

  const lista = document.getElementById("pjListaHabilidades");

  habilidadesPorClasse[classe].forEach(h => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.innerText = h;
    lista.appendChild(li);
  });
}

function abrirHabClasse() {
  const classe = document.getElementById("pjClasse").value;

  if (!classe || !habilidadesPorClasse[classe]) {
    alert("Selecione uma classe primeiro!");
    return;
  }

  const select = document.getElementById("selectHabClasse");
  select.innerHTML = "";

  habilidadesPorClasse[classe].forEach(habStr => {
    const opt = document.createElement("option");
    opt.value = habStr;
    opt.textContent = habStr; // Mostra a string inteira no select
    select.appendChild(opt);
  });

  const modal = new bootstrap.Modal(document.getElementById("modalAddHabClasse"));
  modal.show();
}

function confirmarHabClasse() {
  const select = document.getElementById("selectHabClasse");
  const habStr = select.value;

  if (!habStr) return;

  // extrai custo dentro de parênteses
  const match = habStr.match(/\((.*?)\)/);
  const custo = match ? match[1] : "—";

  // nome é o texto até o primeiro parêntese
  const nome = habStr.split("(")[0].trim();

  const lista = document.getElementById("pjListaHabilidades");
  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between align-items-center";

    const span = document.createElement("span");
    span.className = "habilidadeTexto";
    span.innerHTML = `<b>${nome}</b> — <small>${custo}</small>`;

    const btn = document.createElement("button");
    btn.className = "btn btn-sm btn-danger";
    btn.textContent = "X";
    btn.onclick = () => li.remove();

    li.appendChild(span);
    li.appendChild(btn);

  lista.appendChild(li);

  const modal = bootstrap.Modal.getInstance(document.getElementById("modalAddHabClasse"));
  modal.hide();
}

function conectarEventosEquipamentos() {
    document.querySelectorAll(".equipPV, .equipPE").forEach(input => {
        input.addEventListener("input", () => {
            atualizarPVPEEquip();
            atualizarTotaisPVPE();
        });
    });
}

function conectarEventosEspecieClasse() {
    const esp = document.getElementById("pjEspecie");
    const cla = document.getElementById("pjClasse");

    if (esp) {
        esp.onchange = () => {
            atualizarEspeciePVPE();
            atualizarTotaisPVPE();
        };
    }

    if (cla) {
        cla.onchange = () => {
            atualizarPVPEClasse();
            atualizarTotaisPVPE();
        };
    }
}

function atualizarPVPEClasse() {
    
    console.log("entrou aqui ao atualizar a classe!")
  const classe = document.getElementById("pjClasse").value;
  if (!classe || !tabelaClassePVPE[classe]) return;

  const dados = tabelaClassePVPE[classe];

  document.getElementById("pjPVClasse").value = dados.pv;
  document.getElementById("pjPEClasse").value = dados.pe;

  atualizarTotaisPVPE(); // opcional se você já recalcula o máximo
}

function atualizarPVPEEquip() {
    let pv = 0;
    let pe = 0;

    document.querySelectorAll("#pjEquipVestido .card").forEach(card => {
        pv += parseInt(card.querySelector(".equipPV").value) || 0;
        pe += parseInt(card.querySelector(".equipPE").value) || 0;
    });

    document.getElementById("pjPVEquip").value = pv;
    document.getElementById("pjPEEquip").value = pe;

    atualizarTotaisPVPE();
}

function atualizarEspeciePVPE() {
  const esp = document.getElementById("pjEspecie").value;
  const dados = especiePVPE[esp];

  if (!dados) return;

  document.getElementById("pjPVEspecie").value = dados.pv;
  document.getElementById("pjPEEspecie").value = dados.pe;

  atualizarTotaisPVPE()
}

function atualizarTotaisPVPE() {
    const pvEsp = parseInt(document.getElementById("pjPVEspecie").value) || 0;
    const pvCla = parseInt(document.getElementById("pjPVClasse").value) || 0;
    const pvEqp = parseInt(document.getElementById("pjPVEquip").value) || 0;

    const peEsp = parseInt(document.getElementById("pjPEEspecie").value) || 0;
    const peCla = parseInt(document.getElementById("pjPEClasse").value) || 0;
    const peEqp = parseInt(document.getElementById("pjPEEquip").value) || 0;

    document.getElementById("pjPVMax").value = pvEsp + pvCla + pvEqp;
    document.getElementById("pjPEMax").value = peEsp + peCla + peEqp;
}




function addEquipVestido() {
  const container = document.getElementById("pjEquipVestido");

  const div = document.createElement("div");
  div.className = "card p-2 my-2";

  div.innerHTML = `
    <div class="row g-2">

      <div class="col">
        <label class="form-label">Nome</label>
        <input class="form-control equipNome">
      </div>

      <div class="col">
        <label class="form-label">Tipo</label>
        <select class="form-select equipTipo">
          <option>Roupa</option>
          <option>Armadura</option>
          <option>Sobretudo</option>
          <option>Cabeça</option>
          <option>Acessório</option>
        </select>
      </div>

      <div class="col">
        <label class="form-label">PV</label>
        <input class="form-control equipPV">
      </div>

      <div class="col">
        <label class="form-label">PE</label>
        <input class="form-control equipPE">
      </div>

      <div class="col">
        <label class="form-label">Especial</label>
        <input class="form-control equipEspecial">
      </div>

      <div class="col-1 d-flex align-items-end">
        <button class="btn btn-sm btn-danger" onclick="this.parentElement.parentElement.parentElement.remove()">X</button>
      </div>
    </div>
  `;
  conectarEventosEquipamentos();
  container.appendChild(div);
}


function coletarEquipVestido() {
  const lista = [];

  document.querySelectorAll("#pjEquipVestido .card").forEach(card => {
    const equip = {
      nome: card.querySelector(".equipNome").value,  
      tipo: card.querySelector(".equipTipo").value,
      pv: card.querySelector(".equipPV").value,
      pe: card.querySelector(".equipPE").value,
      especial: card.querySelector(".equipEspecial").value
    };

    if (equip.tipo.trim() !== "") {
      lista.push(equip);
    }
  });

  return lista;
}

function adicionarVestimenta() {
    const select = document.getElementById("selectVestimenta");
    select.innerHTML = "";

    vestimentas.forEach((v, index) => {
        const op = document.createElement("option");
        op.value = index;
        op.textContent = `${v.nome} — ${v.tipo} (PV ${v.pv}, PE ${v.pe})`;
        select.appendChild(op);
    });

    new bootstrap.Modal(document.getElementById("modalSelecionarVestimenta")).show();
}

function confirmarVestimenta() {
    const valor = document.getElementById("selectVestimenta").value;
    if (valor === "") return;

    const v = vestimentas[valor];

    const div = document.createElement("div");
    div.className = "card p-2 my-2";

    div.innerHTML = `
        <div class="row g-2">
            <div class="col">
                <label class="form-label">Nome</label>
                <input class="form-control equipNome" value="${v.nome}" readonly>
            </div>
            <div class="col">
                <label class="form-label">Tipo</label>
                <input class="form-control equipTipo" value="${v.tipo}" readonly>
            </div>
            <div class="col">
                <label class="form-label">PV</label>
                <input class="form-control equipPV" value="${v.pv}" readonly>
            </div>
            <div class="col">
                <label class="form-label">PE</label>
                <input class="form-control equipPE" value="${v.pe}" readonly>
            </div>
            <div class="col">
                <label class="form-label">Especial</label>
                <input class="form-control equipEspecial" value="${v.especial}" readonly>
            </div>
            <div class="col-1 d-flex align-items-center">
                <button class="btn btn-sm btn-danger" onclick="this.parentElement.parentElement.parentElement.remove(); atualizarPVPEEquip();">X</button>
            </div>
        </div>
    `;

    document.getElementById("pjEquipVestido").appendChild(div);

    atualizarPVPEEquip();

    bootstrap.Modal.getInstance(document.getElementById("modalSelecionarVestimenta")).hide();
}

function gerarVestimentaMagica() {

    // --- ROLAR TABELAS ---
    const p1 = rolar(vmParte1);
    const p2 = rolar(vmParte2);
    const p3 = rolar(vmParte3);

    console.log(p1);
    console.log(p2);
    console.log(p3);
    

    const nomeFinal = `${p1} ${p2} ${p3}`;

    let itemBase = null;
    let tipo = "vestimenta"; // padrão

    // --- IDENTIFICAR SE É ESCUDO OU VESTIMENTA ---
    if (["Broquel","Escudo Simples","Escudo Grande"].includes(p1)) {
        tipo = "escudo";
        itemBase = escudos.find(e =>
            e.nome.toLowerCase().includes(p1.toLowerCase().replace("escudo grande", "escudo pesado"))
        );
    } else {
        itemBase = vestimentas.find(v =>
            v.nome.toLowerCase() === p1.toLowerCase()
        );
    }

    if (!itemBase) {
        alert("Erro: não encontrei a vestimenta base.");
        return;
    }

    // --- CRIAR LISTA DE ESPECIAIS COM PALAVRAS-CHAVE DA PARTE 2 E PARTE 3 ---
    const especiais = [];

    [p2, p3].forEach(parte => {
        descritoresVestimenta.forEach(desc => {
            if (parte.toLowerCase().includes(desc.nome.toLowerCase())) {
                especiais.push(desc.nome);
            }
        });
    });

    // adicionar especial base da peça se existir
    if (itemBase.especial) especiais.push(itemBase.especial);

    // --- CRIAR OBJETO FINAL ---
    const itemMagico = {
        nome: nomeFinal,
        tipo: itemBase.tipo || "Escudo",
        pv: itemBase.pv ?? 0,
        pe: itemBase.pe ?? 0,
        bloqueio: itemBase.bloqueio ?? null,
        custoPE: itemBase.custoPE ?? null,
        especial: especiais
    };

    // --- INSERIR NO PJ ---
    if (tipo === "escudo") {
        preencherEscudoMagico(itemMagico);
    } else {
        preencherVestimentaMagica(itemMagico);
    }

    atualizarPVPEEquip();

    bootstrap.Modal.getInstance(
    document.getElementById("modalSelecionarVestimenta")
    ).hide();
}

function detalharEspeciaisEscudo(pjIndex, escudoIndex) {

    const pj = campanhas[campanhaAtual].pjs[pjIndex];
    if (!pj) {
        console.warn("PJ não encontrado:", pjIndex);
        return;
    }

    // Garante que escudos é sempre array
    if (!Array.isArray(pj.escudos)) {
        pj.escudos = pj.escudos
            ? [pj.escudos]
            : [];
    }

    const lista = pj.escudos;
    const esc = lista[escudoIndex];

    if (!esc) {
        console.warn("Escudo não encontrado:", escudoIndex);
        return;
    }

    // Converte especial → array
    let especiais = esc.especial;

    if (typeof especiais === "string") {
        especiais = especiais
            .split(";")
            .map(s => s.trim())
            .filter(s => s !== "");
    }

    let html = `
        <h5>${esc.nome}</h5>
        <p><b>Bloqueio:</b> ${esc.bloqueio}  
           <b> | Custo de PE:</b> ${esc.custoPE}</p>
        <hr>
        <h5>✨ Especiais</h5>
    `;

    if (especiais.length === 0 || especiais[0] === "" || especiais === "Nada") {
        html += "<i>Este escudo não possui efeitos especiais.</i>";
    } else {
        especiais.forEach(es => {
            const desc = descritoresVestimenta.find(d => 
                d.nome.toLowerCase() === es.toLowerCase()
            );
            html += `
                <p>
                    <b>${es}</b><br>
                    ${desc ? desc.descricao : "<i>Sem descrição cadastrada.</i>"}
                </p>
            `;
        });
    }

    document.getElementById("conteudoEspeciaisEscudo").innerHTML = html;
    new bootstrap.Modal(
        document.getElementById("modalEspeciaisEscudo")
    ).show();
}

function confirmarEscudo() {
    const valor = document.getElementById("selectEscudo").value;
    const escudosDiv = document.getElementById("pjEscudos");

    // === Escudo mágico (placeholder) ===
    if (valor === "magico") {
        const div = document.createElement("div");
        div.className = "card p-2 my-2";
        div.innerHTML = `
            <div><b>Escudo Mágico</b> — <i>geração futura</i></div>
            <button class="btn btn-sm btn-danger" onclick="this.parentElement.remove()">X</button>
        `;
        escudosDiv.appendChild(div);

        bootstrap.Modal.getInstance(document.getElementById("modalSelecionarEscudo")).hide();
        return;
    }

    const esc = escudos[valor];

    const div = document.createElement("div");
    div.className = "card p-2 my-2";

    div.innerHTML = `
        <div class="row g-2">
            <div class="col">
                <label class="form-label">Nome</label>
                <input class="form-control escudoNome" value="${esc.nome}" readonly>
            </div>
            <div class="col">
                <label class="form-label">Bloqueio</label>
                <input class="form-control escudoBloqueio" value="${esc.bloqueio}" readonly>
            </div>
            <div class="col">
                <label class="form-label">Custo</label>
                <input class="form-control escudoCusto" value="${esc.custoPE}" readonly>
            </div>
            <div class="col">
                <label class="form-label">Especial</label>
                <input class="form-control escudoEspecial" value="${esc.especial}" readonly>
            </div>
            <div class="col-1 d-flex align-items-center">
                <button class="btn btn-sm btn-danger" onclick="this.parentElement.parentElement.parentElement.remove()">X</button>
            </div>
        </div>
    `;

    escudosDiv.appendChild(div);

    bootstrap.Modal.getInstance(document.getElementById("modalSelecionarEscudo")).hide();
}

function adicionarEscudo() {
    const select = document.getElementById("selectEscudo");
    select.innerHTML = "";

    escudos.forEach((e, index) => {
        const op = document.createElement("option");
        op.value = index;
        op.textContent = 
        `${e.nome} — Bloqueio ${e.bloqueio}`;
        select.appendChild(op);
    });

    new bootstrap.Modal(document.getElementById("modalSelecionarEscudo")).show();
}

function preencherVestimentaMagica(v) {

    const div = document.createElement("div");
    div.className = "card p-2 my-2";

    div.innerHTML = `
        <div class="row g-2">

            <div class="col">
                <label class="form-label">Nome</label>
                <input class="form-control equipNome" value="${v.nome}" readonly>
            </div>

            <div class="col">
                <label class="form-label">Tipo</label>
                <input class="form-control equipTipo" value="${v.tipo}" readonly>
            </div>

            <div class="col">
                <label class="form-label">PV</label>
                <input class="form-control equipPV" value="${v.pv}" readonly>
            </div>

            <div class="col">
                <label class="form-label">PE</label>
                <input class="form-control equipPE" value="${v.pe}" readonly>
            </div>

            <div class="col">
                <label class="form-label">Especial</label>
                <input class="form-control equipEspecial" 
                       value="${v.especial.join("; ")}" readonly>
            </div>

            <div class="col-1 d-flex align-items-end">
                <button class="btn btn-sm btn-danger"
                        onclick="this.parentElement.parentElement.parentElement.remove(); atualizarPVPEEquip();">
                    X
                </button>
            </div>

        </div>
    `;

    document.getElementById("pjEquipVestido").appendChild(div);
}


function detalharEspeciaisVestimenta(pjIndex, equipIndex) {

    const pj = campanhas[campanhaAtual].pjs[pjIndex];
    if (!pj) {
        console.warn("PJ não encontrado:", pjIndex);
        return;
    }

    // Garante que equipamentoVestido é sempre array
    if (!Array.isArray(pj.equipamentoVestido)) {
        pj.equipamentoVestido = pj.equipamentoVestido
            ? [pj.equipamentoVestido]
            : [];
    }

    const lista = pj.equipamentoVestido;
    const vest = lista[equipIndex];

    if (!vest) {
        console.warn("Vestimenta não encontrada:", equipIndex);
        return;
    }

    let especiais = vest.especial;

    if (typeof especiais === "string") {
    especiais = especiais
        .split(";")
        .map(s => s.trim())
        .filter(s => s !== "");
    }

    let html = `
        <h5>${vest.nome}</h5>
        <p><b>Tipo:</b> ${vest.tipo}</p>
        <p><b>PV:</b> ${vest.pv >= 0 ? "+"+vest.pv : vest.pv}  
           <b> | PE:</b> ${vest.pe >= 0 ? "+"+vest.pe : vest.pe}</p>
        <hr>
        <h5>✨ Especiais</h5>
    `;

    if (especiais.length === 0 || especiais[0] === "") {
        html += "<i>Esta vestimenta não possui efeitos especiais.</i>";
    } else {
        especiais.forEach(es => {
            const desc = descritoresVestimenta.find(d => 
                d.nome.toLowerCase() === es.toLowerCase()
            );
            html += `
                <p>
                    <b>${es}</b><br>
                    ${desc ? desc.descricao : "<i>Sem descrição cadastrada.</i>"}
                </p>
            `;
        });
    }

    document.getElementById("conteudoEspeciaisVestimenta").innerHTML = html;
    new bootstrap.Modal(
        document.getElementById("modalEspeciaisVestimenta")
    ).show();
}

function mostrarHabEspecie(especie) {
    const dado = habilidadeEspecies[especie];

    if (!dado) {
        document.getElementById("conteudoHabEspecie").innerHTML =
            `<i>Esta espécie não possui habilidade cadastrada.</i>`;
    } else {
        document.getElementById("conteudoHabEspecie").innerHTML = `
            <h5>${dado.nome}</h5>
            <p><b>PE:</b> ${dado.PE}</p>
            <p>${dado.descricao}</p>
        `;
    }

    new bootstrap.Modal(document.getElementById("modalHabEspecie")).show();
}

function confirmarHabGeral() {
    const select = document.getElementById("selectHabGeral");
    if (!select.value) return alert("Escolha uma habilidade.");

    const { conhecimento, index } = JSON.parse(select.value);
    const hab = habilidadesGerais[conhecimento][index];

    const ul = document.getElementById("pjListaHabilidades");

    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-start";

    li.innerHTML = `
        <div>
            <span class="habilidadeNome"><b>${hab.habilidade}</b></span>
            — <span class="habilidadePE">PE ${hab.PE}</span>
        </div>
        <button class="btn btn-sm btn-danger" onclick="this.parentElement.remove()">X</button>
        <span class="habilidadeDescricao" style="display:none">${hab.descricao}</span>
    `;

    ul.appendChild(li);

    bootstrap.Modal.getInstance(document.getElementById("modalHabGeral")).hide();
}

function abrirHabGeral() {
    const conhecimentos = Array.from(
        document.querySelectorAll("#pjListaConhecimentos li")
    ).map(li => li.childNodes[0].textContent.trim());

    if (!conhecimentos.length) {
        alert("Este personagem não possui conhecimentos — não pode aprender habilidades gerais.");
        return;
    }

    const select = document.getElementById("selectHabGeral");
    select.innerHTML = "";

    conhecimentos.forEach(con => {
        if (habilidadesGerais[con]) {
            habilidadesGerais[con].forEach((hab, i) => {
                const op = document.createElement("option");
                op.value = JSON.stringify({ conhecimento: con, index: i });
                op.textContent = `${hab.habilidade} — (${con}) — PE ${hab.PE}`;
                select.appendChild(op);
            });
        }
    });

    new bootstrap.Modal(document.getElementById("modalHabGeral")).show();
}

function detalharTodasHabilidades(pjIndex) {
    const pj = campanhas[campanhaAtual].pjs[pjIndex];
    let html = `<h4>Habilidades de ${pj.nome}</h4><hr>`;

    if (!pj.habilidades || pj.habilidades.length === 0) {
        html += "<i>Este personagem não possui habilidades.</i>";
    } else {
        pj.habilidades.forEach(h => {
            html += `
                <p>
                    <b>${h.habilidade}</b> — PE ${h.PE}<br>
                    ${h.descricao}
                </p>
                <hr>
            `;
        });
    }

    document.getElementById("conteudoDetalhesHabilidades").innerHTML = html;
    new bootstrap.Modal(document.getElementById("modalDetalhesHabilidades")).show();
}

function detalharHabilidade(nome, pe, descricao) {
    document.getElementById("conteudoHabilidadeDetalhe").innerHTML = `
        <h4>${nome}</h4>
        <p><b>PE:</b> ${pe}</p>
        <p>${descricao}</p>
    `;

    new bootstrap.Modal(
        document.getElementById("modalDetalheHabilidade")
    ).show();
}

function confirmarHabilidadeClasse() {
    const classe = document.getElementById("pjClasse").value;
    const select = document.getElementById("selectHabilidadeClasse");
    const index = Number(select.value);

    const habObj = habilidadesClasse[classe][index];

    // Área da lista
    const ul = document.getElementById("pjListaHabilidades");

    // Criar entrada visual
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-start";

    li.innerHTML = `
        <div>
            <span class="habilidadeNome"><b>${habObj.habilidade}</b></span> 
            — <span class="habilidadePE">PE ${habObj.PE}</span>
        </div>
        <button class="btn btn-sm btn-danger" onclick="this.parentElement.remove()">X</button>
        <span class="habilidadeDescricao" style="display:none">${habObj.descricao}</span>
    `;

    ul.appendChild(li);

    bootstrap.Modal.getInstance(
        document.getElementById("modalHabilidadeClasse")
    ).hide();
}

function abrirHabClasse() {
    const classe = document.getElementById("pjClasse").value;
    if (!classe || !habilidadesClasse[classe]) {
        alert("Escolha uma classe primeiro!");
        return;
    }

    const select = document.getElementById("selectHabilidadeClasse");
    select.innerHTML = "";

    habilidadesClasse[classe].forEach((hab, i) => {
        const op = document.createElement("option");
        op.value = i;
        op.textContent = `${hab.habilidade} — PE ${hab.PE}`;
        select.appendChild(op);
    });

    new bootstrap.Modal(
        document.getElementById("modalHabilidadeClasse")
    ).show();
}

function abrirCriarPJ() {
  mochilaTemp = [];  
  document.getElementById("pjEditando").value = "";  
  document.getElementById("formCriarPJ").reset();
  document.getElementById("modalCriarPjTitulo").innerText = "Criar Novo PJ";
  document.getElementById("salvarPjBtn").onclick = salvarNovoPJ;

  new bootstrap.Modal(document.getElementById("modalCriarPJ")).show();
}

function salvarNovoPJ() {
  const index = document.getElementById("pjEditando").value;
    const pj = coletarDadosPJ();

    if (index === "") {
        // criar
        campanhas[campanhaAtual].pjs.push(pj);
    } else {
        // editar
        campanhas[campanhaAtual].pjs[index] = pj;
    }
  salvarCampanhas();
  listarPJs();

  bootstrap.Modal.getInstance(document.getElementById("modalCriarPJ")).hide();
}

function coletarArmas() {
  const armas = [];

  document.querySelectorAll("#pjArmas .card").forEach(card => {
    const arma = {
      nome: card.querySelector(".armaNome").value,
      dano: card.querySelector(".armaDano").value,
      critico: card.querySelector(".armaCritico").value,
      especial: card.querySelector(".armaEspecial").value
    };

    if (arma.nome.trim() !== "") {
      armas.push(arma);
    }
  });

  return armas;
}


function coletarDadosPJ() {
  return {
    nome: document.getElementById("pjNome").value,
    especie: document.getElementById("pjEspecie").value,
    origem: document.getElementById("pjOrigem").value,
    classe: document.getElementById("pjClasse").value,
    foco: document.getElementById("pjFoco").value,
    motivacao: document.getElementById("pjMotivacao").value,

    pv: {
      especie: document.getElementById("pjPVEspecie").value,
      classe:  document.getElementById("pjPVClasse").value,
      equip:   document.getElementById("pjPVEquip").value,
      max:     document.getElementById("pjPVMax").value,
      atual:   document.getElementById("pjPVAtual").value
    },

    pe: {
      especie: document.getElementById("pjPEEspecie").value,
      classe:  document.getElementById("pjPEClasse").value,
      equip:   document.getElementById("pjPEEquip").value,
      max:     document.getElementById("pjPEMax").value,
      atual:   document.getElementById("pjPEAtual").value
    },

    armas: coletarArmas(),
    escudos: Array.from(document.querySelectorAll("#pjEscudos .card")).map(div => ({
        nome: div.querySelector(".escudoNome")?.value || "",
        bloqueio: parseInt(div.querySelector(".escudoBloqueio")?.value || 0),
        custoPE: parseInt(div.querySelector(".escudoCusto")?.value || 0),
        especial: div.querySelector(".escudoEspecial")?.value || ""
    })),

    equipamentoVestido: coletarEquipVestido(),

    conhecimentos: Array.from(document.querySelectorAll("#pjListaConhecimentos .conhecimentoTexto"))
                   .map(span => span.textContent),
    habilidades: Array.from(document.querySelectorAll("#pjListaHabilidades li")).map(li => ({
    habilidade: li.querySelector(".habilidadeNome").textContent,
    PE: li.querySelector(".habilidadePE").textContent.replace("PE ", ""),
    descricao: li.querySelector(".habilidadeDescricao").textContent
    })),
    mochila: mochilaTemp
  };
}

function listarPJs() {
  const lista = document.getElementById("listaPJs");
  lista.innerHTML = "";

  campanhas[campanhaAtual].pjs.forEach((pj, i) => {
    lista.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <b>${pj.nome}</b>
        <span>
          <button class="btn btn-sm btn-info" onclick="detalharPJ(${i})">Detalhes</button>
          <button class="btn btn-sm btn-warning" onclick="editarPJ(${i})">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="excluirPJ(${i})">Excluir</button>
        </span>
      </li>
    `;
  });
}


function detalharPJ(index) {
    const pj = campanhas[campanhaAtual].pjs[index];
    if (!pj) return;

    // ----- Armas -----
    const armasHTML = (pj.armas && pj.armas.length)
        ? pj.armas.map((a, i) => `
            <li class="mb-2">
                <b>${a.nome}</b> — Dano: ${a.dano}, Crítico: ${a.critico}<br>
                <b>Especiais:</b> ${a.especial}
                <br>
                <button class="btn btn-sm btn-info mt-1" onclick="detalharEspeciaisPJ(${index}, ${i})">
                    Ver Especiais
                </button>
                <button class="btn btn-sm btn-warning" onclick="guardarArma(${index}, ${i})">
                    Guardar
                </button>
            </li>
        `).join("")
        : "<i>Nenhuma arma equipada</i>";

    let escudoHTML = "<i>Nenhum</i>";
    if (pj.escudos && pj.escudos.length > 0) {
        escudoHTML = pj.escudos.map((e, i)=> `
            <div class="border p-2 my-1">
                <b>${e.nome}</b><br>
                Bloqueio: ${e.bloqueio} | Custo PE: ${e.custoPE}<br>
                Especial: ${e.especial}
                <button class="btn btn-sm btn-info mt-1" onclick="detalharEspeciaisEscudo(${index}, ${i})">
                    Ver Especiais
                </button>
                <button class="btn btn-sm btn-warning" onclick="guardarEscudo(${index}, ${i})">
                    Guardar
                </button>
            </div>
        `).join("");
    }

    // ----- Equipamentos -----
   const equipHTML = (pj.equipamentoVestido && pj.equipamentoVestido.length)
    ? pj.equipamentoVestido.map((e, i)=> `
        <div class="border p-2 my-2">
            <b>${e.nome}</b> — ${e.tipo}<br>
            PV ${e.pv >= 0 ? "+"+e.pv : e.pv} | PE ${e.pe >= 0 ? "+"+e.pe : e.pe}<br>
            Especiais: ${Array.isArray(e.especial) ? e.especial.join(", ") : e.especial}
            <br>
            <button class="btn btn-sm btn-info mt-1" onclick="detalharEspeciaisVestimenta(${index}, ${i})">
                Ver Especiais
            </button>
            <button class="btn btn-sm btn-warning" onclick="guardarVestimenta(${index}, ${i})">
                Guardar
            </button>
        </div>
    `).join("")
    : "<i>Nenhum</i>";

    const conhecimentosHTML = pj.conhecimentos.length
        ? pj.conhecimentos.map(c => `<li>${c}</li>`).join("")
        : "<i>Nenhum</i>";

    const habilidadesHTML = pj.habilidades.length
    ? `
        <ul>
            ${pj.habilidades.map(h => `
                <li><b>${h.habilidade}</b> — PE ${h.PE}</li>
            `).join("")}
        </ul>

        <button class="btn btn-sm btn-info mt-2"
            onclick="detalharTodasHabilidades(${index})">
            Ver detalhes das habilidades
        </button>
    `
    : "<i>Nenhuma</i>";

    const mochilaHTML = pj.mochila.length
    ? pj.mochila.map((m, idx)=> {

        // Verificar tipo do item
        const isOutro = m.tipoItem === "Outro";
        const isPocao = m.nome.toLowerCase().includes("poção");
        const isElixir = m.nome.toLowerCase().includes("elixir");

        let botaoAcao = "";

        if (isPocao || isElixir) {
            botaoAcao = `
                <button class="btn btn-sm btn-warning" 
                        onclick="usarPocao(${index}, ${idx})">
                    Usar
                </button>
            `;
        } 
        else if (isOutro) {
            botaoAcao = `
                <button class="btn btn-sm btn-danger" 
                        onclick="removerItemMochilaDireto(${index}, ${idx})">
                    Remover
                </button>
            `;
        } 
        else {
            botaoAcao = `
                <button class="btn btn-sm btn-success" 
                        onclick="equiparItemMochila(${index}, ${idx})">
                    Equipar
                </button>
            `;
        }

        return `
        <div class="border p-2 my-1">
            <b>${m.nome}</b>
            <button class="btn btn-sm btn-info" onclick="detalharItemMochila(${index}, ${idx})">
                Ver Detalhes
            </button>
            ${botaoAcao}
        </div>
        `;
    }).join("")
    : "<i>Vazia</i>";

    // ----- DETALHES DO PJ -----
    document.getElementById("modalDetalhesTitulo").innerText = pj.nome;

    document.getElementById("modalDetalhesCorpo").innerHTML = `
        <p>
            <b>Espécie:</b> ${pj.especie}
            <button class="btn btn-sm btn-info ms-2"
                    onclick="mostrarHabEspecie('${pj.especie}')">
                    Habilidade da Espécie
            </button>
        </p><br>
        <b>Origem:</b> ${pj.origem}<br>
        <b>Classe:</b> ${pj.classe}<br>
        <b>Foco:</b> ${pj.foco}<br>
        <b>Motivação:</b> ${pj.motivacao}<br><br>

        <h5>✨ Pontos de Vida</h5>
        <b>PV (Espécie):</b> ${pj.pv.especie} &nbsp; 
        <b>PV (Classe):</b> ${pj.pv.classe} &nbsp;
        <b>PV (Equip):</b> ${pj.pv.equip} <br>

        <div class="d-flex align-items-center gap-2 my-2">
            <b>Atual:</b>

            <button class="btn btn-sm btn-danger"
                    onclick="alterarPV(${index}, -1)">
                -
            </button>

            <span id="pvAtualDisplay"
                class="badge bg-danger text-light fs-5 px-3">
                ${parseInt(pj.pv.atual) || 0}
            </span>

            <button class="btn btn-sm btn-success"
                    onclick="alterarPV(${index}, +1)">
                +
            </button>

            <span class="ms-3"><b>Máximo:</b> ${pj.pv.max}</span>
        </div>
        <br>

        <h5>🔷 Pontos de Energia</h5>
        <b>PE (Espécie):</b> ${pj.pe.especie} &nbsp; 
        <b>PE (Classe):</b> ${pj.pe.classe} &nbsp;
        <b>PE (Equip):</b> ${pj.pe.equip} <br>

        <div class="d-flex align-items-center gap-2 my-2">
            <b>Atual:</b>

            <button class="btn btn-sm btn-danger"
                    onclick="alterarPE(${index}, -1)">
                -
            </button>

            <span id="peAtualDisplay"
                class="badge bg-primary text-light fs-5 px-3">
                ${parseInt(pj.pe.atual) || 0}
            </span>

            <button class="btn btn-sm btn-success"
                    onclick="alterarPE(${index}, +1)">
                +
            </button>

            <span class="ms-3"><b>Máximo:</b> ${pj.pe.max}</span>
        </div>
        <br>

        <div class="mt-3">
            <h5>💤 Descanso</h5>

            <button class="btn btn-warning btn-sm me-2"
                    onclick="descansoCurto(${index})">
                Descanso Curto
            </button>

            <button class="btn btn-success btn-sm"
                    onclick="abrirDescansoLongo(${index})">
                Descanso Longo
            </button>
        </div>
        <hr>

        <h5>🗡 Armas em Mãos</h5>
        <ul>${armasHTML}</ul>

        <h5 class="mt-3">🛡 Escudo / Ferramenta</h4>
        <ul>${escudoHTML}</ul>

        <h5>🛡 Equipamento Vestido</h5>
        <ul>${equipHTML}</ul>

        <h5>📚 Conhecimentos</h5>
        <ul>${conhecimentosHTML}</ul>

        <h5>✨ Habilidades</h5>
        <ul>${habilidadesHTML}</ul>

        <h5>🎒 Mochila</h5>
        <ul>${mochilaHTML}</ul>

        <br>
        <button class="btn btn-primary" onclick="editarPJ(${index})">Editar</button>
    `;

    new bootstrap.Modal(document.getElementById("modalDetalhes")).show();
}

function detalharEspeciaisPJ(pjIndex, armaIndex) {
    const pj = campanhas[campanhaAtual]?.pjs?.[pjIndex];
    if (!pj) return alert("PJ não encontrado.");

    const arma = pj.armas?.[armaIndex];
    if (!arma) return alert("Arma não encontrada.");

    // normatiza lista de especiais
    let especiais = [];
    if (arma.especial) {
        if (Array.isArray(arma.especial)) {
            especiais = arma.especial.map(s => String(s).trim());
        } else {
            especiais = String(arma.especial).split(";").map(s => s.trim());
        }
    }

    // efeitos de arma mágica (arma.efeitos existe apenas para mágicas)
    let efeitosMagicos = [];
    if (Array.isArray(arma.efeitos)) {
        efeitosMagicos = arma.efeitos.map(s => String(s).trim());
    }

    function montarEspeciais(nomes) {
        if (!nomes.length) return "<i>Nenhum</i>";

        return nomes.map(nome => {
            const desc = descritoresAm.find(d => d.nome.toLowerCase() === nome.toLowerCase());
            if (desc) {
                return `<b>${desc.nome}</b>: ${desc.efeito}<br>`;
            }
            return `<b>${nome}</b>: <i>Sem descrição encontrada</i><br>`;
        }).join("");
    }

    const html = `
        <h4>${arma.nome}</h4>
        <p><b>Dano:</b> ${arma.dano} | <b>Crítico:</b> ${arma.critico}</p>

        <h5>⭐ Especiais Normais</h5>
        ${montarEspeciais(especiais)}
        <hr>

        <h5>✨ Especiais Mágicos</h5>
        ${efeitosMagicos.length ? montarEspeciais(efeitosMagicos) : "<i>Esta arma não possui efeitos mágicos</i>"}
    `;

    document.getElementById("modalDetalhesEspeciaisCorpo").innerHTML = html;
    new bootstrap.Modal(document.getElementById("modalDetalhesEspeciais")).show();
}


function editarPJ(index) {
    const modalElemento = document.getElementById("modalDetalhes");
    const detalhesModal = bootstrap.Modal.getInstance(modalElemento);
    if (detalhesModal) {
        detalhesModal.hide();
    } else {
        console.error("Instância do Modal não encontrada.");
    }

    const pj = campanhas[campanhaAtual].pjs[index];
    if (!pj) return;

    document.getElementById("modalCriarPjTitulo").innerText = "Editar Personagem";

    // --- CAMPOS BÁSICOS ---
    document.getElementById("pjNome").value = pj.nome;
    document.getElementById("pjEspecie").value = pj.especie;
    document.getElementById("pjOrigem").value = pj.origem;
    document.getElementById("pjClasse").value = pj.classe;
    document.getElementById("pjFoco").value = pj.foco;
    document.getElementById("pjMotivacao").value = pj.motivacao;

    // --- PV ---
    document.getElementById("pjPVEspecie").value = pj.pv.especie;
    document.getElementById("pjPVClasse").value = pj.pv.classe;
    document.getElementById("pjPVEquip").value = pj.pv.equip;
    document.getElementById("pjPVMax").value = pj.pv.max;
    document.getElementById("pjPVAtual").value = pj.pv.atual;

    // --- PE ---
    document.getElementById("pjPEEspecie").value = pj.pe.especie;
    document.getElementById("pjPEClasse").value = pj.pe.classe;
    document.getElementById("pjPEEquip").value = pj.pe.equip;
    document.getElementById("pjPEMax").value = pj.pe.max;
    document.getElementById("pjPEAtual").value = pj.pe.atual;

    // --- ARMAS ---
    const armasDiv = document.getElementById("pjArmas");
    armasDiv.innerHTML = "";

    (pj.armas || []).forEach(a => {
        const div = document.createElement("div");
        div.className = "card p-2 my-2";

        div.innerHTML = `
            <div class="row g-2">

              <div class="col">
                <label class="form-label">Nome da Arma</label>
                <input class="form-control armaNome" value="${a.nome}">
              </div>

              <div class="col">
                <label class="form-label">Dano</label>
                <input class="form-control armaDano" value="${a.dano}">
              </div>

              <div class="col">
                <label class="form-label">Crítico</label>
                <input class="form-control armaCritico" value="${a.critico}">
              </div>

              <div class="col">
                <label class="form-label">Especial</label>
                <input class="form-control armaEspecial" value="${a.especial}">
              </div>

              <div class="col-1 d-flex align-items-end">
                <button class="btn btn-sm btn-danger" 
                        onclick="this.parentElement.parentElement.parentElement.remove();">
                  X
                </button>
              </div>

            </div>
        `;

        armasDiv.appendChild(div);
    });

    // --- ESCUDOS ---
    const escudosDiv = document.getElementById("pjEscudos");
    escudosDiv.innerHTML = "";

    (pj.escudos || []).forEach(e => {
        const div = document.createElement("div");
        div.className = "card p-2 my-2";

        div.innerHTML = `
            <div class="row g-2">

                <div class="col">
                    <label class="form-label">Nome</label>
                    <input class="form-control escudoNome" value="${e.nome}" readonly>
                </div>

                <div class="col">
                    <label class="form-label">Bloqueio</label>
                    <input class="form-control escudoBloqueio" value="${e.bloqueio}" readonly>
                </div>

                <div class="col">
                    <label class="form-label">Custo PE</label>
                    <input class="form-control escudoCusto" value="${e.custoPE}" readonly>
                </div>

                <div class="col">
                    <label class="form-label">Especial</label>
                    <input class="form-control escudoEspecial" value="${e.especial}" readonly>
                </div>

                <div class="col-1 d-flex align-items-center">
                    <button class="btn btn-sm btn-danger"
                        onclick="this.parentElement.parentElement.parentElement.remove()">
                        X
                    </button>
                </div>

            </div>
        `;
        escudosDiv.appendChild(div);
    });


    const equipDiv = document.getElementById("pjEquipVestido");
    equipDiv.innerHTML = "";
    (pj.equipamentoVestido || []).forEach(e => {
        const div = document.createElement("div");
        div.className = "card p-2 my-2";

        div.innerHTML = `
        <div class="row g-2">

          <div class="col">
            <label class="form-label">Nome</label>
            <input class="form-control equipNome" value="${e.nome}" readonly>
          </div>

          <div class="col">
            <label class="form-label">Tipo</label>
            <input class="form-control equipTipo" value="${e.tipo}" readonly>
          </div>

          <div class="col">
            <label class="form-label">PV</label>
            <input class="form-control equipPV" value="${e.pv}" readonly>
          </div>

          <div class="col">
            <label class="form-label">PE</label>
            <input class="form-control equipPE" value="${e.pe}" readonly>
          </div>

          <div class="col">
            <label class="form-label">Especial</label>
            <input class="form-control equipEspecial" value="${e.especial}" readonly>
          </div>

          <div class="col-1 d-flex align-items-center">
            <button class="btn btn-sm btn-danger"
                    onclick="this.parentElement.parentElement.parentElement.remove(); atualizarPVPEEquip();">
              X
            </button>
          </div>

        </div>
    `;

    equipDiv.appendChild(div);
    });

    // --- CONHECIMENTOS ---
    const listaConhec = document.getElementById("pjListaConhecimentos");
    listaConhec.innerHTML = "";

    (pj.conhecimentos || []).forEach(c => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `${c} 
            <button class="btn btn-sm btn-danger" onclick="this.parentElement.remove()">X</button>`;
        listaConhec.appendChild(li);
    });

    // --- HABILIDADES ---
    const habLista = document.getElementById("pjListaHabilidades");
    habLista.innerHTML = "";

    pj.habilidades.forEach(h => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-start";

        li.innerHTML = `
            <div>
                <span class="habilidadeNome"><b>${h.habilidade}</b></span>
                — <span class="habilidadePE">PE ${h.PE}</span>
            </div>
            <button class="btn btn-sm btn-danger" onclick="this.parentElement.remove()">X</button>
            <span class="habilidadeDescricao" style="display:none">${h.descricao}</span>
        `;

        habLista.appendChild(li);
    });

    // --- MOCHILA ---
    carregarPJNosCampos(pj);

    // --- SALVAR O ÍNDICE ---
    document.getElementById("pjEditando").value = index;
    document.getElementById("salvarPjBtn").onclick = salvarNovoPJ;

    setTimeout(() => {
        conectarEventosEspecieClasse();
        conectarEventosEquipamentos();

        atualizarEspeciePVPE();
        atualizarPVPEClasse();
        atualizarPVPEEquip();
        atualizarTotaisPVPE();
    }, 80);

    new bootstrap.Modal(document.getElementById("modalCriarPJ")).show();
}


function atualizarPJs() {
    listarPJs();
}

function excluirPJ(index) {
    if (!confirm("Excluir este PJ?")) return;

    campanhas[campanhaAtual].pjs.splice(index, 1);
    salvarCampanhas();
    listarPJs();
}



function abrirEscolhaArma() {
    const sel = document.getElementById("listaArmas");
    sel.innerHTML = `
      <option value="">Selecione uma arma</option>
      <option value="MAGICA">✨ Arma Mágica</option>
    `;

    armasLista.forEach((a, i) => {
        sel.innerHTML += `<option value="${i}">${a.Nome} (${a.Tipo})</option>`;
    });

    document.getElementById("previewArma").innerHTML = "";

    new bootstrap.Modal(document.getElementById("modalEscolherArma")).show();
}

document.getElementById("listaArmas").addEventListener("change", function() {
    const value = this.value;

    if (value === "MAGICA") {
        document.getElementById("previewArma").innerHTML =
            `<div class="alert alert-info">A arma mágica será gerada por lógica especial futura!</div>`;
        return;
    }

    if (value === "") {
        document.getElementById("previewArma").innerHTML = "";
        return;
    }

    const arma = armasLista[value];

    document.getElementById("previewArma").innerHTML = `
        <div class="card p-2">
            <b>${arma.Nome}</b><br>
            Tipo: ${arma.Tipo}<br>
            Dano: ${arma.Dano}<br>
            Crítico: ${arma.Critico}<br>
            Especial: ${arma.Especial}
        </div>
    `;
});

function confirmarEscolhaArma() {
    const sel = document.getElementById("listaArmas").value;

    if (!sel) return alert("Escolha uma arma.");

    if (sel === "MAGICA") {

        const a = gerarArmaMagica();
        if (!a) return;

        // Cria um novo card de arma automaticamente
        adicionarArmaComValores(
            a.nome,
            a.dano,
            a.critico,
            a.especial.join("; ")
        );

        // Guarda os efeitos mágicos no último card criado
        const cards = document.querySelectorAll("#pjArmas .card");
        const ultimo = cards[cards.length - 1];
        ultimo.querySelector(".armaEspecial").dataset.efeitos = JSON.stringify(a.efeitos);

        bootstrap.Modal.getInstance(document.getElementById("modalEscolherArma")).hide();
        return;
    }

    const arma = armasLista[sel];

    adicionarArmaComValores(arma.Nome, arma.Dano, arma.Critico, arma.Especial);

    bootstrap.Modal.getInstance(document.getElementById("modalEscolherArma")).hide();
}

function adicionarArmaComValores(nome, dano, critico, especial) {
    const armasDiv = document.getElementById("pjArmas");

    const div = document.createElement("div");
    div.className = "card p-2 my-2";
    div.innerHTML = `
        <div class="row g-2">

          <div class="col">
            <label class="form-label">Nome</label>
            <input class="form-control armaNome" value="${nome}">
         </div>
         <div class="col">
            <label class="form-label">Dano</label>
            <input class="form-control armaDano" value="${dano}">
         </div>
         <div class="col">
            <label class="form-label">Crítico</label>
            <input class="form-control armaCritico" value="${critico}">
         </div>
         <div class="col">
            <label class="form-label">Especial</label>
            <input class="form-control armaEspecial" value="${especial}">
         </div>
          
          <div class="col-1 d-flex align-items-center">
            <button class="btn btn-sm btn-danger" onclick="this.parentElement.parentElement.parentElement.remove()">X</button>
          </div>
        </div>
        `;

    armasDiv.appendChild(div);
}

function gerarArmaMagica() {

    // 1. Rolagens das tabelas
    const parte1 = r(amParte1);
    const parte2 = r(amParte2);
    const parte3 = r(amParte3);

    // 2. Buscar arma base
    const nomeBase = armaMagicaMap[parte1] || parte1;

    const armaBase = armasLista.find(a => a.Nome.toLowerCase() === nomeBase.toLowerCase());

    if (!armaBase) {
        alert("Erro: arma base não encontrada para " + parte1);
        return null;
    }

    // 3. Encontrar descritores usados
    const desc1 = descritoresAm.find(d => parte2.includes(d.nome)) || null;
    const desc2 = descritoresAm.find(d => parte3.includes(d.nome)) || null;

    // 4. Criar arma mágica final
    const arma = {
        nome: `${armaBase.Nome} ${parte2} ${parte3}`,
        tipo: armaBase.Tipo,
        dano: armaBase.Dano,
        critico: armaBase.Critico,
        especial: [],
        efeitos: []
    };

    // pegar o Especial base
    if (armaBase.Especial && armaBase.Especial !== "-") {
        arma.especial = armaBase.Especial.split(";").map(s => s.trim());
    }

    // adicionar o nome dos descritores como "habilidades mágicas"
    if (desc1) {
        arma.especial.push(desc1.nome);
        arma.efeitos.push(desc1.efeito);
    }
    if (desc2) {
        arma.especial.push(desc2.nome);
        arma.efeitos.push(desc2.efeito);
    }

    return arma;
}


function preencherEscudoMagico(e) {
    const escudosDiv = document.getElementById("pjEscudos");

    const div = document.createElement("div");
    div.className = "card p-2 my-2";

    div.innerHTML = `
        <div class="row g-2">

            <div class="col">
                <label class="form-label">Nome</label>
                <input class="form-control escudoNome" value="${e.nome}" readonly>
            </div>

            <div class="col">
                <label class="form-label">Bloqueio</label>
                <input class="form-control escudoBloqueio" value="${e.bloqueio}" readonly>
            </div>

            <div class="col">
                <label class="form-label">Custo</label>
                <input class="form-control escudoCusto" value="${e.custoPE}" readonly>
            </div>

            <div class="col">
                <label class="form-label">Especial</label>
                <input class="form-control escudoEspecial" value="${e.especial.join("; ")}" readonly>
            </div>

            <div class="col-1 d-flex align-items-center">
                <button class="btn btn-sm btn-danger"
                        onclick="this.parentElement.parentElement.parentElement.remove()">
                    X
                </button>
            </div>
        </div>
    `;

    escudosDiv.appendChild(div);
}

function coletarMochila() {
    return Array.from(document.querySelectorAll(".item-mochila")).map(div => {
        return {
            nome: div.dataset.nome,
            descricao: div.dataset.descricao
        };
    });
}

function detalharItemMochila(pjIndex, itemIndex) {
    const pj = campanhas[campanhaAtual].pjs[pjIndex];
    const item = pj.mochila[itemIndex];

    document.getElementById("conteudoItemMochila").innerHTML = `
        <h5>${item.nome}</h5>
        <p>${item.descricao}</p>
    `;

    new bootstrap.Modal(document.getElementById("modalItemMochila")).show();
}


function equiparItemMochila(pjIndex, itemIndex) {
    const pj = campanhas[campanhaAtual].pjs[pjIndex];
    const pack = pj.mochila[itemIndex];

    if (!pack || !pack.item || !pack.tipoItem) {
        alert("Item inválido.");
        return;
    }

    const item = pack.item;

    switch(pack.tipoItem) {
        case "Arma":
            pj.armas.push(item);
            break;
        case "Escudo":
            pj.escudos.push(item);
            break;
        case "Vestimenta":
            pj.equipamentoVestido.push(item);
            break;
        default:
            alert("Tipo desconhecido.");
            return;
    }

    pj.mochila.splice(itemIndex, 1);
    salvarCampanhas();
    detalharPJ(pjIndex);
}


function reconstruirArma(item) {
    const dano = item.descricao.match(/Dano:\s*(\d+)/i)?.[1] || "1";
    const crit = item.descricao.match(/Crítico:\s*(\d+)/i)?.[1] || "6";
    const esp  = item.descricao.match(/Especial:\s*([\w\s,;]+)/i)?.[1] || "-";

    return {
        nome: item.nome,
        dano,
        critico: crit,
        especial: esp
    };
}

function reconstruirEscudo(item) {
    const bloq = item.descricao.match(/Bloqueio:\s*(\d+)/i)?.[1] || 1;
    const custo = item.descricao.match(/Custo:\s*(\d+)/i)?.[1] || 0;
    const esp = item.descricao.match(/Especial:\s*([\w\s,;]+)/i)?.[1] || "-";

    return {
        nome: item.nome,
        bloqueio: Number(bloq),
        custoPE: Number(custo),
        especial: esp
    };
}

function reconstruirVestimenta(item) {
    const pv = item.descricao.match(/PV\s*([+-]?\d+)/i)?.[1] || 0;
    const pe = item.descricao.match(/PE\s*([+-]?\d+)/i)?.[1] || 0;
    const esp = item.descricao.match(/Especial:\s*([\w\s,;]+)/i)?.[1] || "-";

    return {
        nome: item.nome,
        tipo: "Vestimenta",
        pv: Number(pv),
        pe: Number(pe),
        especial: esp
    };
}

function abrirModalAdicionarMochila() {
    const sel = document.getElementById("selectMochilaItem");
    sel.innerHTML = `<option value="">Selecione um item...</option>`;

    outrosEquip.forEach((item, i) => {
        const op = document.createElement("option");
        op.value = i;
        op.textContent = `${item.nome} — (${item.acesso})`;
        sel.appendChild(op);
    });
    const modal = new bootstrap.Modal(document.getElementById("modalSelecionarMochila"), {
        backdrop: 'static',
        keyboard: false
    });

    modal.show();
    document.getElementById("modalSelecionarMochila")
    .addEventListener("submit", e => e.preventDefault());
}

function mostrarDetalhesItemMochila(index) {
    const item = mochilaTemp[index];

    document.getElementById("conteudoItemMochila").innerHTML = `
        <h5>${item.nome}</h5>
        <p>${item.descricao}</p>
    `;

    new bootstrap.Modal(document.getElementById("modalItemMochila")).show();
}

function editarItemMochila(index) {
    const item = mochilaTemp[index];
    mochilaEditIndex = index;

    document.getElementById("mochilaNome").value = item.nome;
    document.getElementById("mochilaDescricao").value = item.descricao;

    new bootstrap.Modal(document.getElementById("modalMochila")).show();
}

function salvarItemMochila() {
    const nome = document.getElementById("mochilaNome").value.trim();
    const desc = document.getElementById("mochilaDescricao").value.trim();

    if (!nome) return alert("O item precisa ter um nome.");

    const item = { nome, descricao: desc };

    if (mochilaEditIndex === null) {
        mochilaTemp.push(item);
    } else {
        mochilaTemp[mochilaEditIndex] = item;
    }

    bootstrap.Modal.getInstance(document.getElementById("modalMochila")).hide();
    renderizarMochilaTemp();
}

function removerItemMochila(index) {
    if (!confirm("Remover este item?")) return;
    mochilaTemp.splice(index, 1);
    renderizarMochilaTemp();
}

function renderizarMochilaTemp() {
    const div = document.getElementById("listaMochila");

    if (!mochilaTemp.length) {
        div.innerHTML = "<i>Nenhum item na mochila.</i>";
        return;
    }

    div.innerHTML = mochilaTemp.map((item, i) => `
        <div class="border p-2 mb-2 rounded">
            <b>${item.nome}</b>
            <button class="btn btn-sm btn-danger float-end"
                onclick="removerItemMochila(${i})">X</button>
        </div>
    `).join("");
}

function carregarPJNosCampos(pj) {
    mochilaTemp = JSON.parse(JSON.stringify(pj.mochila || []));
    renderizarMochilaTemp();
}

function guardarArma(pjIndex, armaIndex) {
    const pj = campanhas[campanhaAtual].pjs[pjIndex];
    const arma = pj.armas[armaIndex];

    if (!pj.mochila) pj.mochila = [];

    let especiais = [];
    if (arma.especial) {
        if (Array.isArray(arma.especial)) especiais = arma.especial;
        else especiais = arma.especial.split(";").map(s => s.trim());
    }

    const descricao =
        `Dano: ${arma.dano} | ` +
        `Crítico: ${arma.critico}` +
        (especiais.length ? ` | Especiais: ${especiais.join(", ")}` : "") +
        (arma.efeitos ? ` | Efeitos Mágicos: ${arma.efeitos.join(", ")}` : "");

    pj.mochila.push({
        nome: arma.nome,
        tipoItem: "Arma",
        descricao,
        item: arma
    });

    pj.armas.splice(armaIndex, 1);
    salvarCampanhas();
    detalharPJ(pjIndex);
}



function guardarEscudo(pjIndex, escudoIndex) {
    const pj = campanhas[campanhaAtual].pjs[pjIndex];
    const esc = pj.escudos[escudoIndex];

    if (!pj.mochila) pj.mochila = [];

    let especiais = [];
    if (esc.especial) {
        if (Array.isArray(esc.especial)) especiais = esc.especial;
        else especiais = esc.especial.split(";").map(s => s.trim());
    }

    const descricao =
        `Bloqueio: ${esc.bloqueio} | ` +
        `Custo PE: ${esc.custoPE}` +
        (especiais.length ? ` | Especiais: ${especiais.join(", ")}` : "");

    pj.mochila.push({
        nome: esc.nome,
        tipoItem: "Escudo",
        descricao,
        item: esc
    });

    pj.escudos.splice(escudoIndex, 1);
    salvarCampanhas();
    detalharPJ(pjIndex);
}

function guardarVestimenta(pjIndex, vestIndex) {
    const pj = campanhas[campanhaAtual].pjs[pjIndex];
    const vest = pj.equipamentoVestido[vestIndex];

    if (!pj.mochila) pj.mochila = [];

    let especiais = [];
    if (vest.especial) {
        if (Array.isArray(vest.especial)) especiais = vest.especial;
        else especiais = vest.especial.split(";").map(s => s.trim());
    }

    const descricao =
        `Tipo: ${vest.tipo} | ` +
        `PV: ${vest.pv >= 0 ? "+" + vest.pv : vest.pv} | ` +
        `PE: ${vest.pe >= 0 ? "+" + vest.pe : vest.pe}` +
        (especiais.length ? ` | Especiais: ${especiais.join(", ")}` : "");

    pj.mochila.push({
        nome: vest.nome,
        tipoItem: "Vestimenta",
        descricao,
        item: vest
    });

    pj.equipamentoVestido.splice(vestIndex, 1);
    salvarCampanhas();
    detalharPJ(pjIndex);
}

function limparBackdrops() {
    document.querySelectorAll(".modal-backdrop").forEach(b => b.remove());
    document.body.classList.remove("modal-open");
    document.body.style.removeProperty("overflow");
    document.body.style.removeProperty("padding-right");
}



document.getElementById("selectMochilaItem").addEventListener("change", function() {
    const idx = this.value;
    const preview = document.getElementById("previewMochilaItem");

    if (idx === "") {
        preview.innerHTML = "";
        return;
    }

    const item = outrosEquip[idx];

    preview.innerHTML = `
        <div class="card p-2">
            <b>${item.nome}</b><br>
            <i>Acesso:</i> ${item.acesso}<br>
            <p class="mt-2">${item.descricao}</p>
        </div>
    `;
});

function confirmarItemMochila() {
    const idx = document.getElementById("selectMochilaItem").value;
    if (idx === "") return alert("Escolha um item.");

    const item = outrosEquip[idx];

    mochilaTemp.push({
        nome: item.nome,
        descricao: item.descricao,
        tipoItem: "Outro",
        item // salva objeto inteiro para expansões futuras
    });

    bootstrap.Modal.getInstance(document.getElementById("modalSelecionarMochila")).hide();
    renderizarMochilaTemp();
}

function removerItemMochilaDireto(pjIndex, itemIndex) {
    const pj = campanhas[campanhaAtual].pjs[pjIndex];

    if (!confirm("Deseja remover este item da mochila?")) return;

    pj.mochila.splice(itemIndex, 1);

    salvarCampanhas();
    detalharPJ(pjIndex);
}

function usarPocao(pjIndex, itemIndex) {
    const pj = campanhas[campanhaAtual].pjs[pjIndex];
    const item = pj.mochila[itemIndex];

    if (!confirm(`Usar ${item.nome}?`)) return;

    if(item.nome === "Elixir Universal"){
        if (!pj) return;

            pj.pv.atual = pj.pv.max;
            pj.pe.atual = pj.pe.max;

            salvarCampanhas();

            // atualiza exibição no modal
            document.getElementById("pvAtualDisplay").textContent = pj.pv.atual;
            document.getElementById("peAtualDisplay").textContent = pj.pe.atual;

            alert("PV e PE totalmente recuperados.")       
    }else if(item.nome === "Poção de Vitalidade"){
        if (!pj) return;
        pj.pv.atual = pj.pv.max;

        salvarCampanhas();

        // atualiza exibição no modal
        document.getElementById("pvAtualDisplay").textContent = pj.pv.atual;

        alert("PV  totalmente recuperado.")     
    }

    pj.mochila.splice(itemIndex, 1);

    salvarCampanhas();
    detalharPJ(pjIndex);
}


function alterarPV(pjIndex, delta) {
    const pj = campanhas[campanhaAtual].pjs[pjIndex];
    if (!pj) return;

    let atual = lerNumeroSeguro("pvAtualDisplay");
    let max = pj.pv.max;

    atual = Math.max(0, Math.min(max, atual + delta));

    pj.pv.atual = atual;
    document.getElementById("pvAtualDisplay").textContent = atual;

    salvarCampanhas();
}

function alterarPE(pjIndex, delta) {
    const pj = campanhas[campanhaAtual].pjs[pjIndex];
    if (!pj) return;

    let atual = lerNumeroSeguro("peAtualDisplay");
    let max = pj.pe.max;

    atual = Math.max(0, Math.min(max, atual + delta));

    pj.pe.atual = atual;
    document.getElementById("peAtualDisplay").textContent = atual;

    salvarCampanhas();
}


function descansoCurto(pjIndex) {
    const pj = campanhas[campanhaAtual].pjs[pjIndex];
    if (!pj) return;

    pj.pe.atual = pj.pe.max; // recupera total

    salvarCampanhas();

    // atualiza valor exibido no modal
    document.getElementById("peAtualDisplay").textContent = pj.pe.atual;

    alert("Descanso curto concluído! PE totalmente recuperado.");
}

function abrirDescansoLongo(pjIndex) {
    const modal = new bootstrap.Modal(document.getElementById("modalDescansoLongo"));
    modal.show();

    // Liga os botões
    document.getElementById("btnZonaSegura").onclick = () => {
        descansoLongo(pjIndex, true);
        modal.hide();
    };

    document.getElementById("btnZonaPerigosa").onclick = () => {
        descansoLongo(pjIndex, false);
        modal.hide();
    };
}

function descansoLongo(pjIndex, zonaSegura) {
    const pj = campanhas[campanhaAtual].pjs[pjIndex];
    if (!pj) return;

    if (zonaSegura) {
        // recupera tudo
        pj.pv.atual = pj.pv.max;
        pj.pe.atual = pj.pe.max;
    } else {
        // Zona perigosa
        const metadePV = Math.floor(pj.pv.max / 2);

        pj.pv.atual = Math.min(pj.pv.max, pj.pv.atual + metadePV);
        pj.pe.atual = pj.pe.max;
    }

    salvarCampanhas();

    // atualiza exibição no modal
    document.getElementById("pvAtualDisplay").textContent = pj.pv.atual;
    document.getElementById("peAtualDisplay").textContent = pj.pe.atual;

    alert(
        zonaSegura
            ? "Descanso longo em zona segura concluído! PV e PE totalmente recuperados."
            : "Descanso longo perigoso concluído!\nPV recuperado até metade do máximo.\nPE totalmente recuperado."
    );
}

function lerNumeroSeguro(id) {
    const el = document.getElementById(id);
    if (!el) return 0;

    const raw = el.textContent.replace(/\D+/g, ""); // remove tudo que não é número

    return raw === "" ? 0 : parseInt(raw);
}

function aumentarPVAtual(pjIndex) {
    const pj = campanhas[campanhaAtual].pjs[pjIndex];

    let atual = lerNumeroSeguro("pvAtualDisplay");
    let max = pj.pv.max;

    atual = Math.min(max, atual + 1);

    pj.pv.atual = atual;
    document.getElementById("pvAtualDisplay").textContent = atual;
    salvarCampanhas();
}

function diminuirPVAtual(pjIndex) {
    const pj = campanhas[campanhaAtual].pjs[pjIndex];

    let atual = lerNumeroSeguro("pvAtualDisplay");

    atual = Math.max(0, atual - 1);

    pj.pv.atual = atual;
    document.getElementById("pvAtualDisplay").textContent = atual;
    salvarCampanhas();
}

function aumentarPEAtual(pjIndex) {
    const pj = campanhas[campanhaAtual].pjs[pjIndex];

    let atual = lerNumeroSeguro("peAtualDisplay");
    let max = pj.pe.max;

    atual = Math.min(max, atual + 1);

    pj.pe.atual = atual;
    document.getElementById("peAtualDisplay").textContent = atual;
    salvarCampanhas();
}

function diminuirPEAtual(pjIndex) {
    const pj = campanhas[campanhaAtual].pjs[pjIndex];

    let atual = lerNumeroSeguro("peAtualDisplay");

    atual = Math.max(0, atual - 1);

    pj.pe.atual = atual;
    document.getElementById("peAtualDisplay").textContent = atual;
    salvarCampanhas();
}

function abrirModalDetalhePjs() {
  const select = document.getElementById("selectPJ");
  const listaPjModal = document.getElementById("listaPjModal");
  select.innerHTML = "";

    //console.log("DEBUG listarPJs -> campanhaAtual:", campanhaAtual);
    //console.log("DEBUG listarPJs -> campanhas:", campanhas);

  campanhas[campanhaAtual].pjs.forEach((pj, i) => {
    select.innerHTML += `<option value="${i}">${pj.nome}</option>`;
  });

  // abre o modal
  const modal = new bootstrap.Modal(document.getElementById("modalSelecionarPJ"));
  modal.show();
}

function confirmarSelecionarPJ() {
  const select = document.getElementById("selectPJ");
  const indice = select.value;

  detalharPJ(indice);

  // fechar modal
  const modal = bootstrap.Modal.getInstance(document.getElementById("modalSelecionarPJ"));
  modal.hide();
}