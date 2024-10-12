let words = [
    "javascript",
    "lie",
    "html",
    "code",
    "backend",
    "frontend",
    "word",
    "guess",
    "laptop"
];

let chosenWord = words[Math.floor(Math.random() * words.length)];
let wordDash = Array(chosenWord.length).fill("_ ");
let usedLetters = [];
let guesses = 5;
let hangmanParts = [
    "+------+\n",
    "|/     | \n",
    "|      O \n",
    " |     /|\\ \n",
    " |     / \\ \n"
];


let hangmanStatus = "";
let errors = 0;


document.addEventListener("DOMContentLoaded", function() {
    startNewGame();
});

function startNewGame() {
    chosenWord = words[Math.floor(Math.random() * words.length)];
    wordDash = Array(chosenWord.length).fill("_ ");
    usedLetters = [];
    guesses = 5;
    hangmanStatus = "";
    errors = 0;

    document.getElementById("word").textContent = wordDash.join('');
    document.getElementById("used-letters").textContent = '';
    document.getElementById("hangman-draw").textContent = '';
    document.getElementById("message").textContent = '';
    document.getElementById("inputLetter").disabled = false;
    document.getElementById("guessButton").disabled = false;

    document.getElementById("start-message").textContent = " ";
}


function guessLetter() {
    let letter = document.getElementById("inputLetter").value.toLowerCase();

    if(usedLetters.includes(letter) || letter === ""){
        document.getElementById("message").textContent = "Letter already in use or invalid.";
        return;
    }

    usedLetters.push(letter);
    document.getElementById("used-letters").textContent = usedLetters.join(' ');

    if(chosenWord.includes(letter)){
        for(let i = 0; i < chosenWord.length; i++){
            if(chosenWord[i] === letter){
                wordDash[i] = letter;
            }
        }
            document.getElementById("word").textContent = wordDash.join(' ');
        }else{
            //incorrect letter
            errors++;
            updateHangmanDraw();
            if(errors === guesses){
                document.getElementById("message").textContent = "Game Over, the word was: " + chosenWord;
                disableInput();
                document.getElementById("start-message").textContent = "Starting a new game...";
                setTimeout(startNewGame, 4000); 
            }
            document.getElementById("inputLetter").value = "";
        }

    if(wordDash.join('') === chosenWord){
        document.getElementById("message").textContent = "You won, Congratulations";
        disableInput();
    }
    document.getElementById("inputLetter").value = "";
}

function updateHangmanDraw(){
    hangmanStatus += hangmanParts[errors-1];
    document.getElementById("hangman-draw").textContent = hangmanStatus;
}

function disableInput(){
    document.getElementById("inputLetter").disabled = true;
    document.getElementById("guessButton").disabled = true;
}
