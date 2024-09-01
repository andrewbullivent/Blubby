class fish{
    constructor(ctx,buffer,width,height,medium){
        this.xOff=0;
        this.yOff=10000;
        this.zOff= 5;
        this.fishRight = new Image();
        this.fishLeft = new Image();
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.medium = medium;
        this.x = this.previousX = noise(this.xOff,1,0.5)*this.width;
        this.y = noise(this.yOff,1,0.5)*this.height;
        this.z = noise(this.zOff,1,0.5)*5;
        this.buffer = buffer;

        // = noise(this.xOff,1,0.5)*width;

        this.fishRight.src = "./fish-icon-11-32.png";
        this.fishLeft.src = "./fish-icon-11-32 left.png";
 
        
    }

    isFacingRight(){
        return this.x>=this.previousX;
    };

    contrastFish(image, contrast) {
        this.buffer.clearRect(0,0,32,32);
        this.buffer.drawImage(image,0,0);
        var imageData = this.buffer.getImageData(0,0,32,32);
        
        // var factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
    
        for(var i=0;i<imageData.data.length;i+=4)
        {
            // imageData.data[i] = contrast * (imageData.data[i]);
            // imageData.data[i+1] = contrast * (imageData.data[i+1]);
            imageData.data[i+2] = contrast * (imageData.data[i+2]);
        }
        this.buffer.putImageData(imageData,0,0);
    }

    show(){
        this.x = noise(this.xOff,1,0.5)*this.width;
        this.y = noise(this.yOff,1,0.5)*this.height;
        this.z = noise(this.zOff,1,0.5)*5;

        var r = Math.random();
        if(r > 0.95 && r< 0.96 ){
            this.breath(this);
            console.log('blub!');
        }
        
        var fishImg;
        if(this.isFacingRight()) {
            // this.contrastFish(this.fishRight, 100*(this.z+0.1));
            this.ctx.drawImage(this.fishRight,this.x,this.y,this.z*32,32*this.z);            
        }
        else {
            // this.contrastFish(this.fishLeft, 100*(this.z+0.1));
            this.ctx.drawImage(this.fishLeft,this.x,this.y,this.z*32,this.z*32);            
        }


        this.ctx.drawImage(this.buffer.canvas,this.x,this.y,this.z*32,32*this.z);


        
        this.previousX = this.x;

        this.xOff+=0.01;
        this.yOff+=0.01;
        this.zOff+=0.01;
    }

    breath = ()=>{
        var bX= this.isFacingRight(this.x)?this.x+(32*this.z):this.x;
        var bY = this.y+16*this.z;
        var b = new bubble(this.ctx,bX,bY,this.z);
        // b.soundEngine = env.soundEngine;
        this.medium.bubbles.push(b);
    }
}