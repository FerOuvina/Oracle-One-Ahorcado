// Initializing variables
const extraWord = document.querySelector('.main__article--textarea');

// Alerts
function newToast(message){
  Swal.fire({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    icon: "warning",
    title: message
  })
}

// Get new word
document.getElementById('submitWord').addEventListener('click', function(e){
  let newWord = extraWord.value.trim().toUpperCase();
  console.log(newWord)
  if(/^[A-ZÄËÏÖÜ\u00d1\s]*$/.test(newWord) && newWord != ""){
    let toArray = newWord.split(' ');
    if(toArray.length > 1){
      newToast("Ingrese una palabra a la vez");
      return false;
    };
    if(newWord.length <= 8){
      localStorage.setItem("extraWord", newWord);
      window.location.href = "./index.html";
    } else {
      newToast("Máximo 8 caracteres, sin espacios y/o acentos. aaaa");
      return false;
    };
  } else {
    newToast("Máximo 8 caracteres, sin espacios y/o acentos.");
    return false;
  };
});