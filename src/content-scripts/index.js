import Selector from 'css-selector-generator'
const selector = new Selector()

class HTMLRecorder {
  start () {
    const inputElements = document.querySelectorAll('input, textarea')
        // const clickableElements = document.querySelectorAll('a, button')
    const clickElements = document.querySelectorAll('button')

    for (let i = 0; i < inputElements.length; i++) {
      chrome.runtime.sendMessage({
        selector: selector.getSelector(inputElements[i]),
        value: inputElements[i].value,
        id: (inputElements[i].id === '') ? selector.getSelector(inputElements[i]) : inputElements[i].id,
        name: inputElements[i].name,
        tagName: inputElements[i].tagName,
        inputType: (inputElements[i].tagName === 'INPUT') ? inputElements[i].type : null,
        action: 'component'
      })
    }

    for (let i = 0; i < clickElements.length; i++) {
      chrome.runtime.sendMessage({
        selector: selector.getSelector(clickElements[i]),
        value: clickElements[i].value,
        id: (clickElements[i].id === '') ? selector.getSelector(clickElements[i]) : clickElements[i].id,
        name: clickElements[i].name,
        tagName: clickElements[i].tagName,
        action: 'component'
      })
    }
  }

}

const htmlRecorder = new HTMLRecorder()
htmlRecorder.start()
