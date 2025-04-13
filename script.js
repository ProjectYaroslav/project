document.addEventListener('DOMContentLoaded', () => {
    const modals = document.querySelectorAll('.modal');
    const openBtns = document.querySelectorAll('.card');
    const body = document.body;

    openBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            modals[index].classList.add('modal--open');
            body.classList.add('modal-open');
        });
    });

    const closeModal = (modal) => {
        modal.classList.remove('modal--open');
        body.classList.remove('modal-open');
    };

    modals.forEach((modal) => {
        const closeBtn = modal.querySelector('.modal__close-btn');
        modal.addEventListener('click', (event) => {
            if (event.target === modal || event.target === closeBtn) {
                closeModal(modal);
            }
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            modals.forEach((modal) => {
                if (modal.classList.contains('modal--open')) {
                    closeModal(modal);
                }
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const heroModals = document.querySelectorAll('.hero-card .modal');
    const heroButtons = document.querySelectorAll('.hero-details-btn');
    const body = document.body;

    heroButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            heroModals[index].classList.add('modal--open');
            body.classList.add('modal-open');
        });
    });

    heroModals.forEach((modal) => {
        const closeBtn = modal.querySelector('.modal__close-btn');
        modal.addEventListener('click', (event) => {
            if (event.target === modal || event.target === closeBtn) {
                modal.classList.remove('modal--open');
                body.classList.remove('modal-open');
            }
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            heroModals.forEach((modal) => {
                if (modal.classList.contains('modal--open')) {
                    modal.classList.remove('modal--open');
                    body.classList.remove('modal-open');
                }
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const mazeGameBtn = document.getElementById('maze-game-btn');
    const mazeGameModal = document.getElementById('maze-game-modal');
    const closeMazeModalBtn = mazeGameModal.querySelector('.modal__close-btn');
    const mazeCanvas = document.getElementById('mazeCanvas');
    const mazeMessage = document.getElementById('maze-message');
    const ctx = mazeCanvas.getContext('2d');
    const body = document.body;

    const maze = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 1, 0, 1],
        [1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
    ];

    const cellSize = 60; // Уменьшен размер ячейки
    let playerPosition = { x: 1, y: 1 };

    const playerImage = new Image();
    playerImage.src = './img/yertostik.png'; // Путь к изображению Ер-Тостика

    function drawMaze() {
        const scale = mazeCanvas.width / (maze[0].length * cellSize); // Рассчитываем масштаб
        ctx.clearRect(0, 0, mazeCanvas.width, mazeCanvas.height);
        for (let row = 0; row < maze.length; row++) {
            for (let col = 0; col < maze[row].length; col++) {
                if (maze[row][col] === 1) {
                    ctx.fillStyle = '#000';
                    ctx.fillRect(
                        col * cellSize * scale,
                        row * cellSize * scale,
                        cellSize * scale,
                        cellSize * scale
                    );
                } else if (maze[row][col] === 2) {
                    ctx.fillStyle = '#28a745';
                    ctx.fillRect(
                        col * cellSize * scale,
                        row * cellSize * scale,
                        cellSize * scale,
                        cellSize * scale
                    );
                }
            }
        }
        ctx.drawImage(
            playerImage,
            playerPosition.x * cellSize * scale + (cellSize * scale) / 6,
            playerPosition.y * cellSize * scale + (cellSize * scale) / 6,
            (cellSize * scale) / 1.5,
            (cellSize * scale) / 1.5
        );
    }

    function movePlayer(dx, dy) {
        const newX = playerPosition.x + dx;
        const newY = playerPosition.y + dy;

        if (maze[newY] && maze[newY][newX] !== 1) {
            playerPosition.x = newX;
            playerPosition.y = newY;
            drawMaze();

            if (maze[newY][newX] === 2) {
                mazeMessage.textContent = 'Поздравляю, вы победили!';
            }
        }
    }

    document.getElementById('up-btn').addEventListener('click', () => movePlayer(0, -1));
    document.getElementById('left-btn').addEventListener('click', () => movePlayer(-1, 0));
    document.getElementById('down-btn').addEventListener('click', () => movePlayer(0, 1));
    document.getElementById('right-btn').addEventListener('click', () => movePlayer(1, 0));

    mazeGameBtn.addEventListener('click', () => {
        mazeGameModal.classList.add('modal--open');
        body.classList.add('modal-open');
        mazeMessage.textContent = '';
        playerPosition = { x: 1, y: 1 };
        drawMaze();
    });

    closeMazeModalBtn.addEventListener('click', () => {
        mazeGameModal.classList.remove('modal--open');
        body.classList.remove('modal-open');
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && mazeGameModal.classList.contains('modal--open')) {
            mazeGameModal.classList.remove('modal--open');
            body.classList.remove('modal-open');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const guessGameBtn = document.getElementById('guess-game-btn');
    const guessGameModal = document.getElementById('guess-game-modal');
    const closeGuessModalBtn = guessGameModal.querySelector('.modal__close-btn');
    const checkAnswersBtn = document.getElementById('check-answers-btn');
    const guessResult = document.getElementById('guess-result');
    const body = document.body;

    const correctAnswers = {
        q1: 'Алдар-Косе',
        q2: 'Ертөстік',
        q3: 'Кыз Жибек',
        q4: 'Алдар-Косе',
        q5: 'Ертөстік',
    };

    guessGameBtn.addEventListener('click', () => {
        guessGameModal.classList.add('modal--open');
        body.classList.add('modal-open');
        guessResult.textContent = '';
        document.getElementById('guess-form').reset();
    });

    closeGuessModalBtn.addEventListener('click', () => {
        guessGameModal.classList.remove('modal--open');
        body.classList.remove('modal-open');
    });

    checkAnswersBtn.addEventListener('click', () => {
        let score = 0;
        const formData = new FormData(document.getElementById('guess-form'));
        for (const [question, answer] of Object.entries(correctAnswers)) {
            if (formData.get(question) === answer) {
                score++;
            }
        }
        guessResult.textContent = `Вы ответили правильно на ${score} из 5 вопросов!`;
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && guessGameModal.classList.contains('modal--open')) {
            guessGameModal.classList.remove('modal--open');
            body.classList.remove('modal-open');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const questGameBtn = document.getElementById('quest-game-btn');
    const questGameModal = document.getElementById('quest-game-modal');
    const closeQuestModalBtn = questGameModal.querySelector('.modal__close-btn');
    const questScene = document.getElementById('quest-scene');
    const questMessage = document.getElementById('quest-message');
    const body = document.body;

    const scenes = [
        {
            text: '1️⃣ Алдар-Косе встречает жадного бая. Что делать? 🧠',
            options: [
                { text: 'Обмануть бая сказкой', correct: true },
                { text: 'Взять еду силой', correct: false },
                { text: 'Уйти', correct: false },
            ],
        },
        {
            text: '2️⃣ Алдар-Косе на развилке дорог. Куда пойти? 🗺️',
            options: [
                { text: 'Пойти по лёгкой дороге', correct: false },
                { text: 'Пойти по опасной дороге', correct: true },
                { text: 'Вернуться назад', correct: false },
            ],
        },
        {
            text: '3️⃣ Алдар-Косе встречает голодного джинна. Что делать? 🧞‍♂️',
            options: [
                { text: 'Дать еду', correct: true },
                { text: 'Прогнать джинна', correct: false },
                { text: 'Устроить загадку', correct: true },
            ],
        },
        {
            text: '4️⃣ Алдар-Косе видит сундук с сокровищами. Что делать? 💰',
            options: [
                { text: 'Открыть сундук', correct: false },
                { text: 'Оставить сундук', correct: true },
                { text: 'Спросить совета у джинна', correct: true },
            ],
        },
        {
            text: '5️⃣ Алдар-Косе находит деревню. Что делать? 🏘️',
            options: [
                { text: 'Помочь жителям', correct: true },
                { text: 'Игнорировать их', correct: false },
                { text: 'Спросить дорогу', correct: true },
            ],
        },
    ];

    let currentScene = 0;
    let score = 0;

    function loadScene() {
        const scene = scenes[currentScene];
        questScene.innerHTML = `<p>${scene.text}</p>`;
        scene.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option.text;
            button.classList.add('quest-option');
            button.addEventListener('click', () => handleOption(option.correct));
            questScene.appendChild(button);
        });
    }

    function handleOption(correct) {
        if (correct) {
            score++;
            questMessage.textContent = 'Верно! 🎉';
        } else {
            questMessage.textContent = 'Неверно! ❌';
        }
        currentScene++;
        if (currentScene < scenes.length) {
            setTimeout(() => {
                questMessage.textContent = '';
                loadScene();
            }, 1000);
        } else {
            setTimeout(() => {
                questScene.innerHTML = `<p>Вы завершили квест! Ваш результат: ${score} из ${scenes.length} 🎉</p>`;
                questMessage.textContent = '';
            }, 1000);
        }
    }

    questGameBtn.addEventListener('click', () => {
        questGameModal.classList.add('modal--open');
        body.classList.add('modal-open');
        currentScene = 0;
        score = 0;
        questMessage.textContent = '';
        loadScene();
    });

    closeQuestModalBtn.addEventListener('click', () => {
        questGameModal.classList.remove('modal--open');
        body.classList.remove('modal-open');
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && questGameModal.classList.contains('modal--open')) {
            questGameModal.classList.remove('modal--open');
            body.classList.remove('modal-open');
        }
    });
});



