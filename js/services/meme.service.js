'use strict'

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['trump', 'irreverent'] },
    { id: 2, url: 'img/2.jpg', keywords: ['dog', 'kiss'] },
    { id: 3, url: 'img/3.jpg', keywords: ['dog', 'sleep', 'baby'] },
    { id: 4, url: 'img/4.jpg', keywords: ['cat', 'sleep'] },
    { id: 5, url: 'img/5.jpg', keywords: ['win', 'baby', 'trick'] },
    { id: 6, url: 'img/6.jpg', keywords: ['explain', 'irreverent'] },
    { id: 7, url: 'img/7.jpg', keywords: ['baby', 'surprised'] },
    { id: 8, url: 'img/8.jpg', keywords: ['charm', 'irreverent'] },
    { id: 9, url: 'img/9.jpg', keywords: ['baby', 'trick', 'laugh'] },
    { id: 10, url: 'img/10.jpg', keywords: ['obama', 'laugh', 'trick'] },
    { id: 11, url: 'img/11.jpg', keywords: ['kiss', 'wrestling'] },
    { id: 12, url: 'img/12.jpg', keywords: ['justice', 'win'] },
    { id: 13, url: 'img/13.jpg', keywords: ['win', 'irreverent', 'cheers'] },
    { id: 14, url: 'img/14.jpg', keywords: ['win', 'trick', 'shock'] },
    { id: 15, url: 'img/15.jpg', keywords: ['exactly', 'explain'] },
    { id: 16, url: 'img/16.jpg', keywords: ['laugh', 'trick'] },
    { id: 17, url: 'img/17.jpg', keywords: ['putin', 'irreverent', 'win'] },
    { id: 18, url: 'img/18.jpg', keywords: ['exactly', 'explain', 'charm'] },
]

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Good Meme',
            font: 'Arial',
            size: 40,
            color: '#000000',
            pos: { x: 10, y: 50 },
            lineIdx: 0,
        },
        {
            txt: 'Second Line',
            font: 'Arial',
            size: 20,
            color: '#000000',
            pos: { x: 10, y: 100 },
            lineIdx: 1,
        },
    ]
}

var gLinesCount = gMeme.lines.length - 1

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
        color: '#000000',
        pos: { x: 10, y: 50 * (gMeme.lines.length + 1) },
        lineIdx: gLinesCount + 1,
    }
    gMeme.lines.push(newLine)
    countLines()
}

function countLines() {
    gLinesCount = gMeme.lines.length - 1
}

function clearCanvas() {
    gCtx.clearRect(0, 0, 20, 20)
}

function checkLines() {
    if (!gMeme.lines.length) {
        addLine()
        updateLinesIdx()
        gMeme.selectedLineIdx = 0
        changeInputs()
    } else {
        return
    }
}

function switchLine() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0
}

function deleteLine() {
    var idx = gMeme.selectedLineIdx
    gMeme.lines.splice(idx, 1)
    updateLinesIdx()
    gMeme.selectedLineIdx = 0
    changeInputs()
    countLines()
}

function updateLinesIdx() {
    gMeme.lines.forEach((line, newLineIdx) => {
        line.lineIdx = newLineIdx
    })
}

function setTxtColor(value) {
    const idx = gMeme.selectedLineIdx
    gMeme.lines[idx].color = value
}

function setFontSize(diff) {
    const idx = gMeme.selectedLineIdx
    gMeme.lines[idx].size += diff
}

function selectFont(value) {
    const idx = gMeme.selectedLineIdx
    gMeme.lines[idx].font = value
}

function alignment(dir) {
    const idx = gMeme.selectedLineIdx
    const txtWidth = measureTextWidth(gMeme.lines[idx].txt, gMeme.lines[idx].font, gMeme.lines[idx].size)
    var posX

    switch (dir) {
        case 'left':
            posX = 10
            gMeme.lines[idx].pos.x = posX
            break
        case 'center':
            posX = ((gElCanvas.width / 2) - (txtWidth.width / 2))
            gMeme.lines[idx].pos.x = posX
            break
        case 'right':
            posX = (gElCanvas.width - txtWidth.width - 10)
            gMeme.lines[idx].pos.x = posX
            break
    }
}

function verticalMove(diff) {
    const idx = gMeme.selectedLineIdx
    gMeme.lines[idx].pos.y += diff
}

function txtClicked(clickedPos) {
    const lines = gMeme.lines
    lines.forEach(line => {
        let end = measureTextWidth(line.txt, line.font, line.size)

        if ((clickedPos.x >= (line.pos.x - 5) && clickedPos.x <= (line.pos.x + end.width + 10)) && (clickedPos.y >= (line.pos.y - end.height + 3) && clickedPos.y <= (line.pos.y + end.height))) {
            gMeme.selectedLineIdx = line.lineIdx
        } else {
            return
        }
    })
}

function measureTextWidth(txt, font, fontSize) {
    gCtx.font = `${fontSize}px ${font}`
    const metrics = gCtx.measureText(txt)
    let fontHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent

    return { width: metrics.width, height: fontHeight }
}

async function uploadImg(imgData, onSuccess) {
    const CLOUD_NAME = 'webify'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const formData = new FormData()
    formData.append('file', imgData)
    formData.append('upload_preset', 'webify')
    try {
        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
        const data = await res.json()
        console.log('Cloudinary response:', data)
        onSuccess(data.secure_url)

    } catch (err) {
        console.log(err)
    }
}