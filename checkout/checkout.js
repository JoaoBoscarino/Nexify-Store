const btnFinalizar = document.getElementById('btn-finalizar');
const resumoContainer = document.querySelector('.resumo');
const totalElement = document.querySelector('.footer-checkout p strong');
const formInputs = document.querySelectorAll('input[required]');
const overlay = document.getElementById("animacao-pedido");
const caminhao = document.querySelector(".caminhao");

let qrModal = document.createElement('div');
qrModal.id = 'qr-modal';
qrModal.innerHTML = `
    <div class="qr-box">
        <img id="qr-code" src="" alt="QR Code PIX" />
        <div class="qr-buttons">
            <button id="btn-voltar">Voltar</button>
            <button id="btn-finalizar-pagamento">Finalizar</button>
        </div>
    </div>
`;
document.body.appendChild(qrModal);

function carregarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    resumoContainer.innerHTML = '';
    let total = 0;

    carrinho.forEach(produto => {
        const valorNumerico = parseFloat(produto.valor.replace("R$", "").replace(",", ".").trim());
        const p = document.createElement('p');
        p.innerHTML = `<strong>${produto.nome}</strong> — R$ ${valorNumerico.toFixed(2)} (Qtd: ${produto.quantidade})`;
        resumoContainer.appendChild(p);
        total += valorNumerico * produto.quantidade;
    });

    totalElement.textContent = `R$ ${total.toFixed(2)}`;
}


function mostrarQRCode() {
    const qrImage = document.getElementById('qr-code');
    qrImage.src = '../img-card/qrcode-pix.png';
    qrModal.style.display = 'flex';
}


function finalizarCompra() {
    const form = document.getElementById('form-checkout');


    if (!form.checkValidity()) {
        form.reportValidity(); 
        return;
    }

    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    if (carrinho.length === 0) {
        return;
    }

    mostrarQRCode();
}

document.addEventListener('DOMContentLoaded', carregarCarrinho);
btnFinalizar.addEventListener('click', finalizarCompra);

document.getElementById('btn-voltar').addEventListener('click', () => {
    qrModal.style.display = 'none';
});

document.getElementById('btn-finalizar-pagamento').addEventListener('click', () => {
    qrModal.style.display = 'none';

    localStorage.removeItem('carrinho');
    carregarCarrinho(); 

    overlay.style.display = 'flex';
    overlay.classList.add("ativo");
    caminhao.classList.add("animar");

    setTimeout(() => {
        window.location.href = "../index.html";
    }, 3400);
});
