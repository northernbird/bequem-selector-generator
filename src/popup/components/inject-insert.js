(function ($) {
    /*
     * Make light focus to the selected row
     */
  chrome.storage.local.get('selectedRow', function (data) {
    if (data.selectedRow.isSelected) {
      $(data.selectedRow.selector).toggleClass('bequem-selector-selected')

      var position = $(data.selectedRow.selector).offset()

      console.log('position : ' + position.top + ' ' + position.left)

      var testCSS = {
        position: 'absolute',
        top: (position.top) + $(data.selectedRow.selector).outerHeight() + 5,
        left: (position.left),
        backgroundColor: '#000',
        opacity: 0.6,
        // width: $(data.selectedRow.selector).outerWidth() + 200,
        // height: $(data.selectedRow.selector).outerHeight() + 300,
        width: 30,
        height: 10,
        'z-index': 99999
      }

      var div = $('<div class="new">')
      div.appendTo($('body'))
      div.css(testCSS)
      div.text('AAA')
    } else {
      $(data.selectedRow.selector).toggleClass('bequem-selector-selected')
    }
  })
})(jQuery)
