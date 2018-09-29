/*Gradient Animation
javascript , jquery Functionality ..
written by matthew bisnar*/

$(document).ready(function(){
   

    var bgGradient = $('.loginUser');
    var speedX = 0;
    var speedY = 0;

    var speedG = 0.002;
    var radiusX = 90;
    var radiusY= 40;

    const alphaR = 20;
    const alphaG = 0;
    const alphaB= 20;

    triggerR = triggerB = triggerG = 0;
        
    
              // Click me please..
    setInterval(function(){animate()}, 100);


          function animate () {

              speedX += 0.08;
              speedY += 0.05;// make a 360 degree circular motion..

              triggerR = alphaR + (Math.cos(speedX)*radiusX);

              triggerG = alphaG + (Math.cos(speedG)*radiusX);

              triggerB = alphaB + (Math.sin(speedY)*radiusY);



     bgGradient.css('background', "-webkit-linear-gradient(left top,rgb(" + Math.round(triggerR) + "," +  0 + "," +  Math.round(triggerB) + "), rgb(" + Math.round(triggerR) + "," + Math.round(triggerG) + "," + Math.round(triggerB) + "))")
              .css('background', "-moz-linear-gradient(left top,rgb(" + Math.round(triggerR) + "," +  0 + "," +  Math.round(triggerB) + "), rgb(" + Math.round(triggerR) + "," + Math.round(triggerG) + "," + Math.round(triggerB) + "))")
              .css('background', "-o-linear-gradient(left top,rgb(" + Math.round(triggerR) + "," +  0 + "," +  Math.round(triggerB) + "), rgb(" + Math.round(triggerR) + "," + Math.round(triggerG) + "," + Math.round(triggerB) + "))")


          }  

});
            
            