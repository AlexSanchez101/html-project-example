$(document).ready(function() {

    function sliderSetNavCounter(slider) {
        slider.on('slideChange', function () {
            var id = $(this.el).attr("id");
            if (id !== undefined) {
                var $slider = $('.slider-counter-nav[data-slider-id="'+id+'"]');
                //var index = getSlideDataIndex(this) + 1;
                var index = this.realIndex + 1;
                if (index < 10) {
                    index = '0'+index;
                }
                $slider.find('.slider-counter-nav__index').text(index);
                $slider.find('.slider-counter-nav__btn').removeClass('disabled');
                if (slider.params.loop == false) {
                    if (this.activeIndex == 0) {
                        $slider.find('.slider-counter-nav__btn.prev').addClass('disabled');
                    }
                    if (this.activeIndex == this.slides.length - this.slidesPerViewDynamic()) {
                        $slider.find('.slider-counter-nav__btn.next').addClass('disabled');
                    }
                }
            }
        });
    }
    $('.slider-counter-nav__btn').on('click', function(e) {
        e.preventDefault();
        var sliderId = $(this).parent('.slider-counter-nav').data('sliderId');
        var $slider = $('#'+sliderId);
        if ($slider.length > 0) {
            if ($(this).hasClass('next')) {
                $slider[0].swiper.slideNext();
            }
            if ($(this).hasClass('prev')) {
                $slider[0].swiper.slidePrev();
            }
        }
    });

    $('.main-order-button__btn').on('click', function() {
        $(this).toggleClass('active');
        var button = this;
        setTimeout(function() {
            if ($(button).next('.main-order-button__methods').is(':visible')) {
                $(button).next('.main-order-button__methods').find('li').animate({opacity: 0}, function() {
                    $(button).next('.main-order-button__methods').slideUp(400);
                });
            }
            else {
                $(button).next('.main-order-button__methods').slideDown(400, function() {
                    $(button).next('.main-order-button__methods').find('li').animate({opacity: 1});
                });
            }
        }, 250);
    });

    $('.header__search-btn').on('click', function() {
        $('.header-search').toggleClass('active');
    });
    $('.header-search__close-btn').on('click', function() {
        $('.header-search').removeClass('active');
    });

    $(window).on('scroll', function() {
        if ($(this).scrollTop() > $('.header__main').offset().top + $('.header__main').innerHeight() ) {
            $('.header-fixed-panel').addClass('active');
        } else {
            $('.header-fixed-panel').removeClass('active');
        }
    });

    var mainSlider = new Swiper('.main-slider', {
        loop: true,
        effect: 'fade',
        simulateTouch: false,
        lazy: true,
        autoplay: {
            delay: 3200,
          },
        pagination: {
            el: '.main-slider__pagination',
            clickable: true
        },
    });

    $('.video-block [data-load-video]').on('click', function(e) {
        e.preventDefault();
        $(this).parent('.video-block').find('.video-block__button-container').fadeOut();
        $(this).parent('.video-block').find('.video-block__video-container').html('<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
        $(this).parent('.video-block').find('.video-block__preview').fadeOut();
    })

    var interestPlaces = new Swiper('#interestPlaces', {
        slidesPerView: 1,
        spaceBetween: 20,
        watchSlidesProgress: true,
        lazy: true,
        breakpoints: {
            768: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 4,
            },
            1200: {
                slidesPerView: 5,
            },
        }
    });
    sliderSetNavCounter(interestPlaces);


    var reviewSlider = new Swiper('#reviewSlider', {
        slidesPerView: "auto",
        spaceBetween: 14,
        loop: true,
        watchSlidesProgress: true,
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
        }
    });
    sliderSetNavCounter(reviewSlider);

    var watchAlsoSlider = new Swiper('#watchAlsoSlider', {
        slidesPerView: "auto",
        spaceBetween: 20,
        loop: false,
        watchSlidesProgress: true,
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
        }
    });
    sliderSetNavCounter(watchAlsoSlider);

    var tursSlider = new Swiper('#tursSlider', {
        slidesPerView: "auto",
        spaceBetween: 20,
        loop: false,
        watchSlidesProgress: true,
        lazy: true,
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            992: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 50,
            },
        }
    });
    sliderSetNavCounter(tursSlider);

    $('[data-toggle-mobile-menu]').on('click', function(e) {
        e.preventDefault();
        $('.mobile-menu').fadeToggle();
        $('body').toggleClass('body-mobile-menu-open');
    });
    $('.mobile-menu__close-btn').on('click', function(e) {
        e.preventDefault();
        $('.mobile-menu').fadeOut();
        $('body').removeClass('body-mobile-menu-open');
    });

    //last to init!
    //after sliders
    AOS.init();
});
