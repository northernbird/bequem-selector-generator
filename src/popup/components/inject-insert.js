(function ($) {
    /*
     * Make light focus to the selected row
     */
  chrome.storage.local.get('selectedRow', function (data) {
    if (data.selectedRow.isSelected) {
      $(data.selectedRow.selector).toggleClass('bequem-selector-selected')
    } else {
      $(data.selectedRow.selector).toggleClass('bequem-selector-selected')
    }
  })
})(jQuery)
