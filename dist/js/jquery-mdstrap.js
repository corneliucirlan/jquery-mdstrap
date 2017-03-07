/**
 * jQuery-mdStrap
 *
 * jQuery plugin that enables mobile slide navigation for Bootstrap v4 framework
 *
 * @version 2.0.1
 * @author Corneliu Cirlan (www.corneliucirlan.com)
 */

;(function($) {
    "use strict";

    //if ($.mobile !== 'undefined')
    //    $.mobile.autoInitializePage = false;

    $.fn.mdStrap = function(options)
    {
        // Declare function variables
        var $menu = $(this);
        var $menuParent = $menu.parents('nav');

        // Plugin default settings
        var defaults = {
            'fixedTop'          : true,
            'menuTrigger'       : '.navbar-toggler-left',
            'scrollValue'       : '10',

            // debugging
            'debug'             : false,
        };

        // Plugin settings
        var settings = defaults;
        if (options) settings = $.extend(true, {}, defaults, options);

        //// Various internal options/classes
        var internal = {
            'fixedTop'              : 'mds-fixed-top',
            'disableScroll'         : 'mds-disable-scroll',
            'overlay'               : 'mds-overlay',
        };

        //if ($menu.length !== 0)
        if ($('ul' + $menu.selector).length !== 0) initialize(settings, internal, $menu, $menuParent);
            else console.error("Menu '" + $menu.selector + "' not available.");

        return this;
    };

    //// Init function
    function initialize(settings, internalSettings, $menu, $menuParent)
    {
        // Add overlay to document
        if ($('div.' + internalSettings.overlay).length == 0)
        $('body').prepend('<div class="' + internalSettings.overlay + '"></div>');

        // Open menu
        openMobileMenu(settings, internalSettings, $menu, $menuParent);

        // Close menu
        closeMenu(internalSettings, $menu, $menuParent);

        // Window scroll
        windowScroll(settings, internalSettings, $menuParent);

        // Debugging ...
        if (settings.debug === true)
            debugging(settings, internalSettings);
    };

    // Window scroll
    function windowScroll(settings, internalSettings, $menuParent)
    {
        $(window).on('scroll', function(event) {
            toggleFixedTop(settings, internalSettings, $menuParent);
        });
    }

    // Toggle menu fixed top
    function toggleFixedTop(settings, internalSettings, $menuParent)
    {
        if (settings.fixedTop === true)
        {
            var wScroll = $(window).scrollTop();

            if (wScroll > settings.scrollValue) $menuParent.addClass(internalSettings.fixedTop);
                else $menuParent.removeClass(internalSettings.fixedTop);
        }
    };

    // Open menu
    function openMobileMenu(settings, internalSettings, $menu, $menuParent)
    {
        $(settings.menuTrigger).on('click', function(event) {
            event.defaultPrevented;

            // toggle overlay
            toggleOverlay(false, internalSettings);

            // Toggle menu
            toggleMenu($menu, $menuParent, false)
        });
    }

    // Close mobile menu
    function closeMobileMenu(internalSettings, $menu, $menuParent)
    {
        //var wScroll = $(window).scrollTop();

        // toggle overlay
        toggleOverlay(true, internalSettings);

        // Toggle menu
        toggleMenu($menu, $menuParent, true)
    };

    // Toggle menu
    function toggleMenu($menu, $menuParent, isVisible)
    {
        // Hide menu
        if (isVisible)
                {
                    $menuParent.removeClass('mds-active');
                    $menu.removeClass('mds-active');
                }
            // Show menu
            else
                {
                    $menuParent.addClass('mds-active');
                    $menu.addClass('mds-active');
                }
    }

    // Toggle overlay
    function toggleOverlay(isVisible, internalSettings)
    {
        var $overlay = $('.' + internalSettings.overlay),
        $body = $('body');

        if (isVisible)
        {
            $overlay.fadeOut('fast');
            $body.removeClass(internalSettings.disableScroll);
        }
        else
        {
            $overlay.fadeIn('fast');
            $body.addClass(internalSettings.disableScroll);
        }
    };

    // Close mobile menu
    function closeMenu(internalSettings, $menu, $menuParent)
    {
        // Escape key
        $(document).on('keydown', function(event) {
            if (event.keyCode === 27 && $('.' + internalSettings.overlay + ':visible').length > 0)
                closeMobileMenu(internalSettings, $menu, $menuParent);
        });

        // Overlay click
        $('.' + internalSettings.overlay).on('click', function(event) {
            closeMobileMenu(internalSettings, $menu, $menuParent);
        });
    }

    // Debugging
    function debugging(settings, internalSettings)
    {
        console.log("\nPlugin settings:");
        console.log(settings);

        console.log("\nInternal settings/classes:");
        console.log(internalSettings);

        console.log("\njQuery version: " + jQuery.fn.jquery);
    }

})(jQuery);

