export class UI{
    constructor(game){
        this.game = game;
        this.fontSize = 90;
        this.fontFamily = 'Helvetica';
    }
    draw(context){
        context.font = this.fontSize + 'px' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        //score
        context.fillText('Score: '+ this.game.score, 20, 50);
        if(this.game.gameOver){
            context.textAlign = 'center';
            context.fillStyle = 'black';
            context.fillText('COMPLETED, press Enter to restart!', this.game.width/2, 200);
            context.fillStyle = 'white';
            context.fillText('COMPLETED, press Enter to restart!', this.game.width/2+2, 202);
        }
    }
    
}