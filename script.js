// Initializing variables
let wrongLetters = [];
let letters = [];
let verifyChar = [];
let repeatedLetters = [];
let gameEnd = false;
let tries = 0;

// Show Input Notification
function showToast(message){
  Swal.fire({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    icon: "info",
    title: message
  });
};

// Win Alert 
function winAlert(){
  Swal.fire({
    icon: "success",
    title: "You Win",
    text: "¿Jugar de nuevo?",
    background: "#f5f5dc",
    confirmButtonColor: "#3eaca8",
    width: "18em",
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
    html: `La palabra secreta era: <b>${chosenWord}</b><br><br> ¿Jugar de nuevo?`,
    background: "#f5f5dc",
    confirmButtonColor: "#3eaca8",
    width: "18em",
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
    html: `La palabra secreta era: <b>${chosenWord}</b><br><br> ¿Jugar de nuevo?`,
    background: "#f5f5dc",
    confirmButtonColor: "#3eaca8",
    width: "18em",
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
document.getElementById("outside__buttons--surrender").addEventListener("click",function(){surrenderAlert()});

// Get user extra word
if(localStorage.getItem("extraWord")){
  secretWord.push(localStorage.getItem("extraWord"));
};

// Getting a random word
const secretWord = ["ARROZ","CAFE","OSO","GATO"];
const secretWordLenght = secretWord.length;
function randomNumber(max){return Math.floor(Math.random() * max)};
function getSecretWord(secretWordLenght){return secretWord[randomNumber(secretWordLenght)]};
const chosenWord = getSecretWord(secretWordLenght);
letters = Array.from(chosenWord);
verifyChar = Array.from(chosenWord);

// Drawing the hangman
function checkTries(tries){
  switch(tries){
    case 1: document.querySelector(".head").style.display = "block";
    break;
    case 2: document.querySelector(".body").style.display = "block";
    break;
    case 3: document.querySelector(".right__arm").style.display = "block";
    break;
    case 4: document.querySelector(".left__arm").style.display = "block";
    break;
    case 5: document.querySelector(".right__leg").style.display = "block";
    break;
    case 6: document.querySelector(".left__leg").style.display = "block";
    gameEnd = true;
    setTimeout(loseAlert, 500);
    break;
    default: break;
  };
};

// Drawing the word underline
function showWordUnderline(chosenWord) {
  const wordUnderline = document.querySelector(".main__input");
  let underlineGroup = "";
  for (let i = 0; i < chosenWord.length; i++){
    underlineGroup += '<input type="text" class="main__input--disabled" disabled>';
  };
  wordUnderline.innerHTML = underlineGroup;
};

// Getting user input
function getUserInput(chosenWord) {
  const getInput = document.querySelector(".user__input");
  let getInputHTML = '';
  for (let i = 0; i < chosenWord.length; i++){
    getInputHTML += `<input type="text" class="user__input--disabled" id="${i}" disabled>`;
  };
  getInput.innerHTML = getInputHTML;
};

// Show correct answers
function showCorrectAnswers(char){
  const pos = verifyChar.indexOf(char);
  const showChar = document.getElementById(pos);
  if(showChar){
    showChar.value = letters[pos];
    verifyChar[pos] = "";
    if(verifyChar.filter((element) => element === "").length === letters.length){
      gameEnd = true;
      setTimeout(winAlert, 1000);
    };
  };
};

// Show wrong answers
function showWrongAnswers(char){
  if (wrongLetters.find((element) => element === char)){
    return false;
  } else {
    let badLetters = document.querySelector(".main__output");
    let badLettersHTML = `<input type="text" class="main__output--disabled" value="${char}" disabled>`;
    badLetters.innerHTML += badLettersHTML;
    wrongLetters.push(char);
    tries++;
    checkTries(tries);
  };
};

// Setting game mobile
function gameStartMobile(char){
  if(/^[A-ZÄËÏÖÜ\u00d1\s]*$/.test(char)){
    let foundChar = verifyChar.find((element) => element == char);
    if(foundChar){
      showCorrectAnswers(char);
    } else {
      showWrongAnswers(char);
    };
  } else {
    showToast("Solo se permite el uso de letras y/o sin acentos")
  };
};

// Setting game
function gameStart(e){
  const char = String.fromCharCode(e.keyCode).toUpperCase();
  if(e.keyCode != 0 && e.keyCode != 13){
    if(/^[A-ZÄËÏÖÜ\u00d1\s]*$/.test(char)){
      let foundChar = verifyChar.find((element) => element == char);
      if(foundChar){
        showCorrectAnswers(char);
      } else {
        showWrongAnswers(char);
      };
    } else {
      showToast("Solo se permite el uso de letras y/o sin acentos")
    };
  } else{
    showToast("Solo se permite el uso de letras y/o sin acentos")
  };
};

// Start Game on mobile devices
function startGameMobile(e){
  if(gameEnd){
    return false;
  }else{
    gameStartMobile(e);
  };
};

// Starting game
function playGame(e){
  if(gameEnd){
    return false;
  }else{
    gameStart(e);
  };
};

function mobileKeyboard(e){
  startGameMobile(e);
};

window.onload = function(){
  document.onkeydown = playGame;
  showWordUnderline(chosenWord);
  getUserInput(chosenWord);
};

// Condition to show on screen keyboard if user is on mobile devices
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
  document.querySelector('.keyboard').style.display = 'flex';
};