const lista = document.getElementById("info-produto");
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

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

const modalLoginAviso = document.getElementById("modal-login-aviso");
const btnFecharLoginAviso = document.getElementById("btn-fechar-login-aviso");
const btnLoginDireto = document.getElementById("btn-login-direto");

const modalCarrinhoVazio = document.getElementById("modal-carrinho-vazio");
const btnFecharCarrinhoVazio = document.getElementById("btn-fechar-carrinho-vazio");

document.querySelector(".btnConfirmar").addEventListener("click", () => {

    const usuario = localStorage.getItem("usuario");

    if (!usuario) {
        modalLoginAviso.style.display = "flex";
        return;
    }

    if (carrinho.length === 0) {
        modalCarrinhoVazio.style.display = "flex";
        return;
    }

    window.location.href = "../checkout/checkout.html";
});

btnFecharLoginAviso.addEventListener("click", () => {
    modalLoginAviso.style.display = "none";
});

btnLoginDireto.addEventListener("click", () => {
    window.location.href = "../cadastrar/cadastrar.html";
});

btnFecharCarrinhoVazio.addEventListener("click", () => {
    modalCarrinhoVazio.style.display = "none";
});
