(function ($) {

    var blockBackground = $('body').find('#blockBackground');

    if(blockBackground.length === 0) {
        var $blockBackground = $('<div>', {id: 'blockBackground'});
        var overlayCSS = {
            backgroundColor: '#000',
            opacity: 0.6,
            width: '100%',
            height: '100%',
            top: '0px',
            left: '0px',
            position: 'fixed'
        };

        $blockBackground.css(overlayCSS);

        $('body').append($blockBackground);
    }


})(jQuery);