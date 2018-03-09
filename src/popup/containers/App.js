import React, {Component} from 'react'
import App from '../components/App'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';

export default class AppContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedTab: 'Generate Code',
            recording: []
        }

        this.onSelectTab = this.onSelectTab.bind(this)
        this.onRestart = this.onRestart.bind(this)
    }

    render() {
        return React.createElement(App, {
            ...this.props,
            ...this.state,
            onSelectTab: this.onSelectTab,
            onRestart: this.onRestart
        })
    }

    componentDidMount() {

        chrome.storage.sync.get(['recording', 'components'], ({recording, components}) => {
            this.setState({recording, components})
        })

    }

    onSelectTab(selectedTab) {
        this.setState({selectedTab})
    }

    onRestart() {
        chrome.browserAction.setBadgeText({text: ''})
        chrome.runtime.reload()
        window.close()
    }
}
