/**
 * mdStrap
 *
 * jQuery plugin that enables mobile slide navigation for Bootstrap v4 framework
 *
 * @version 1.0
 * @author Corneliu Cirlan (www.corneliucirlan.com)
 */

;(function($) {
    "use strict";

    $.fn.mdStrap = function(options)
    {
        // Declare function variables
        var $menu = $(this);
        var $menuParent = $menu.parents('nav');

        // Plugin default settings
        var defaults = {
            'scrollValue'       : '10',
            'mobileMenuBreak'   : '992',
            'overlay'           : {
                'tag'       : 'div',
                'class'     : 'overlay',
            },
            'fixedTop'          : 'fixed-top',
        };

        // Plugin settings
        var settings = defaults;
        if (options) settings = $.extend(true, {}, defaults, options);

        // Initialize
        initialize();

        // Init function
        function initialize()
        {
            //console.log(settings);

            // Append overlay to document
            $('body').prepend('<'+ settings.overlay.tag +' class="'+ settings.overlay.class +'"></'+ settings.overlay.tag +'>');

            // Detect scroll
            toggleFixedTop();
        };

        $(window).on('scroll', function(event) {
            toggleFixedTop();
        });

        // Toggle menu fixed top
        function toggleFixedTop()
        {
            var wScroll = $(window).scrollTop();

            if (wScroll > settings.scrollValue) $menuParent.addClass(settings.fixedTop);
                else $menuParent.removeClass(settings.fixedTop);
        };

        // Toggle menu
        function toggleMenuDisplay()
        {
            if ($(this).width() >= settings.mobileMenuBreak)
                    $menu.css({
                        'display': 'block',
                        'left': '0rem',
                    });
                else
                    $menu.css({
                        'display': 'none',
                        'left': '-13rem'
                    });
        };

        // Close mobile menu
        function closeMobileMenu()
        {
            var wScroll = $(window).scrollTop();

            $menu
                .css({
                    'display' : 'none',
                })
                .animate({
                    'left' : '-13rem'
                });

            if (wScroll > settings.scrollValue)
                $menuParent.addClass('fixed-top');

            $menuParent.css({'pointer-events': 'all'});

            toggleOverlay();
        };

        // Toggle overlay
        function toggleOverlay()
        {
            $('.' + settings.overlay.class).fadeToggle('fast');
            $('body').toggleClass('block-scroll');
        };

        // Close menu on ESC key
        $(document).on('keydown', function(event) {
            if (event.keyCode == 27 && $('.' + settings.overlay.class + ':visible').length > 0)
            closeMobileMenu();
        });

        // Close menu when overlay clicked
        $('.overlay').on('click', function(event) {
            closeMobileMenu();
        });

        // Reposition menu on browser resize
        $(window).on('resize', function(event) {
            toggleMenuDisplay();
        });

        // Animate mobile menu
        $('.navbar-toggler').on('click', function(event) {
            event.preventDefault();

            toggleOverlay();

            $menu
                .css({
                    'display' : 'block',
                })
                .animate({
                    'left' : '0rem'
                });

            $menuParent.removeClass(settings.fixedTop).css({'pointer-events': 'none'});
        });

    };

})(jQuery);
