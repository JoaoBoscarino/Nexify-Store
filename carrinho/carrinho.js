const lista = document.getElementById("info-produto");
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// ======== FUNÇÕES DO CARRINHO ========
function mostrarCarrinho() {
    lista.innerHTML = "";

    let totalItens = 0;
    let totalCompra = 0;

    carrinho.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("item-carrinho");

        div.innerHTML = `
            <img src="${item.imagem}" alt="${item.nome}" width="80">
            <p>${item.nome}</p>
            <p>${item.valor}</p>
            <div class="controle-qtd">
                <button class="menos">-</button>
                <span>${item.quantidade}</span>
                <button class="mais">+</button>
            </div>
        `;

        lista.appendChild(div);

        const valorNumerico = parseFloat(
            item.valor.toString().replace("R$", "").replace(",", ".").trim()
        );

        totalItens += item.quantidade;
        totalCompra += valorNumerico * item.quantidade;

        div.querySelector(".mais").addEventListener("click", () => {
            item.quantidade++;
            salvaritemAdd();
        });

        div.querySelector(".menos").addEventListener("click", () => {
            if (item.quantidade > 1) {
                item.quantidade--;
            } else {
                carrinho.splice(index, 1);
            }
            salvaritemAdd();
        });
    });

    const lblQtd = document.querySelector(".div-qtdItens .lbl-menu");
    const lblTotal = document.querySelector(".div-lblTotal .lbl-menu");

    if (lblQtd) lblQtd.textContent = `Quantidade: ${totalItens}`;
    if (lblTotal) lblTotal.textContent = `Total: R$${totalCompra.toFixed(2).replace(".", ",")}`;
}

function salvaritemAdd() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    mostrarCarrinho();
}

mostrarCarrinho();

// ======== SELEÇÃO DE MODAIS ========
const modalConfirm = document.getElementById("modal-confirm");
const modalSucesso = document.getElementById("modal-sucesso");
const btnConfirmar = document.querySelector(".btnConfirmar");
const btnCancelar = document.getElementById("btn-cancelar");
const btnConfirmarCompra = document.getElementById("btn-confirmar-compra");
const btnFecharSucesso = document.getElementById("btn-fechar-sucesso");

const modalLoginAviso = document.getElementById("modal-login-aviso");
const btnFecharLoginAviso = document.getElementById("btn-fechar-login-aviso");
const btnLoginDireto = document.getElementById("btn-login-direto");

const modalCarrinhoVazio = document.getElementById("modal-carrinho-vazio");
const btnFecharCarrinhoVazio = document.getElementById("btn-fechar-carrinho-vazio");

// ======== EVENTOS ========

// Abrir modal de confirmação ao clicar em "Confirmar"
btnConfirmar.addEventListener("click", () => {
    const usuario = localStorage.getItem("usuario");

    if (!usuario) {
        modalLoginAviso.style.display = "flex"; // usuário não logado
        return;
    }

    if (carrinho.length === 0) {
        modalCarrinhoVazio.style.display = "flex"; // carrinho vazio
        return;
    }

    modalConfirm.style.display = "flex"; // tudo certo, abre modal de confirmação
});

// Cancelar compra
btnCancelar.addEventListener("click", () => {
    modalConfirm.style.display = "none";
});

// Confirmar compra
btnConfirmarCompra.addEventListener("click", () => {
    modalConfirm.style.display = "none";
    modalSucesso.style.display = "flex";

    carrinho = [];
    salvaritemAdd();
});

// Fechar modal de sucesso
btnFecharSucesso.addEventListener("click", () => {
    modalSucesso.style.display = "none";
});

// Fechar modal de aviso login
btnFecharLoginAviso.addEventListener("click", () => {
    modalLoginAviso.style.display = "none";
});

// Redirecionar para login
btnLoginDireto.addEventListener("click", () => {
    window.location.href = "../cadastrar/cadastrar.html";
});

// Fechar modal de carrinho vazio
btnFecharCarrinhoVazio.addEventListener("click", () => {
    modalCarrinhoVazio.style.display = "none";
});
