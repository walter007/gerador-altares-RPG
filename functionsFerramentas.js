function abrirModalS(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.style.display = "flex";
}

function fecharModalS(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.style.display = "none";
}



function abrirModalAventura(){
    abrirModalS("modalAventuras");
}



// abrir/fechar genéricos e registrar modais
function abrirModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return console.warn("Modal não encontrado:", id);

    // marca body para bloquear scroll e sinalizar modal aberto
    document.body.classList.add("modal-opened");
    document.body.style.overflow = "hidden"; // bloqueia scroll do fundo

    // mostra o modal (ativando as regras CSS .modal-opened)
    modal.classList.add("opened");
    // adicione uma classe no body com referência ao id (para selecionar apenas esse modal)
    document.body.setAttribute("data-modal-open", id);
    // forçar exibir backdrop e modal (caso o CSS não aplique por alguma razão)
    const backdrop = modal.querySelector(".modal-backdrop");
    const card = modal.querySelector(".modal-card, .modal-altaris");
    if (backdrop) backdrop.style.display = "block";
    if (card) card.style.display = "block";

    // foco no primeiro input útil para acessibilidade
    const foco = modal.querySelector("input, textarea, select, button");
    if (foco) foco.focus();
}

function fecharModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return console.warn("Modal não encontrado:", id);

    // esconde visualmente
    modal.classList.remove("opened");
    const backdrop = modal.querySelector(".modal-backdrop");
    const card = modal.querySelector(".modal-card, .modal-altaris");
    if (backdrop) backdrop.style.display = "none";
    if (card) card.style.display = "none";

    // limpar flags no body
    document.body.classList.remove("modal-opened");
    document.body.style.overflow = ""; // restaura scroll
    document.body.removeAttribute("data-modal-open");
}

// registra comportamento padrão de todos os modais que seguem sua estrutura.
// chame registrarModais() após o DOM estar pronto (p.ex. depois de iniciarApp()).
function registrarModais() {
    // fecha com ESC
    document.addEventListener("keydown", (ev) => {
        if (ev.key === "Escape") {
            const id = document.body.getAttribute("data-modal-open");
            if (id) fecharModal(id);
        }
    });

    // encontra todas as modais custom (container direto com .modal-backdrop dentro)
    document.querySelectorAll("div[id][style]").forEach(container => {
        // heurística: container que possua .modal-backdrop e .modal-card
        if (container.querySelector && container.querySelector(".modal-backdrop") && container.querySelector(".modal-card, .modal-altaris")) {
            const id = container.id;

            // fechar ao clicar na backdrop
            const backdrop = container.querySelector(".modal-backdrop");
            if (backdrop) {
                backdrop.addEventListener("click", () => fecharModal(id));
            }

            // botões de fechar no header com id padrão "fecharModal<Id>"
            const closeBtn = container.querySelector(".modal-header button");
            if (closeBtn) {
                closeBtn.addEventListener("click", () => fecharModal(id));
            }

            // botões dentro do modal com atributo data-close="true" também fecham
            container.querySelectorAll("[data-close='true']").forEach(btn => {
                btn.addEventListener("click", () => fecharModal(id));
            });
        }
    });
}

// utilidade: abre modal se existir dados (ex: botão 'Ver Cidade')
function mostrarCidadeSeExistir(q, r) {
    const info = terrenos && terrenos[`${q},${r}`];
    if (!info || info.poi !== "Cidade") return;
    // populacao dos elementos do modal fica por sua lógica atual
    abrirModal("modalCidade");
}

// chamando registrar automaticamente após o load
window.addEventListener("load", () => {
    // delay pequeno para garantir HTML dinâmico inserido já existe
    setTimeout(registrarModais, 120);
});



function abrirModalPNJ() {
  document.getElementById("modalDetalhesPNJ").style.display = "block";
}

function fecharModalPNJ() {
  document.getElementById("modalDetalhesPNJ").style.display = "none";
}

document.getElementById("fecharModalPNJ").addEventListener("click", fecharModalPNJ);
document.getElementById("fecharModalPNJBtn").addEventListener("click", fecharModalPNJ);

function abrirModalEditarPNJ() {
  document.getElementById("modalEditarPNJ").style.display = "block";
}
function fecharModalEditarPNJ() {
  document.getElementById("modalEditarPNJ").style.display = "none";
}
document.getElementById("fecharModalEditarPNJ").addEventListener("click", fecharModalEditarPNJ);


