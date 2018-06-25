export default class Recorder {
  constructor () {
    this.url = null
    this.components = []
    this.tabId = null
  }

  start () {
    chrome.tabs.executeScript({file: 'content-script.js'}, () => {
      chrome.tabs.insertCSS(null, {file: 'inject.css'}, () => {
        chrome.tabs.executeScript(null, {file: './lib/jquery-1.10.2.min.js'})
      })
    })

    const save = (url, tabId) => {
      this.url = url
      this.tabId = tabId
    }

    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      save(tabs[0].url, tabs[0].id)
    })

    chrome.runtime.onMessage.addListener(this.handleMessage.bind(this))
  }

  stop () {
    chrome.webNavigation.onCommitted.removeListener()
    chrome.runtime.onMessage.removeListener()
    chrome.tabs.onUpdated.removeListener()
  }

  handleMessage (message) {
    this.components.push(message)
  }
}
