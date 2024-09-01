// Game Logic

class GameEngine{
    width = 1072;
    height = 816;

    constructor(){
        this.canvas = document.getElementById("myCanvas");
        this.buffer = document.getElementById("buffer");

        this.ctx = this.canvas.getContext("2d");
        this.bufferCtx = this.buffer.getContext("2d");
        
    }

    gameStart = ()=>{
        this.soundEngine = new SoundEngine();
        this.tank = new Image();
        this.tank.src = "./fishtank.jpg";
        this.touches = [];
        this.water = new Water();
        this.fish = new fish(this.ctx,this.bufferCtx,this.width,this.height, this.water);

        this.setupEventListeners(this.ctx, this.water);

        setInterval(this.gameStep,30,this.ctx,this.water,this.fish, this.tank, this.width, this.height);

    };

    setupEventListeners = (ctx, water)=>{
        this.canvas.addEventListener("touchstart", (event) => this.handleTouchStart(event, ctx, water), false);
        this.canvas.addEventListener("touchend", (event)=> this.handleTouchEnd(event, ctx), false);
        this.canvas.addEventListener("click", (event) => this.handleclick(event, ctx, water), false)
    }

    checkCollisions(water,ev){
        var popped = water.bubbles.filter(bubble=>{
            var collision =
                ev.pageX >= (bubble.x - (5*bubble.z)) &&
                ev.pageX <= (bubble.x + (5*bubble.z)) &&
                ev.pageY >= (bubble.y - (5*bubble.z)) &&
                ev.pageY <= (bubble.y + (5*bubble.z));
            return collision;
        });
    
        for(var idx = popped.length-1 ; idx >=0 ; idx--){
            popped[idx].popped = true;
            this.soundEngine.playSound("pop",4);
        }
    }

    handleclick(ev, ctx, water){
        console.log(ev.pageX, ev.pageY);
        ev.preventDefault();
        ctx.beginPath();
        ctx.arc(ev.pageX, ev.pageY, 4, 0, 2 * Math.PI, false);  // a circle at the start
        ctx.fillStyle = "white";
        ctx.fill();
        this.checkCollisions(water,ev);
        if(ev.pageY <= 20 && water.feedActions.length <3){
            water.feedActions.push(new feed(this.ctx, this.width, this.height, {x:ev.pageX, y:ev.pageY}));
        }
        
    }

    handleTouchStart(ev, ctx, water){
        
        ev.preventDefault();
        var touches = ev.changedTouches;
        for (var i = 0; i < touches.length; i++) {
            ctx.beginPath();
            ctx.arc(touches[i].pageX, touches[i].pageY, 4, 0, 2 * Math.PI, false);  // a circle at the start
            ctx.fillStyle = "white";
            ctx.fill();
            this.checkCollisions(water,touches[i]);
            if(touches[i].pageX <= 5 && this.feedActions.length <3){
                water.feedActions.push(new feed(this.ctx, this.width, this.height, {x:touches[i].pageX, y:touches[i].pageY}));
            }
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
            let particles = water.feedActions.flatMap(a=>a.feedParticles);
            ctx.drawImage(tank,0, 0,width,height);
            var drawOrder = water.bubbles.slice(0);
            drawOrder.push(fish);
            drawOrder.push(...particles);
            drawOrder = drawOrder.sort(function(a,b){
                    return a.z > b.z?1:-1;
                });
            for(var i = 0; i<drawOrder.length;i++){
                drawOrder[i].show();
            }
        
            water.processBubbles();

            water.feedActions = water.feedActions.filter(feed=>!feed.feedGone());
            console.log("Feed Actions:",water.feedActions.length);

            for(const action in water.feedActions){
                water.feedActions[action].stepParticles();
            }
            
            
        }
    }
    
}










