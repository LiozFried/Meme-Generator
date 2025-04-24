'use strict'

function onImgSelect(elImg) {
    setImg(+elImg.id)
    defineCanvas()
    renderMeme()
}