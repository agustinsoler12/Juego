const questions = [
    {
        q: "¿De qué color es el caballo blanco de Santiago?",
        options: ["Azul", "Blanco", "Invisible", "No tiene caballo"],
        correct: 1
    },
    {
        q: "Si un tren eléctrico va hacia el Norte, ¿hacia dónde sale el humo?",
        options: ["Sur", "Norte", "No sale humo", "Hacia arriba"],
        correct: 2
    },
    {
        q: "¿Qué va hacia arriba pero nunca baja?",
        options: ["Un globo", "Tu edad", "Un avión", "El dólar"],
        correct: 1
    },
    {
        q: "¿Cuántos meses tienen 28 días?",
        options: ["Solo uno", "Ninguno", "Todos", "Los bisiestos"],
        correct: 2
    },
    {
        q: "Si participas en una carrera y adelantas al que va segundo, ¿en qué posición estás?",
        options: ["Primero", "Tercero", "Segundo", "Último"],
        correct: 2
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 100;
let timerInterval;

function startGame() {
    document.getElementById('setup-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    resetTimer();
    const question = questions[currentQuestionIndex];
    document.getElementById('question-text').innerText = question.q;
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    question.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.classList.add('option-btn');
        btn.onclick = () => checkAnswer(index, btn);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selectedIndex, btn) {
    clearInterval(timerInterval);
    const correctIndex = questions[currentQuestionIndex].correct;
    
    if (selectedIndex === correctIndex) {
        score += 10;
        btn.classList.add('correct');
        document.getElementById('score').innerText = score;
    } else {
        btn.classList.add('wrong');
    }

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            endGame();
        }
    }, 1000);
}

function resetTimer() {
    timeLeft = 100;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft -= 1.5; // Velocidad del tiempo
        document.getElementById('progress').style.width = timeLeft + "%";
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            checkAnswer(-1, null); // Tiempo agotado cuenta como error
        }
    }, 100);
}

function endGame() {
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    document.getElementById('final-score').innerText = `Tu puntuación: ${score} puntos`;
}