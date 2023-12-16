let winners = {
  humanWin: 0,
  computerWin: 0,
  tie: 0,
};

function pageRunner() {
  if (localStorage.getItem("computerWins")) {
    winners.humanWin = localStorage.getItem("humanWins");
    winners.computerWin = localStorage.getItem("computerWins");
  }
  refreshScore();
}

function btnClickRock() {
  startGame("Rock");
}

function btnClickPaper() {
  startGame("Paper");
}

function btnClickScissor() {
  startGame("Scissor");
}

function startGame(humanPick) {
  let computerPick = Math.floor(Math.random() * 3);
  console.log("Computer pick = " + computerPick);

  //If Human picks rock
  if (humanPick === "Rock") {
    if (computerPick == 2) {
      winners.humanWin++;
      console.log("Human wins");
    } else if (computerPick == 1) {
      winners.computerWin++;
      console.log("Computer wins");
    } else {
      winners.tie++;
      console.log("Tie");
    }
  }

  //IF Human picks Paper
  else if (humanPick === "Paper") {
    if (computerPick == 0) {
      winners.humanWin++;
      console.log("Human wins");
    } else if (computerPick == 2) {
      winners.computerWin++;
      console.log("Computer wins");
    } else {
      winners.tie++;
      console.log("Tie");
    }
  }
  //IF Human picks Scissor
  else if (humanPick === "Scissor") {
    if (computerPick == 1) {
      winners.humanWin++;
      console.log("Human wins");
    } else if (computerPick == 0) {
      winners.computerWin++;
      console.log("Computer wins");
    } else {
      winners.tie++;
      console.log("Tie");
    }
  }

  updateLocalStorage();
  computerPick = null;
}
function updateLocalStorage() {
  localStorage.setItem("humanWins", winners.humanWin);
  localStorage.setItem("computerWins", winners.computerWin);
  refreshScore();
}

function refreshScore() {
  document.getElementById("humanScore").innerText =
    localStorage.getItem("humanWins");
  document.getElementById("computerScore").innerText =
    localStorage.getItem("computerWins");
}

window.onload = pageRunner();
