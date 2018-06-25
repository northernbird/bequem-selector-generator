export default class Recorder {
  constructor () {
    this.url = null
    this.components = []
  }

  start () {
    chrome.webNavigation.onCompleted.addListener(this.handleCompletedNavigation.bind(this))
    chrome.runtime.onMessage.addListener(this.handleMessage.bind(this))
  }

  stop () {
    chrome.webNavigation.onCommitted.removeListener()
    chrome.runtime.onMessage.removeListener()
    chrome.tabs.onUpdated.removeListener()
  }

  handleCompletedNavigation ({url, frameId}) {
    /*
     * Execute against the current active tab!
     */
    if (frameId === 0) {
      chrome.tabs.executeScript({file: 'content-script.js'}, () => {
        /*
       * TODO Make sure it's correct usage
       */
        chrome.tabs.insertCSS(null, {file: 'inject.css'}, () => {
          chrome.tabs.executeScript(null, {file: './lib/jquery-1.10.2.min.js'})
        })
      })

      this.url = url
    }
  }

  handleMessage (message) {
    this.components.push(message)
  }
}
