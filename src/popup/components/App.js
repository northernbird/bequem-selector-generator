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
        script = getPuppeteer(recording)

        var products = [{
            id: 1,
            name: "Product1",
            price: 120
        }, {
            id: 2,
            name: "Product2",
            price: 80
        }];

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

                <BootstrapTable data={products} striped hover>
                    <TableHeaderColumn isKey dataField='id'>Product ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
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

function getPuppeteer(recording) {
    return `const puppeteer = require('puppeteer')

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
${recording.reduce((records, record, i) => {
        const {action, url, selector, value} = record
        let result = records
        if (i !== records.length) result += '\n'

        switch (action) {
            case 'keydown':
                result += `  await page.type('${selector}', '${value}')`
                break
            case 'click':
                result += `  await page.click('${selector}')`
                break
            case 'goto':
                result += `  await page.goto('${url}')`
                break
            case 'reload':
                result += `  await page.reload()`
                break
        }

        return result
    }, '')}
  await browser.close()
})()`
}

export default App
