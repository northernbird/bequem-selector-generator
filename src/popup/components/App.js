/* eslint-disable no-trailing-spaces,padded-blocks,react/jsx-indent,indent */
import React from 'react'
import {registerLanguage} from 'react-syntax-highlighter/dist/light'
import js from 'react-syntax-highlighter/dist/languages/javascript'
import styles from './App.css'
import BootstrapTable from 'react-bootstrap-table-next'

registerLanguage('javascript', js)

const tabs = ['Generate Code', 'Generate Test Case']

const App = ({onSelectTab, selectedTab, onRestart, recording, components}) => {

    const selectRowProp = {

        mode: 'checkbox',
        bgColor: 'pink', // you should give a bgcolor, otherwise, you can't regonize which row has been selected
        hideSelectColumn: true, // enable hide selection column.
        clickToSelect: true,  // you should enable clickToSelect, otherwise, you can't select column.
        onSelect: (row, isSelected, e) => {
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
        text: 'TagName',
        classes: styles['col-tagName'],
        headerStyle: {backgroundColor: '#49B882', color: 'white'},
        headerClasses: styles['col-tagName']
    }, {
        dataField: 'inputType',
        text: 'InputType',
        classes: styles['col-tagName'],
        headerStyle: {backgroundColor: '#49B882', color: 'white'},
        headerClasses: styles['col-inputType']
    }]

    return (<div>

        <div className={styles.tableWrapDiv}>
            <BootstrapTable keyField='id' data={components} columns={columns} trClassName={styles.tableDiv} selectRow={selectRowProp} />

        </div>

        <div className={styles.buttonDiv}>
            <button className={styles.button} onClick={onRestart}>Clear</button>
        </div>

    </div>)
}

export default App
