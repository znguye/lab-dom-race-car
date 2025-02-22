class Obstacle {
    constructor(gameScreen){
        this.gameScreen = gameScreen; // gameScreen is the div where the player will be displayed

        this.left = Math.floor(Math.random() * 300 + 10); // horizontal position of the car (math random x max + min)
        this.top = 0; //vertical position of the car coming from the top
        this.width = 100;
        this.height = 150;

        this.element = document.createElement('img');
        this.element.src = './images/redCar.png';
        this.element.style.position = 'absolute'; // to be able to move it around
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;

        this.gameScreen.appendChild(this.element); // appendChild take an html element and add it to the gameScreen
    }

    move(){
        this.top += 3; // the speed of the obstacles
        this.updatePosition();
    }

    updatePosition(){
        this.element.style.top = `${this.top}px`;
        this.element.style.left = `${this.left}px`;
    }
}