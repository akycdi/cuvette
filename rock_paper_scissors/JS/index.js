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
    ROCK: {
      borderColor: "#0074b6",
      backgroundColor: "white",
    },
    PAPER: {
      borderColor: "#ffa943",
      backgroundColor: "white",
    },
    SCISSOR: {
      borderColor: "#bd00ff",
      backgroundColor: "white",
    },
  };

  const { borderColor, backgroundColor, position } =
    styles[pick] || styles.ROCK;

  button.style.width = "9rem";
  button.style.height = "9rem";
  button.style.borderRadius = "50%";
  button.style.border = "0.8rem solid transparent";
  button.style.backgroundColor = "transparent";
  button.style.cursor = "pointer";

  button.style.borderColor = borderColor;
  button.style.backgroundColor = backgroundColor;

  image.src = `./static/${pick}Btn.svg`;
  image.alt = pick;
  button.appendChild(image);

  return button;
}

function updatedom(roundResult) {
  const mainContainer = document.getElementById("mainContainer");
  const triangle = document.getElementById("triangle");

  const rockBtn = document.getElementById("rockBtn");
  const paperBtn = document.getElementById("paperBtn");
  const scissorBtn = document.getElementById("scissorBtn");

  rockBtn.remove();
  paperBtn.remove();
  scissorBtn.remove();

  triangle.remove();

  // rockBtn.style.display = "none";
  // paperBtn.style.display = "none";
  // scissorBtn.style.display = "none";

  mainContainer.style.display = "flex";
  mainContainer.style.width = "50rem";
  mainContainer.style.height = "20rem";
  mainContainer.style.marginLeft = "27%";
  // mainContainer.style.backgroundColor = "red";

  const humanContainer = document.createElement("div");
  const humanPickBtn = createImageButton(roundResult.humanPick);
  humanContainer.appendChild(humanPickBtn);
  humanContainer.className = "humanResultContainer";
  mainContainer.append(humanContainer);

  const resultTextContainer = document.createElement("div");
  const resultMessage = document.createElement("span");
  resultMessage.className = "resultMessage";

  var resultMessageAgainst = document.createElement("span");

  const actionButton = document.createElement("button");
  actionButton.className = "actionButton";

  if (roundResult.winner === "Human") {
    resultMessage.innerText = "YOU WIN";
    resultMessageAgainst.innerText = "AGAINST PC";

    actionButton.innerText = "PLAY AGAIN";
    actionButton.addEventListener("click", function () {
      window.location.href = "winner.html";
    });
  } else if (roundResult.winner === "Computer") {
    resultMessage.innerText = " YOU LOST";
    resultMessageAgainst.innerText = "AGAINST PC";

    actionButton.innerText = "PLAY AGAIN";
    actionButton.addEventListener("click", function () {
      window.location.reload();
    });
  } else {
    resultMessage.innerText = "TIE UP";
    resultMessageAgainst.innerText = "";
    actionButton.innerText = "REPLY";
    actionButton.addEventListener("click", function () {
      window.location.reload();
    });
  }

  resultTextContainer.appendChild(resultMessage);
  resultTextContainer.appendChild(resultMessageAgainst);
  resultTextContainer.appendChild(actionButton);
  resultTextContainer.className = "resultTextContainer";
  mainContainer.append(resultTextContainer);

  const computerContainer = document.createElement("div");
  computerContainer.className = "computerResultContainer";
  const computerPickBtn = createImageButton(roundResult.computerPick);
  computerContainer.appendChild(computerPickBtn);
  mainContainer.append(computerContainer);
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
window.onload = pageRunner();
