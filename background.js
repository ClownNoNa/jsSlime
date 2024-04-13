class Layer {
    constructor(game, width, height, speedmodifier, image){
        this.game = game;
        this.width = width;
        this.height = height;
        this.speedmodifier = speedmodifier;
        this.image = image;
        this.x = 0;
        this.y = 0;
    }
    update(){
        if(this.x < - this.width) this.x = 0;
        else this.x -= this.game.speed * this.speedmodifier;
    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height)
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
    }
}

export class Background {
    constructor(game){
        this.game = game;
        this.width = 2304;
        this.height = 500;  /*1396*/
        this.layer1image = document.getElementById('layer1');
        this.layer2image = document.getElementById('layer2');
        this.layer3image = document.getElementById('layer3');
        this.layer1 = new Layer(this.game, this.width, this.height, 0.2, this.layer1image);
        this.layer2 = new Layer(this.game, this.width, this.height, 0.5, this.layer2image);
        this.layer3 = new Layer(this.game, this.width, this.height, 1, this.layer3image);
        
        this.backgroundLayers = [this.layer1, this.layer2, this.layer3];
    }
    update(){
       this.backgroundLayers.forEach(layer => {
        layer.update();
       })
    }
    draw(context){
        this.backgroundLayers.forEach(layer => {
            layer.draw(context);
        });
    }
    restart(){
        this.x = 0;
    }
}