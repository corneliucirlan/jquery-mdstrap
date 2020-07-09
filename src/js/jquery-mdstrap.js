/**
 * jQuery-mdStrap
 *
 * jQuery plugin that enables mobile slide navigation for Bootstrap v4 framework
 *
 * @version 4.2.3
 * @author Corneliu Cirlan (www.corneliucirlan.com)
 */

(function($) {
    'use strict'

    //if ($.mobile !== 'undefined')
    //    $.mobile.autoInitializePage = false

    $.fn.mdStrap = function(options) {

        // Plugin default settings
        let defaults = {
            'fixedTop'          : true,
            'menuTrigger'       : '.navbar-toggler-left',
            'scrollValue'       : '10',

            // debugging
            'debug'             : false
        }

        // Plugin settings
		let settings = options ? $.extend(true, {}, defaults, options) : defaults 

        // Declare function variables
        let $menu = $(this).hasClass('navbar-nav-left') ? $('.navbar-nav-left') : $('.navbar-nav-right'),
        	$menuParent = $menu.parents('nav'),

	        // Various internal options/classes
        	internal = {
				'fixedTop'              : 'mds-fixed-top',
				'disableScroll'         : 'mds-disable-scroll',
				'overlay'               : 'mds-overlay',
			}

        if ($menu.length !== 0) initialize(settings, internal, $menu, $menuParent)
		    else console.error('Menu "' + $menu + '" not available.')

        return this
    }

    // Init function
    function initialize(settings, internalSettings, $menu, $menuParent) {

        // Add overlay to document
        if ($('div.' + internalSettings.overlay).length == 0)
            $('body').prepend('<div class="' + internalSettings.overlay + '"></div>')

        // Check if page already scrolled on load
        toggleFixedTop(settings, internalSettings, $menuParent)

        // Open menu
        openMobileMenu(settings, internalSettings, $menu, $menuParent)

        // Close menu
        closeMenu(internalSettings, $menu, $menuParent)

        // Window scroll
		windowScroll(settings, internalSettings, $menuParent)
		
		if (isTouchEnabled()) {
			$('.dropdown').on('click', function () {
				$(this).children('.dropdown-menu').toggleClass('active')
			})
		}
		else {
			$('.dropdown').hover(function () {
				$(this).children('.dropdown-menu').toggleClass('active')
			})
		}

		// Check if device is touch enabled
		function isTouchEnabled() {

			var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');

			var mq = function (query) {
				return window.matchMedia(query).matches;
			}

			if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
				return true;
			}

			// include the 'heartz' as a way to have a non matching MQ to help terminate the join
			// https://git.io/vznFH
			var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
			return mq(query);
		}

        // Debugging ...
        if (settings.debug === true)
            debugging(settings, internalSettings)
    }

    // Window scroll
    function windowScroll(settings, internalSettings, $menuParent) {

        $(window).on('scroll', function(event) {
            toggleFixedTop(settings, internalSettings, $menuParent)
        })
    }

    // Toggle menu fixed top
    function toggleFixedTop(settings, internalSettings, $menuParent) {

        if (settings.fixedTop === true) {

            let wScroll = $(window).scrollTop()

            if (wScroll > settings.scrollValue) $menuParent.addClass(internalSettings.fixedTop)
            	else $menuParent.removeClass(internalSettings.fixedTop)
        }
    }

    // Open menu
    function openMobileMenu(settings, internalSettings, $menu, $menuParent) {

        $(settings.menuTrigger).on('click', function(event) {
            event.preventDefault()

            // toggle overlay
            toggleOverlay(false, internalSettings)

            // Toggle menu
            toggleMenu($menu, $menuParent, false)
        })
    }

    // Close mobile menu
    function closeMobileMenu(internalSettings, $menu, $menuParent) {
        //let wScroll = $(window).scrollTop()

        // toggle overlay
        toggleOverlay(true, internalSettings)

        // Toggle menu
        toggleMenu($menu, $menuParent, true)
    }

    // Toggle menu
    function toggleMenu($menu, $menuParent, isVisible) {

        // Hide menu
        if (isVisible) {
            $menuParent.removeClass('mds-active')
            $menu.removeClass('mds-active')
        }

			// Show menu
			else {
				$menuParent.addClass('mds-active')
				$menu.addClass('mds-active')
			}
    }

    // Toggle overlay
    function toggleOverlay(isVisible, internalSettings) {
        let $overlay = $('.' + internalSettings.overlay),
        	$body = $('body')

        // Is visible
        if (isVisible) {
            $overlay.fadeOut('fast')
            $body.removeClass(internalSettings.disableScroll)
        }

        // Is not visible
        else {
            $overlay.fadeIn('fast')
            $body.addClass(internalSettings.disableScroll)
        }
    }

    // Close mobile menu
    function closeMenu(internalSettings, $menu, $menuParent) {

        // Escape key
        $(document).on('keydown', function(event) {
            if (event.keyCode === 27 && $('.' + internalSettings.overlay + ':visible').length > 0)
                closeMobileMenu(internalSettings, $menu, $menuParent)
        })

        // Overlay click
        $('.' + internalSettings.overlay).on('click', function(event) {
            closeMobileMenu(internalSettings, $menu, $menuParent)
        })
    }

    // Debugging
    function debugging(settings, internalSettings) {
        console.log('\nPlugin settings:')
        console.log(settings)

        console.log('\nInternal settings/classes:')
        console.log(internalSettings)

        console.log('\njQuery version: ' + jQuery.fn.jquery)
    }

})(jQuery)
