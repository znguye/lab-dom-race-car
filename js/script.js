window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");

  let game; // define the variable outside so you can access it in the startGame function

  startButton.addEventListener("click",function () {
    startGame();
  });
  
  restartButton.addEventListener("click",function restartGame() {
    location.reload();
  });

  

  //Starting the game
  function startGame() {
    console.log("start game");
    game = new Game(); // start the instance
    game.start(); // start the game
  }

  //Listening to the arrow keys
  document.addEventListener("keydown", function(event){ 

    const possibleKeys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
    console.log(event.key)
    if(possibleKeys.includes(event.key)){
      event.preventDefault(); // prevent the default behavior of the arrow keys

      switch(event.key){
        case "ArrowLeft":
          game.player.directionX = -1;
          break;
        case "ArrowRight":
          game.player.directionX = 1;
          break;
        case "ArrowUp":
          game.player.directionY = -1;
          break;
        case "ArrowDown":
          game.player.directionY = 1;
          break;
      }
    }
  });
  
};
