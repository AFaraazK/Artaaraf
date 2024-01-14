const canvas = document.getElementById('draw_window');
const ctx = canvas.getContext('2d');
const eraserButton = document.getElementById('eraserButton');
const penButton = document.getElementById('penButton');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let isDrawing = false;
let isErasing = false;
let lineWidth = 5;

function updateCanvasSize() {
    // store the current canvas
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
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

    // position of the mouse relative to the canvas
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // track to mouse position and draw the line
    if (isErasing){
        ctx.clearRect(x - lineWidth / 2, y - lineWidth / 2, lineWidth, lineWidth);
    } else{
        ctx.lineTo(x, y);
        ctx.stroke();
    }
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

// erase button toggle
eraserButton.addEventListener('click', () => {
    if(isErasing){
        isErasing = false;
        eraserButton.style.backgroundColor = '';
        penButton.style.backgroundColor = 'rgb(70, 6, 48)';
    } else if(!isErasing){
        isErasing = true;
        penButton.style.backgroundColor = '';
        eraserButton.style.backgroundColor = 'rgb(70, 6, 48)'; 
    }
});

// erase button toggle
penButton.addEventListener('click', () => {
    if(isErasing){
        isErasing = false;
        penButton.style.backgroundColor = 'rgb(70, 6, 48)';
        eraserButton.style.backgroundColor = 'white'; 
    } else if(!isErasing){
        isErasing = true;
        penButton.style.backgroundColor = 'white';
        eraserButton.style.backgroundColor = 'rgb(70, 6, 48)';  
    }
});