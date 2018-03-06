export default class Recorder {
    constructor() {
        this.recording = []
        this.components = []
        this.lastUrl
    }

    start() {
        chrome.webNavigation.onCompleted.addListener(this.handleCompletedNavigation.bind(this))
        chrome.webNavigation.onCommitted.addListener(this.handleCommittedNavigation.bind(this))
        chrome.runtime.onMessage.addListener(this.handleMessage.bind(this))
    }

    stop() {
        chrome.webNavigation.onCommitted.removeListener()
        chrome.runtime.onMessage.removeListener()
        chrome.tabs.onUpdated.removeListener()
    }

    handleCompletedNavigation({url, frameId}) {
        if (frameId === 0) {
            chrome.tabs.executeScript({file: 'content-script.js'})
        }
    }

    handleCommittedNavigation({transitionQualifiers, url}) {
        if (transitionQualifiers.includes('from_address_bar') || url === this.lastUrl) {
            this.handleMessage({action: 'goto', url})
        }
    }

    handleMessage(message) {

        console.log("AAABBBCCC : ");
        console.log("message : " + JSON.stringify(message));

        if (message.action === 'url') {
            this.lastUrl = message.value
        } else if (message.action === 'component') {
            this.components.push(message)
        } else {
            this.recording.push(message)
        }
    }
}
