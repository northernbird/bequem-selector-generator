/* eslint-disable no-trailing-spaces,padded-blocks,react/jsx-indent,indent,keyword-spacing */
import React from 'react'
import { registerLanguage } from 'react-syntax-highlighter/dist/light'
import js from 'react-syntax-highlighter/dist/languages/javascript'
import styles from './App.css'
import BootstrapTable from 'react-bootstrap-table-next'
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter'

registerLanguage('javascript', js)

const App = ({onRestart, tabId, url, components, selectRowIds}) => {

  const updateSelectedRowIds = (isSelected, row, selectRowIds) => {

    if(!selectRowIds) {
      selectRowIds = []
    }

    if(isSelected) {
      selectRowIds.push(row.id)
    } else {
      const index = selectRowIds.indexOf(row.id)
      if (index > -1) {
        selectRowIds.splice(index, 1)
      }
    }

    return selectRowIds

  }

  const selectRowProp = {

    mode: 'checkbox',
    bgColor: 'pink', // you should give a bgcolor, otherwise, you can't regonize which row has been selected
    hideSelectColumn: true, // enable hide selection column.
    clickToSelect: true,  // you should enable clickToSelect, otherwise, you can't select column.
    onSelect: (row, isSelected, rowIndex, e) => {

      chrome.storage.sync.set({
        selectRowIds: updateSelectedRowIds(isSelected, row, selectRowIds)
      })

      row.isSelected = isSelected

      chrome.storage.local.set({
        selectedRow: row
      }, () => {
        chrome.tabs.executeScript(tabId, {file: 'inject-insert.js'})
      })

    }

  }

  if(selectRowIds) {
    selectRowProp.selected = selectRowIds// should be a row keys array
  }

  const tagNameSelectOptions = {
    'INPUT': 'INPUT',
    'TEXTAREA': 'TEXTAREA'
  }

  const inputTypeSelectOptions = {
    'text': 'text',
    'radio': 'radio',
    'submit': 'submit',
    'hidden': 'hidden',
    'checkbox': 'checkbox'
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
    formatter: cell => tagNameSelectOptions[cell],
    filter: selectFilter({
      options: tagNameSelectOptions,
      defaultValue: ''
    })
  }, {
    dataField: 'inputType',
    text: '',
    classes: styles['col-tagName'],
    headerStyle: {backgroundColor: '#49B882', color: 'white'},
    headerClasses: styles['col-inputType'],
    formatter: cell => inputTypeSelectOptions[cell],
    filter: selectFilter({
      options: inputTypeSelectOptions,
      defaultValue: ''
    })
  }]

  if (components && components.length > 0) {
    return (<div>

      <div className={styles.urlDiv}>
        URL : {url}
      </div>

      <div className={styles.tableWrapDiv}>
        <BootstrapTable keyField='id' data={components} columns={columns} trClassName={styles.tableDiv}
          selectRow={selectRowProp} filter={filterFactory()} />

      </div>

      <div className={styles.buttonDiv}>
        <button className={styles.button} onClick={onRestart}>Clear</button>
      </div>

    </div>)

  } else {
    return (<div>

      Grats init

      <div className={styles.buttonDiv}>
        <button className={styles.button} onClick={onRestart}>Clear</button>
      </div>

    </div>)
  }

}

export default App
