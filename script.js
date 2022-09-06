// Initializing variables
let hangmanState = [];
let repeatedLetters = [];
let tries = 6;


// Getting a random word
const secretWord = ["arroz","cafe","oso","gato"];
const index = Math.round(Math.random()*(secretWord.length - 1));
let randomWord = secretWord[index];
getSecretWord = () => {hangmanState.push(randomWord)};

// Win Alert 
function winAlert(){
  Swal.fire({
    icon: "success",
    title: "You Win",
    text: "Jugar de nuevo?",
    showCloseButton: false,
    showDenyButton: true,
    confirmButtonText: "Sí",
    denyButtonText: "No",
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
  }).then((result) => {
    if(result.isConfirmed){
      window.location.href = "./game.html";
    } else if (result.isDenied){
      window.location.href = "./index.html";
    } else if (result.location.isDismissed){
      window.location.href = "./game.html";
    };
  });
};

// Lose Alert
function loseAlert(){
  Swal.fire({
    icon: "error",
    title: "Game Over",
    html: `La palabra secreta era: <b>${randomWord}</b><br><br> Jugar de nuevo?`,
    showCloseButton: false,
    showDenyButton: true,
    confirmButtonText: "Sí",
    denyButtonText: "No",
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
  }).then((result) => {
    if(result.isConfirmed){
      window.location.href = "./game.html";
    } else if (result.isDenied){
      window.location.href = "./index.html";
    } else if (result.location.isDismissed){
      window.location.href = "./game.html";
    };
  });
};

// Surrender Alert 
function surrenderAlert(){
  Swal.fire({
    icon: "error",
    title: "Game Over",
    html: `La palabra secreta era: <b>${randomWord}</b><br><br> Jugar de nuevo?`,
    showCloseButton: false,
    showDenyButton: true,
    confirmButtonText: "Sí",
    denyButtonText: "No",
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
  }).then((result) => {
    if(result.isConfirmed){
      window.location.href = "./game.html";
    } else if (result.isDenied){
      window.location.href = "./index.html";
    } else if (result.location.isDismissed){
      window.location.href = "./game.html";
    };
  });
};

// Drawing the hangman
// while (tries != 0) {
//   if (tries === 5){document.querySelector(".head").style.display = "block"};
//   if (tries === 4){document.querySelector(".body").style.display = "block"};
//   if (tries === 3){document.querySelector(".right__arm").style.display = "block"};
//   if (tries === 2){document.querySelector(".left__arm").style.display = "block"};
//   if (tries === 1){document.querySelector(".right__leg").style.display = "block"};
//   if (tries === 0){document.querySelector(".left__leg").style.display = "block"};
// };

// Drawing the word underline
function showWordUnderline(hangmanState) {
  const wordUnderline = document.querySelector(".main__input");
  let underlineGroup = "";
  for (let i = 0; i < randomWord.length; i++){
    underlineGroup += '<input type="text" class="main__input--disabled">';
  }
  wordUnderline.innerHTML = underlineGroup;
}

// Getting the user input
function getUserInput() {
  const getInput = document.querySelector(".user__input");
  let inputIndex = '';
  for (let i = 0; i < randomWord.length; i++){
    inputIndex += `<input type="text" class="user__input--disabled" disabled id=${i}`;
  };
  getInput.innerHTML = inputIndex;
};