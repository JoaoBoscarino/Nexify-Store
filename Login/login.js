document.getElementById("form-login").addEventListener("submit", function (event) {
    event.preventDefault();

    const usuarioDigitado = document.getElementById("input-usuario").value.trim();
    const senhaDigitada = document.getElementById("input-senha").value;

    const usuarioSalvo = localStorage.getItem("usuario");
    const senhaSalva = localStorage.getItem("senha");

    if (usuarioDigitado === usuarioSalvo && senhaDigitada === senhaSalva) {

        localStorage.setItem("usuarioLogado", usuarioDigitado);
        window.location.href = "../index.html";

    } else {

        const aviso = document.getElementById("aviso-erro");
        aviso.querySelector("span").textContent = "Usuário ou senha incorretos!";
        aviso.classList.add("mostrar");

        setTimeout(() => {
            aviso.classList.remove("mostrar");
        }, 3000);
    }
});
 