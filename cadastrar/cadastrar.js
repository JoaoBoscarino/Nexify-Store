document.getElementById("form-cadastro").addEventListener("submit", function (event) {
    event.preventDefault(); // impede que o form recarregue a página

    const usuario = document.getElementById("input-usuario").value.trim();
    const senha = document.getElementById("input-senha").value;
    const confirmarSenha = document.getElementById("input-confirmarSenha").value;


    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem!");
        return;
    }

    // salva os dados no localStorage
    localStorage.setItem("usuario", usuario);
    localStorage.setItem("senha", senha.trim());

    // exibe o modal de sucesso
    const modal = document.getElementById("modal-sucesso");
    modal.style.display = "flex"; // mostra o modal

    // adiciona evento para o botão de fechar modal
    document.getElementById("btn-fechar-modal").addEventListener("click", function () {
        modal.style.display = "none";       // esconde o modal
        window.location.href = "../index.html"; // redireciona para o index
    });
});
