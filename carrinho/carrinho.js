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

// ======== MODAIS QUE SERÃO MANTIDOS ========
const modalLoginAviso = document.getElementById("modal-login-aviso");
const btnFecharLoginAviso = document.getElementById("btn-fechar-login-aviso");
const btnLoginDireto = document.getElementById("btn-login-direto");

const modalCarrinhoVazio = document.getElementById("modal-carrinho-vazio");
const btnFecharCarrinhoVazio = document.getElementById("btn-fechar-carrinho-vazio");

// ======== BOTÃO CONFIRMAR → CHECKOUT ========
document.querySelector(".btnConfirmar").addEventListener("click", () => {

    const usuario = localStorage.getItem("usuario");

    if (!usuario) {
        modalLoginAviso.style.display = "flex"; // avisar login
        return;
    }

    if (carrinho.length === 0) {
        modalCarrinhoVazio.style.display = "flex"; // carrinho vazio
        return;
    }

    // Tudo ok → vai para checkout
    window.location.href = "../checkout/checkout.html";
});

// Fechar aviso login
btnFecharLoginAviso.addEventListener("click", () => {
    modalLoginAviso.style.display = "none";
});

// Ir para login
btnLoginDireto.addEventListener("click", () => {
    window.location.href = "../cadastrar/cadastrar.html";
});

// Fechar aviso carrinho vazio
btnFecharCarrinhoVazio.addEventListener("click", () => {
    modalCarrinhoVazio.style.display = "none";
});
