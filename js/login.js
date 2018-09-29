/* 
    javascript , jquery Functionality ..
    Written by Matthew Bisnar And Jayvil Legaspi Rosaupan.
*/

$(document).ready(function() {
    $('.loginWrapper').animate({opacity: '1'}, 500);
    
// =============== Tooltip Warning ==================
    
    $('#remember, .forgot-password').hover(function(){
       $(this).attr(
           {
               'title': 'Opps! Sorry.. No Backend Functionality',
               'data-toggle' : 'tooltip',
               'data-placement' : 'left'
                    
           }).tooltip('show'); 
    }, function() {
       $(this).removeAttr('title').tooltip('hide'); 
    });
    
// ================ End tool tip Warning =======================
// ================ Form validation ===========================
     
    $('<span></span>').addClass('error-msg').insertAfter('.inputs-data');
    
    function formValidation () {
        
        var usernameInputs = $('.loginName');
        var passwordInputs = $('.loginPass');
        
        if (usernameInputs.val() == "admin" && passwordInputs.val() == "root" ) {
            
            window.location = "playlist.html";
            
            if ($('.form-group').hasClass('has-error has-feedback')) {
                
                $('.form-group').removeClass('has-error has-feedback');
                $('.error-msg').removeClass('glyphicon glyphicon-remove form-control-feedback');       
            
            }
        
            return true;
        
        } else {
                  
        for(var i = 0; i<4 ; i++){
            $('.login').animate({left:'-=25px'},30).animate({left:'+=25px'},30);
        }

        $('.form-group').addClass('has-error has-feedback');
        $('.error-msg').addClass('glyphicon glyphicon-remove form-control-feedback');
            return false;
        }
    }
    
    $('.btn-signin').on('click', function(e){
        
       e.preventDefault();
       return formValidation(); 
    });
    
});

    // ================= end Form validation ======================
    // ================ Loader ===================================

    window.onload = function () {
        
        setTimeout(function(){ 
             $('.loading').animate({'opacity':'-=1'},350).removeClass('loaders');
             $('.load').animate({'opacity':'-=1'},350).removeClass('loadwrap');
             $('.login, .signup').css('display','block');
                
            if (this.innerWidth > 1000) {
                $('.login, .signup').animate({'opacity': '1', 'bottom':'60'},350);
            }
         }, 3000); 
    }
    
    // ======================End Loader ==========================