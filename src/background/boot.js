import Recorder from './recorder'

export default class Boot {
  constructor () {
    this.isRunning = false
    this.recorder = new Recorder()
  }

  boot () {
    // Fired when a browser action icon is clicked. This event will not fire if the browser action has a popup.
    chrome.browserAction.onClicked.addListener(() => {
      if (this.isRunning) {
        this.recorder.stop()
        chrome.storage.sync.set({
          tabId: this.recorder.tabId,
          url: this.recorder.url,
          components: this.recorder.components
        })
        chrome.browserAction.setIcon({path: './images/icon-red.png'})
        chrome.browserAction.setPopup({popup: 'index.html'})
      } else {
        this.recorder.start()
        chrome.browserAction.setIcon({path: './images/icon-green.png'})
      }
      this.isRunning = !this.isRunning
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
