// Seleciona o botão e a imagem
const btnSobre = document.querySelector('.nav-link[href="#Sobre"]');
const imgSobre = document.querySelector(".img-sobre img");

// Adiciona um evento de clique ao botão
btnSobre.addEventListener("click", () => {
    imgSobre.classList.add("animate-img"); // Adiciona a classe da animação

    // Remove a classe após a animação terminar, para reaplicação futura
    setTimeout(() => {
        imgSobre.classList.remove("animate-img");
    }, 3000); // 3 segundos para coincidir com a duração da animação
});

// Selecionar todas as imagens clicáveis
document.querySelectorAll(".clickable-img").forEach((img) => {
    img.addEventListener("click", () => {
        const lightbox = document.getElementById("lightbox");
        const lightboxImg = document.getElementById("lightbox-img");

        // Define a imagem clicada no lightbox
        lightboxImg.src = img.src;
        lightbox.classList.add("active");
    });
});

// Fechar o lightbox ao clicar fora da imagem
document.getElementById("lightbox").addEventListener("click", () => {
    document.getElementById("lightbox").classList.remove("active");
});

function getNextTraining(day, time) {
    const now = new Date();
    const [hours, minutes] = time.split(":");
    const nextTraining = new Date();

    nextTraining.setDate(now.getDate() + ((day + 7 - now.getDay()) % 7));
    nextTraining.setHours(hours, minutes, 0, 0);

    // Se o horário já passou hoje, ajusta para a próxima semana
    if (nextTraining <= now) {
        nextTraining.setDate(nextTraining.getDate() + 7);
    }

    return nextTraining;
}

function updateCardCountdown(elementId, targetTime) {
    const now = new Date();
    const timeDifference = targetTime - now;

    // Calcula o tempo restante
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDifference / 1000) % 60);

    // Encontra o elemento HTML
    const countdownElement = document.getElementById(elementId);

    // Atualiza o conteúdo do card
    if (timeDifference > 0) {
        countdownElement.textContent = `Faltam ${days}d ${hours}h ${minutes}m ${seconds}s`;
    } else {
        countdownElement.textContent = "Treino iniciado! 🌟";
    }
}

function updateDynamics() {
    // Horários dos treinos
    const trainings = {
        meninas: getNextTraining(2, "08:30"), // Terça às 8:30
        adolescentes: getNextTraining(2, "09:30"), // Terça às 9:30
        adultosTer: getNextTraining(2, "19:00"), // Terça às 19:00
    };

    // Atualizar contagem para Meninas Pequenas
    updateCardCountdown("countdown-meninas", trainings.meninas);

    // Atualizar contagem para Adolescentes
    updateCardCountdown("countdown-adolescentes", trainings.adolescentes);

    // Atualizar contagem para Adultos (Terça-feira 19:00)
    updateCardCountdown("countdown-adultos", trainings.adultosTer);
}

// Atualiza a contagem a cada segundo
setInterval(updateDynamics, 1000);
