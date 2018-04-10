import React from 'react'
import {Tablist, Tab} from 'evergreen-ui'
import SyntaxHighlighter, {registerLanguage} from 'react-syntax-highlighter/dist/light'
import js from 'react-syntax-highlighter/dist/languages/javascript'
import syntaxStyle from './syntaxStyle'
import styles from './App.css'
/*
 * TODO Need to check why importing css doesn't work here.
 */
//import 'bootstrap/dist/css/bootstrap.min.css';
//import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import BootstrapTable from 'react-bootstrap-table-next';

registerLanguage('javascript', js)

const tabs = ['Generate Code', 'Generate Test Case']

const App = ({onSelectTab, selectedTab, onRestart, recording, components}) => {

    let contentByType = null;

    if (selectedTab === 'Generate Code') {

        const script = getScript(recording)

        contentByType = (
            <SyntaxHighlighter language='javascript' style={syntaxStyle} textAlign='center'>
                {script}
            </SyntaxHighlighter>
        )

    } else if (selectedTab === 'Generate Test Case') {

        const selectRowProp = {
            mode: 'checkbox',
            bgColor: 'pink', // you should give a bgcolor, otherwise, you can't regonize which row has been selected
            hideSelectColumn: true, // enable hide selection column.
            clickToSelect: true,  // you should enable clickToSelect, otherwise, you can't select column.
            onSelect: (row, isSelected, e) => {

                if (isSelected) {

                    console.log("TEST : " + JSON.stringify(row));

/*                    chrome.tabs.executeScript(null, { file: './lib/jquery-1.10.2.min.js' }, function() {
                        chrome.tabs.executeScript(null, { file: 'inject.js' });
                    });*/

                    chrome.storage.local.set({
                        selectedRow: row
                    }, function () {
                        chrome.tabs.executeScript(null, { file: './lib/jquery-1.10.2.min.js' }, function() {
                            chrome.tabs.executeScript(null, { file: 'inject.js' });
                        })
                    });

                }

            },
        };


        const columns = [{
            dataField: 'id',
            text: 'ID/SELECTOR',
            classes: styles["col-id"],
            headerStyle: {backgroundColor: '#49B882', color: 'white'},
            headerClasses: styles["col-id"],

        }, {
            dataField: 'name',
            text: 'Name',
            classes: styles["col-name"],
            headerStyle: {backgroundColor: '#49B882', color: 'white'},
            headerClasses: styles["col-name"],
        }, {
            dataField: 'value',
            text: 'Value',
            classes: styles["col-value"],
            headerStyle: {backgroundColor: '#49B882', color: 'white'},
            headerClasses: styles["col-value"],
        }, {
            dataField: 'tagName',
            text: 'TagName',
            classes: styles["col-tagName"],
            headerStyle: {backgroundColor: '#49B882', color: 'white'},
            headerClasses: styles["col-tagName"],
        }, {
            dataField: 'inputType',
            text: 'InputType',
            classes: styles["col-tagName"],
            headerStyle: {backgroundColor: '#49B882', color: 'white'},
            headerClasses: styles["col-inputType"],
        }];

        contentByType = (
            <div className={styles.tableWrapDiv}>
                <BootstrapTable keyField='id' data={components} columns={columns} trClassName={styles.tableDiv}
                                selectRow={selectRowProp}/>
            </div>

        )

    }


    return (<div>

        <Tablist marginX={-4} marginBottom={16} textAlign='center' className={styles.tabClass}>
            {tabs.map((tab, index) => (
                <Tab
                    key={tab}
                    id={tab}
                    isSelected={tab === selectedTab}
                    onSelect={() => onSelectTab(tab)}
                    aria-controls={`panel-${tab}`}
                    backgroundColor='#49B882'
                    className={tab === selectedTab ? styles.menuTab : styles.defaultMenuTab}
                >
                    {tab}
                </Tab>
            ))}
        </Tablist>

        {contentByType}

        <div className={styles.buttonDiv}>
            <button className={styles.button} onClick={onRestart}>Clear</button>
        </div>

    </div>)

}

function getScript(recording) {
    return `const Chromy = require('chromy')
let chromy = new Chromy({visible:true})

chromy.chain()
${recording.reduce((records, record, i) => {
        const {action, url, selector, value} = record
        let result = records
        if (i !== records.length) result += '\n'

        switch (action) {
            case 'keydown':
                result += `.type('${selector}', '${value}')`
                break
            case 'click':
                result += `.click('${selector}')`
                break
            case 'goto':
                result += `.goto('${url}')`
                break
            case 'reload':
                result += `.refresh()`
                break
        }

        return result
    }, '')}
.evaluate(() => {
    return document.querySelectorAll('*').length
})
.result((r) => console.log(r))
.end()
.then(() => chromy.close())`
}

export default App
