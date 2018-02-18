// jQuery
//@prepros-prepend "../node_modules/jquery/dist/jquery.js"

// PrismJS
//@prepros-prepend "../node_modules/prismjs/prism.js"

// jQuery mdStrap
//@prepros-prepend "../src/js/jquery-mdstrap.js"

jQuery(document).ready(function($) {

    $('.navbar-nav-left').mdStrap({
        'menuTrigger': '.navbar-toggler-left'
    });

    activateMenuItem();
    smoothScroll(300);

});

// Activate menu item on click
function activateMenuItem()
{
    $('a[href^="#"]').on('click', function() {
        $(this).parents('li.nav-item').addClass('active').siblings().removeClass('active');
    });
}

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
