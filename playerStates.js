const states = {
    IDLE: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
    HIT: 4

}

class State {
    constructor(state, game){
        this.state = state;
        this.game = game;
    }
}

export class Idle extends State{
    constructor(game){
        super('IDLE', game);
    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 7;
        this.game.player.frameY = 0;
        
    }
    handleInput(input){
        if (input.includes('a') || input.includes('d')){
            this.game.player.setState(states.RUNNING, 1);
        }
        if (input.includes('w')){
            this.game.player.setState(states.JUMPING, 1);
        }
        if(input.includes('c')){
            this.game.player.setState(states.HIT, 0);
        }
    }
}

export class Running extends State{
    constructor(game){
        super('RUNNING', game);
    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 7;
        this.game.player.frameY = 1;
        
    }
    handleInput(input){
        if (input.includes('s')){
            this.game.player.setState(states.IDLE, 0);
        }
        if (input.includes('w')){
            this.game.player.setState(states.JUMPING, 1);
        }
        if (input.includes('a')){
            this.game.player.setState(states.RUNNING, 0);
        }
        if (input.includes('d')){
            this.game.player.setState(states.RUNNING, 1);
        }
    }
    handleDamge(){
        if(!this.game.player.getHit) this.game.player.setState(states.HIT, 0);
    }
}
export class Jumping extends State{
    constructor(game){
        super('JUMPING', game);
    }
    enter(){
        if (this.game.player.onGround()) this.game.player.vy -=30;
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 7;
        this.game.player.frameY = 2;
        
    }
    handleInput(input){
        if (this.game.player.vy > this.game.player.weight){
            this.game.player.setState(states.FALLING, 1);
        }
        if (input.includes('a') || input.includes('d')){
            this.game.player.setState(states.RUNNING, 1);
        }
    }
}
export class Falling extends State{
    constructor(game){
        super('FALLING', game);
    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 12;
        this.game.player.frameY = 3;
    }
    handleInput(input){
        if (this.game.player.onGround()){
            this.game.player.setState(states.IDLE, 0);
        }
        if (input.includes('a') || input.includes('d')){
            this.game.player.setState(states.RUNNING, 1);
        }
    }
}
export class Hit extends State{
    constructor(game){
        super('HIT', game);
    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 5;
        this.game.player.frameY = 4;
    }
    handleInput(input){
        if(this.game.player.frameX >= 5 && this.game.player.onGround()){
            this.game.player.setState(states.IDLE, 0);
        }else if(this.game.player.frameX >= 5 && !this.game.player.onGround()){
            this.game.player.setState(states.FALLING, 0);
        }
    }
}