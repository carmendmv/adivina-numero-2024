'use strict'
const INITIAL_SCORE = 20
const MAX_NUMBER = 20

function initData() {
  let score = INITIAL_SCORE
  let highscore = 0
  let number = Math.trunc(Math.random() * MAX_NUMBER) + 1
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
//si no es un número, que lo corrija
//si es un número y es correcto... ---> comprobamos score ¿perdemos partida?
//actualizamos nuestras variables y el DOM

//si es un número y es incorrecto...
}


