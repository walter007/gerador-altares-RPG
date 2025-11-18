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