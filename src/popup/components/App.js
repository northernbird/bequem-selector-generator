import React from 'react'
import {Tablist, Tab} from 'evergreen-ui'
import SyntaxHighlighter, {registerLanguage} from 'react-syntax-highlighter/dist/light'
import js from 'react-syntax-highlighter/dist/languages/javascript'
import syntaxStyle from './syntaxStyle'
import styles from './App.css'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

registerLanguage('javascript', js)

const tabs = ['Generate Code', 'Generate Test Case']

const App = ({onSelectTab, selectedTab, onRestart, recording}) => {
    let script = ''
    if (selectedTab === 'Generate Code') {
        script = getScript(recording)

        return (
            <div>
                <Tablist marginX={-4} marginBottom={16} textAlign='center'>
                    {tabs.map((tab, index) => (
                        <Tab
                            key={tab}
                            id={tab}
                            isSelected={tab === selectedTab}
                            onSelect={() => onSelectTab(tab)}
                            aria-controls={`panel-${tab}`}
                        >
                            {tab}
                        </Tab>
                    ))}
                </Tablist>

                <SyntaxHighlighter language='javascript' style={syntaxStyle}>
                    {script}
                </SyntaxHighlighter>

                <button className={styles.button} onClick={onRestart}>Restart</button>
            </div>
        )

    } else if (selectedTab === 'Generate Test Case') {

        return (
            <div>
                <Tablist marginX={-4} marginBottom={16} textAlign='center'>
                    {tabs.map((tab, index) => (
                        <Tab
                            key={tab}
                            id={tab}
                            isSelected={tab === selectedTab}
                            onSelect={() => onSelectTab(tab)}
                            aria-controls={`panel-${tab}`}
                        >
                            {tab}
                        </Tab>
                    ))}
                </Tablist>

                <BootstrapTable data={recording} striped hover>
                    <TableHeaderColumn isKey dataField='action'>Action</TableHeaderColumn>
                    <TableHeaderColumn dataField='url'>URL</TableHeaderColumn>
                    <TableHeaderColumn dataField='selector'>Selector</TableHeaderColumn>
                </BootstrapTable>

                <button className={styles.button} onClick={onRestart}>Restart</button>

            </div>
        )
    }

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
