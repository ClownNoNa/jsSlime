export class InputHandler{
    constructor(game){
        this.game = game;
        this.keys = [];
        window.addEventListener('keydown', e =>{
            if ((   e.key === 's' || 
                    e.key === 'w' ||
                    e.key === 'a' ||
                    e.key === 'd') && this.keys.indexOf(e.key) === -1){
                this.keys.push(e.key);
            }
            else if (e.key === 't') this.game.debug = !this.game.debug;
            else if (e.key === 'Enter' && this.game.gameOver) this.game.gameRestart();
            console.log(e.key, this.keys);
        });
        window.addEventListener('keyup', e =>{
            if ((   e.key === 's' || 
                    e.key === 'w' ||
                    e.key === 'a' ||
                    e.key === 'd')){
                this.keys.splice(this.keys.indexOf(e.key),1);
            }
            console.log(e.key, this.keys);
        });
    }
}