// HABILIDADE GERAL
function abrirModalHabGeral() {
  document.getElementById("modalHabGeral").style.display = "block";
}
function fecharModalHabGeral() {
  document.getElementById("modalHabGeral").style.display = "none";
}
document.getElementById("fecharModalHabGeral").addEventListener("click", fecharModalHabGeral);

function abrirModalCriarPJ() {
  document.getElementById("modalCriarPJ").style.display = "block";
}

function fecharModalCriarPJ() {
  document.getElementById("modalCriarPJ").style.display = "none";
}

document.getElementById("fecharModalCriarPJ").addEventListener("click", fecharModalCriarPJ);
document.getElementById("cancelarCriarPJ").addEventListener("click", fecharModalCriarPJ);

document.getElementById("fecharModalHabilidadeClasse").onclick =
document.getElementById("btnCancelarHabClasse").onclick = () => {
    document.getElementById("modalHabilidadeClasse").style.display = "none";
};

document.getElementById("fecharModalEscolherArma").onclick =
document.getElementById("btnCancelarEscolherArma").onclick = () => {
    document.getElementById("modalEscolherArma").style.display = "none";
};

document.getElementById("fecharModalDetalhes").onclick =
document.getElementById("btnFecharDetalhes").onclick = () => {
    document.getElementById("modalDetalhes").style.display = "none";
};

document.getElementById("fecharModalDetalhesEspeciais").onclick =
document.getElementById("btnFecharDetalhesEspeciais").onclick = () => {
    document.getElementById("modalDetalhesEspeciais").style.display = "none";
};

document.getElementById("fecharModalEspeciaisVestimenta").onclick =
document.getElementById("btnFecharEspeciaisVestimenta").onclick = () => {
    document.getElementById("modalEspeciaisVestimenta").style.display = "none";
};

document.getElementById("fecharModalEspeciaisEscudo").onclick =
document.getElementById("btnFecharEspeciaisEscudo").onclick = () => {
    document.getElementById("modalEspeciaisEscudo").style.display = "none";
};

document.getElementById("fecharModalDescansoLongo").onclick =
document.getElementById("btnFecharModalDescansoLongo").onclick = () => {
    document.getElementById("modalDescansoLongo").style.display = "none";
};

document.getElementById("fecharModalHabEspecie").onclick =
document.getElementById("btnFecharModalHabEspecie").onclick = () => {
    document.getElementById("modalHabEspecie").style.display = "none";
};

document.getElementById("fecharModalDetalhesHabilidades").onclick =
document.getElementById("btnFecharDetalhesHabilidades").onclick = () => {
    document.getElementById("modalDetalhesHabilidades").style.display = "none";
};

document.getElementById("fecharModalItemMochila").onclick =
document.getElementById("btnFecharModalItemMochila").onclick = () => {
    document.getElementById("modalItemMochila").style.display = "none";
};

document.getElementById("fecharModalInimigo").onclick =
document.getElementById("btnFecharModalInimigo").onclick = () => {
    document.getElementById("modalInimigo").style.display = "none";
};

document.getElementById("fecharModalAddInimigo").onclick =
document.getElementById("btnFecharModalAddInimigo").onclick = () => {
    document.getElementById("modalAddInimigo").style.display = "none";
};

document.getElementById("fecharModalSelecionarPJ").onclick =
document.getElementById("btnCancelarSelecionarPJ").onclick = () => {
    document.getElementById("modalSelecionarPJ").style.display = "none";
};

document.getElementById("fecharModalSelecionarEscudo").onclick =
document.getElementById("btnFecharModalSelecionarEscudo").onclick = () => {
    document.getElementById("modalSelecionarEscudo").style.display = "none";
};

document.getElementById("fecharModalSelecionarVestimenta").onclick =
document.getElementById("btnFecharModalSelecionarVestimenta").onclick = () => {
    document.getElementById("modalSelecionarVestimenta").style.display = "none";
};

document.getElementById("fecharModalPOI").onclick =
document.getElementById("btnFecharModalPOI").onclick = () => {
    document.getElementById("modalPOI").style.display = "none";
};

document.getElementById("fecharModalOraculo").onclick =
document.getElementById("btnCancelarOraculo").onclick = () => {
    document.getElementById("modalOraculo").style.display = "none";
};

document.getElementById("fecharModalMissoes").onclick =
document.getElementById("btnVoltarMissoes").onclick = () => {
    document.getElementById("modalMissoes").style.display = "none";
};

