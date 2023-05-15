const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";
const PLAYER = "player";
const COMPUTER = "computer";
const DRAW = "draw"
let roundNumber = 1;
let isGameFinished = false;
let ogText = 'Click Rock, Paper, or Scissors to start the game.'
let announcement = (document.querySelector('#msg'));
let winnerArr = [0, 0];

const playerScore = document.querySelector('#player-score span');
const computerScore = document.querySelector('#computer-score span');

const button = document.querySelector('#shape');
button.addEventListener('mousedown', game);

const resetButton = document.querySelector('#reset');
resetButton.addEventListener('mousedown', reset);

function getComputerChoice() {
  const choices = [ROCK, PAPER, SCISSORS];
  const numberChoice = (Math.floor(Math.random() * 100)) % 3;
  return choices[numberChoice];
}

function playRound(playerSelection, computerSelection) {
  const playerSel = playerSelection.toLowerCase();
  const computerSel = computerSelection.toLowerCase();

  switch (playerSel) {
    case computerSel:
      return DRAW;
    case ROCK:
      return (computerSel == SCISSORS) ? PLAYER : COMPUTER;
    case SCISSORS:
      return (computerSel === PAPER) ? PLAYER : COMPUTER;
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
    case COMPUTER:
      return `You lose! ${capitalizeFirstLetter(playerSelection)} loses to ${capitalizeFirstLetter(computerSelection)}.`;
    case DRAW:
      return `You drew! ${capitalizeFirstLetter(playerSelection)} vs ${capitalizeFirstLetter(computerSelection)}`;
  }
}

function reset(event) {
  isGameFinished = false;
  announcement.innerText = ogText;
  roundNumber = 1;
  winnerArr = [0, 0];
  playerScore.innerText = '0'
  computerScore.innerText = '0'
}

function game(event) {

  if (isGameFinished) {
    return;
  }

  let playerSelection = event.target.dataset.shape;

  let computerSelection = getComputerChoice();
  let roundWinner = playRound(playerSelection, computerSelection);

  while (roundWinner === DRAW) {
    announcement.innerText = endOfRoundMessage(roundWinner, playerSelection, computerSelection);
    computerSelection = getComputerChoice();
    roundWinner = playRound(playerSelection, computerSelection);
    return;
  }

  announcement.innerText = `Round ${roundNumber}: ${endOfRoundMessage(roundWinner, playerSelection, computerSelection)}`;

  if (roundWinner === PLAYER) {
    winnerArr[0]++;
    playerScore.innerText = winnerArr[0];
    roundNumber++;
  } else if (roundWinner == COMPUTER) {
    winnerArr[1]++;
    computerScore.innerText = winnerArr[1];
    roundNumber++;
  }

  let winner;
  if (roundNumber > 5) {
    (winnerArr[0] > winnerArr[1]) ? winner = "Player" : winner = "Computer";
    announcement.innerText = `Round ${--roundNumber}: ${winner} is the winner.\n Total score is: Player (${winnerArr[0]} - ${winnerArr[1]}) Computer.\n Click reset to restart the game.`
    isGameFinished = true;
  }
}