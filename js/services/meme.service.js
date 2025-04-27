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
            color: 'black'
        }
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

function setTxtColor(value) {
    const idx = gMeme.selectedLineIdx
    gMeme.lines[idx].color = value
}

function setFontSize(diff) {
    const idx = gMeme.selectedLineIdx
    gMeme.lines[idx].size += diff
}