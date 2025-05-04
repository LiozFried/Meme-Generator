'use strict'

function onInit() {
    hideElement('.main-editor')
    renderGallery()
}

function renderGallery() {
    const elGallery = document.querySelector('.gallery')
    const srtHtml = gImgs.map(img => (
        `<img src="${img.url}" id="${img.id}" onclick="onImgSelect(this)"></img>`
    ))
    elGallery.innerHTML = srtHtml.join('')
}

function onImgSelect(elImg) {
    setImg(+elImg.id)
    hideElement('.main-gallery')
    showElement('.main-editor')
    defineCanvas()
    // onResize()
    renderMeme()
}