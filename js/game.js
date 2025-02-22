class Game {
    constructor() {
        // Select all the screens
        this.startScreen = document.getElementById('game-intro');
        this.gameScreen = document.getElementById('game-screen');
        this.gameEndScreen = document.getElementById('game-end');

        //Game assets
        this.player = new Player(this.gameScreen); // no actual player yet (initially it's Null, but changed later)
        this.obstacles = []; // no obstacles yet

        // Game area size
        this.height = 600; // in case we change it later in some function
        this.width = 1000; 

        // Game score and live control
        this.score = 0; // initial score
        this.lives = 3; // initial lives

        this.scoreHTML = document.getElementById('score');
        this.livesHTML = document.getElementById('lives');

        // Game control settings
        this.gameIsOver = false; // game is not over until it's over
        this.gameIntervalId; // no interval yet >> undefined for now, this is the ID when we start the game
        this.gameLoopFrequency = Math.round(1000/40); // How long is the loop (10 frame and above is good)

        //game audio controls
        // this.music = new Audio('../sounds/music.mp3'); //fake
        // this.music.volume = 0.1; // 10% volume
        // this.music.loop = true; // loop the music
    }

    // Game methods
    start(){
        this.gameScreen.style.width = `${this.width}px`;
        this.gameScreen.style.height = `${this.height}px`;

        this.startScreen.style.display = 'none'; // hide the start screen which was always visible
        this.gameScreen.style.display = 'block'; // show the game screen

        this.gameIntervalId = setInterval(() => {
            this.gameLoop()
        }, this.gameLoopFrequency)

        // this.music.play();
    }

    gameLoop(){
        // console.log('game loop');
        this.update();
        
        if(this.gameIsOver){
            clearInterval(this.gameIntervalId);
        }
    }

    update(){
        this.player.move();

        for(let i = 0; i < this.obstacles.length; i++){
            const obstacle = this.obstacles[i];
            obstacle.move();

            if (this.player.didCollide(obstacle)){
                obstacle.element.remove(); // remove the redCar from the screen
                this.lives--; // decrease the lives
                this.livesHTML.innerText = this.lives; // update the lives on the screen
                this.obstacles.splice(i, 1); // remove the obstacle from the array because the number of obstacles is the same as the number of lives
                i--; // decrease the index because we removed the obstacle from the array
            } else if (obstacle.top > this.height){
                obstacle.element.remove(); // remove the redCar from the screen
                this.score++; // increase the score
                this.scoreHTML.innerText = this.score; // update the score on the screen
                this.obstacles.splice(i, 1); // remove the obstacle from the array because it's out of the screen
                i--; // decrease the index because we removed the obstacle from the array
            }
        }
            
        if(this.lives === 0){
            this.endGame();
        }

        if(Math.random() > 0.90 && this.obstacles.length <1){  // you can play with the threshold
            this.obstacles.push(new Obstacle(this.gameScreen, 200, 0, 100, 150));
        }
    }

    endGame(){
        this.player.element.remove();
        this.obstacles.forEach((obs)=> obs.element.remove());
        this.gameIsOver = true;
        this.gameScreen.style.display = 'none';
        this.gameEndScreen.style.display = 'block';
        // this.music.pause();
        // this.music.currentTime = 0;
    }
}