'use strict'

var gElCanvas
var gCtx

function defineCanvas() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
}

function onResize() {
    const elContainer = document.querySelector('.canvas-container')
    if (!gElCanvas) return
    gElCanvas.width = elContainer.clientWidth
    renderMeme()
}

function renderMeme() {
    const meme = getMeme()
    // var txtLine = meme.lines[meme.selectedLineIdx]
    var txtLines = meme.lines
    const imgUrl = getImgUrlById(meme.selectedImgId)

    const img = new Image()
    img.src = imgUrl
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        // drawText(txtLine.txt, txtLine.font, txtLine.size, txtLine.color, 100, 40)
        txtLines.forEach(txtLine => {
            drawText(txtLine.txt, txtLine.font, txtLine.size, txtLine.color, txtLine.pos.x, txtLine.pos.y)
        })
        renderFrameSelectedTxt()
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
    renderFrameSelectedTxt()
    renderMeme()
}

function onDeleteLine() {
    deleteLine()
    renderMeme()
}

function renderFrameSelectedTxt() {
    const meme = getMeme()
    const txtLineIdx = meme.selectedLineIdx
    const size = meme.lines[txtLineIdx].size

    gCtx.font = `${size}px ${meme.lines[txtLineIdx].font}`
    const metrics = gCtx.measureText(meme.lines[txtLineIdx].txt)
    const pos = meme.lines[txtLineIdx].pos
    let fontHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent
    // meme.lines[txtLineIdx].topLeft = {x :pos.x - 5, y: pos.y - fontHeight + 3}
    // meme.lines[txtLineIdx].bottomRight = {x :pos.x - 5 + metrics.width, y: pos.y + 3}
    gCtx.strokeRect(pos.x - 5, pos.y - fontHeight + 3, metrics.width + 10, fontHeight)
}

function onChangeTxtColor(value) {
    setTxtColor(value)
    renderMeme()
}

function onFontSize(diff) {
    setFontSize(diff)
    renderMeme()
}

function onSelectFont(value) {
    selectFont(value)
    renderMeme()
}

function onAlignment(dir) {
    alignment(dir)
    renderMeme()
}

function onVerticalMove(diff) {
    verticalMove(diff)
    renderMeme()
}

function onDownloadCanvas(elLink) {
    const dataUrl = gElCanvas.toDataURL()

    elLink.href = dataUrl
    elLink.download = 'my-meme'
}

function onShareImgOnFacebook(ev) {
    ev.preventDefault()
    const dataUrl = gElCanvas.toDataURL('image/jpeg')

    function onSucces(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
    }
    uploadImg(dataUrl, onSucces)
}

function onTxt(ev) {
    const pos = getEvPos(ev)
    console.log(pos)
    txtClicked(pos)
    renderMeme()
}

function getEvPos(ev) {
    const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changeTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}