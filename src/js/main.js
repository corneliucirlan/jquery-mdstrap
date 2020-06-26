// PrismJS
import PrismJS from 'prismjs'

// jQuery mdStrap
import { mdstrap } from './jquery-mdstrap.js'

jQuery(document).ready(function($) {

	function activateMenuItem() {

		$('a[href^="#"]').on('click', function () {
			$(this).parents('li.nav-item').addClass('active').siblings().removeClass('active');
		});
	}

	// smoothScroll function is applied from the document ready function
	function smoothScroll(duration) {
		$('a[href^="#"]').on('click', function (event) {

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

		$.getJSON('https://api.github.com/repos/corneliucirlan/jquery-mdstrap/tags').done(function (json) {

			//Get latest release
			var latest = json[0];

			// Update download URL
			if (latest.zipball_url) $('.plugin-zip').attr('href', latest.zipball_url);
		});
	}


	// Prism JS
	Prism.highlightAll();
	
	$('.navbar-nav-left').mdStrap({
		'menuTrigger': '.navbar-toggler-left'
    });

	activateMenuItem();
	smoothScroll(300);
	getLatestGitHubRelease();
});

