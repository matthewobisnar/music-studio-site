/* 
   Javascript , Jquery Functionality
   Fullpage Interaction..
   Written by Matthew Bisnar And Jayvil Legaspi Rosaupan.
*/

$(window).on('load', function() {
     // Audio Source.........................................
     var audioSource = document.getElementById('audioSource');
});

$(document).ready(function(){
    
      // ========== Dynamic Height Size Header ==========
        dynamicHeightSize();
    
        $(window).on('resize', function (){
             dynamicHeightSize();
        });
    
        function dynamicHeightSize () {
            var dynamicHeight = $(window).height();
            $('.headerWrapper').height(dynamicHeight);
        }
        
      // ========== End Dynamic Height Size Header ======
     // =============== Alert Notification ==============
        var msg = "Opps! Sorry.. No Backend Functionality.. But try to submit me :-)..";
    
        // btns.........
        alertDetails($('.btn-submit'),  msg);
        alertDetails($('.forward'), "Forward");
        alertDetails($('.stopBtn'), "Stop");
        alertDetails($('.backward'), "Backward");
        alertDetails($('.audioControl'), "Volume");

        function alertDetails (el, message,) {
            $(el).hover(function(){
               $(this).attr({
                       'title': message,
                       'data-toggle' : 'tooltip',
                       'data-placement' : 'left'

                   }).tooltip('show'); 
            }, function() {
               $(this).removeAttr('title').tooltip('hide'); 
            }); 
        }
    
     // ============== End Alert Notification ============
     // ============== scrollFix Navigation ====================
     
     $(window).on('scroll', function () {
                 
         if ($(window).scrollTop() > $('.mainContent').offset().top) {
             $('.navbar').addClass('navbar-fixed-top');
         } 
         
         if ($(window).scrollTop() > $('.sectionWrapper').offset().top - 15) {
             
             $('.navbar').removeClass('navbar-custom').addClass('navbar-inverse');
        
         } else {
             
                 $('.navbar').addClass('navbar-custom').removeClass('navbar-inverse');
         }
         
         if ($(window).scrollTop() < $('.mainContent').offset().top) {
            
             if ($('.navbar').hasClass('navbar-fixed-top')) {
                 $('.navbar').removeClass('navbar-fixed-top');
             } 
         }
     });
     
     // =============== End ScrollFix Navigation ==================
     // ================ Manipulating Audio API ===================
    
        audioSource.src = "audio/Bullet%20For%20My%20Valentine%20-%20Forever%20And%20Always.mp3";
   
     // Toggle Boolean............................
     var focusout = false;
     var muteFocus = false;
    
     audioSource.load();
    
    if (audioSource !== undefined) {
        
        // Comment me to if you want to stop autoplay..
         audioSource.play();

        if(audioSource.played && !audioSource.ended) {
             $('.playPause > span').removeClass('glyphicon glyphicon-play').addClass('glyphicon glyphicon-pause white');
             alertDetails ($('.playPause'), "Pause");
            
        }
        
        // this functionality doesn't support other browsers..
        audioSource.addEventListener('ended', function(){

         if ($('.playPause > span').hasClass('glyphicon glyphicon-pause white') ) {
                 $('.playPause > span').removeClass('glyphicon glyphicon-pause white').addClass('glyphicon glyphicon-play');
                audioSource.currentTime = 0;
            }

        });
    }

    // clickable bar........................
    $('.timeLine').on('click', function(e) {
        
        if (!audioSource.played || !audioSource.ended) {
            var mos = e.clientX - $(this).offset().left;

            audioSource.currentTime = mos * audioSource.duration / $(this).width();

            $('.playHead').css("width", + mos + "px");
        }
        
    });
    
     // Toggle Play and Pause.......................
     $('.playPause > span').on('click', function() {
         
         if (focusout == false) {
             
            if ($(this).hasClass('glyphicon glyphicon-play')) {
                    $(this).removeClass('glyphicon glyphicon-play').addClass('glyphicon glyphicon-pause white');              
                }
                alertDetails ($('.playPause'), "Pause");
                audioSource.play();
                focusout = true;
                $('.playDuration').text(duration(audioSource.duration)); 
             
         } else if (focusout == true ) {
             
             if ($(this).hasClass('glyphicon glyphicon-pause white')) {
                    
                    $(this).removeClass('glyphicon glyphicon-pause white').addClass('glyphicon glyphicon-play');
                }
                 audioSource.pause();
                 focusout = false;
         }
    });
    
     // Get the current Duration of audio..........
     if (!audioSource.ended && audioSource.played) {           
        var currentDuration = setInterval(function(){
            $('.currentTime').text(duration(audioSource.currentTime));
            
            // Run Progress Bar.........................................
            updateProgressBar(audioSource.currentTime, audioSource.duration);
        }, parseInt(audioSource.currentTime));
         
     } else if (audioSource.currentTime == audioSource.duration) {
        clearInterval(currentDuration);
     }
    
    // Stop btn .................................
    $('.stopBtn > span').on('click', function(){
        if ($('.playPause > span').hasClass('glyphicon glyphicon-pause white')) {
            
            $('.playPause > span').removeClass('glyphicon glyphicon-pause white').addClass('glyphicon glyphicon-play');
        }
                       
        audioSource.pause();
        audioSource.currentTime = 0;
        focusout = false;
    });
     
     // Forward Play........................
     $('.forward span').on('click', function() {
         if (!audioSource.ended) {
              audioSource.currentTime += 2;    
             }
     });
     
     // Backward Play.........................
     $('.backward span').on('click', function() {
         if (audioSource.currentTime > 0) {
             audioSource.currentTime -= 2;    
         }
     });
     
     // Draw Playhead Progress bar....................
     function updateProgressBar (currentT, durationT) {
         
         bar = (currentT*($('.timeLine').width()))/durationT;    
         $('.playHead').css("width", + bar + "px");
         
     }
    
     // Display duration in Minutes and Seconds (M:S).........................
     function duration (times) {    
         var minutes = parseInt(Math.floor(times/60));
         var second = parseInt(Math.floor(times%60));
 
         return ("0" + minutes).slice(-2)  + ":" + ("0" + second).slice(-2);
     }
     
     // MANIPULATING THE VOLUME.....................
     $('.audoLine').on('click', function (event) {
         // Get the Current Mouse position by subtracting parent element offset(current postion value ) and current horizontal event click (event.pageX)..
         var mousePositionX = event.pageX - $(this).offset().left;
         var volumeX = mousePositionX - mousePositionX * 0.98;
         
            //console.log((volumeX < 1 ) ? volumeX.toFixed(1) : Math.round(volumeX.toFixed(1)));
         
         $('.audoLine > .Volume').css("width", + mousePositionX + "px");
         
         //Simple ternary Conditions.. if greater 1.0.. then remove decimals ....................
         audioSource.volume = (volumeX < 1 ) ? volumeX.toFixed(1) : Math.round(volumeX.toFixed(1));
         
     });
     
     // Mute THE Volume.....................
     $('.mutedVol').on('click', function(){
         if(muteFocus == false) {
             $(this).removeClass('glyphicon glyphicon-volume-up').addClass('glyphicon glyphicon-volume-off');
             $('.audoLine > .Volume').css("width", + 0 + "px");
             muteFocus = true;
             audioSource.volume = 0.00;
             
         } else {
             $(this).removeClass('glyphicon glyphicon-volume-off').addClass('glyphicon glyphicon-volume-up');
             $('.audoLine > .Volume').css("width", + $('.audoLine').width() + "px");
             muteFocus = false;
             audioSource.volume = 1;
         }
     });
    
     // ====================== AUDIO VISUALIZER WITH HTML5 CANVAS AND AUDIO WEB API ===========================
     
               // Declare Audio API object Instance in order to use.. 
               var audioContext = new AudioContext();
               //  Connect to audio HTML source <audio> 
               var src = audioContext.createMediaElementSource(audioSource);
               // create Analyzer..
               var analyser = audioContext.createAnalyser();
    
                   // audio source connect analyzer and its destination..
                   src.connect(analyser);
                   analyser.connect(audioContext.destination);
                   analyser.fftSize = 256; // optional...
    
               // Create Draw Environment (Canvas) and 2d CTX;
               // Unfortunately, I Can't use jquery Selectors to get the Id of canvas :-(.. so stick with old convention..
               var canvasAPI = document.getElementById('audioAPIVisualizer');
               var canvasContext = canvasAPI.getContext('2d');
    
                  // Set up canvas width relative to container class..
                  canvasAPI.width = $('.container').width();
                    console.log(canvasAPI.width);
    
                  // Resize the canvas to browser size;
                 $(window).on('resize', function () {
                     canvasAPI.width = $(this).width();
                 });
            
               // add its property to array..
               var dataArray = new Uint8Array(analyser.frequencyBinCount);
    
               // setting up buffer get ratio width and height..
               var barWidth = (canvasAPI.width/analyser.frequencyBinCount) * 0.9;
               var barHeight;
               var widthDistance = 0;
    
                // render animation function...
               function render() {
                   
                 widthDistance = 0;

                 analyser.getByteFrequencyData(dataArray);
                   
                 // Clear Canvas per Buffer Draw....
                 canvasContext.clearRect(0,0,canvasAPI.width, canvasAPI.height);
                    
                 for (var i = 0; i < analyser.frequencyBinCount; i++) {
                    
                    barHeight = dataArray[i];
        
                    //set Colors... rgb
                    var r = barHeight + (25 * (i/analyser.frequencyBinCount));
                    var g = 250 * (i/analyser.frequencyBinCount);
                    var b = 50;
                    // set canvas gradient....
                     
                    var gradient = canvasContext.createRadialGradient(0, 0, 0, 0, 50, 100);
                    // vertical gradient arrangements...
                    gradient.addColorStop(1, "rgb(" + Math.floor(r) + "," + Math.floor(g) + "," + Math.floor(b) + ")"); 
                    gradient.addColorStop(0, "rgb(0, 0, 0)");
                    
                    canvasContext.fillStyle = gradient;
                    canvasContext.fillRect(widthDistance, canvasAPI.height - barHeight * .55, barWidth, barHeight);

                    widthDistance += barWidth + 2;
                     
                  }
                }
    
                 var renderInterval;
                // CALL RENDER FUNCTION.. per audio current counting...........
               if (audioSource.played ) {
                   renderInterval = setInterval(function() { render(); }, audioSource.currentTime);
               } else {
                   clearInterval(renderInterval);
               }
    
     // ================ END AUDIO VISUALIZER WITH HTML5 CANVAS AND AUDIO WEB API =========================
     
     // ======================== End Audio API  =======================
     
     // ================= Smooth Page Transitions =====================
     
     $('body').fadeIn(500 ,function(){
         
         var getOffset = $('.smooth-transition').offset().top;
    
         $('.smooth-transition').show('slow',function(){
               $('.smooth-transition > h1').show('slow', function(){
                   // do something..
               })});  
     });
     
        // scroll effects here...
        $(window).on('scroll', function() {
            
            const second = 1500;
            // ----- playlist Effects ------
            AnimateCondition ($('.sectionWrapper'),$('.playlist-title'), second);
            AnimateCondition ($('.playlist'),$('.music-playlist'), second);
            // ---- End Playlist Effects -------
            
            // ---- album Effects ---------
            AnimateCondition ($('.albumWrapper'),$('.album-title'),second);
            AnimateCondition ($('.album'),$('.albumList'), second);
            // ---- End Album Effects ------
            
            // ---- About us ---------------
            AnimateCondition ($('.aboutus'),$('.about-title'), second);
            AnimateCondition ($('.aboutContent'),$('.about-content'), second);
            // ---- End About us -----------
            
            // ---- Contact Form -----------
            
            AnimateCondition ($('.contactus'), $('.contact-us-title'), 1700);
            AnimateCondition ($('.footer'),$('.footerMenu'), 1700);
            
            // ---- End Contact Form -------
            
            function AnimateCondition (parentEl, childEl, time) {
                if($(window).scrollTop() >=  parentEl.offset().top/2) {
            
                    childEl.fadeIn('slow', function(){
                        childEl.animate({opacity: 1}, time);
                    });
                
               }
            }
         });  
    
        // ================= Scroll to Top ==================== 
        $(window).on('scroll',function() {
            if ($(this).scrollTop() >= 70) {    
                
                $('.return-to-top').fadeIn(300);   
            } else {
                $('.return-to-top').fadeOut(300);   
            }
        });
    
        $('.return-to-top').click(function() {      
            $('html').animate({
                scrollTop : 0                     
            }, 500);
        });
        // ============= End Page Transition ==================

        // ============ Manipulating Contact Form =============
        var el =  $('<div> Send Success </div>').attr('id','slidedown');
               el.insertAfter('.btn-submit');
            
           $('.btn-submit').on('click', function(e){
               
            if ($('.name-inputs > input').val() !== "" && validateEmail($('.email-inputs > input').val()) != false && $('.textarea-inputs > textarea').val() !== "") {
                
                    e.preventDefault();
                    setTimeout(function() {
                        $('#slidedown').slideDown("slow", function (){
                           $(this).fadeOut(3000);
                        });
                       
                    }, 500);   
                }
            });
    
            // ======= validate Email =======
            function validateEmail (emailValue) {
                
                // Check if the string contains "strings" @ "strings" . "strings" and return true..
                var parseString = new RegExp(/[a-zA-Z0-9-.]+@[a-zA-Z0-9]+.[a-zA-Z0-9]/);
                
                return parseString.test(emailValue);
                
            }
    
           // console.log(validateEmail("Matthewobisnar@gmail.com")); // test..
         // =============== Manipulating Contact Form ==================
});