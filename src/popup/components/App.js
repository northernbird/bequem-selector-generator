/* eslint-disable no-trailing-spaces,padded-blocks,react/jsx-indent,indent,keyword-spacing */
import React from 'react'
import { registerLanguage } from 'react-syntax-highlighter/dist/light'
import js from 'react-syntax-highlighter/dist/languages/javascript'
import styles from './App.css'
import BootstrapTable from 'react-bootstrap-table-next'
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter'

registerLanguage('javascript', js)

const App = ({onSelectTab, selectedTab, onRestart, components}) => {

  const selectRowProp = {

    mode: 'checkbox',
    bgColor: 'pink', // you should give a bgcolor, otherwise, you can't regonize which row has been selected
    hideSelectColumn: true, // enable hide selection column.
    clickToSelect: true,  // you should enable clickToSelect, otherwise, you can't select column.
    onSelect: (row, isSelected) => {
      if (isSelected) {

        row.isSelected = true

        chrome.storage.local.set({
          selectedRow: row
        }, function () {
          chrome.tabs.executeScript(null, {file: './lib/jquery-1.10.2.min.js'}, function () {
            chrome.tabs.executeScript(null, {file: 'inject.js'})
          })
        })
      } else {

        row.isSelected = false

        chrome.storage.local.set({
          selectedRow: row
        }, function () {
          chrome.tabs.executeScript(null, {file: './lib/jquery-1.10.2.min.js'}, function () {
            chrome.tabs.executeScript(null, {file: 'inject.js'})
          })
        })
      }
    }

  }

  const selectOptions = {
    'INPUT': 'INPUT',
    'TEXTAREA': 'TEXTAREA'
  }

  const columns = [{
    dataField: 'id',
    text: 'ID/SELECTOR',
    classes: styles['col-id'],
    headerStyle: {backgroundColor: '#49B882', color: 'white'},
    headerClasses: styles['col-id']

  }, {
    dataField: 'name',
    text: 'Name',
    classes: styles['col-name'],
    headerStyle: {backgroundColor: '#49B882', color: 'white'},
    headerClasses: styles['col-name']
  }, {
    dataField: 'value',
    text: 'Value',
    classes: styles['col-value'],
    headerStyle: {backgroundColor: '#49B882', color: 'white'},
    headerClasses: styles['col-value']
  }, {
    dataField: 'tagName',
    text: '',
    classes: styles['col-tagName'],
    headerStyle: {backgroundColor: '#49B882', color: 'white'},
    headerClasses: styles['col-tagName'],
    formatter: cell => selectOptions[cell],
    filter: selectFilter({
      options: selectOptions,
      defaultValue: ''
    })
  }, {
    dataField: 'inputType',
    text: 'InputType',
    classes: styles['col-tagName'],
    headerStyle: {backgroundColor: '#49B882', color: 'white'},
    headerClasses: styles['col-inputType']
  }]

  const loadedDiv = (<div>

    <div className={styles.tableWrapDiv}>
      <BootstrapTable keyField='id' data={components} columns={columns} trClassName={styles.tableDiv}
        selectRow={selectRowProp} filter={filterFactory()} />

    </div>

    <div className={styles.buttonDiv}>
      <button className={styles.button} onClick={onRestart}>Clear</button>
    </div>

  </div>)

  const initDev = (<div>

    Grats init

    <div className={styles.buttonDiv}>
      <button className={styles.button} onClick={onRestart}>Clear</button>
    </div>

  </div>)

  console.log('test : ' + JSON.stringify(components))

  if(components && components.length > 0) {
    console.log('loaded')
    return loadedDiv

  } else {
    console.log('init')
    return initDev
  }

}

export default App
