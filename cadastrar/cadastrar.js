document.getElementById("form-cadastro").addEventListener("submit", function (event) {
    event.preventDefault();

    const usuario = document.getElementById("input-usuario").value.trim();
    const senha = document.getElementById("input-senha").value;
    const confirmarSenha = document.getElementById("input-confirmarSenha").value;

    const avisoErro = document.getElementById("aviso-erro");

    if (senha !== confirmarSenha) {

        avisoErro.style.display = "block";
        avisoErro.textContent = "As senhas não coincidem!";

        setTimeout(() => {
            avisoErro.style.display = "none";
        }, 3000);

        return;
    }


    localStorage.setItem("usuario", usuario);
    localStorage.setItem("senha", senha.trim());

    const modal = document.getElementById("modal-sucesso");
    modal.style.display = "flex";

    document.getElementById("btn-fechar-modal").addEventListener("click", function () {
        modal.style.display = "none";
        window.location.href = "../index.html";
    });
});
