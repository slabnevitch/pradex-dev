$(function() {
	// headhesive
		var headhesiveOptions = {
			offset: 100,
			offsetSide: 'top',
			classes: {
				clone:   'banner--clone',
				stick:   'banner--stick',
				unstick: 'banner--unstick'
			},
			onInit: function() {

			},
			onStick: function () {
				$('.header').not(".banner--clone").addClass('hidden');
			},
			onUnstick: function () {
				$('.header').not(".banner--clone").removeClass('hidden');
				ddh.hideAllDropdowns();
			},
		};

		var headhesive = new Headhesive('header', headhesiveOptions);
	// end headhesive

	// header dropdowns
		function headerDropdowns() {
			var _self = this,
					$collectionsMenu = $('.header-cat-menu[data-menu="collections"]'),
					$categoriesMenu = $('.header-cat-menu[data-menu="categories"]'),
					$mainMenuItems = $('.header-menu .header-menu__item'),
					$header = $('.header'),
					$bodyCover = $('.body-cover'),
					scrollPane,
					scrollPaneApi,
					scrollArr = [];
					

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
						console.log('customScrollLength=  ' + $('.scroll-pane').length);

						if($('.scroll-pane').length > 0){
							$('.scroll-pane').each(function(ind, elem) {
								scrollPane = $(elem).jScrollPane({
									verticalDragMaxHeight : 100,
									animateScroll : true
								});
								var scrollPaneApi = scrollPane.data('jsp');
								scrollArr.push(scrollPaneApi);
							});
							// var scrollPane = $('.scroll-pane').jScrollPane({
							// 	verticalDragMaxHeight : 100,
							// 	animateScroll : true
							// });

							// scrollPaneApi = scrollPane.data('jsp');

						}
					},

					this.customScrollReInit = function() {
						scrollArr.forEach(function(elem) {
							elem.reinitialise();	

						});
					}

					this.mainMenuHover = function(e) {
						var $th = $(this);

						$th.closest('.header-menu__item')
							.addClass('active')
							.siblings()
							.removeClass('active');

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

						$th.closest('.header-menu__item')
							.removeClass('active');

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
					},

					this.hideAllDropdowns = function() {
						console.log('hide all!');
							$('.header-dropdown').hide();
							this.coverHide();
							$header.removeClass('submenu-opened');
					}
					// this.init();
		}

		var ddh = new headerDropdowns;
		ddh.init();
	// end header dropdowns


// blocks animation
	
	if($('.projects .previews-item').length > 0){
		$('.projects .previews-item').waypoint(function() {

			$('.projects .previews-item').each(function(index) {
				var $this = $(this);

				setTimeout(function() {
					$this.removeClass('fadeOutDown');
					$this.animated('fadeInUp');

				}, index*300);

			});
		
		}, {offset: '100%'});
		
	}


	if($('.collections .previews-item').length > 0){
		$('.collections .previews-item').waypoint(function() {

			$('.collections .previews-item').each(function(index) {
				var $this = $(this);

				setTimeout(function() {
					$this.removeClass('fadeOutDown');
					$this.animated('fadeInUp');

				}, index*300);

			});
		
		}, {offset: '100%'});
	}
// end blocks animation

	// quality-toggle
		$('.quality-inner__more').click(function() {
			var $th = $(this);

			$('.quality-inner')
				.toggleClass('opened');
		

			$th.text() == 'Читать далее' ? $th.text("Свенуть") : $th.text('Читать далее');
			
			return false;
		});
	// end quality-toggle

	// slideout
		var slideout = new Slideout({
			'panel': document.querySelector('.main-content'),
			'menu': document.querySelector('.mob-nav'),
			'padding': 256,
			'tolerance': 70
		});

		document.querySelectorAll('.toggle-mnu:not(.toggle-mnu--for-fixed)').forEach(function(elem) {
			elem.addEventListener('click', function(e) {
				e.preventDefault();
				// this.classList.toggle('on');
				console.log('click to burger');
				slideout.toggle();
			});
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

	// fixed header content toggle
		$('.toggle-mnu--for-fixed').click(function() {
			$(this).toggleClass('on').closest('.banner--stick').toggleClass('fixed-menu-opened');

			return false;
		});
	// end fixed header content toggle

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
		if($('.banner-slider').length > 0){
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
			
		}
	// end slick

	// section card-top
			if($('.card-view__display').length > 0){
				var cardViewDisplaySwiper = new Swiper('.card-view__display', {
				  	effect: 'fade',
				  	speed: 500,
				  	allowTouchMove: false,
				  	fadeEffect: {
					    crossFade: true
					  }
				});

				var cardViewNavSwiper = new Swiper('.card-view__nav', {
				    slidesPerView: 8,
				    spaceBetween: 10,
				    navigation: {
					    nextEl: '.card-view-nav .swiper-button-next',
					    prevEl: '.card-view-nav .swiper-button-prev',
					},
					breakpoints: {
						1820: {
				      slidesPerView: 6
				    },
				    1200: {
				      slidesPerView: 5
				    },
				    992: {
				      slidesPerView: 10
				    },
				    768: {
				      slidesPerView: 8
				    },
				    576: {
				      slidesPerView: 6
				    },
				    480: {
				      slidesPerView: 5
				    },
				    375: {
				      slidesPerView: 4
				    }
				   
					}

				 });

				cardViewNavSwiper.on('slideChange', function () {
					console.log('slide changed');
				});
				cardViewNavSwiper.on('click', function () {
					console.log('slide clicked');
					console.log(cardViewNavSwiper.clickedIndex);
					cardViewDisplaySwiper.slideTo(cardViewNavSwiper.clickedIndex);
				});

			}
			

		if($('.card-additional__slider').length > 0){
			var cardAdditinalSlider = new Swiper('.card-additional__slider', {
				slidesPerView: 4,
				navigation: {
				    nextEl: '.card-additional .swiper-button-next',
				    prevEl: '.card-additional .swiper-button-prev'
				},
				scrollbar: {
			    		el: '.swiper-scrollbar',
			    		draggable: true,
			    		hide: false
			    	},

				breakpoints: {
			    // when window width is >= 320px
			    1820: {
			    	slidesPerView: 3
			    },
			    // when window width is >= 480px
			    1100: {
			    	slidesPerView: 2
			    },
			    // when window width is >= 640px
			   992: {
			    	slidesPerView: 4
			    	
			    },
			    768: {
			    	slidesPerView: 3
			    },
			    576: {
			    	slidesPerView: 2
			    },
			    320: {
			    	slidesPerView: 1

			    }
			  }
			});
		}

		function CustomScrollHandler() {
			var _self = this,
				apiArr = [],
				pane;

			this.init = function() {
				this.createScrollbars();
				this.bindEvents();
			}
			this.bindEvents = function() {
				$(window).on('resize', this.resize);
			}
			this.resize = function() {
				if(screen.width > 576){
					_self.recalculation();

				}

			}
			this.createScrollbars = function() {
				$('.to-scrollpane').each(function(ind, elem) {
					pane = $(elem).jScrollPane({
						verticalDragMaxHeight : 100,
						animateScroll : true
					});
					var paneApi = pane.data('jsp');
					apiArr.push(paneApi);
				});
			},
			// this.scrollDestroy = function() {
			// 	apiArr.forEach(function(item) {
			// 		item.destroy();
			// 	});
			// }

			this.recalculation = function() {
				apiArr.forEach(function(item) {
					item.reinitialise();
				});
			}
		}

		var scrollHandler = new CustomScrollHandler();

		if(document.querySelector('.to-scrollpane')){
			scrollHandler.init();
		}

		$('.prod-price__button').click(function() {
			var $th = $(this),
					$thCounter = $th.parent().find('.prod-price__count-val'),
					thCounterVal = +$thCounter.text();

			if($th.hasClass('prod-price__minus')){
				thCounterVal--;

			}else{
				thCounterVal++;
			}
				if(thCounterVal < 0){
					thCounterVal = 0;
				} 
			console.log(thCounterVal);


			$thCounter.text(thCounterVal);

		});
	// end section card-top

	// section card-slider
		if($('.prod-coll-slider').length > 0){
			var prodCollSlider = new Swiper('.prod-coll-slider', {
				slidesPerView: 4,
				spaceBetween: 8,
				scrollbar: {
					el: '.swiper-scrollbar',
					hide: false,
					draggable: true
				},
				breakpoints: {
			    // when window width is >= 320px
			    992: {
			      slidesPerView: 3
			    },
			    // when window width is >= 480px
			    576: {
			      slidesPerView: 2
			    },
			    320: {
			      slidesPerView: 1
			    }

			  }
			});
		}
	// end section card-slider

	// tabs
			var $tabs = $('.tabs__link');


			$tabs.on('click', function(e) {
				e.preventDefault();
				var $th = $(this),
				$href = $th.attr('href'),
				$parent = $th.parent();
				$parent.addClass('tabs__item--active')
				.siblings()
				.removeClass('tabs__item--active'),
				$parentGlobal = $th.closest('.tabs'),
				$currentContent = $parentGlobal.find($href);

				$currentContent.removeClass('hidden')
				.siblings()
				.addClass('hidden');

				if(this.hasAttribute('data-scrollpane')){
					scrollHandler.recalculation();
					// $currentContent.jScrollPane();
				} 

			});

	// end tabs

	// mat-selection
		function matSelecton() {
			var _self = this,
				$selectButtons = $('.material-select__item'),
				$popupParent = $('.card-top'),
				$selectionPanel = $('.mat-selection'),
				$panelClose = $('.mat-selection .ico-close'),
				$cover = $('.body-cover'),
				$main = $('.main-content ');

			this.init = function() {
				console.log('$popupParent height in init ' + $popupParent.height());

				this.bindEvents();
			}
			this.bindEvents = function() {
				$selectButtons.on('click', this.selectClick);
				$panelClose.on('click', this.popupClose);
				// $cover.on('click', this.coverDestroy);
				
				if($('.material-select__item').length > 0){
					$selectionPanel.find('.mat-selection-item').on('change', this.check);
				}
			}
			// this.coverDestroy = function() {
			// 	_self.popupClose(); 
			// }
			this.selectClick = function() {
				if($main.hasClass('popup-visible')){
					_self.popupClose();
					$main.removeClass('popup-visible');
					return;
				}
				var $th =  $(this),
					id = $th.attr('id'),
					thisOffsetTop = $th.offset().top,
					$currentPopup = $("[data-option="+id+"]"),
					headerHeight = $('.header').height(),
					$parentTop = $('.card-top').offset().top,
					// computed =  window.getComputedStyle(document.querySelector('.card-top'), null).getPropertyValue('padding-top'),
					// computedNumbers = +computed.replace(/\D/g, ""),
					luft = this.offsetTop + headerHeight + 20;

				if(screen.width <=576) luft = luft - 10;
				console.log('header height ' + $('.header').height());

				// console.log('boundtop= ' + top);
				
				$currentPopup.css('top', luft);
				// console.log($("[data-option="+id+"]"));
				$cover.fadeIn();
				$currentPopup.fadeIn();
				$main.addClass('popup-visible');
				$th.addClass('active');

			}
			this.popupClose = function() {
				$selectButtons.removeClass('active');
				$cover.fadeOut();
				$selectionPanel.fadeOut();
				$main.removeClass('popup-visible');
			}
			this.check = function() {
				var $that = $(this),
					path = $that.find('.mat-selection-item__img')
								.attr('src'),
					data = $that.closest('.mat-selection').attr('data-option');
				
				_self.imgPass(path, data, $that);
			}
			this.imgPass = function(path, data) {
				$('.materials-item[data-destination='+data+']')
					.attr('style', 'background-image: url('+ path+')');

				$('.material-select__item.active')
					.find('.material-select__icon')
					.attr('style', 'background-image: url('+ path+')');
			}

			this.init();
		}
		if(document.querySelector('.material-select') !== null){
			matSelecton();

		}
	// end mat-selection

	// chars-table toggle
		$('.prod-card-sm-title--arrowed').click(function() {
			if(screen.width <= 576){
				$(this)
					.parent()
					.toggleClass('opened');
			}
		});

	// 

	// prod-description__container--mob toggle
		$('.prod-description__container--mob').click(function() {
			if(screen.width <= 576) $(this).toggleClass('expanded');
		});
	// end prod-description__container--mob toggle

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
	$('.preloader').hide();
	$('.header-top__left-bar').removeClass('hidden-left');
	$('.header-top__right-bar').removeClass('hidden-right');

	$('.banner-slide__left').removeClass('fadeOutLeft');
	$('.banner-slide__left').addClass('fadeInLeft');
	$('.banner-slide__right').removeClass('fadeOutRight');
	$('.banner-slide__right').addClass('fadeInRight');

});
