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
    $.mobile.autoInitializePage = false;

    $.fn.mdStrap = function(options)
    {

        // Declare function variables
        var $menu = $(this);
        var $menuParent = $menu.parents('nav');

        // Plugin default settings
        var defaults = {
            'fixedTop'          : true,
            'menuTrigger'       : 'navbar-toggler',
            'scrollValue'       : '10',
            'mobileMenuBreak'   : '992',

            // debugging
            'debug'             : false,
        };

        // Various internal options/classes
        var internal = {
            'fixedTop'              : 'fixed-top',
            'enablePointerEvents'   : {'pointer-events': 'all'},
            'disablePointerEvents'  : {'pointer-events': 'none'},
            'disableScroll'         : 'disable-scroll',
            'menu'                  : {
                    'visibleMenu'       : {
                        'display': 'block',
                        'left': '0rem',
                    },
                    'hiddenMenu'        : {
                        'display': 'none',
                        'left': '-13rem'
                    },
                    'enableCss'         : {'display' : 'block'},
                    'disableCss'        : {'display' : 'none'},
                    'enableAnimate'     : {'left' : '0rem'},
                    'disableAnimate'    : {'left' : '-13rem'},
            },
            'overlay'               : 'mdstrap-overlay',
        };

        // Plugin settings
        var settings = defaults;
        if (options) settings = $.extend(true, {}, defaults, options);

        // Initialize
        initialize();

        // Init function
        function initialize()
        {
            // Add overlay to document
            $('body').prepend('<div class="' + internal.overlay + '"></div>');

            // Add mobile swipe target
            $('body').append('<div class="mobile-swipe"></div>');

            // Detect scroll
            toggleFixedTop();

            // Debugging ...
            if (settings.debug === true) debugging();
        };

        $(window).on('scroll', function(event) {
            toggleFixedTop();
        });

        // Toggle menu fixed top
        function toggleFixedTop()
        {
            if (settings.fixedTop === true)
            {
                var wScroll = $(window).scrollTop();

                if (wScroll > settings.scrollValue) $menuParent.addClass(internal.fixedTop);
                    else $menuParent.removeClass(internal.fixedTop);
            }
        };

        // Toggle menu
        function toggleMenuDisplay()
        {
            if ($(window).width() >= settings.mobileMenuBreak) $menu.css(internal.menu.visibleMenu);
                else $menu.css(internal.menu.hiddenMenu);
        };

        // Close mobile menu
        function closeMobileMenu()
        {
            var wScroll = $(window).scrollTop();

            $menu.css(internal.menu.disableCss).animate(internal.menu.disableAnimate);

            if (wScroll > settings.scrollValue)
                $menuParent.addClass(internal.fixedTop);

            $menuParent.css(internal.enablePointerEvents);

            toggleOverlay();
        };

        // Toggle overlay
        function toggleOverlay()
        {
            $('.' + internal.overlay).fadeToggle('fast');
            $('body').toggleClass(internal.disableScroll);
        };

        // Close menu on ESC key
        $(document).on('keydown', function(event) {
            if (event.keyCode == 27 && $('.' + internal.overlay + ':visible').length > 0)
            closeMobileMenu();
        });

        // Close menu when overlay clicked
        $('.' + internal.overlay).on('click', function(event) {
            console.log(event);
            closeMobileMenu();
        });

        // Reposition menu on browser resize
        $(window).on('resize', function(event) {
            toggleMenuDisplay();
        });

        // Animate mobile menu
        $('.' + settings.menuTrigger).on('click', function(event) {
            event.defaultPrevented;

            toggleOverlay();

            $menu.css(internal.menu.enableCss).animate(internal.menu.enableAnimate);

            $menuParent.removeClass(internal.fixedTop).css(internal.disablePointerEvents);

            $menu.css(internal.enablePointerEvents);
        });

        // Slide out menu on touchscreen devices
        $("div.mobile-swipe").on("swiperight", function(event) {
            toggleOverlay();

            $menu.css(internal.menu.enableCss).animate(internal.menu.enableAnimate);

            $menuParent.removeClass(internal.fixedTop).css(internal.disablePointerEvents);
        });

        // Debugging
        function debugging()
        {
            console.log("\nPlugin settings:");
            console.log(settings);

            console.log("\nInternal settings/classes:");
            console.log(internal);

            console.log("\njQuery version: " + jQuery.fn.jquery);
        }
    };

})(jQuery);
