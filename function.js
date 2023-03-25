const ROCK = "rock";
const PAPER = "paper";
const SCISSOR = "scissor";
const PLAYER = "player";
const COMPUTER = "computer";
const DRAW = "draw"
let roundNumber = 1;
let isGameFinished = false;
let ogText = 'Click Rock, Paper, or Scissor to start the game.'
let announcement = (document.querySelector('#announcement'));
let winnerArr = [0, 0];


function getComputerChoice() {
  const choices = [ROCK, PAPER, SCISSOR];
  const numberChoice = (Math.floor(Math.random() * 100)) % 3;
  return choices[numberChoice];
}

function playRound(playerSelection, computerSelection) {
  const playerSel = playerSelection.toLowerCase();
  const computerSel = computerSelection.toLowerCase();

  if (playerSel === computerSel) {
    return DRAW;
  }

  switch (playerSel) {
    case ROCK:
      return (computerSel == SCISSOR) ? PLAYER : COMPUTER;
      break;
    case SCISSOR:
      return (computerSel === PAPER) ? PLAYER : COMPUTER;
      break;
    case PAPER:
      return (computerSel === ROCK) ? PLAYER : COMPUTER;
  }
}

function capitalizeFirstLetter(word) {
  word = word.toLowerCase();
  return (word.charAt(0)).toUpperCase() + word.slice(1);
}

function endOfRoundMessage(winner, playerSelection, computerSelection) {
    switch (winner) {
    case PLAYER:
      return `You win! ${capitalizeFirstLetter(playerSelection)} beats ${capitalizeFirstLetter(computerSelection)}.`;
      break;
    case COMPUTER:
      return `You lose! ${capitalizeFirstLetter(playerSelection)} loses to ${capitalizeFirstLetter(computerSelection)}.`;
      break;
    case DRAW:
      return `You drew! ${capitalizeFirstLetter(playerSelection)} vs ${capitalizeFirstLetter(computerSelection)}`;
  }
}

function reset(event) {
  isGameFinished = false;
  announcement.innerText = ogText;
  roundNumber = 1;
  winnerArr = [0, 0];
}

function game(event) {

  if (isGameFinished) {
    return;
  }

  let playerSelection = event.target.innerText;  

  // let playerSelection = prompt("Rock, Paper, or Scissor?");
  let computerSelection = getComputerChoice();
  let roundWinner = playRound(playerSelection, computerSelection);

  while (roundWinner === DRAW) {
    announcement.innerText = endOfRoundMessage(roundWinner, playerSelection, computerSelection);
    // playerSelection = prompt("DRAW! Try again. Rock, Paper, or Scissor?");
    computerSelection = getComputerChoice();
    roundWinner = playRound(playerSelection, computerSelection);
    return;
  }

  announcement.innerText = `Round ${roundNumber}: ${endOfRoundMessage(roundWinner, playerSelection, computerSelection)}`;

  if (roundWinner === PLAYER) {
    winnerArr[0]++;
    roundNumber++;
  } else if (roundWinner == COMPUTER) {
    winnerArr[1]++;
    roundNumber++;
  }

  let winner;
  if (roundNumber > 5) {
    (winnerArr[0] > winnerArr[1]) ? winner = "Player" : winner = "Computer";
    announcement.innerText = `Round ${--roundNumber}: ${winner} is the winner. Total score ${winnerArr[0]} vs ${winnerArr[1]}.`
    isGameFinished = true;
  }
}

const button = document.querySelector('#selection');
button.addEventListener('click', game);

const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', reset);
