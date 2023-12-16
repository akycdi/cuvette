let winners = {
  humanWin: 0,
  computerWin: 0,
  tie: 0,
};

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
      console.log("Human wins : " + winners.humanWin);
    } else if (computerPick == 1) {
      winners.computerWin++;
      console.log("Computer wins : " + winners.computerWin);
    } else {
      winners.tie++;
      console.log("Tie : " + winners.tie);
    }
  }

  //IF Human picks Paper
  else if (humanPick === "Paper") {
    if (computerPick == 0) {
      winners.humanWin++;
      console.log("Human wins : " + winners.humanWin);
    } else if (computerPick == 2) {
      winners.computerWin++;
      console.log("Computer wins : " + winners.computerWin);
    } else {
      winners.tie++;
      console.log("Tie : " + winners.tie);
    }
  }
  //IF Human picks Scissor
  else if (humanPick === "Scissor") {
    if (computerPick == 1) {
      winners.humanWin++;
      console.log("Human wins : " + winners.humanWin);
    } else if (computerPick == 0) {
      winners.computerWin++;
      console.log("Computer wins : " + winners.computerWin);
    } else {
      winners.tie++;
      console.log("Tie : " + winners.tie);
    }
  }
  computerPick = null;
}
