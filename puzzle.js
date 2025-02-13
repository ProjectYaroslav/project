const puzzleContainer = document.getElementById('puzzleContainer');
const shuffleButton = document.getElementById('shuffleButton');
const message = document.getElementById('message');

const puzzleImage = './img/hero2.png'; // Замените на путь к вашему изображению
const rows = 3;
const cols = 3;
let pieces = [];

// Создание пазла
function createPuzzle() {
    pieces = [];
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const piece = document.createElement('div');
            piece.className = 'puzzle-piece';
            piece.style.backgroundImage = `url(${puzzleImage})`;
            piece.style.backgroundPosition = `-${col * 200}px -${row * 200}px`; // Измените размеры на 200, если ваше изображение 600x600
            piece.style.width = '200px'; // Ширина каждой части
            piece.style.height = '200px'; // Высота каждой части
            piece.dataset.position = `${row}-${col}`; // Оригинальная позиция
            piece.draggable = true; // Делаем элемент перетаскиваемым
            piece.addEventListener('dragstart', onDragStart);
            piece.addEventListener('dragover', onDragOver);
            piece.addEventListener('drop', onDrop);
            pieces.push(piece);
            puzzleContainer.appendChild(piece);
        }
    }
}

// Перемешивание пазла
function shufflePuzzle() {
    pieces.sort(() => Math.random() - 0.5);
    puzzleContainer.innerHTML = '';
    pieces.forEach(piece => {
        puzzleContainer.appendChild(piece);
    });
    message.innerText = '';
}

// Обработчик события dragstart
function onDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.dataset.position);
    this.style.opacity = 0.5;
}

// Обработчик события dragover
function onDragOver(event) {
    event.preventDefault();
}

// Обработчик события drop
function onDrop(event) {
    event.preventDefault();
    const draggedPosition = event.dataTransfer.getData('text/plain');
    const targetPosition = this.dataset.position;

    // Обмениваем позиции
    swapPieces(draggedPosition, targetPosition);
}

// Обмен позиций
function swapPieces(draggedPosition, targetPosition) {
    const draggedPiece = pieces.find(piece => piece.dataset.position === draggedPosition);
    const targetPiece = pieces.find(piece => piece.dataset.position === targetPosition);

    // Меняем позиции и фон
    const tempPosition = draggedPiece.dataset.position;
    draggedPiece.dataset.position = targetPiece.dataset.position;
    targetPiece.dataset.position = tempPosition;

    // Меняем фон
    const tempStyle = draggedPiece.style.backgroundPosition;
    draggedPiece.style.backgroundPosition = targetPiece.style.backgroundPosition;
    targetPiece.style.backgroundPosition = tempStyle;

    // Проверяем на завершение
    checkForCompletion();
}

// Проверка на завершение пазла
function checkForCompletion() {
    const completed = pieces.every((piece, index) => {
        const row = Math.floor(index / cols);
        const col = index % cols;
        return piece.dataset.position === `${row}-${col}`;
    });

    if (completed) {
        message.innerText = 'Поздравляем! Пазл собран!';
    }
}

// События
shuffleButton.addEventListener('click', () => {
    shufflePuzzle();
}); 

createPuzzle(); // Создание пазла изначально
shufflePuzzle(); // Перемешивание сразу после создания
