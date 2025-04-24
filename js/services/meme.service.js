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
            txt: '',
            size: 16,
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