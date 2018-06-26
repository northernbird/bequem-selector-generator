import Selector from 'css-selector-generator'
const selector = new Selector()

class HTMLRecorder {
  start () {
    const inputElements = document.querySelectorAll('input, textarea')
    // const clickElements = document.querySelectorAll('a, button')
    /*
     * TODO check why parser and sendMessage won't work well with many elements (e.g. including a tag)
     */
    const clickElements = document.querySelectorAll('button')
    let uniqueId = 0
    for (let i = 0; i < inputElements.length; i++) {
      chrome.runtime.sendMessage({
        selector: selector.getSelector(inputElements[i]),
        value: inputElements[i].value,
        id: (inputElements[i].id === '') ? selector.getSelector(inputElements[i]) : inputElements[i].id,
        name: inputElements[i].name,
        tagName: inputElements[i].tagName,
        inputType: (inputElements[i].tagName === 'INPUT') ? inputElements[i].type : null,
        uniqueId: uniqueId
      })
      uniqueId++
    }

    for (let i = 0; i < clickElements.length; i++) {
      chrome.runtime.sendMessage({
        selector: selector.getSelector(clickElements[i]),
        value: clickElements[i].value,
        id: (clickElements[i].id === '') ? selector.getSelector(clickElements[i]) : clickElements[i].id,
        name: clickElements[i].name,
        tagName: clickElements[i].tagName,
        uniqueId: uniqueId
      })
      uniqueId++
    }
  }

}

const htmlRecorder = new HTMLRecorder()
htmlRecorder.start()
