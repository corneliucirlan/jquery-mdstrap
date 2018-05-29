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
    getLatestGitHubRelease();
});

// Activate menu item on click
function activateMenuItem() {

    $('a[href^="#"]').on('click', function() {
        $(this).parents('li.nav-item').addClass('active').siblings().removeClass('active');
    });
}

// smoothScroll function is applied from the document ready function
function smoothScroll(duration) {
    $('a[href^="#"]').on('click', function(event) {

        var target = $($(this).attr('href'));

        if (target.length) {

            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top
            }, duration);
        }
    });
}

// Get latest release from GitHub
function getLatestGitHubRelease() {

    $.getJSON('https://api.github.com/repos/corneliucirlan/jquery-mdstrap/tags').done(function(json) {

        //Get latest release
        var latest = json[0];

        // Update download URL
        if (latest.zipball_url) $('.plugin-zip').attr('href', latest.zipball_url);
    });
}
