(function(){
    let env = this;
    let start = false;
    const canvas = document.getElementById("myCanvas");
    const buffer = document.getElementById("buffer");

    const ctx = canvas.getContext("2d");
    const bufferCtx = buffer.getContext("2d");
    
    const width = 1072;
    const height = 816;
   // env.soundEngine = new SoundEngine();    

    env.tank = new Image();
    env.touches = [];

    env.water = function(){
        var w = this;
        w.bubbles = [];
        w.fish = new fish(ctx,bufferCtx,width,height,w);

        w.breath = function(fish){
            var bX= fish.isFacingRight(fish.x)?fish.x+(32*fish.z):fish.x;
            var bY = fish.y+16*fish.z;
            var b = new bubble(ctx,bX,bY,fish.z);
           // b.soundEngine = env.soundEngine;
            w.bubbles.push(b);
        }

        w.processBubbles= function(){
            for (var i = 0; i< w.bubbles.length;i++) {
                if(w.bubbles[i].isFinished()){
                    w.bubbles.splice(i, 1);
                    i--;
                }
            }
        }
        
    }
    tank.src = "./fishtank.jpg";
    env.w = new water();

    canvas.addEventListener("touchstart", handleStart, false);
    canvas.addEventListener("touchend", handleEnd, false);
    
    function handleStart(ev){
        ev.preventDefault();
        var touches = ev.changedTouches;
        for (var i = 0; i < touches.length; i++) {
            env.touches.push(touches[i]);
            ctx.beginPath();
            ctx.arc(touches[i].pageX, touches[i].pageY, 4, 0, 2 * Math.PI, false);  // a circle at the start
            ctx.fillStyle = "white";
            ctx.fill();
            checkCollisions(env.w,env.touches[i]);
          }
    }

    function checkCollisions(water,touch){
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

    function ongoingTouchIndexById(idToFind) {
        for (var i = 0; i < env.touches.length; i++) {
          var id = env.touches[i].identifier;
          
          if (id == idToFind) {
            return i;
          }
        }
        return -1;    // not found
      }

    function handleEnd(ev){
        var touches = ev.changedTouches;

        for (var i = 0; i < touches.length; i++) {
          
          var idx = ongoingTouchIndexById(touches[i].identifier);
      
          if (idx >= 0) {
            ctx.lineWidth = 4;
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.moveTo(env.touches[idx].pageX, env.touches[idx].pageY);
            ctx.lineTo(touches[i].pageX, touches[i].pageY);
            ctx.fillRect(touches[i].pageX - 4, touches[i].pageY - 4, 8, 8);  // and a square at the end
            env.touches.splice(idx, 1);  // remove it; we're done
          } else {
            console.log("can't figure out which touch to end");
          }
        }
    }

    // myButton.addEventListener(
    //     "click",
    //     function () {
    //         myPopup.classList.add("show");
    //     }
    // );
    // closePopup.addEventListener(
    //     "click",
    //     function () {
    //         myPopup.classList.remove(
    //             "show"
    //         );
    //     }
    // );


    setInterval(function(){
        ctx.drawImage(tank,0, 0,width,height);
        var drawOrder = env.w.bubbles.slice(0);
        drawOrder.push(env.w.fish);
        drawOrder = drawOrder.sort(function(a,b){
                return a.z > b.z?1:-1;
            });
        // console.log(drawOrder.indexOf(env.w.fish) + " of " + drawOrder.length);
        for(var i = 0; i<drawOrder.length;i++){
            drawOrder[i].show();
        }

        env.w.processBubbles();
        
        
    },30);
})();
