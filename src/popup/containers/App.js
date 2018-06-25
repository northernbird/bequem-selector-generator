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
    chrome.runtime.reload()
    window.close()
  }
}
