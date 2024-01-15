const canvas = document.getElementById('draw_window');
const ctx = canvas.getContext('2d');
const eraserButton = document.getElementById('eraserButton');
const penButton = document.getElementById('penButton');
const toolbar = document.getElementById('toolbar');
const clearButton = document.getElementById('clearButton');
const saveButton = document.getElementById('saveButton');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let isDrawing = false;
let isErasing = false;
let lineWidth = 5;

// TODO: replace erase with drawing but set the color to white

function updateCanvasSize() {
    // store the current canvas
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    // resize the canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // redraw the stored image
    ctx.putImageData(imageData, 0, 0);
}
updateCanvasSize();

const draw = (e) => {
    if (!isDrawing && !isErasing) {
        return;
    }
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    // Determine whether the event is a mouse event or a touch event
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);

    // Get the canvas bounding rectangle
    const rect = canvas.getBoundingClientRect();

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // track to mouse position and draw/erase the line
    if (isErasing) {
        ctx.clearRect(x - lineWidth / 2, y - lineWidth / 2, lineWidth, lineWidth);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
};


// event listeners for mouse events
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    ctx.beginPath();
    draw(e);
});
canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    ctx.stroke();
    ctx.beginPath();
});
canvas.addEventListener('mousemove', draw);

// event listeners for touch events
canvas.addEventListener('touchstart', (e) => {
    isDrawing = true;
    ctx.beginPath();
    draw(e);
});
canvas.addEventListener('touchend', () => {
    isDrawing = false;
    ctx.stroke();
    ctx.beginPath();
});
canvas.addEventListener('touchmove', draw);

window.addEventListener('resize', updateCanvasSize);

// eraser button toggle
eraserButton.addEventListener('click', () => {
    isDrawing = false;
    if (isErasing) {
        isErasing = false;
        eraserButton.style.backgroundColor = 'white';
        penButton.style.backgroundColor = 'rgb(70, 6, 48)';
    } else {
        isErasing = true;
        penButton.style.backgroundColor = 'white';
        eraserButton.style.backgroundColor = 'rgb(70, 6, 48)';
    }
});

// pen button toggle
penButton.addEventListener('click', () => {
    isDrawing = false;
    if (isErasing) {
        isErasing = false;
        penButton.style.backgroundColor = 'rgb(70, 6, 48)';
        eraserButton.style.backgroundColor = 'white';
    } else {
        isErasing = true;
        penButton.style.backgroundColor = 'white';
        eraserButton.style.backgroundColor = 'rgb(70, 6, 48)';
    }
});

// color and size toggle
toolbar.addEventListener('change', e => {
    if(e.target.id === 'color') {
        ctx.strokeStyle = e.target.value;
    }

    if(e.target.id === 'lineWidth') {
        lineWidth = e.target.value;
    }
});

// clear
clearButton.addEventListener('click', e => {
    if(confirm('Are you sure you want to CLEAR the canvas?') == true){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    } else{
        return;
    }
});

// save canvas as png
function saveCanvasAsImage() {
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'canvas_image.png';
    link.click();
}
saveButton.addEventListener('click', saveCanvasAsImage);
