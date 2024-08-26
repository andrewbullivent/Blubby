class Water{
    bubbles = [];

    processBubbles= ()=>{
        for (var i = 0; i< this.bubbles.length;i++) {
            if(this.bubbles[i].isFinished()){
                this.bubbles.splice(i, 1);
                i--;
            }
        }
    }
}