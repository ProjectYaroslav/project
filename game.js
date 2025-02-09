const questions = [
    {
        question: "Какой герой использует свои умения и хитрость для того, чтобы обойти врагов и защитить бедных?",
        options: ["Батыр Баян", "Алдар Көсе", "Кобланды Батыр"],
        answer: "Алдар Көсе"
    },
    {
        question: "Кто из персонажей прославился своими могучими подвигами и стал символом силы и защиты казахского народа?",
        options: ["Батыр Баян", "Алдар Көсе", "Кобланды Батыр"],
        answer: "Кобланды Батыр"
    },
    {
        question: "Какой из этих героев олицетворяет идеалы смелости и самопожертвования в борьбе против врагов своего народа?",
        options: ["Батыр Баян", "Алдар Көсе", "Кобланды Батыр"],
        answer: "Батыр Баян"
    },
    {
        question: "Какой персонаж обладает уникальными магическими способностями и является защитником людей, помогая им преодолевать трудности?",
        options: ["Батыр Баян", "Алдар Көсе", "Кобланды Батыр"],
        answer: "Алдар Көсе"
    }
];

let score = 0;
let currentQuestionIndex = 0;

// Ссылка на элементы
const questionContainer = document.getElementById('questionContainer');
const checkAnswersBtn = document.getElementById('checkAnswers');
const resultArea = document.getElementById('resultArea');
const restartBtn = document.getElementById('restart');

// Функция для отображения вопросов
function displayQuestion() {
    questionContainer.innerHTML = '';
    const question = questions[currentQuestionIndex];
    const questionElement = document.createElement('h3');
    questionElement.innerText = question.question;
    questionContainer.appendChild(questionElement);

    question.options.forEach(option => {
        const label = document.createElement('label');
        label.innerText = option;
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'answer';
        radio.value = option;
        label.prepend(radio);
        questionContainer.appendChild(label);
    });
}

// Проверка ответов
function checkAnswers() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        if (selectedOption.value === questions[currentQuestionIndex].answer) {
            score++;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            showResults();
        }
    } else {
        alert("Пожалуйста, выберите ответ!");
    }
}

// Показать результаты
function showResults() {
    questionContainer.innerHTML = '';
    checkAnswersBtn.style.display = 'none';
    resultArea.innerHTML = `Вы ответили правильно на ${score} из ${questions.length} вопросов.`;
    restartBtn.style.display = 'block';
}

// Начать заново
function restartGame() {
    score = 0;
    currentQuestionIndex = 0;
    resultArea.innerHTML = '';
    restartBtn.style.display = 'none';
    checkAnswersBtn.style.display = 'block';
    displayQuestion();
}

// Обработчики событий
checkAnswersBtn.addEventListener('click', checkAnswers);
restartBtn.addEventListener('click', restartGame);

// Запуск игры
displayQuestion();
