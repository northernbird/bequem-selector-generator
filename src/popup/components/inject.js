(function ($) {
    /*
     * Make light focus to the selected row
     */
  chrome.storage.local.get('selectedRow', function (data) {
    if (data.selectedRow.isSelected) {
      $(data.selectedRow.selector).css({'background-color': '#00FF91'})
      const position = $(data.selectedRow.selector).offset()

      console.log('position : ' + position.top + ' ' + position.left)

      var testCSS = {
        position: 'absolute',
        top: (position.top),
        left: (position.left),
        backgroundColor: '#000',
        opacity: 0.6,
        width: $(data.selectedRow.selector).outerWidth(),
        height: $(data.selectedRow.selector).outerHeight()
      }

      var div = $('<div id="new">')
      div.appendTo($('body'))
      div.css(testCSS)
    } else {
      $(data.selectedRow.selector).css({'background-color': '#FFFFFF'})
      console.log('changed!! B' + data.selectedRow.selector)
    }
  })
})(jQuery)
