import { Idle, Running, Jumping, Falling, Hit  } from "./playerStates.js";

export  class Player{
    constructor(game){
        this.game = game;
        this.width = 128;
        this.height = 64;
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.vy = 0;
        this.weight = 1;
        this.image = document.getElementById('playerIdle');
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 7;
        this.fps = 10;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.speed = 0;
        this.maxSpeed = 2;
        this.states = [new Idle(this.game), new Running(this.game), new Jumping(this.game), new Falling(this.game), new Hit(this.game)];
    }
    update(input, deltaTime){
        this.checkCollision();
        this.currentState.handleInput(input);
        
        //horizontal movement
        this.x += this.speed;
        if(input.includes('d')) this.speed = this.maxSpeed;
        else if(input.includes('a')) this.speed = -this.maxSpeed;
        else this.speed = 0;
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;
        //vertical movement
        this.y += this.vy;
        if (!this.onGround()) this.vy +=this.weight;
        else this.vy = 0;
        if (this.y > this.game.height - this.height) this.y = this.game.height - this.height;
        //image switch
        if (this.frameY === 0) this.image = document.getElementById('playerIdle');
        if (this.frameY === 1) this.image = document.getElementById('playerWalk');
        if (this.frameY === 2) this.image = document.getElementById('playerJump');
        if (this.frameY === 3) this.image = document.getElementById('playerFall');
        if (this.frameY === 4) this.image = document.getElementById('playerHurt');
        //sprite animation
        if (this.frameTimer > this.frameInterval){
            this.frameTimer =0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        }else {
            this.frameTimer += deltaTime;
        }
       
    }
    draw(context){
        if(this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    onGround(){
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }
    setState(state, speed){
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speed;
        this.currentState.enter();
    }
    checkCollision(){
        this.game.enemies.forEach(enemy => {
            if(
                enemy.x < this.x + this.width &&
                enemy.x + enemy.width > this.x &&
                enemy.y < this.y + this.height &&
                enemy.y + enemy.height > this.y
            ){
                enemy.markedForDeletion = true;
                this.setState(4, 0);
                this.game.score++;
            }
        });
    }
    restart(){
        this.x = 0;
        this.y = this.gameHeight - this.height;
        this.maxFrame = 7;
        this.frameY = 0;
        this.frameX = 0;
    }
}