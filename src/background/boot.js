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
        chrome.storage.sync.set({tabId: this.recorder.tabId, url: this.recorder.url, components: this.recorder.components})
        chrome.browserAction.setIcon({path: './images/icon-red.png'})
        chrome.browserAction.setPopup({popup: 'index.html'})
      } else {
        this.recorder.start()
        chrome.browserAction.setIcon({path: './images/icon-green.png'})
      }
      this.isRunning = !this.isRunning
    })

    chrome.runtime.onConnect.addListener(function (port) {
      // chrome.storage.sync.get(['tabId', 'url', 'components'], ({tabId, url, components, selectRowIds}) => {
      //   console.log('TEST : ' + JSON.stringify(selectRowIds))
      //   console.log('TEST1 : ' + JSON.stringify(components))
      // })

      // chrome.storage.local.get('selectRowIds', function (data) {
      //   console.log('AAA' + JSON.stringify(data))
      // })

      if (port.name === 'P1') {
        port.onDisconnect.addListener(function () {
          /* Clean up happens here */
          console.log('HIHIHIHIHI')
        })
      }
    })
  }

}
