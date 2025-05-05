'use strict'
function onLogo() {
    clearCanvas()
    hideElement('.main-editor')
    showElement('.main-gallery')
}

function hideElement(selector) {
    const el = document.querySelector(selector)
    el.classList.add('hide')
}

function showElement(selector) {
    const el = document.querySelector(selector)
    el.classList.remove('hide')
}