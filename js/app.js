debounce = function (func, wait, immediate) {
	var timeout;
	return function () {
		var context = this, args = arguments;
		var later = function () {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

// Mudar tab ao clique
$('[data-group]').each(function () {
	var $allTarget = $(this).find('[data-target]'),
		$allClick = $(this).find('[data-click]'),
		activeClass = 'active';

	$allTarget.first().addClass(activeClass);
	$allClick.first().addClass(activeClass);

	$allClick.click(function (e) {
		e.preventDefault();

		var id = $(this).data('click'),
			$target = $('[data-target="' + id + '"]');

		$allClick.removeClass(activeClass);
		$allTarget.removeClass(activeClass);

		$target.addClass(activeClass);
		$(this).addClass(activeClass);
	});
});

// Scroll suave para link interno
$('.menu-nav a[href^="#"]').click(function (e) {
	e.preventDefault();
	var id = $(this).attr('href'),
		menuHeight = $('.menu').innerHeight(),
		targetOffset = $(id).offset().top;
	$('html, body').animate({
		scrollTop: targetOffset - menuHeight
	}, 500);
});

// Scroll suave para o logo
$('.logo').click(function (e) {
	e.preventDefault();
	$('html, body').animate({
		scrollTop: 0
	}, 500)
});

// Mudar para active o menu de acordo com a área
$('section').each(function () {
	var height = $(this).height(),
		offsetTop = $(this).offset().top,
		menuHeight = $('.menu').innerHeight(),
		id = $(this).attr('id'),
		$itemMenu = $('a[href="#' + id + '"]');

	$(window).scroll(debounce(function () {
		var scrollTop = $(window).scrollTop();
		if (offsetTop - menuHeight < scrollTop && offsetTop + height - menuHeight > scrollTop) {
			$itemMenu.addClass('active');
		} else {
			$itemMenu.removeClass('active');
		}
	}, 200));
});

// Botão do menu mobile
$('.mobile-btn').click(function () {
	$(this).toggleClass('active');
	$('.mobile-menu').toggleClass('active');
});

// Slider

function slider(sliderName, velocidade) {
	const sliderClass = `.${sliderName}`
	const activeClass = 'active'
	let rotate = setInterval(rotateSlide, velocidade)

	$(`${sliderClass} > :first`).addClass(activeClass)
	$(sliderClass).hover(function () {
		clearInterval(rotate)
	}, function () {
		rotate = setInterval(rotateSlide, velocidade)
	})

	function rotateSlide() {
		const activeSlide = $(`${sliderClass} > .${activeClass}`)
		let nextSlide = activeSlide.next()
		if (nextSlide.length === 0) {
			nextSlide = $(`${sliderClass} > :first`)
		}
		activeSlide.removeClass(activeClass)
		nextSlide.addClass(activeClass)
	}
}

slider('introducao', 2000);

// Animação ao Scroll
(function () {
	const $target = $('[data-anime="scroll"]')
	const animationClass = 'animate'
	const offset = $(window).height() * 3 / 4

	function animaScroll() {
		const documentTop = $(window).scrollTop()

		$target.each(function () {
			const itemTop = $(this).offset().top
			if (documentTop > itemTop - offset) {
				$(this).addClass(animationClass)
				console.log('a')
			} else {
				$(this).removeClass(animationClass)
			}
		})
	}

	animaScroll()

	$(document).scroll(debounce(function () {
		animaScroll()
	}, 200))
})()








