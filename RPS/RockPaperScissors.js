const pcChoiceDisplay = document.getElementById('PC-Choice')
const userChoiceDisplay = document.getElementById('User-Choice')
const resultDisplay = document.getElementById('Result')
const possibleChoices = document.querySelectorAll('button')
let userChoice
let pcChoice
let result

possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) =>  {
    userChoice = e.target.id
    userChoiceDisplay.innerHTML = userChoice
    generateComputerChoice()
    getResult()
}))

function generateComputerChoice()
{
    const randomNumber = Math.floor(Math.random()  * possibleChoices.length) + 1//or 3
    if (randomNumber === 1)
    {
        pcChoice = 'rock'
    }
    if (randomNumber === 2) {
        pcChoice = 'paper'
    }
    if (randomNumber === 3) {
        pcChoice = 'scissors'
    }
    pcChoiceDisplay.innerHTML = pcChoice
}

function getResult()
{
    if(pcChoice === userChoice)
    {
        result = 'Its a draw!'
    }
    if (pcChoice === 'rock' && userChoice === "paper") {
        result = 'You win!'
    }
    if (pcChoice === 'rock' && userChoice === "scissors") {
        result = 'You lose!'
    }
    if (pcChoice === 'paper' && userChoice === "scissors") {
        result = 'You win!'
    }
    if (pcChoice === 'paper' && userChoice === "rock") {
        result = 'You lose!'
    }
    if (pcChoice === 'scissors' && userChoice === "rock") {
        result = 'You win!'
    }
    if (pcChoice === 'scissors' && userChoice === "paper") {
        result = 'You lose!'
    }
    resultDisplay.innerHTML = result 
}