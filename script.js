const usuario = localStorage.getItem("usuario");
const linkPerfil = document.getElementById("link-perfil");

// Verifica se o usuário está logado
if (usuario) {
    linkPerfil.outerHTML = `<span id="user-container">${usuario} <button id="btn-sair">Sair</button></span>`;

    document.getElementById("btn-sair").addEventListener("click", function() {
        localStorage.removeItem("usuario");
        localStorage.removeItem("senha");
        window.location.reload();
    });
}

// Função para atualizar a badge do carrinho
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

        // Atualiza a badge do carrinho
        atualizarBadge();
    });
});

// Inicializa a badge ao carregar a página
atualizarBadge();
