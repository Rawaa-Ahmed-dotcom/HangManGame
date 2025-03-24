let letters = "abcdefghijklmnopqrstuvwxyz";
let lettersArray = Array.from(letters);
console.log(lettersArray);
let lettersContainer = document.querySelector(".letters");

lettersArray.forEach((letter) => {
    let temp = ``;
    temp += `<span class="letter_box">${letter}</span>`;
    lettersContainer.innerHTML += temp;
})

//object of categories : words

const words = {
    programming : ["java", "python", "javascript", "php", "c++", "kotlen"],
    movies : ["avengers", "endgame", "infinity war", "age of ultron", "civil war"],
    people : ["Ahmed", "Ali", "Osama", "Sayed", "Mahmoud", "Omar"],
    countries : ["Egypt", "Syria", "Lebanon", "Tunisia", "Iraq", "Jordan"],
}

//get Random Category 
const keys = Object.keys(words);
const randomKey = Math.floor(Math.random() * keys.length);
const randomCategory = keys[randomKey];
const randomWordIndex = Math.floor(Math.random() * words[randomCategory].length);
const randomWord = words[randomCategory][randomWordIndex];

// display Category
let categorySpan = document.querySelector(".category span");
categorySpan.innerHTML = `${randomCategory}`;


let lettersGuessContainer = document.querySelector(".letters-guess");
//convert random word to array of letters

const randomWordArray = Array.from(randomWord);


// create span depend on random word

randomWordArray.forEach((letter) => {
    let temp = ``;
    temp += `<span class = ${letter == " " ? "with-space" : ""} ></span>`;
    
    lettersGuessContainer.innerHTML += temp;
});

//set wrongAttempts 
let wrongAttempts = 0;

let theDraw = document.querySelector(".hangman-draw");
let guessSpansArray = document.querySelectorAll(".letters-guess span");
//handle clicking on lette
document.addEventListener("click", (e) => {
    let successGuess = false;
    if(e.target.className === "letter_box") {
        e.target.classList.add("clicked");
        const clickedLetter = e.target.innerHTML.toLowerCase();
        console.log(randomWordArray);
        randomWordArray.forEach((actualLetter,letterIndex) => {
            if(actualLetter.toLowerCase() == clickedLetter) {
                successGuess = true;
                guessSpansArray.forEach((span,spanIndex) => {
                    if(spanIndex === letterIndex) { 
                        span.innerHTML = clickedLetter;
                        
                    }
                });

            }
        });
        if(successGuess !== true) {
            wrongAttempts ++;
            theDraw.classList.add(`wrong-${wrongAttempts}`);
            if(wrongAttempts === 8) { 
                endGame();
                lettersContainer.classList.add("finished");
            }

        }

    }

})  
function endGame() {
    let temp = `<div class="game-over-container">
    <div class="game-over">Game Over, The Word is <span>${randomWord}</span></div>
    </div>`;
    document.body.innerHTML += temp;
    

}