document.getElementById("fecharModalBoatos").onclick =
document.getElementById("btnVoltarBoatos").onclick = () => {
    document.getElementById("modalBoatos").style.display = "none";
};

function abrirSecao(id) {
  // esconder menu corretamente
  document.getElementById('menu').classList.add('d-none');

  // esconder outras seções
  document.querySelectorAll('.secao').forEach(sec => sec.style.display = 'none');

  // mostrar seção escolhida
  document.getElementById(id).style.display = 'block';

  // carregamentos dinâmicos por seção
  if (id === 'sec-campanhas') {
    mostrarCampanhas();
    document.getElementById("campanhaAtualNome").innerText = campanhaAtual;
  } 
  else if (id === 'missoes') {
    atualizarListasMissoes();
  } 
  else if (id === 'sec-boatos') {
    atualizarListaRumores();
  }
  else if (id === 'sec-cidade') {
    atualizarListaCidades();
  }
  else if (id === 'sec-pi') {
    atualizarListaPI(); // <-- AQUI ESTÁ A CORREÇÃO!
  } else if (id === "sec-dungeon"){
  } else if (id === "sec-diario") {
    atualizarListaCenas();
    atualizarCenaAtual()
  }else if (id === "sec-tabelas-oraculo") {
    atualizarTabelasOraculo();
  }else if (id === "pnjSection") {
    listarPNJs();
  }else if (id === "pjSection") {
    atualizarPJs();
  }else if (id === 'sec-aventuras') {
    atualizarAventuraUI();
    atualizarListaAventuras();
  }else if (id === 'sec-mapa') {
    abrirMapa();
  }
}

function voltarMapa(){
  abrirSecao("sec-mapa");
  const div = document.getElementById("encontrosDungeon");
  div.innerHTML = ""
}

function showToast(message, type = "info", duration = 3000) {
  // garante container
  let container = document.getElementById("toastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    document.body.appendChild(container);
    console.warn("Toast container não existia — criado dinamicamente.");
  }

  // cria toast
  const toast = document.createElement("div");
  toast.className = `alt-toast ${type}`;
  toast.setAttribute("role", "status");

  // ícones simples (pode trocar por SVGs se preferir)
  const icons = {
    info: "ℹ",
    success: "✔",
    warning: "⚠",
    danger: "✖"
  };

  toast.innerHTML = `
    <div class="alt-icon">${icons[type] ?? "•"}</div>
    <div class="alt-body">${message}</div>
  `;

  // append no topo do container (último aparece em cima)
  container.prepend(toast);

  // debug: se quiser ver no console
  // console.log("Toast shown:", message, type);

  // temporizador de saída
  const visibleMs = Math.max(800, duration); // mínimo 800ms
  const outAnimMs = 360;

  // remover após tempo + animação de saída
  const removeTimeout = setTimeout(() => {
    toast.style.animation = `altaris_toast_out ${outAnimMs}ms cubic-bezier(.2,.9,.3,1) forwards`;
    // remove do DOM após a animação
    setTimeout(() => {
      toast.remove();
    }, outAnimMs + 10);
  }, visibleMs);

  // permitir click para fechar imediatamente
  toast.addEventListener("click", () => {
    clearTimeout(removeTimeout);
    toast.style.animation = `altaris_toast_out ${outAnimMs}ms cubic-bezier(.2,.9,.3,1) forwards`;
    setTimeout(() => toast.remove(), outAnimMs + 10);
  });

  return toast;
}


let loadingInterval = null;

function showLoading(texto = "Carregando...", duracao = 1500) {
  const overlay = document.getElementById("loadingOverlay");
  const bar = document.querySelector(".loadingBar");
  const text = document.getElementById("loadingText");

  text.textContent = texto;
  bar.style.width = "0%";

  overlay.style.display = "flex";
  setTimeout(() => overlay.classList.add("active"), 10);

  // animação incremental da barra
  let progresso = 0;
  clearInterval(loadingInterval);
  loadingInterval = setInterval(() => {
    progresso += 3; // velocidade da barra
    if (progresso >= 100) progresso = 100;
    bar.style.width = progresso + "%";
  }, 50);

  // ocultar depois do tempo definido (se quiser)
  if (duracao > 0) {
    setTimeout(() => hideLoading(), duracao);
  }
}

function hideLoading() {
  const overlay = document.getElementById("loadingOverlay");

  overlay.classList.remove("active");
  setTimeout(() => {
    overlay.style.display = "none";
    clearInterval(loadingInterval);
  }, 400);
}
