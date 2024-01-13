const canvas = document.getElementById('draw_window');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let isDrawing = false;
let lineWidth = 5;

function updateCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
updateCanvasSize();

const draw = (e) => {
    if (!isDrawing) {
        return;
    }
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    // position of the mouse relative to the canvas
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // track to mouse position and draw the line
    ctx.lineTo(x, y);
    ctx.stroke();
};

// start drawing
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;

    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
});

// stop drawing
canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    ctx.stroke();
    ctx.beginPath();
});

// continue drawing
canvas.addEventListener('mousemove', draw);
window.addEventListener('resize', updateCanvasSize);
