(function ($) {


    /*
     * Make light focus to the selected row
     */
    chrome.storage.local.get('selectedRow', function (data) {
        console.log("Row : " + JSON.stringify(data));
        console.log("isSelected : " + JSON.stringify(data.selectedRow.isSelected));
        if(data.selectedRow.isSelected) {

            $(data.selectedRow.selector).css({'background-color': '#00FF91'});
            //row.css({backgroundColor: '#00FF91'});
            console.log("changed!! A " + data.selectedRow.selector);
            //chrome.storage.local.remove('selectedRow');

            var position = $(data.selectedRow.selector).offset();

            console.log("position : " + position.top + " " + position.left);

            var testCSS =  {
                position: 'absolute',
                top: (position.top),
                left: (position.left),
                backgroundColor: '#000',
                opacity: 0.6,
                width : $(data.selectedRow.selector).width(),
                height : $(data.selectedRow.selector).height(),
            };


            var div = $('<div id="new">');
            div.appendTo($('body'));
            div.css(testCSS);



        } else {

            $(data.selectedRow.selector).css({'background-color': '#FFFFFF'});
            //row.css({backgroundColor: '#00FF91'});
            console.log("changed!! B" + data.selectedRow.selector);
            //chrome.storage.local.remove('selectedRow');

        }


    });



})(jQuery);