'use strict'

var gElCanvas
var gCtx

function defineCanvas() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
}

function renderMeme() {
    const meme = getMeme()
    var txtLine = meme.lines[meme.selectedLineIdx]
    const imgUrl = getImgUrlById(meme.selectedImgId)

    const img = new Image()
    img.src = imgUrl
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(txtLine.txt, txtLine.font, txtLine.size, txtLine.color, 100, 40)
    }
}

function drawText(txt, font, fontSize, color, x, y) {
    gCtx.fillStyle = color
    gCtx.font = `${fontSize}px ${font}`

    gCtx.fillText(txt, x, y)
}

function onMemeText(value) {
    setLineTxt(value)
    renderMeme()
}

function onDownloadCanvas(elLink) {
    const dataUrl = gElCanvas.toDataURL()

    elLink.href = dataUrl
    elLink.download = 'my-meme'
}