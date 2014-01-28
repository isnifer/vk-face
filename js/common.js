(function ($) {

	if ($('.b-fancybox').length) {

		$.getScript('', function () {

			console.log('ok');

			var a = $('<link/>');
			a.attr({
				rel: 'stylesheet',
				type: 'text/css',
				href: ''
			});
			$('head').append(a);

			$('.b-fancybox').fancybox({
				padding: 0
			});

		});

	}

}(jQuery));