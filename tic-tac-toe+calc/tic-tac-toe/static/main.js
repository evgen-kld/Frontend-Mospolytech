function initBoard() {
    let board = document.getElementById('board');
    for (let i = 0; i < 9; i++) {
        let boardCell = document.createElement('div');
        boardCell.classList.add('cell');
        board.append(boardCell);
    }
    return board;
}

function chechAvailableSteps() {
    let cells = document.querySelectorAll('.cell');
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].innerHTML == '')
            return true;
    }
    return false;
}

function checkWinner() {
    let cells = document.querySelectorAll('.cell');
    let row, colomn, diag, diag1;
    for (let i = 0; i < 3; i++) {
        row = (cells[i * 3].innerHTML != '');
        colomn = (cells[i].innerHTML != '');
        diag = (cells[0].innerHTML != '');
        diag1 = (cells[2].innerHTML != '');
        for (let j = 0; j < 2; j++) {
            row = row && (cells[i * 3 + j].innerHTML
                == cells[i * 3 + j + 1].innerHTML);
            colomn = colomn && (cells[j * 3 + i].innerHTML
                == cells[(j + 1) * 3 + i].innerHTML);
            diag = diag && (cells[j * 3 + j].innerHTML
                == cells[(j + 1) * 3 + j + 1].innerHTML);
            diag1 = diag1 && (cells[j * 3 + 2 - j].innerHTML
                == cells[(j + 1) * 3 + 2 - (j + 1)].innerHTML);
        }
        let winner = (row && cells[i * 3].innerHTML)
            || (colomn && cells[i].innerHTML)
            || (diag && cells[0].innerHTML)
            || (diag1 && cells[2].innerHTML);
        if (winner) {
            return winner
        }
    }
    return false;
}

function clickHeandler(event) {
    if (event.target.className == 'cell') {
        if (gameOver) {
            alert('Игра окончена!');
            return;
        }
        if (event.target.innerHTML != '') {
            alert('Эта ячейка занята!');
        } else {
            event.target.innerHTML = turn == 0 ? 'x' : 'o';
            turn = (turn + 1) % 2;
        }
        let winner = checkWinner();
        if (winner || !chechAvailableSteps()) {
            gameOver = 1;
            alert(winner ? `${winner} одержал победу!` : 'Ничья!');
        }
    }
}

function newGame() {
    let cells = document.querySelectorAll('.cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = '';
    }
    turn = 0;
    gameOver = 0;
}

let turn = 0;
let gameOver = 0;

window.onload = function () {
    let board = initBoard();
    board.onclick = clickHeandler;
    document.querySelector('.new-game-btn').onclick = newGame;
}


