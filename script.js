let gridBody;
let scoreBody;
let resultBody;
let width = 5;
let val = [];
let score = 0;
let highest = 0;


//Used to Create cells in the grid
function creatediv(point) {
    let div = document.createElement('div');
    if (point != 0)
        div.textContent = point;

    //To give each cell the desire color
    let intensity = 0.09;
    while (point > 1) {
        point /= 2;
        intensity += 0.09;
    }

    let color = `rgba(0,0,255,${intensity})`;
    div.style.background = color;

    return div;
}

//Gives random values to each cell
function startCreate() {
    for (let i = 0; i < width * width; i++) {
        val[i] = genRandom()
    }
    score = 0;
}

//Creates a board
function create() {
    for (let i = 0; i < width * width; i++) {
        let temp = creatediv(val[i]);
        gridBody.appendChild(temp);
    }
    updateScore();
    Won();
}

//remove 
function remove() {
    let parent = gridBody;
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

//generate random
function genRandom() {

    if (Math.random() > 0.99)
        return 4;
    if (Math.random() > 0.9)
        return 2;
    return 0;
}

function updateScore() {
    scoreBody.textContent = score;
    if (highest < score)
        highest = score;
    document.getElementById("highest").textContent = highest;
}

function Won() {
    for (let i = 0; i < width * width; i++) {
        if (val[i] == 2048) {
            resultBody.textContent = "YOU WON !!!"
            return;
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {

    gridBody = document.querySelector(".grid");
    scoreBody = document.getElementById('score');
    resultBody = document.getElementById('result');

    startCreate();
    create();

    function genRandom2() {

        if (Math.random() > 0.99)
            return 4;
        return 2;
    }

    function isOver() {

        for (let i = 0; i < width; i++) {
            for (let j = 0; j < width; j++) {
                if (j != width - 1) {
                    if (val[i * width + j] == val[width * i + j + 1])
                        return false;
                }
                if (j != 0) {
                    if (val[i * width + j] == val[width * i + j - 1])
                        return false;
                }
                if (i != 0) {
                    if (val[i * width + j] == val[(width * (i - 1)) + j])
                        return false;
                }
                if (i != width - 1) {
                    if (val[i * width + j] == val[(width * (i + 1)) + j])
                        return false;
                }
            }
        }
        resultBody.textContent = "GAME OVER!!!!";
        gridBody.textContent = "GAME OVER!";

        return true;
    }

    //Generates Random numbers after a user starts the game
    function addRandom() {
        let start = Math.floor(Math.random() * (width * width));

        for (let i = 0; i < width * width; i++) {
            if (val[start] == 0) {
                val[start] = genRandom2();
                return true;
            }
            if (start == width * width - 1)
                start = -1;
            start++;
        }
        if (isOver() == false)
            return true;

        return false;
    }

    //To start a new game
    let newGame = document.querySelector('.new');
    newGame.addEventListener('click', newG);

    function newG() {

        resultBody.textContent = "";
        remove();
        startCreate();
        create();
    }

    //Adding Event Listner
    document.addEventListener('keydown', (event) => {
        let name = event.key;
        if (name == "ArrowLeft")
            left();
        if (name == "ArrowRight")
            right();
        if (name == "ArrowUp")
            up();
        if (name == "ArrowDown")
            down();
    }, false);

    //Left key
    /*  let leftKey = document.querySelector('.left');
      leftKey.addEventListener('click', left);
  */
    function left() {

        for (let i = 0; i < width; i++) {
            let last = -1;
            for (let j = 0; j < width; j++) {
                if (val[i * width + j] != 0) {
                    if (last != -1 && val[i * width + j] == val[i * width + last]) {

                        score += val[i * width + last] * 2;
                        val[i * width + last] *= 2;
                        val[i * width + j] = 0;
                        last = -1;
                    }
                    else
                        last = j;
                }
            }
        }

        for (let i = 0; i < width; i++) {
            for (let j = 0; j < width; j++) {
                let k = j;
                while (k != width && val[i * width + k] === 0) k++;
                if (k != width) {
                    let temp = val[i * width + j]
                    val[i * width + j] = val[i * width + k];
                    val[i * width + k] = temp;
                }
            }
        }

        remove();
        create();
        setTimeout(() => {
            remove();
            if (addRandom() != false)
                create();
        }, 100);

    }

    //Right Key
    /*let rightKey = document.querySelector('.right');
    rightKey.addEventListener('click', right);
*/
    function right() {

        for (let i = 0; i < width; i++) {
            let last = -1;
            for (let j = width - 1; j > -1; j--) {
                if (val[i * width + j] != 0) {
                    if (last != -1 && val[i * width + j] == val[i * width + last]) {
                        score += val[i * width + last] * 2;
                        val[i * width + last] *= 2;
                        val[i * width + j] = 0;
                        last = -1;
                    }
                    else
                        last = j;
                }
            }
        }

        for (let i = 0; i < width; i++) {
            for (let j = width - 1; j > -1; j--) {
                let k = j;
                while (k != -1 && val[i * width + k] === 0) k--;
                if (k != -1) {
                    let temp = val[i * width + j]
                    val[i * width + j] = val[i * width + k];
                    val[i * width + k] = temp;
                }
            }
        }

        remove();
        create();
        setTimeout(() => {
            remove();
            if (addRandom() != false)
                create();
        }, 100);
    }

    //Up Key
    /*    let upKey = document.querySelector('.up');
        upKey.addEventListener('click', up);
    */
    function up() {

        for (let j = 0; j < width; j++) {
            let last = -1;
            for (let i = 0; i < width; i++) {
                if (val[i * width + j] != 0) {
                    if (last != -1 && val[i * width + j] == val[last * width + j]) {
                        score += val[last * width + j] * 2;
                        val[last * width + j] *= 2;
                        val[i * width + j] = 0;
                        last = -1;
                    }
                    else
                        last = i;
                }
            }
        }

        for (let j = 0; j < width; j++) {
            for (let i = 0; i < width; i++) {
                let k = i;
                while (k != width && val[k * width + j] === 0) k++;
                if (k != width) {
                    let temp = val[i * width + j]
                    val[i * width + j] = val[k * width + j];
                    val[k * width + j] = temp;
                }
            }
        }

        remove();

        create();
        setTimeout(() => {
            remove();
            if (addRandom() != false)
                create();
        }, 100);
    }

    //Down Key
    /*  let downKey = document.querySelector('.down');
      downKey.addEventListener('click', down);
  */
    function down() {

        for (let j = 0; j < width; j++) {
            let last = -1;
            for (let i = width - 1; i > -1; i--) {
                if (val[i * width + j] != 0) {
                    if (last != -1 && val[last * width + j] == val[i * width + j]) {
                        score += val[last * width + j] * 2;
                        val[last * width + j] *= 2;
                        val[i * width + j] = 0;
                        last = -1;
                    }
                    else
                        last = i;
                }
            }
        }

        for (let j = 0; j < width; j++) {
            for (let i = width - 1; i > -1; i--) {
                let k = i;
                while (k != -1 && val[k * width + j] === 0) k--;
                if (k != -1) {
                    let temp = val[i * width + j]
                    val[i * width + j] = val[k * width + j];
                    val[k * width + j] = temp;
                }
            }
        }
        remove();
        create();
        setTimeout(() => {
            remove();
            if (addRandom() != false)
                create();
        }, 100);
    }

    //To make Different level of difficulties
    let easy = document.querySelector('.easy');
    easy.addEventListener('click', () => { changedimen(800) });

    let medium = document.querySelector('.medium');
    medium.addEventListener('click', () => { changedimen(500) });

    let hard = document.querySelector('.hard');
    hard.addEventListener('click', () => { changedimen(400) });

    function changedimen(change_val = 400) {

        gridBody.style.height = `${change_val}px`;
        gridBody.style.width = `${change_val}px`;

        width = change_val / 100;
        newG();

    }

});

