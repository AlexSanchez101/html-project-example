$(document).ready(function() {
    if ($('.how-to-order') .length > 0) {

    function howToOrderAnimation(index) {
        console.log('animation',index);
        $('.how-to-order__item-number').eq(index).animate({opacity: '1'});
        $('.how-to-order__item-body').eq(index).animate(
            {opacity: '1'},
            400,
            'swing',
            function() {
                $('.how-to-order__item-line span').eq(index).animate(
                    {width: '100%', height: '100%'},
                    400,
                    'swing',
                    function() {
                        if ($('.how-to-order__item').eq(index + 1).length > 0) {
                            howToOrderAnimation(index + 1);
                        }
                    }
                    );
                }
                );
            }
            $howToOrderAnimationTarget = $('[data-how-to-order-animation-detector]');
            if ($howToOrderAnimationTarget.offset().top < $(this).scrollTop() + $(window).height()) {
                if ($howToOrderAnimationTarget.data('detected') == false) {
                    $howToOrderAnimationTarget.data('detected', true);
                    howToOrderAnimation(0);
                }
            }
            $(window).on('scroll', function() {
                if ($howToOrderAnimationTarget.offset().top < $(this).scrollTop() + $(window).height()) {
                    if ($howToOrderAnimationTarget.data('detected') == false) {
                        $howToOrderAnimationTarget.data('detected', true);
                        howToOrderAnimation(0);
                    }
                }
            })
    }
});