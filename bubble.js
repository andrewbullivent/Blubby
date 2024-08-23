class bubble{
    constructor(ctx,startX,startY,z){
        this.x = startX;
        this.y = startY;
        this.z = z;
        this.size = 5*z;
        this.ctx = ctx;
        this.popped = false;
        this.popinc = 0;       

    }

    

    isFinished(){

        return this.y<=45||(this.popped && this.popinc > 3);
    }

    show(){
        
        if(!this.isFinished()){
            
            this.ctx.strokeStyle = "rgba(255,255,255,0.2)";
            this.ctx.fillStyle = "rgba(255,255,255,0.2)";
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
            this.ctx.stroke();
            this.ctx.fill();
            this.ctx.beginPath();
            this.ctx.arc(this.x,this.y,this.size*0.8,1.55*Math.PI,1.75*Math.PI);
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.arc(this.x,this.y,this.size*0.768,1.56*Math.PI,1.74*Math.PI);
            this.ctx.stroke();

            
        }
        this.y-=(this.z);
        if(this.popped){
            console.log("POP!" + this.popinc);
            if(this.popinc == 0){
                
                //this.soundEngine.playSound("pop",4);
                console.log("POP!!");
            }
            this.popinc++;
        }
        
    }
}