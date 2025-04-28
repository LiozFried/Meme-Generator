'use strict'

var gElCanvas
var gCtx

function defineCanvas() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
}

function renderMeme() {
    const meme = getMeme()
    // var txtLine = meme.lines[meme.selectedLineIdx]
    var txtLines = meme.lines
    const imgUrl = getImgUrlById(meme.selectedImgId)

    const img = new Image()
    img.src = imgUrl
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        // drawText(txtLine.txt, txtLine.font, txtLine.size, txtLine.color, 100, 40)
        txtLines.forEach(txtLine => {
            drawText(txtLine.txt, txtLine.font, txtLine.size, txtLine.color, txtLine.pos.x, txtLine.pos.y)
        })
        // renderFrameSelectedTxt()
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

function onAddLine() {
    addLine()
    renderMeme()
}

function onSwitchLine() {
    switchLine()
    // renderFrameSelectedTxt()
}

// function renderFrameSelectedTxt() {
//     const meme = getMeme()
//     const txtLineIdx = meme.selectedLineIdx
//     const height = meme.lines[txtLineIdx].size
//     const width = gCtx.measureText(meme.lines[txtLineIdx].txt)
//     const pos = meme.lines[txtLineIdx].pos

//     console.log(pos.x, pos.y, width.width, height)

//     gCtx.strokeRect(pos.x, pos.y, width.width, height)
// }

function onChangeTxtColor(value) {
    setTxtColor(value)
    renderMeme()
}

function onFontSize(diff) {
    setFontSize(diff)
    renderMeme()
}

function onDownloadCanvas(elLink) {
    const dataUrl = gElCanvas.toDataURL()

    elLink.href = dataUrl
    elLink.download = 'my-meme'
}

// function measureTextWidth(txt, font, fontSize) {
//     gCtx.font = `${fontSize}px ${font}`
//     gCtx.measureText()
// }