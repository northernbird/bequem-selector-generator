import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import App from './containers/App'
import './base.css'
import styles from './components/App.css'

render(<App className={styles.test}/>, document.getElementById('root'))
