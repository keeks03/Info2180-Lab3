document.addEventListener("DOMContentLoaded", function () {
  var board = document.getElementById("board");
  var statusEl = document.getElementById("status");
  var newGameButton = document.querySelector(".btn");

  var currentPlayer = "X";
  var gameBoard = Array(9).fill(""); 
  var gameOver = false;

  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  function setStatus(msg, won){
    statusEl.textContent = msg;
    statusEl.classList.toggle("you-won", !!won);
  }

  function checkWinner(){
    for (const [a,b,c] of winPatterns){
      if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]){
        setStatus(`Congratulations! ${gameBoard[a]} is the Winner!`, true);
        gameOver = true;
        return true;
      }
    }
    if (gameBoard.every(v => v)) {
      setStatus('Draw! Click "New Game" to play again.');
      gameOver = true;
    }
    return false;
  }

  // Make an array of the 9 cells, add .square, and store index
  Array.from(board.children).forEach((square, i) => {
    square.classList.add("square");
    square.dataset.idx = i; // safer than relying on class order

    square.addEventListener("mouseenter", function(){
      if (!gameOver && !gameBoard[i]) this.classList.add("hover");
    });

    square.addEventListener("mouseleave", function(){
      this.classList.remove("hover");
    });

    square.addEventListener("click", function(){
      if (gameOver) return;
      const idx = +this.dataset.idx;
      if (gameBoard[idx]) return; // disallow changing a filled square

      gameBoard[idx] = currentPlayer;
      this.textContent = currentPlayer;
      this.classList.add(currentPlayer);
      this.classList.remove("hover");

      if (!checkWinner()){
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        setStatus(`It's ${currentPlayer}'s turn.`);
      }
    });
  });

  newGameButton.addEventListener("click", function(){
    gameBoard.fill("");
    gameOver = false;
    currentPlayer = "X";
    Array.from(board.children).forEach(sq => {
      sq.textContent = "";
      sq.classList.remove("X","O","hover");
    });
    setStatus("Move your mouse over a square and click to play an X or an O.");
  });

  // initial status
  setStatus("Move your mouse over a square and click to play an X or an O.");
});