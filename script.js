const usuario = localStorage.getItem("usuario");
const linkPerfil = document.getElementById("link-perfil");


if (usuario) {
    linkPerfil.outerHTML = `<span id="user-container">${usuario} <button id="btn-sair">Sair</button></span>`;

    document.getElementById("btn-sair").addEventListener("click", function() {
        localStorage.removeItem("usuario");
        localStorage.removeItem("senha");
        window.location.reload();
    });
}


function atualizarBadge() {
    const badge = document.getElementById("quantidadeItemCarrinho");
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let totalItens = 0;

    carrinho.forEach(item => {
        totalItens += item.quantidade;
    });

    if(badge) badge.textContent = totalItens;
}

// Adicionar produtos ao carrinho
const botaoAdicionar = document.querySelectorAll(".btn-confirmar");

botaoAdicionar.forEach((botao) => {
    botao.addEventListener("click", () => {
        const produto = botao.parentElement;
        const nome = produto.querySelector(".lbl-produto").textContent;
        const valor = produto.querySelector(".lbl-valor").textContent;
        const imagem  = produto.querySelector("img").src;

        let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

        carrinho.push({
            nome,
            valor,
            imagem,
            quantidade: 1
        });

        localStorage.setItem("carrinho", JSON.stringify(carrinho));

        atualizarBadge();
    });
});


atualizarBadge();




const inputPesquisa = document.getElementById("input-pesquisa");

inputPesquisa.addEventListener("keyup", () =>{

    const filtro = inputPesquisa.value.toLowerCase();
    const produtos = document.querySelectorAll(".card");

    produtos.forEach((produto) => {
        const nomeProduto = produto.querySelector(".lbl-produto").textContent.toLowerCase();

        if(nomeProduto.includes(filtro)){
            produto.style.display = "";
        } else {
            produto.style.display = "none";
        }
    });



})
