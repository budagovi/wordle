let puzzles = document.querySelectorAll('td');
let gameTable = document.querySelector('.gameTable');
let windows = document.querySelectorAll('window');

//menu
let menuBox = document.querySelector('menu');
let nounBtn = document.querySelector('.nouns');
let verbsBtn = document.querySelector('.verbs');
let adjBtn = document.querySelector('.adjectives');

//results
let resultText = document.querySelector('.resultText');
let playAgainBtn = document.querySelector('.playAgainBtn')

//fake database
let nouns = ['flake', 'cloud', 'shark', 'faith', 'lunch', 'clown', 'towel', 'shelf', 'earth', 'label', 'dairy', 'paint', 'ratio', 'scent', 'wheel'];
let verbs = ['judge', 'bleed', 'crawl', 'dance', 'drive', 'abuse', 'adopt', 'begin', 'charm', 'elect', 'faint', 'gloss', 'imply', 'leave', 'match'];
let adjs =  ['drunk', 'awful', 'legal', 'blind', 'civil', 'empty', 'false', 'giant', 'fresh', 'happy', 'local', 'major', 'nasty', 'proud', 'sharp'];

//variables
let tempWord = "";
let wordGuessed = false;

//clear table puzzles function
const clearTable = function(p) {
    for(let i=0; i<p.length; ++i) {
        puzzles[i].innerText = "";
        puzzles[i].style.backgroundColor = "";
    }
}

//showresult function
const showResults = function(boolean, word) {
    gameTable.style.display = 'none';
    resultText.style.display = 'block';
    playAgainBtn.style.display = 'block';

    if(boolean) {
        resultText.innerHTML = `Congratulations, You guessed the word <span class="guessedWord"> ${word} </span>`;
    } else {
        resultText.innerHTML = `Unfortunately, You did not guess the word <span class="guessedWord"> ${word} </span>`;
    }
    return 0;
}

//main gameplay function
const startGame = function (word) {

    console.log(word);
    menuBox.style.display = 'none';
    gameTable.style.display = 'table';

    console.log("started");
    let i = 0;

    window.addEventListener('keydown', function (e) {

        if (e.keyCode >= 65 && e.keyCode <= 90 && tempWord.length < 5) {
            puzzles[i].innerText = e.key.toUpperCase();
            tempWord += e.key;
            if (i % 5 !== 4) i++;
        }
        else if (e.keyCode === 8 && i > 0) {
            if (tempWord.length !== 5 && i % 5 !== 0) i--;
            puzzles[i].innerText = "";
            tempWord = tempWord.slice(0, tempWord.length - 1);
        }
        else if (e.keyCode === 13 && tempWord.length === 5) {
            //check for yellows and reds
            for (let j = 0; j < 5; ++j) {
                let flag= false;
                for (let k = 0; k < 5; ++k)
                    if (word[k] === tempWord[j]) {
                        puzzles[i - 4 + j].style.backgroundColor = "rgb(248 255 117)";
                        flag = true;
                    }
                    if(!flag) puzzles[i - 4 + j].style.backgroundColor = "#fa4d4d";
            }


            //check for greens
            for (let j = 0; j < 5; ++j)
                if (word[j] === tempWord[j])
                    puzzles[i - 4 + j].style.backgroundColor = "rgb(142 202 78)";

            //check for word
            if(tempWord===word) {
                wordGuessed = true;
                showResults(wordGuessed, word);
                clearTable(puzzles);
                return 0;
            }
            tempWord = "";
            i++;
            if (i===25) {
                showResults(wordGuessed, word);
                clearTable(puzzles);
                return 0;
            }
        }
        //console.log(e);
        console.log(tempWord);
        console.log(word);
    });
}

// menu button functions (choosing category)
nounBtn.addEventListener("click", function () {
    let misteryWord = nouns[Math.floor(Math.random() * 15)];
    startGame(misteryWord);
});

verbsBtn.addEventListener("click", function () {
    let misteryWord = verbs[Math.floor(Math.random() * 15)];
    startGame(misteryWord);
});

adjBtn.addEventListener("click", function () {
    let misteryWord = adjs[Math.floor(Math.random() * 15)];
    startGame(misteryWord);
});
