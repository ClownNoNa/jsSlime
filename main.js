import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Background } from "./background.js";
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from "./enemies.js";
import { UI } from "./UI.js";

window.addEventListener('load',function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500;

    class Game{
        constructor(width,height){
            this.width = width;
            this.height = height;
            this.groundMargin = 20;
            this.speed = 0;
            this.maxSpeed = 3;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.UI = new UI(this);
            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.debug = false;
            this.score = 0;
            this.fontColor = 'black';
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
            this.gameOver = false;
        }
        update(deltaTime){
            this.background.update();
            this.player.update(this.input.keys,deltaTime);
            // heandleEnemies
            if(this.enemyTimer > this.enemyInterval){
                this.addEnemy();
                this.enemyTimer = 0;
            }else{
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);
                if(enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy), 1);
            });
            //game over
            if(this.score >= (Math.random()*20+10)){
                this.gameOver = true;
            }
        }
        draw(context){
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy =>{
                enemy.draw(context);
            });
            this.UI.draw(context);
        }
        addEnemy(){
            if(this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this));
            else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
            this.enemies.push(new FlyingEnemy(this));
        }
        gameRestart(){
            this.speed = 0;
            this.maxSpeed = 3;
            this.background = new Background(this);
            this.player = new Player(this);
            this.enemies = [];
            this.score = 0;
            this.player.setState(0,0);
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
            this.gameOver = false;
            animate(0);
        }
    }

    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0,0,canvas.width, canvas.height)
        game.update(deltaTime);
        game.draw(ctx);
        if (!game.gameOver) requestAnimationFrame(animate);
    }
    animate(0);
    
});