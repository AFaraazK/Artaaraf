const canvas = document.getElementById('draw_window')
const toolbar = document.getElementById('toolbar');
const context = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;
canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isDrawing = false;
let lineWidth = 5;
let startX;
let startY;

canvas.addEventListener('mousedown', e => {
    alert();
})

