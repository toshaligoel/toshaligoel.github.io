window.onload = function(){
    document.getElementById("design").addEventListener("mouseover", function() {
  
        document.getElementById("body").style.backgroundImage = "url(images/web_bg_4_final.png)";

    }, false);

    document.getElementById("design").addEventListener("mouseout", function() {
   
        document.getElementById("body").style.backgroundImage = "";

    }, false);
    
    document.getElementById("paint").addEventListener("mouseover", function() {
  
        document.getElementById("body").style.backgroundImage = "url(images/web_bg_2_final.png)";

    }, false);

    document.getElementById("paint").addEventListener("mouseout", function() {
   
        document.getElementById("body").style.backgroundImage = "";

    }, false);
    
    document.getElementById("write").addEventListener("mouseover", function() {
  
        document.getElementById("body").style.backgroundImage = "url(images/web_bg_3_final.png)";

    }, false);

    document.getElementById("write").addEventListener("mouseout", function() {
   
        document.getElementById("body").style.backgroundImage = "";

    }, false);

};

new WOW().init();

$(document).ready(function() {
    $(window).scroll( function(){
        $('.fadein').each( function(i){
            var bottom_of_element = $(this).offset().top + $(this).outerHeight();

            var bottom_of_window = $(window).scrollTop() + $(window).height();

            if( bottom_of_window > bottom_of_element ){

                $(this).animate({'opacity':'1'},1000);

            }

             

        });

    });

});

$(function () {
  $('[data-toggle="popover"]').popover()
});