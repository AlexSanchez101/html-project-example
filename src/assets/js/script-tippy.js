$(document).ready(function() {
    tippy('[data-tippy-content]', {
        arrow: false,
    });

    $("[data-input-dropdown-content] .dropdown__button").on('click', function() {
        var input = $(this).parents('[data-input-dropdown-content]').data('inputDropdownContent');
        var text = $(this).text();
        var value = $(this).data('value');
        $('[data-input-dropdown="'+input+'"]').val(text);
        $('[data-input-hidden-dropdown="'+input+'"]').val(value);
        console.log($(this).parents('[data-tippy-root]')[0]);
        var tippyInstance = $(this).parents('[data-tippy-root]')[0]._tippy;
        tippyInstance.hide();
    });

    //Привязывайте функции к элементам dropdown перед вызовом tippy
    $('.form-input-dropdown').each(function() {
        var dropdown = $(this).data('inputDropdown');
        tippy(this, {
            arrow: false,
            trigger: 'click',
            interactive: true,
            maxWidth: 'none',
            inlinePositioning: true,
            allowHTML: true,
            placement: 'bottom',
            content: $('[data-input-dropdown-content="'+dropdown+'"]').clone(true,true)[0],
            onShow: function(tippy) {
                var inputWidth = tippy.reference.getBoundingClientRect().width;
                $(tippy.popper).width(inputWidth);
            }
        });
    });

    $('[data-order-button-dropdown]').each(function() {
        $(this).on('click', function(e) {
            e.preventDefault();
        });
        tippy(this, {
            arrow: false,
            trigger: 'click',
            interactive: true,
            maxWidth: 'none',
            inlinePositioning: true,
            allowHTML: true,
            placement: 'bottom',
            content: $('[data-order-button-dropdown-content]').clone(true,true)[0],
            /*onShow: function(tippy) {
                var inputWidth = tippy.reference.getBoundingClientRect().width;
                $(tippy.popper).width(inputWidth);
            }*/
        });
    });

});

