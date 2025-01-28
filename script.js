'use strict'
const INITIAL_SCORE = 20
const MAX_NUMBER = 20

let number // Lo declaro fuera de la función para que me coja el valor en cualquier lugar del script
let score
let highscore
let attempts // Añado la variable para llevar el conteo de intentos

// El estado de mi app se basa en:
// - number --> que es el número aleatorio
// - score
// - highscore (se basará en intentos)
// Si uno de estos cambia, se actualiza el DOM a posteriori

initData()

function initData() {
  score = Number(localStorage.getItem('score')) || INITIAL_SCORE // Cargar score desde localStorage si existe
  highscore = Number(localStorage.getItem('highscore')) || 0 // Inicializo el highscore con 0
  attempts = 0 // Reinicio el contador de intentos
  number = Math.trunc(Math.random() * MAX_NUMBER) + 1
  console.log(number, '**************************************')
}

/* Seleccionar todos los elementos del DOM que necesitamos */

const messageField = document.querySelector('.message')
const scoreField = document.querySelector('.score')
const highscoreField = document.querySelector('.highscore')
const numberField = document.querySelector('.number')
const guessField = document.querySelector('.guess')
const checkButton = document.querySelector('.check')
const againButton = document.querySelector('.again')

if (
  scoreField &&
  highscoreField &&
  numberField &&
  guessField &&
  checkButton &&
  againButton
) {
  console.log('Elementos del DOM cargados correctamente.')

  // Eventos
  checkButton.addEventListener('click', checkNumber)
  againButton.addEventListener('click', playAgain)

  // Quiero que el enter equivalga a clickar el botón check
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      checkNumber()
    }
  })
} else {
  console.error('Algunos elementos del DOM no fueron encontrados.')
}

function checkNumber() {
  console.log('Ahora comprobaríamos el número')
  const guess = Number(guessField.value)

  if (!guess || guess < 1 || guess > 20) {
    displayMessage('Por favor introduce un número entre 1 y 20')
  } else if (guess === number) {
    displayMessage('¡Has ganado!!')
    numberField.textContent = number
    numberField.style.width = '15rem'
    numberField.style.backgroundColor = 'black'
    numberField.style.color = 'white'
    document.body.style.backgroundColor = '#60b347'
    checkButton.disabled = true

    // Si los intentos actuales son menores que el highscore, actualizo el highscore
    if (attempts < highscore || highscore === 0) {
      highscore = attempts
      highscoreField.textContent = attempts
      localStorage.setItem('highscore', highscore) // Guardo el highscore en el localStorage
    }
  } else {
    if (score > 1) {
      const message =
        guess > number ? '¡Te has pasado!' : '¡Te has quedado corto!'
      displayMessage(message)
    } else {
      displayMessage('Has perdido la partida')
      checkButton.disabled = true // Para que una vez que el score llegue a 0, se deshabilite el botón check
    }
    score--
    attempts++ // Incremento el contador de intentos
    scoreField.textContent = score // Actualizo el score en el DOM

    // Guardar el score actualizado en localStorage
    localStorage.setItem('score', score)
  }
}

function playAgain() {
  score = INITIAL_SCORE // Reiniciar score a 20 cuando se reinicia la partida
  scoreField.textContent = score // Actualizo el DOM con el score reiniciado
  attempts = 0 // Reinicio el contador de intentos

  numberField.textContent = '?'
  numberField.style.width = '15rem'
  numberField.style.backgroundColor = 'black'
  numberField.style.color = '#222'
  numberField.style.backgroundColor = '#CCCCCC'
  document.body.style.backgroundColor = '#222'
  checkButton.disabled = false

  highscore = Number(localStorage.getItem('highscore')) || 0 // Inicializo el highscore correctamente a 0
  highscoreField.textContent = highscore // Muestro el highscore en el DOM

  // Reinicio score en el localStorage cuando se vuelve a jugar
  localStorage.setItem('score', score)
  localStorage.setItem('attempts', attempts) // Guardo los intentos también (si es necesario)
}

function displayMessage(message) {
  messageField.textContent = message
}
