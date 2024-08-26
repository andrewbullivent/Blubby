// Game Logic

class GameEngine{
    env = this;
    start = false;

    width = 1072;
    height = 816;

    constructor(){
        this.canvas = document.getElementById("myCanvas");
        this.buffer = document.getElementById("buffer");

        this.ctx = this.canvas.getContext("2d");
        this.bufferCtx = this.buffer.getContext("2d");
        // env.soundEngine = new SoundEngine();
    }

    gameStart = ()=>{
        
        this.tank = new Image();
        this.tank.src = "./fishtank.jpg";
        this.touches = [];
        this.water = new Water();
        this.fish = new fish(this.ctx,this.bufferCtx,this.width,this.height, this.water)

        this.setupEventListeners(this.ctx, this.water);

        setInterval(this.gameStep,30,this.ctx,this.water,this.fish, this.tank, this.width, this.height);

    };

    setupEventListeners = (ctx, water)=>{
        this.canvas.addEventListener("touchstart", (event) => this.handleTouchStart(event, ctx, water), false);
        this.canvas.addEventListener("touchend", (event)=> this.handleTouchEnd(event, ctx), false);
    }

    checkCollisions(water,touch){
        var popped = water.bubbles.filter(bubble=>{
            var collision =
                touch.clientX >= (bubble.x - (5*bubble.z)) &&
                touch.clientX <= (bubble.x + (5*bubble.z)) &&
                touch.clientY >= (bubble.y - (5*bubble.z)) &&
                touch.clientY <= (bubble.y + (5*bubble.z));
            return collision;
        });
    
        for(var idx = popped.length-1 ; idx >=0 ; idx--){
            popped[idx].popped = true;
        }
    }

    handleTouchStart(ev, ctx, water){
        ev.preventDefault();
        var touches = ev.changedTouches;
        for (var i = 0; i < touches.length; i++) {
            // touchesArr.push(touches[i]);
            ctx.beginPath();
            ctx.arc(touches[i].pageX, touches[i].pageY, 4, 0, 2 * Math.PI, false);  // a circle at the start
            ctx.fillStyle = "white";
            ctx.fill();
            this.checkCollisions(water,touches[i]);
        }
    }
    
    handleTouchEnd(ev, ctx){
        if(ev.changedTouches.length == 0) return;

        for (var i = 0; i < ev.changedTouches.length; i++) {

            ctx.lineWidth = 4;
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.moveTo(ev.changedTouches[i].pageX, ev.changedTouches[i].pageY);
            ctx.lineTo(ev.changedTouches[i].pageX, ev.changedTouches[i].pageY);
            ctx.fillRect(ev.changedTouches[i].pageX - 4, ev.changedTouches[i].pageY - 4, 8, 8);  // and a square at the end
        }
    }
    
    

    gameStep(ctx,water,fish,tank,width,height){
        {
            ctx.drawImage(tank,0, 0,width,height);
            var drawOrder = water.bubbles.slice(0);
            drawOrder.push(fish);
            drawOrder = drawOrder.sort(function(a,b){
                    return a.z > b.z?1:-1;
                });
            for(var i = 0; i<drawOrder.length;i++){
                drawOrder[i].show();
            }
        
            water.processBubbles();
            
            
        }
    }
    
}










