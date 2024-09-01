class feed{
    constructor(ctx, width, height, startPoint){
        this.feedNoParticles = 10;
        this.feedParticles = []; 
        
        for (let idx = 0; idx < this.feedNoParticles;idx++){
            let p = new feedParticle(ctx, width, height, startPoint);
            p.startParticle();
            this.feedParticles.push(p);
        }


    }

    stepParticles(){
        for(let p in this.feedParticles){
            this.feedParticles[p].move();            
        }

        this.feedParticles = this.feedParticles.filter(p=>!p.dissolved);
        console.log("No. Particles:",this.feedParticles.length)
    }

    feedGone() {return !this.feedParticles.length;}


}

class feedParticle{
    constructor(ctx, width, height, startPoint){
        this.boundsWidth = width;
        this.boundsHeight = height;        
        this.startPoint = startPoint;
        this.terminal = 2;
        this.dissolve = 10;
        this.ctx = ctx;

        this.startParticle();
    }

    startParticle(){
        this.px = this.startPoint.x; //*(Math.random()*3);
        this.py = this.startPoint.y;
        this.pz =1; //Math.random()* 0.11

        this.vx = Math.random();
        this.vy = Math.random()*1.2;

        this.ax = 0.001;
        this.ay = 0.01 * this.pz;
        this.dissolveAfter = this.dissolve;

    }


    move(){
        if(this.py > this.boundsHeight - 28){
          
            this.dissolveAfter--;
            this.dissolved = this.dissolveAfter < 1;
        }
        else{
            this.vx += this.ax;
            this.vy += this.vy >= this.terminal? 0: this.ay;
            this.px += this.vx;
            this.py += this.vy;
        }
    }

    show(){
        this.ctx.beginPath();
        this.ctx.fillStyle = `rgba(244,164,96,${this.dissolveAfter/this.dissolve})`;//"sandybrown";
        this.ctx.arc(this.px,this.py,2*this.pz,0,2*Math.PI);
        // console.log(this.px,this.py);
        this.ctx.fill();
    }
}