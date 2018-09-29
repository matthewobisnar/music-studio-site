/* 
Gradient Animation
javascript , jquery Functionality ..
written by matthew bisnar
What a Worst code..
*/

$(document).ready(function(){
    
        //  RGB color in 2d array..
        var gradientColor = [
            [44, 62, 80], 
            [44, 62, 80],
            [120,30,30],
            [20,10,20]
        ];


        function gradientanimation () {
            
        var r,g, b;
        var r1,g1,b1;
        var offset = 0.5;
        var alpha = 0.5;
        var speed = 0.1;
        var angle = 0;

            for (var i = 0 ; i < gradientColor.length ; i++) {
                    
                // Pick random index of gradientColor and save to rgb and rgb1
                r =  gradientColor[i][Math.floor(Math.random()*i)];
                g =  gradientColor[i][Math.floor(Math.random()*i)];
                b =  gradientColor[i][Math.floor(Math.random()*i)];
                
                r1 =  gradientColor[i][Math.floor(Math.random()*i)];
                g1 =  gradientColor[i][Math.floor(Math.random()*i)];
                b1 =  gradientColor[i][Math.floor(Math.random()*i)];

            }
            

            var rgb1 = "rgb(" + r + "," + g +"," + b + ")",
                rgb2 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";
            
        //console.log(rgb1 + " and " + rgb2);
        // draw css..
        $('#bg-gradient').css("background", "-webkit-linear-gradient(left top, " + rgb1 + ", " + rgb2+ ")")
            .css("background", "-moz-webkit-linear-gradient(left top, " + rgb1 + ", " + rgb2+ ")")
            .css("background", "-o-webkit-linear-gradient(left top, " + rgb1 + ", " + rgb2+ ")")
            .css("background", "linear-gradient(left top, " + rgb1 + ", " + rgb2+ ")");
            
            function easeIn (t) {
                return t*t*t;
            }
        }

        setInterval(function(){
            gradientanimation()
        },800);
});