(function ($) {
    /*
     * Make light focus to the selected row
     */
  chrome.storage.local.get('selectedRow', function (data) {
    const injectId = 'bequem-inject-' + data.selectedRow.uniqueId

    if (data.selectedRow.isSelected) {
      $(data.selectedRow.selector).toggleClass('bequem-selector-selected')

      const position = $(data.selectedRow.selector).offset()

      if (data.selectedRow.inputType !== 'hidden') {
        const injectCSS = {
          position: 'absolute',
          top: (position.top) + $(data.selectedRow.selector).outerHeight() + 5,
          left: (position.left),
          backgroundColor: '#FFF',
          opacity: 0.9,
          // width: $(data.selectedRow.selector).outerWidth() + 200,
          // height: $(data.selectedRow.selector).outerHeight() + 300,
          width: 240,
          height: 30,
          'z-index': 99999,
          'font-size': '12px'
        }

        const div = $('<div id="' + injectId + '">')
        div.appendTo($('body'))
        div.css(injectCSS)
        div.text(data.selectedRow.selector)
      }
    } else {
      $(data.selectedRow.selector).toggleClass('bequem-selector-selected')
      $('#' + injectId).remove()
    }
  })
})(jQuery)
