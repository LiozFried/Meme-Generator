'use strict'

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['trump', 'irreverent'] },
    { id: 2, url: 'img/2.jpg', keywords: ['dog', 'kiss'] },
]

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Good Meme',
            font: 'Arial',
            size: 40,
            color: 'black',
            pos: { x: 10, y: 50}
        },
        {
            txt: 'Second Line',
            font: 'Arial',
            size: 20,
            color: 'black',
            pos: { x: 10, y: 100}
        },
    ]
}

function getMeme() {
    return gMeme
}

function getImgUrlById(id) {
    const img = gImgs.find(img => img.id === id)
    return img.url
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function setLineTxt(value) {
    const idx = gMeme.selectedLineIdx
    gMeme.lines[idx].txt = value
}

function addLine() {
   var newLine = {
        txt: 'New Line',
        font: 'Arial',
        size: 20,
        color: 'black',
        pos: { x: 10, y: 50 * (gMeme.lines.length + 1)}
    }
    gMeme.lines.push(newLine)
}

function switchLine() {
    gMeme.selectedLineIdx ++
    if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0
}

function setTxtColor(value) {
    const idx = gMeme.selectedLineIdx
    gMeme.lines[idx].color = value
}

function setFontSize(diff) {
    const idx = gMeme.selectedLineIdx
    gMeme.lines[idx].size += diff
}