'use strict'

function onInit() {
    hideElement('.main-editor')
    renderGallery()
}

function renderGallery() {
    const elGallery = document.querySelector('.gallery')
    const srtHtml = gImgs.map(img => (
        `<img src="${img.url}" id="${img.id}" onclick="onImgSelect(this.id)"></img>`
    ))
    elGallery.innerHTML = srtHtml.join('')
}

function onImgSelect(elImgId) {
    setImg(+elImgId)
    hideElement('.main-gallery')
    showElement('.main-editor')
    defineCanvas()
    // onResize()
    renderMeme()
}

function onRandomImg() {
    const randImgIdx = getRandomInt(1, gImgs.length + 1)
    onImgSelect(randImgIdx)
}