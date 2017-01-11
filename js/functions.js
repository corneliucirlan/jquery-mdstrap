// jQuery
//@prepros-prepend "../bower_components/jquery/jquery.js"

// jQuery Mobile
//@prepros-prepend "../bower_components/jquery-mobile-bower/js/jquery.mobile-1.4.5.js"

// PrismJS
//@prepros-prepend "../bower_components/prism/prism.js"

// jQuery mdStrap
//@prepros-prepend "../js/jquery-mdstrap.js"

jQuery(document).ready(function($) {

    $('.navbar-nav').mdStrap();

    smoothScroll(300);

});

// smoothScroll function is applied from the document ready function
function smoothScroll (duration) {
    $('a[href^="#"]').on('click', function(event) {

        var target = $( $(this).attr('href'));

        if (target.length)
        {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top
            }, duration);
        }
    });
}
