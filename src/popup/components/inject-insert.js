(function ($) {
    /*
     * Make light focus to the selected row
     */
  chrome.storage.local.get('selectedRow', function (data) {
    const injectId = 'bequem-inject-' + data.selectedRow.uniqueId

    if (data.selectedRow.isSelected) {
      $(data.selectedRow.selector).toggleClass('bequem-selector-selected')

      const $currentElement = $(data.selectedRow.selector)
      // const position = $currentElement.offset()
      const injectCSS = {
        position: 'absolute',
        top: $(data.selectedRow.selector).outerHeight() + 5,
        left: 0,
        backgroundColor: '#FFF',
        opacity: 0.9,
        // width: $(data.selectedRow.selector).outerWidth() + 200,
        // height: $(data.selectedRow.selector).outerHeight() + 300,
        width: 180,
        height: 30,
        // overflow: 'visible',
        // width: 0,
        // height: 0,
        'z-index': 1050,
        'line-height': 3,
        'font-size': '10px'
      }
      const createWrapper = () => {
        const $wrapper = $('<div class="bequem-selector-wrapper">')
        return $wrapper
      }
      const createContainer = () => {
        const $container = $('<div id="' + injectId + '">')
        $container.css(injectCSS)
        $container.text(data.selectedRow.selector)
        return $container
      }

      if (data.selectedRow.inputType !== 'hidden') {
        /*
         * Get parent element
         */
        const $parent = $currentElement.parent()
        $parent.css({position: 'static'})
        /*
         * Get wrapper element
         */
        const $wrapper = createWrapper()
        const $container = createContainer()
        $container.appendTo($wrapper)
        $parent.prepend($wrapper)
        // $wrapper.appendTo($parent)
      }
    } else {
      $(data.selectedRow.selector).toggleClass('bequem-selector-selected')
      $('#' + injectId).remove()
    }
  })
})(jQuery)
