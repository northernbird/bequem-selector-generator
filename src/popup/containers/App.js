import React, { Component } from 'react'
import App from '../components/App'

export default class AppContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      recording: [],
      components: []
    }

    this.onSelectTab = this.onSelectTab.bind(this)
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
    chrome.storage.sync.get(['url', 'components'], ({url, components}) => {
      this.setState({url, components})
    })
  }

  onSelectTab (selectedTab) {
    this.setState({selectedTab})
  }

  onRestart () {
    chrome.browserAction.setIcon({path: './images/icon-black.png'})
    chrome.tabs.executeScript({file: 'inject-remove.js'}, () => {
      chrome.runtime.reload()
      window.close()
    })

    // chrome.tabs.executeScript(null, {file: './lib/jquery-1.10.2.min.js'}, function () {
    //   chrome.tabs.executeScript(null, {file: 'inject-remove.js'})
    // })
  }
}
