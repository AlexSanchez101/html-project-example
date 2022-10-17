$(document).ready(function(){
    $('[data-open-popup]').on('click', function(e) {
        e.preventDefault();
        var target = $(this).attr('href');
        if  ($(this).data('openPopup')) {
            var target = $(this).data('openPopup');
        }
        $.fancybox.open({
            src  : target,
            autoFocus: false,
            baseClass: "popup",
        });
    });

    $('[data-open-tur]').on('click', function(e) {
        e.preventDefault();
        var target = $(this).attr('href');
        if  ($(this).data('openTur')) {
            var target = $(this).data('openTur');
        }
        $.fancybox.open({
            src  : target,
            autoFocus: false,
            baseClass: "popup popup-tur",
        });
    });
});