class Player{
    constructor(gameScreen){
        
        this.gameScreen = gameScreen; // gameScreen is the div where the player will be displayed

        //Car position
        const width = 50;
        const height = 50;
        const left = gameScreen.offsetWidth / 2 ;
        const top = gameScreen.offsetHeight - height - 10; 
        
        this.left = left; // horizontal position of the car
        this.top = top; //vertical position of the car
        this.width = width;
        this.height = height;

        //Car movement control
        this.directionX = 0; // 0 means no movement, 1 means moving right, -1 means moving left
        this.directionY = 0; // 0 means no movement, 1 means moving down, -1 means moving up

        this.element = document.createElement('img');

        this.element.src = './images/car.png';
        this.element.style.scale = 0.5;
        this.element.style.width = `$(width)px`;
        this.element.style.height = `$(height)px`;
        this.element.style.position = 'absolute'; // to be able to move it around
        this.element.style.left = `$(left)px`;
        this.element.style.top = `$(top)px`;

        this.gameScreen.appendChild(this.element); // appendChild take an html element and add it to the gameScreen
    }


    move(){
        this.left += this.directionX;
        this.top += this.directionY;

        if(this.left <=0){
            this.left = 0; // if the left side of the car is at the left edge of the screen, don't let it go further
        } 
        
        if (this.top < 0){ // top goes up the more down you go
            this.top = 0; // if the top of the car is at the top edge of the screen, don't let it go further
        } 

        if(this.left > this.gameScreen.offsetWidth - this.width){ //offsetWidth is the width of the gameScreen (the road)
            this.left = this.gameScreen.offsetWidth - this.width; // if the right side of the car is at the edge of the screen, don't let it go over the road
        }

        if(this.top > this.gameScreen.offsetHeight - this.height){ 
            this.top = this.gameScreen.offsetHeight - this.height; // if the bottom of the car is at the bottom edge of the screen, don't let it go over the road
        }
        this.updatePosition();
    }


    updatePosition(){
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
    }; 

    didCollide(obstacle){
        const playerRect = this.element.getBoundingClientRect(); // get the position of the player
        const obstacleRect = obstacle.element.getBoundingClientRect(); // get the position of the obstacle

        if( playerRect.left < obstacleRect.right && 
            playerRect.right > obstacleRect.left && 
            playerRect.top < obstacleRect.bottom && 
            playerRect.bottom > obstacleRect.top){
            return true;
        } else {return false;}
    };
}