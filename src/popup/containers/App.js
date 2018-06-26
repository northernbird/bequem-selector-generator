import React, { Component } from 'react'
import App from '../components/App'

export default class AppContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      components: [],
      url: null
    }

    this.onRestart = this.onRestart.bind(this)
  }

  render () {
    return React.createElement(App, {
      ...this.props,
      ...this.state,
      onRestart: this.onRestart
    })
  }

// eslint-disable-next-line padded-blocks
  componentDidMount () {
    console.log('componentDidMount')
    // popup code
    chrome.runtime.connect({name: 'P1'})

    chrome.storage.sync.get(['tabId', 'url', 'components', 'selectRowIds'], ({tabId, url, components, selectRowIds}) => {
      this.setState({tabId, url, components, selectRowIds})
    })
  }

  onRestart () {
    chrome.browserAction.setIcon({path: './images/icon-black.png'})
    const code = 'confirm(\'All saved contents will be aborted!\'); window.location.reload();'
    /*
     * TODO : make sure why executeScript with file doesn't work correctly!
     */
    chrome.tabs.executeScript({code: code})
    chrome.runtime.reload()

    window.close()
  }

}
