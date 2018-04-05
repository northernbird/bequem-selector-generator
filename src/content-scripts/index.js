import Selector from 'css-selector-generator'

const selector = new Selector()
let currentElement

class EventRecorder {
    start() {
        const typeableElements = document.querySelectorAll('input, textarea')
        const clickableElements = document.querySelectorAll('a, button')

        for (let i = 0; i < typeableElements.length; i++) {
            typeableElements[i].addEventListener('blur', this.handleBlur)
            typeableElements[i].addEventListener("focus", this.handleForcus)
        }

        for (let i = 0; i < clickableElements.length; i++) {
            clickableElements[i].addEventListener('click', this.handleClick)
        }
    }

    handleForcus(e) {
        currentElement = e.target;
    }


    handleBlur(e) {

        if (currentElement) {
            chrome.runtime.sendMessage({
                selector: selector.getSelector(currentElement),
                value: currentElement.value,
                action: 'keydown',
            })
        }

        currentElement = null;

    }

    handleClick(e) {
        if (e.target.href) {
            chrome.runtime.sendMessage({
                action: 'url',
                value: e.target.href
            })
        } else {
            chrome.runtime.sendMessage({
                selector: selector.getSelector(e.target),
                value: e.target.value,
                action: e.type,
            })
        }

    }
}

const eventRecorder = new EventRecorder()
eventRecorder.start()


class HTMLRecorder {
    start() {
        const typeableElements = document.querySelectorAll('input, textarea')
        // const clickableElements = document.querySelectorAll('a, button')
        const clickableElements = document.querySelectorAll('button')

        for (let i = 0; i < typeableElements.length; i++) {

            chrome.runtime.sendMessage({
                selector: selector.getSelector(typeableElements[i]),
                value: typeableElements[i].value,
                id: typeableElements[i].id,
                name: typeableElements[i].name,
                tagName: typeableElements[i].tagName,
                action: 'component'
            })

        }

        for (let i = 0; i < clickableElements.length; i++) {

            chrome.runtime.sendMessage({
                selector: selector.getSelector(clickableElements[i]),
                value: clickableElements[i].value,
                id: clickableElements[i].id,
                name: clickableElements[i].name,
                tagName: clickableElements[i].tagName,
                action: 'component'
            })

        }
    }

}

const htmlRecorder = new HTMLRecorder()
htmlRecorder.start()
