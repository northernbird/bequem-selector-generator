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

    /*
     * Make light focus to the selected row
     */
    chrome.storage.local.get('selectedRow', function (row) {
        console.log("Row : " + JSON.stringify(row));
        chrome.storage.local.remove('selectedRow');
    });

    var testCSS =  {
        position: 'fixed',
        top: '50%',
        left: '50%',
        /* bring your own prefixes */
        transform: 'translate(-50%, -50%)',
        /* make higher than whatever is on the page */
    };


    var div = $('<input type="text" class="form-control" id="input-name" placeholder="お名前" required="required">');
    div.appendTo($('body'));
    div.css(testCSS);

    console.log('inserted self... giggity');


})(jQuery);