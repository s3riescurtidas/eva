// --- CONFIGURAÇÕES ---
// 1. Define a senha aqui (tem que ser igual à que queres)
const PASS_CORRETA = "Stradi";
const PASS_CORRETA2 = "Stradi";

// 2. Define a data de início do namoro (Ano, Mês-1, Dia)
// Nota: Janeiro é mês 0, Fevereiro é 1, etc.
// Exemplo: 2 de Dezembro de 2021 -> new Date(2021, 11, 2)
const START_DATE = new Date(2025, 1, 8); 


// --- LÓGICA DO SITE ---

function checkPassword() {
    const input = document.getElementById("password").value;
    const errorMsg = document.getElementById("error-message");

    // Converte para minúsculas para ignorar Maiúsculas/minúsculas
    if (input.toLowerCase() === PASS_CORRETA.toLowerCase() || input.toLowerCase() === PASS_CORRETA2.toLowerCase()) {
        // Senha correta: esconde login, mostra envelope
        switchScreen('login-screen', 'envelope-screen');
    } else {
        // Senha errada
        errorMsg.style.display = "block";
        
        // Efeito de tremer (opcional, simples)
        const box = document.querySelector('.login-box');
        box.style.transform = "translateX(5px)";
        setTimeout(() => box.style.transform = "translateX(0)", 100);
    }
}

function openEnvelope() {
    const envelope = document.querySelector('.envelope-wrapper');
    const btn = document.getElementById('go-to-gallery');
    
    if (!envelope.classList.contains('open')) {
        envelope.classList.add('open');
        
        // Mostra o botão para ir para a galeria após a animação da carta
        setTimeout(() => {
            btn.style.display = 'block';
            // Pequeno delay para permitir a transição de opacidade
            setTimeout(() => {
                btn.style.opacity = '1';
            }, 50);
        }, 1500);
    }
}

function showGallery() {
    switchScreen('envelope-screen', 'main-content');
    updateTimer(); // Atualiza o contador imediatamente
    setInterval(updateTimer, 1000 * 60 * 60); // Atualiza a cada hora (ou mude para 1000 para segundos)
}

function switchScreen(hideId, showId) {
    const hideEl = document.getElementById(hideId);
    const showEl = document.getElementById(showId);

    hideEl.style.opacity = 0;
    setTimeout(() => {
        hideEl.classList.remove('active');
        showEl.classList.add('active');
        // Pequeno delay para o fade in funcionar
        setTimeout(() => {
            showEl.style.opacity = 1;
        }, 50);
    }, 1000); // Espera 1 segundo para a transição de opacidade
}

function updateTimer() {
    const now = new Date(2026, 2, 16);
    const diff = now - START_DATE;

    // Cálculos matemáticos para tempo
    const daysTotal = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    // Anos
    const years = Math.floor(daysTotal / 365);
    // Meses (aproximado)
    const months = Math.floor((daysTotal % 365) / 30);
    // Dias restantes
    const days = Math.floor((daysTotal % 365) % 30);

    document.getElementById('years').innerText = years;
    document.getElementById('months').innerText = months;
    document.getElementById('days').innerText = days;

}

// --- FUNÇÕES PARA AS MENSAGENS NAS FOTOS ---

function verMensagem(texto) {
    const modal = document.getElementById('message-modal');
    const modalText = document.getElementById('modal-text');

    // Define o texto que recebemos no HTML
    modalText.innerText = texto;
    
    // Mostra o modal (adiciona a classe que faz o fade in)
    modal.classList.add('show');
}

function fecharMensagem(event) {
    // Fecha se clicar no X ou se clicar fora da caixa branca (no fundo escuro)
    if (event.target.classList.contains('modal') || event.target.classList.contains('close-btn')) {
        const modal = document.getElementById('message-modal');
        modal.classList.remove('show');
    }
}
