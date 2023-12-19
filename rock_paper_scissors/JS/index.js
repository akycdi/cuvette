let winners = {
  humanWin: 0,
  computerWin: 0,
  tie: 0,
};

function getComputerPick() {
  var computerPick = Math.floor(Math.random() * 3);
  if (computerPick == 0) {
    computerPick = "ROCK";
  } else if (computerPick == 1) {
    computerPick = "PAPER";
  } else {
    computerPick = "SCISSOR";
  }
  return computerPick;
}
function getWinner(humanPick, computerPick, roundResult) {
  if (humanPick === "ROCK") {
    if (computerPick == "SCISSOR") {
      winners.humanWin++;
      roundResult.winner = "Human";
    } else if (computerPick == "PAPER") {
      winners.computerWin++;
      roundResult.winner = "Computer";
    } else {
      winners.tie++;
      roundResult.winner = "Tie";
    }
  } else if (humanPick === "PAPER") {
    if (computerPick == "ROCK") {
      winners.humanWin++;
      roundResult.winner = "Human";
    } else if (computerPick == "SCISSOR") {
      winners.computerWin++;
      roundResult.winner = "Computer";
    } else {
      winners.tie++;
      roundResult.winner = "Tie";
    }
  } else if (humanPick === "SCISSOR") {
    if (computerPick == 1) {
      winners.humanWin++;
      roundResult.winner = "Human";
    } else if (computerPick == "ROCK") {
      winners.computerWin++;
      roundResult.winner = "Computer";
    } else {
      winners.tie++;
      roundResult.winner = "Tie";
    }
  }
}
function pageRunner() {
  if (localStorage.getItem("computerWins")) {
    winners.humanWin = parseInt(localStorage.getItem("humanWins"));
    winners.computerWin = parseInt(localStorage.getItem("computerWins"));
  } else {
    localStorage.setItem("humanWins", winners.humanWin);
    localStorage.setItem("computerWins", winners.computerWin);
  }
  refreshScore();
}
function btnClickRock() {
  startGame("ROCK");
}
function btnClickPaper() {
  startGame("PAPER");
}
function btnClickScissor() {
  startGame("SCISSOR");
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
function openPopup() {
  document.getElementById("popup").style.display = "flex";
}
function closePopup() {
  document.getElementById("popup").style.display = "none";
}
function createImageButton(pick) {
  const button = document.createElement("button");
  const image = document.createElement("img");

  const styles = {
    Rock: {
      borderColor: "#0074b6",
      backgroundColor: "white",
    },
    Paper: {
      borderColor: "#ffa943",
      backgroundColor: "white",
    },
    Scissor: {
      borderColor: "#bd00ff",
      backgroundColor: "white",
    },
  };

  const { borderColor, backgroundColor, position } =
    styles[pick] || styles.Rock;

  button.style.width = "7rem";
  button.style.height = "7rem";
  button.style.borderRadius = "50%";
  button.style.border = "0.8rem solid transparent";
  button.style.backgroundColor = "transparent";
  button.style.fontSize = "16px";
  button.style.cursor = "pointer";
  button.style.position = "absolute";

  button.style.borderColor = borderColor;
  button.style.backgroundColor = backgroundColor;

  image.src = `./static/${pick}Btn.svg`;
  image.alt = pick;
  button.appendChild(image);

  return button;
}

function updatedom(roundResult) {

  const traingle = document.getElementById("triangle-container");
  traingle.style.display= "none";

  const rockBtn = document.getElementById("rockBtn");
  const paperBtn = document.getElementById("paperBtn");
  const scissorBtn = document.getElementById("scissorBtn");
  
  rockBtn.style.display = "none";
  paperBtn.style.display = "none";
  scissorBtn.style.display = "none";

  const humanContainer = document.createElement("div");
  const computerContainer = document.createElement("div");

  const humanPickBtn = createImageButton(roundResult.humanPick);
  const computerPickBtn = createImageButton(roundResult.computerPick);

  humanContainer.appendChild(humanPickBtn);
  computerContainer.appendChild(computerPickBtn);

  const messageContainer = document.createElement("div");
  const resultMessage = document.createElement("p");
  const actionButton = document.createElement("button");

  if (roundResult.winner === "Human") {
    resultMessage.innerText = "You Won!";
    actionButton.innerText = "Play Again";
    actionButton.addEventListener("click", function () {
      window.location.reload();
    });
  } else if (roundResult.winner === "Computer") {
    resultMessage.innerText = "You Lost!";
    actionButton.innerText = "Play Again";
    actionButton.addEventListener("click", function () {
      window.location.reload();
    });
  } else {
    resultMessage.innerText = "It's a Tie!";
    actionButton.innerText = "Try Again";
    actionButton.addEventListener("click", function () {
      window.location.reload();
    });
  }
  messageContainer.appendChild(resultMessage);
  messageContainer.appendChild(actionButton);

  document.getElementById("result").appendChild(humanContainer);
  document.getElementById("result").appendChild(computerContainer);
  document.getElementById("result").appendChild(messageContainer);
}


function startGame(humanPick) {
  let computerPick = getComputerPick();
  let roundResult = {
    winner: "",
    humanPick: humanPick,
    computerPick: computerPick,
  };

  getWinner(humanPick, computerPick, roundResult);
  updatedom(roundResult);
  updateLocalStorage();
}
window.onload = pageRunner();
