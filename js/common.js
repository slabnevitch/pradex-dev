$(function() {

	// jsscrollpane
		// if(document.querySelector('.scroll-pane')){
		// 	var scrollPane = $('.scroll-pane').jScrollPane({
		// 		verticalDragMaxHeight : 100,
		// 		animateScroll : true
		// 	});

		// 	var scrollPaneApi = scrollPane.data('jsp');

		// 	$(window).resize(function() {
		// 		scrollPaneApi.reinitialise();
		// 	});
			
		// }
	// end jsscrollpane


	// slideout
		var slideout = new Slideout({
			'panel': document.querySelector('.main-content'),
			'menu': document.querySelector('.mob-nav'),
			'padding': 256,
			'tolerance': 70
		});

		document.querySelector('.toggle-mnu').addEventListener('click', function() {
			// this.classList.toggle('on');
			slideout.toggle();
		});

		function close(eve) {
			eve.preventDefault();
			slideout.close();
		}

		slideout
		.on('beforeopen', function() {
			this.panel.classList.add('panel-open');
		})
		.on('open', function() {
			this.panel.addEventListener('click', close);
		})
		.on('beforeclose', function() {
			this.panel.classList.remove('panel-open');
			this.panel.removeEventListener('click', close);
		});
	// end slideout

	// right bar hover
		// $('.header-top__right-bar .header-icons .to-hover').hover(function() {
		// 	if(screen.width > 768){
		// 		console.log('in');
		// 		console.log($(this));
		// 		if($(this).children('.cart-preview').length > 0){
		// 			console.log('scroll pane is real!');
		// 			scrollPaneApi.reinitialise();
		// 		}
		// 		$('.body-cover').css('display', 'block');
				
		// 		// $('html').addClass('freez');

		// 	}else{
		// 		return false;
		// 	}
		
		// },
		// function() {
		// 	console.log('out');
		// 	$('.body-cover').css('display', 'none');
		// });
	// end right bar hover

	// header dropdowns
		(function headerDropdowns() {
			var _self = this,
					$collectionsMenu = $('.header-cat-menu[data-menu="collections"]'),
					$categoriesMenu = $('.header-cat-menu[data-menu="categories"]'),
					$mainMenuItems = $('.header-menu li'),
					$header = $('.header'),
					$bodyCover = $('.body-cover'),
					scrollPane,
					scrollPaneApi;

					this.init = function() {
						console.log('init!');

						this.events();
						this.customScrollInit();
					},

					this.events = function() {
						$mainMenuItems.hover(this.mainMenuHover, this.mainMenuOut);
						$('.header-top__right-bar .to-click').on('click', this.searchIconClick);
						$('.header-top__right-bar .to-hover').on('click', this.searchIconClick);
						$('.header-top__right-bar .fa-times').on('click', this.iconCloseClick);
						$('.header-top__right-bar .header-icons .to-hover').hover(this.iconsHover, this.iconsOut);
						
						$(window).on('resize', (function() {
								_self.customScrollReInit();
						}));

					},

					this.customScrollInit = function() {
						if(document.querySelector('.scroll-pane')){
							var scrollPane = $('.scroll-pane').jScrollPane({
								verticalDragMaxHeight : 100,
								animateScroll : true
							});

							scrollPaneApi = scrollPane.data('jsp');

						}
					},

					this.customScrollReInit = function() {
						scrollPaneApi.reinitialise();
					}

					this.mainMenuHover = function(e) {
						var $th = $(this);

						if($th.attr('data-menu') !== undefined){
							_self.coverShow(true);
							$th.find('.header-cat-menu').fadeIn();
							$th
								.siblings()
								.find('.header-cat-menu').fadeOut();
						}
					},

					this.mainMenuOut = function(e) {
						var $th = $(this);
						if($th.attr('data-menu') !== undefined){
							_self.coverHide();

							$th.find('.header-cat-menu').fadeOut();
						}
					},

					this.coverShow = function(headerKey) {
							if(headerKey){
								$header.addClass('submenu-opened');	
								
							}
							$bodyCover.fadeIn(100);
					},

					this.coverHide = function() {

							$header.removeClass('submenu-opened');	
							$bodyCover.fadeOut(100);	
					},

					this.searchIconClick = function(e) {
						console.log('click!!');
						$(this).find('.header-dropdown').show();
						_self.coverShow(false);
						_self.customScrollReInit();
						if(screen.width < 768){
							$('html').addClass('freez');
						}
						e.stopPropagation();
					},

					this.iconsHover = function() {
						if(screen.width > 768){
							console.log('in');
							$(this).find('.header-dropdown').show();
							if($(this).children('.cart-preview').length > 0){
								console.log('scroll pane is real!');
								scrollPaneApi.reinitialise();
							}
							$('.body-cover').css('display', 'block');

						// $('html').addClass('freez');

						}else{
							return false;
						}
					},

					this.iconsOut = function() {
						console.log('out');
						$(this).find('.header-dropdown').hide();
						_self.coverHide();
					},

					this.iconCloseClick = function(e) {
						e.stopPropagation();
						$(this)
							.closest('.header-dropdown').hide();

						if(screen.width < 768){
							$('html').removeClass('freez');
						}

						_self.coverHide();
					}

					this.init();
		})();
	// end header dropdowns

	// Accordeon-----------------------------------
		$('.acordeon-link').click(function(e) {
			e.preventDefault();
			var $currentItem = $(this).closest('.acordeon-item');
			if($currentItem.hasClass('acordeon-item-with-sublist')){

				$currentItem.find('.acordeon-sublist')
				.stop(true, true)
				.slideToggle();
				$currentItem.siblings()
				.find('.acordeon-sublist')
				.stop(true, true)
				.slideUp();

			}else{
				return;
			}
		});
	// end Accordeon-----------------------------------

	// slick
		$('.banner-slider').slick({
			slidesToScroll: 1,
			dots: true,

			responsive: [
				
				{
					breakpoint: 560,
					settings: {
	
					}	
				},
				{
					breakpoint: 400,
					settings: {

					}	
				}
			]
		});
	// end slick

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });
	
});

$(window).load(function() {

	$(".loader_inner").fadeOut();
	$(".loader").delay(400).fadeOut("slow");

});
