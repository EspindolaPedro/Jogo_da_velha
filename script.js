//initial Data
let square = {
    a1: '', a2: '', a3: '',
    b1:'', b2:'', b3: '',
    c1: '', c2: '', c3: ''
};

let PlayerTurn = '';
let warning = '';
let playing = false;


//Events
document.querySelector('.reset').addEventListener('click', reset);

document.querySelectorAll('.item').forEach((item) => {
    item.addEventListener('click', itemClick);
});

//Functions
function itemClick(e) {
    let item = e.target.getAttribute('data-item');
    if (playing && square[item] === '') {
        square[item] = PlayerTurn;
        renderSquare();
        togglePlayer();
    }
}

function reset() {
    warning = '';

    let random = Math.floor(Math.random() * 2);
    PlayerTurn = (random === 0) ? 'x' : 'o';

    for (let i in square) {
        square[i] = '';

    }

    playing = true;

    renderSquare();
    renderInfo();
};

function renderSquare() {
    for (let i in square) {
        let item = document.querySelector(`div[data-item=${i}]`)
            item.innerHTML = square[i]

    }

    checkGame();

}

function renderInfo() {
    document.querySelector('.vez').innerHTML = PlayerTurn;
    document.querySelector('.resultado').innerHTML = warning;
}

function togglePlayer() {
    PlayerTurn = (PlayerTurn === 'x') ? 'o' : 'x';
    renderInfo();
}

function checkGame() {
    if (checkWinnerFor('x')) {
        warning = 'O "x" venceu'
        playing = false
    } else if (checkWinnerFor('o')) {
        warning = 'O "o" venceu'
        playing = false
    } else if (isFull()) {
        warning = 'Deu empate'
        playing = false
    } 
}

function checkWinnerFor(PlayerTurn) {
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'

    ];

    for (let w in pos) {
    let pArray = pos[w].split(',')
    let hasWon = pArray.every(option => square[option] === PlayerTurn);
    if (hasWon) {
        return true;
        }
    }

    return false;
}

function isFull() {
    for (let i in square) {
        if (square[i] === '') {
            return false;
        }
    }

    return true;
}