let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");
let player1Input = document.getElementById("player_1");
let player2Input = document.getElementById("player_2");
let player1 = "Player 1";
let player2 = "Player 2";

let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];
let xTurn = true;
let count = 0;

const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));
  popupRef.classList.remove("hide");
};

const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  popupRef.classList.add("hide");
  player1 = player1Input.value || "Player 1";
  player2 = player2Input.value || "Player 2";
};

const winFunction = (letter) => {
  disableButtons();

  let player1InputValue = player1Input.value.trim();
  let player2InputValue = player2Input.value.trim();

  let player1Name = player1InputValue !== "" ? player1InputValue : player1Input.placeholder;
  let player2Name = player2InputValue !== "" ? player2InputValue : player2Input.placeholder;

  if (player1InputValue === "" || player2InputValue === "") {
    
  }

  if (letter === "X") {
    msgRef.innerHTML = `🎉 <br> ${player1Name} Wins`;
  } else {
    msgRef.innerHTML = `🎉 <br> ${player2Name} Wins`;
  }
};

const drawFunction = () => {
  disableButtons();
  msgRef.innerHTML = "😎 <br> It's a Draw";
};

newgameBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
  window.location.href = "index.html";
});

restartBtn.addEventListener("click", () => {
  resetGame();
});

const resetGame = () => {
  count = 0;
  xTurn = true;
  enableButtons();
  msgRef.innerHTML = `Player ${xTurn ? player1 : player2}'s Turn`;
  player1Input.value = "";
  player2Input.value = "";
  player1Input.style.backgroundColor = "#ffffff";
  player1Input.style.color = "#000000";
  player2Input.style.backgroundColor = "#ffffff";
  player2Input.style.color = "#000000";
  player1Input.placeholder = "Player 1";
  player2Input.placeholder = "Player 2";
};

const winChecker = () => {
  for (let i of winningPattern) {
    let [element1, element2, element3] = [
      btnRef[i[0]].innerText,
      btnRef[i[1]].innerText,
      btnRef[i[2]].innerText,
    ];
    if (element1 != "" && element2 != "" && element3 != "") {
      if (element1 == element2 && element2 == element3) {
        winFunction(element1);
      }
    }
  }
};

btnRef.forEach((element) => {
  element.addEventListener("click", () => {
    if (xTurn) {
      xTurn = false;
      element.innerText = "X" ;
      element.style.color = "#d161ff"; 
      element.disabled = true;
      player1Input.style.backgroundColor = "#ffffff";
      player1Input.style.color = "#000000"; 
      player2Input.style.backgroundColor = "#00FFFF"; 
      player2Input.style.color = "#ffffff";
      player1Input.placeholder = "Player 1";
      player2Input.placeholder = "Player 2's Turn";
    } else {
      xTurn = true;
      element.innerText = "O";
      element.style.color = "#00FFFF"; 
      element.disabled = true;
      player1Input.style.backgroundColor = "#d161ff"; 
      player1Input.style.color = "#ffffff"; 
      player2Input.style.backgroundColor = "#ffffff"; 
      player2Input.style.color = "#000000"; 
      player2Input.placeholder = "Player 2";
      player1Input.placeholder = "Player 1's Turn";
    }
    count += 1;
    if (count == 9) {
      drawFunction();
    }
    winChecker();
  });
});
window.onload = enableButtons;
