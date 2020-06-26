/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/jquery-mdstrap.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/jquery-mdstrap.js":
/*!**********************************!*\
  !*** ./src/js/jquery-mdstrap.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {/**
 * jQuery-mdStrap
 *
 * jQuery plugin that enables mobile slide navigation for Bootstrap v4 framework
 *
 * @version 4.0.1
 * @author Corneliu Cirlan (www.corneliucirlan.com)
 */
(function ($) {
  'use strict'; //if ($.mobile !== 'undefined')
  //    $.mobile.autoInitializePage = false

  $.fn.mdStrap = function (options) {
    // Plugin default settings
    var defaults = {
      'fixedTop': true,
      'menuTrigger': '.navbar-toggler-left',
      'scrollValue': '10',
      // debugging
      'debug': false
    }; // Plugin settings

    var settings = options ? $.extend(true, {}, defaults, options) : defaults; // Declare function variables

    var $menu = $(this).hasClass('navbar-nav-left') ? $('.navbar-nav-left') : $('.navbar-nav-right'),
        $menuParent = $menu.parents('nav'),
        // Various internal options/classes
    internal = {
      'fixedTop': 'mds-fixed-top',
      'disableScroll': 'mds-disable-scroll',
      'overlay': 'mds-overlay'
    };
    if ($menu.length !== 0) initialize(settings, internal, $menu, $menuParent);else console.error('Menu "' + $menu + '" not available.');
    return this;
  }; // Init function


  function initialize(settings, internalSettings, $menu, $menuParent) {
    // Add overlay to document
    if ($('div.' + internalSettings.overlay).length == 0) $('body').prepend('<div class="' + internalSettings.overlay + '"></div>'); // Check if page already scrolled on load

    toggleFixedTop(settings, internalSettings, $menuParent); // Open menu

    openMobileMenu(settings, internalSettings, $menu, $menuParent); // Close menu

    closeMenu(internalSettings, $menu, $menuParent); // Window scroll

    windowScroll(settings, internalSettings, $menuParent); // Debugging ...

    if (settings.debug === true) debugging(settings, internalSettings);
  } // Window scroll


  function windowScroll(settings, internalSettings, $menuParent) {
    $(window).on('scroll', function (event) {
      toggleFixedTop(settings, internalSettings, $menuParent);
    });
  } // Toggle menu fixed top


  function toggleFixedTop(settings, internalSettings, $menuParent) {
    if (settings.fixedTop === true) {
      var wScroll = $(window).scrollTop();
      if (wScroll > settings.scrollValue) $menuParent.addClass(internalSettings.fixedTop);else $menuParent.removeClass(internalSettings.fixedTop);
    }
  } // Open menu


  function openMobileMenu(settings, internalSettings, $menu, $menuParent) {
    $(settings.menuTrigger).on('click', function (event) {
      event.preventDefault(); // toggle overlay

      toggleOverlay(false, internalSettings); // Toggle menu

      toggleMenu($menu, $menuParent, false);
    });
  } // Close mobile menu


  function closeMobileMenu(internalSettings, $menu, $menuParent) {
    //let wScroll = $(window).scrollTop()
    // toggle overlay
    toggleOverlay(true, internalSettings); // Toggle menu

    toggleMenu($menu, $menuParent, true);
  } // Toggle menu


  function toggleMenu($menu, $menuParent, isVisible) {
    // Hide menu
    if (isVisible) {
      $menuParent.removeClass('mds-active');
      $menu.removeClass('mds-active');
    } // Show menu
    else {
        $menuParent.addClass('mds-active');
        $menu.addClass('mds-active');
      }
  } // Toggle overlay


  function toggleOverlay(isVisible, internalSettings) {
    var $overlay = $('.' + internalSettings.overlay),
        $body = $('body'); // Is visible

    if (isVisible) {
      $overlay.fadeOut('fast');
      $body.removeClass(internalSettings.disableScroll);
    } // Is not visible
    else {
        $overlay.fadeIn('fast');
        $body.addClass(internalSettings.disableScroll);
      }
  } // Close mobile menu


  function closeMenu(internalSettings, $menu, $menuParent) {
    // Escape key
    $(document).on('keydown', function (event) {
      if (event.keyCode === 27 && $('.' + internalSettings.overlay + ':visible').length > 0) closeMobileMenu(internalSettings, $menu, $menuParent);
    }); // Overlay click

    $('.' + internalSettings.overlay).on('click', function (event) {
      closeMobileMenu(internalSettings, $menu, $menuParent);
    });
  } // Debugging


  function debugging(settings, internalSettings) {
    console.log('\nPlugin settings:');
    console.log(settings);
    console.log('\nInternal settings/classes:');
    console.log(internalSettings);
    console.log('\njQuery version: ' + jQuery.fn.jquery);
  }
})(jQuery);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ })

/******/ });
//# sourceMappingURL=jquery-mdstrap.js.map