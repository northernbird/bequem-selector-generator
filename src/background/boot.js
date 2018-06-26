import Recorder from './recorder'

export default class Boot {
  constructor () {
    this.recorder = new Recorder()
  }

  boot () {
    // Fired when a browser action icon is clicked. This event will not fire if the browser action has a popup.
    chrome.browserAction.onClicked.addListener(() => {
      this.recorder.start()
      chrome.browserAction.setIcon({path: './images/icon-red.png'})
      chrome.browserAction.setPopup({popup: 'index.html'})
      this.recorder.stop()
    })

    /*
     * Force to reload extension if used tab is refreshed
     */
    chrome.tabs.onUpdated.addListener((refreshedTabId) => {
      if (refreshedTabId === this.recorder.tabId) {
        chrome.browserAction.setIcon({path: './images/icon-black.png'})
        chrome.runtime.reload()
      }
    })
  }

}
