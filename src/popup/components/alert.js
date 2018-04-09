/*(function ($) {

    'use strict';

    console.log("AAAAAAA");

    var overlayCSS = {
        backgroundColor: '#000',
        opacity: 0.6,
        cursor: 'wait'
    };

    /!*
     * Check if es6 syntax can be used.
     *!/
    var newDiv = '<div id="test"></div>';
    var $lyr3 = $(newDiv);

    $lyr3.css(overlayCSS);
    $lyr3.appendTo($('body'));

    var $test = $("<div>AAA</div>");
    $test.appendTo($('body'));

    console.log("Added");

})(jQuery);*/

// (function() {
//
//     // just place a div at top right
//     var div = document.createElement('div');
//     div.style.position = 'fixed';
//     div.style.top = 0;
//     div.style.right = 0;
//     div.textContent = 'Injected!';
//     document.body.appendChild(div);
//
//     console.log('inserted self... giggity');
//
// })();

(function ($) {

    var div = $('<div id="test"></div>');
    div.text('Injected!');
    div.appendTo($('body'));

    console.log('inserted self... giggity');

})(jQuery);