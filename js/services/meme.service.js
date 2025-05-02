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
            pos: { x: 10, y: 50 },
            lineIdx: 0,
        },
        {
            txt: 'Second Line',
            font: 'Arial',
            size: 20,
            color: 'black',
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
        color: 'black',
        pos: { x: 10, y: 50 * (gMeme.lines.length + 1) },
        lineIdx: gLinesCount + 1,
    }
    gMeme.lines.push(newLine)
    countLines()
}

function countLines() {
    gLinesCount = gMeme.lines.length - 1
}

function switchLine() {
    gMeme.selectedLineIdx++
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

function txtClicked(clickedPos) {
    const lines = gMeme.lines
    lines.forEach(line => {
        let end = measureTextWidth(line.txt, line.font, line.size)
        // console.log(end)
        // console.log(clickedPos)
        // console.log(line)
        //console.log(((clickedPos.x >= line.pos.x && clickedPos.x <= line.pos.x + end.width) && (clickedPos.y >= line.pos.y && clickedPos.y <=  line.pos.y + end.hight)));

        if ((clickedPos.x >= (line.pos.x - 5) && clickedPos.x <= (line.pos.x + end.width + 10)) && (clickedPos.y >= (line.pos.y - end.hight + 3) && clickedPos.y <= (line.pos.y + end.hight))) {
            gMeme.selectedLineIdx = line.lineIdx
        } else {
            console.log(`line: ${line.lineIdx} not clicked`)
        }
    })
}

function measureTextWidth(txt, font, fontSize) {
    gCtx.font = `${fontSize}px ${font}`
    const metrics = gCtx.measureText(txt)
    let fontHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent

    return { width: metrics.width, hight: fontHeight }
}