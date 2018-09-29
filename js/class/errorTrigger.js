/* Trigger Error Shake Effect Js 
   Power of Trigonometry Functions sin and cosine 
   Written by Matthew Bisnar 
   
   Note : Some window.requestAnimationFrame() does not support other browser, use setInverval or framework instead. 
*/

    var gradients = document.querySelector('#bg-gradient');
    // Where to position in the document..
    var centerX = window.innerWidth/2;
    var centerY = window.innerHeight/2;
    // initial speed
    var speedX = 0;
    var speedY = 0;
    // how wide the area of motion.
    // set higher value to change the effect..
    var radiusX = 10; 
    var radiusY= 100;
    // Number of times to trigger initialized to 0;
    var num = 0;
    // Return all into the variable..
    var triggerX = 0; 
    var triggerY = 0;
                
                        

      function animate () {

          speedX += 1;
         // speedY += 1;// make a 360 degree circular motion..
          triggerX = centerX + (Math.cos(speedX)*radiusX);
         // triggerY = centerY + (Math.sin(speedY)*radiusY);
          obj.style.marginLeft = triggerX + "px";
          //obj.style.top = triggerY + "px";
         console.log(speedX); 
           // trigger atleast  
            obj.style.marginLeft = 950 + "px";
               
        
                window.requestAnimationFrame(animate);
      }

     animate();
    
                