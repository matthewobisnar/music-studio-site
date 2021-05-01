/* 
    This codes are just desame in index.js 
*/

$(document).ready(function () {
        
        var audioSource = new Audio();
    
        $('.navtop').animate({opacity:'1'},500);
        
       // var audioSource = document.getElementById('audioId'); this id is not needed, New Audio is declared..
    
        var toggleBool = false;
        var muteFocus = false;
    
        // Get the dt value of table......
        $('.table-playlist > tbody').find('tr').each(function($index, $item){
        $(this).on('click', function(e) {
        
           audioSource.src = $(this).attr('src');
            
             $('.player-playerlist').animate({opacity: "1"}, 500);
              // RED ACTIVE NOTIFICATION...
             $('.table-playlist > tbody > tr').not(this).removeClass('activeHover');
             $(this).addClass('activeHover');

              pausePlaybtn($('.playPause > span'));
              getDur();
        });
    }); 
    
     // this functionality doesn't support other browsers..
    audioSource.addEventListener('ended', function(){

     if ($('.playPause > span').hasClass('glyphicon glyphicon-pause white') ) {
             $('.playPause > span').removeClass('glyphicon glyphicon-pause white').addClass('glyphicon glyphicon-play');
            audioSource.currentTime = 0;
        }

    });

     // Toggle Play and Pause.......................
     $('.playPause > span').on('click', function() {
         pausePlaybtn($(this));
     });
    
    function getDur () {
        
        if (!Number(audioSource.duration)) {
            
            $('.playDuration').text("Loading");
            
        } else {
            
            $('.playDuration').text(duration(audioSource.duration));   
        
        }
    }
    
    function pausePlaybtn(el) { 
         getDur();
         if (toggleBool == false) {
             
            if (el.hasClass('glyphicon glyphicon-play')) {
                    el.removeClass('glyphicon glyphicon-play').addClass('glyphicon glyphicon-pause white');
                }
            
                audioSource.play();
                toggleBool = true;
             
         } else if (toggleBool == true ) {
             
             if (el.hasClass('glyphicon glyphicon-pause white')) {
                    el.removeClass('glyphicon glyphicon-pause white').addClass('glyphicon glyphicon-play');
                }
                 audioSource.pause();
                 toggleBool = false;
         }
    }
    
     // clickable bar........................
    $('.timeLine').on('click', function(e) {
        
        if (!audioSource.played || !audioSource.ended) {
            var mos = e.clientX - $(this).offset().left;

            audioSource.currentTime = mos * audioSource.duration / $(this).width();

            $('.playHead').css("width", + mos + "px");
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
        toggleBool= false;
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
         
         var bar = (currentT*($('.timeLine').width()))/durationT;    
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
    
    // =============== Alert Notification ==============
        var msg = "Opps! Sorry.. No Backend Functionality.. But try to submit me :-)..";
    
        // btns.........
        alertDetails($('.btn-submit'),  msg);
        alertDetails($('.forward'), "Forward");
        alertDetails($('.stopBtn'), "Stop");
        alertDetails($('.backward'), "Backward");
        alertDetails($('.audioControl'), "Volume");
        alertDetails($('.liCategory'), "Opps! Sorry.. No functionality added!.")

        function alertDetails (el, message,) {
            $(el).hover(function(){
               $(this).attr({
                       'title': message,
                       'data-toggle' : 'tooltip',
                       'data-placement' : 'top'

                   }).tooltip('show'); 
            }, function() {
               $(this).removeAttr('title').tooltip('hide'); 
            }); 
        }
     // ============== End Alert Notification ============
});
