(() => {
    let intervalRef = null;
    var width = 5 * 6*2

    function draw() {
        let h1 = Math.floor((_12hour?d.getHours()%12:d.getHours())/10);
        let h2 = (_12hour?d.getHours()%12:d.getHours())%10;
        let m1 = Math.floor(d.getMinutes()/10);
        let m2 = d.getMinutes()%10;
        
        if (h1 >=1){
            if (h2 > 2){
            h1 = h1 - 1;
            h2 = h2 - 2;
        }
        else if(h1 == 2){
            if(h2 == 2){
                h1 = 0;
                h2 = 9;}}
        }
         else if(h1 == 2){
            if(h2 == 2){
                h1 = 1;
                h2 = 0;
            }}
        var time = h1.toString()+h2.toString()+":"+m1.toString()+m2.toString() 
        g.reset().setFont("6x8", 2).setFontAlign(-1, 0);
        //var time = require("locale").time(new Date(),1);
        g.drawString(time, this.x, this.y+11, true); // 5 * 6*2 = 60
    }
    function clearTimers(){
      if(intervalRef) {
        clearInterval(intervalRef);
        intervalRef = null;
      }
    }
    function startTimers(){
      intervalRef = setInterval(()=>WIDGETS["wdclk"].draw(), 60*1000);
      WIDGETS["wdclk"].draw();
    }
    Bangle.on('lcdPower', (on) => {
      clearTimers();
      if (on) startTimers();
    });

    WIDGETS["wdclk"]={area:"tr",width:width,draw:draw};
    if (Bangle.isLCDOn) intervalRef = setInterval(()=>WIDGETS["wdclk"].draw(), 60*1000);
})()
