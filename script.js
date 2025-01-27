'use strict'
const INITIAL_SCORE = 20
const MAX_NUMBER = 20

let number //lo declaro fuera de la función para que me coja el valor en cualquier lugar del script
let score
let highscore
//el estado de mi app se basa en
// -number --> que es el número aleatorio
// -score
// -highScore
//si uno de estos cambia, se actualiza el DOM a posteriori

initData()

function initData() {
  score = INITIAL_SCORE
  highscore = 0
  number = Math.trunc(Math.random() * MAX_NUMBER) + 1
  /*el math.trunc es para quitar decimales */
  console.log(number, '**************************************')
}

/*seleccionar todos los elementos del DOM que necesitamos*/

const messageField = document.querySelector('.message')
const scoreField = document.querySelector('.score')
const highscoreField = document.querySelector('.highscore')
const numberField = document.querySelector('.number')
const guessField = document.querySelector('.guess')
const checkButton = document.querySelector('.check')
const againButton = document.querySelector('.again')

console.log(scoreField)
console.log(scoreField.textContent)
console.log(highscoreField)
console.log(highscoreField.textContent)

//eventos
checkButton.addEventListener('click', checkNumber)
againButton.addEventListener('click', initData)

function checkNumber() {
  console.log('ahora comprobaríamos el número')
  //obtenemos el número pulsado
  const guess = Number(guessField.value) //como es un input de tipo number, utilizamos el metodo value y no el metodo textContent
  //console.log(guess, guessField.value,typeof guessField.value, guessField)

  //si no es un número, que lo corrija y tiene que estar entre el 1 y 20
  if (!guess || guess < 1 || guess > 20) {
    displayMessage('Por favor introduce un número entre 1 y 20')
  } else if (guess === number) {
    displayMessage('Has ganado!!') //messageField.textContent = 'Has ganado!!'
    numberField.textContent = number
    numberField.style.width = '15rem'
    numberField.style.backgroundColor = 'black'
    numberField.style.color = 'white'
    document.body.style.backgroundColor = '#60b347'
    checkButton.disabled = true
  } else {
    if (score > 1) {
      const message =
        guess > number ? 'Te has pasado!' : 'Te has quedado corto!'
      displayMessage(message)
    } else {
      displayMessage('Has perdido la partida')
      checkButton.disabled = true //para que una vez que el score llegue a 0, se deshabilite el botón check
    }
    score--
    scoreField.textContent = score // actualizamos el texto del elemento scoreField con el valor actual de la variable score
  }

  //si es un número y es correcto... ---> comprobamos score ¿perdemos partida?

  //actualizamos nuestras variables y el DOM

  //si es un número y es incorrecto...
}

function displayMessage(message) {
  messageField.textContent = message
}
