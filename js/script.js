// container -> grid
const sizeSlider = document.querySelector('.size-slider');
const opacitySlider = document.querySelector('.opacity-slider');
const colorPicker = document.querySelector('#color-picker');
const normalMode = document.querySelector('#normal-mode');
const rainbowMode = document.querySelector('#rainbow-mode');
const eraseMode = document.querySelector('#erase-mode');
const solidRadio = document.querySelector('#solid-color');
const shaderRadio = document.querySelector('#shader-color');
const clearButton = document.querySelector('.clear-btn');
const gridLineBox = document.querySelector('#grid-line-toggle');

function clamp(value, min, max){
    return Math.min(Math.max(value, min), max);
}

function valuesToRGBA (values){
    return `rgba(${values.red}, ${values.green}, 
        ${values.blue}, ${values.alpha})`
}

function parseRGBA (colorValue){
    const rgbaMatch = colorValue.match(/rgba?\((\d+), (\d+), (\d+)(?:, ([\d.]+))?\)/);
    if (rgbaMatch) {
        const r = parseInt(rgbaMatch[1]);
        const g = parseInt(rgbaMatch[2]);
        const b = parseInt(rgbaMatch[3]);
        const a = rgbaMatch[4] !== undefined ? parseFloat(rgbaMatch[4]) : 1.0;
        return { red: r, green: g, blue: b, alpha: a };
    } else {
        return null;
    }
}

function hexToRGBA (hexValue) {
    const r = parseInt(hexValue.substring(1, 3), 16);
    const g = parseInt(hexValue.substring(3, 5), 16);
    const b = parseInt(hexValue.substring(5, 7), 16);
    const a = 1.0;

    return {red: r, green: g, blue: b, alpha: a};
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);    
    const g = Math.floor(Math.random() * 256);    
    const b = Math.floor(Math.random() * 256);   
    const a = 1.0;
    return {red: r, green: g, blue: b, alpha: a};;
}

function addAlphaToColor(currentColorValues, alphaDelta=0.1){
    currentColorValues.alpha = currentColorValues.alpha + alphaDelta;
    currentColorValues.alpha = clamp(currentColorValues.alpha, 0, 1);
    return valuesToRGBA(currentColorValues);
}

function colorSquare(element) {
    const alpha = parseInt(opacitySlider.value) / 100;
    let colorValues;
    let newColor;

    if (normalMode.checked){
        colorValues = hexToRGBA(colorPicker.value);
    } else if (rainbowMode.checked) {
        colorValues = getRandomColor();
    } else {
        element.style.background = null;
        return;
    }
    
    if (alpha < 1){
        const currentColor = window.getComputedStyle(element).backgroundColor;
        colorValues.alpha = parseRGBA(currentColor).alpha;
        newColor = addAlphaToColor(colorValues, alpha);
    } else {
        newColor = valuesToRGBA(colorValues)
    }
    element.style.background = newColor;
}

function createGrid(grid=16){
    const container = document.querySelector('.container');
    const gridDiv = document.createElement('div');
    gridDiv.classList.add('grid');
    container.appendChild(gridDiv);

    for (let i = 0; i < grid; i++){
        let rowDiv = document.createElement('div');
        rowDiv.classList.add('grid-row');
        for (let x = 0; x < grid; x++){
            let div = document.createElement('div');
            div.classList.add('grid-square');
            div.addEventListener('mouseover', (e) => {
                colorSquare(e.target);
            });
            rowDiv.appendChild(div);
        }
        gridDiv.appendChild(rowDiv);
    }
}

function newGrid(){
    const grid = document.querySelector('.grid');
    let gridSize = parseInt(sizeSlider.value);
    gridSize = clamp(gridSize, 1, 100);
    grid.remove();
    createGrid(gridSize);
}

function toggleGridLines(){
    const squares = document.querySelectorAll('.grid-square');
    if (gridLineBox.checked) {
        squares.forEach((square) => {
            square.classList.add('grid-lines');
        });
    } else {
        squares.forEach((square) => {
            square.classList.remove('grid-lines');
        });
    }
}

sizeSlider.addEventListener('input', (e) => {
    const sizeValue = document.querySelector('.size-value');
    sizeValue.textContent = sizeSlider.value;
});

sizeSlider.addEventListener('mouseup', (e) => {
    const sizeValue = document.querySelector('.size-value');
    sizeValue.textContent = sizeSlider.value;
    newGrid();
    e.target.blur();
    toggleGridLines();
});

opacitySlider.addEventListener('input', (e) => {
    const opacityValue = document.querySelector('.opacity-value');
    opacityValue.textContent = opacitySlider.value;
});

opacitySlider.addEventListener('mouseup', (e) => {
    e.target.blur();
});

gridLineBox.addEventListener('change', (e) => {
    toggleGridLines();
});

clearButton.addEventListener('click', (e) => {
    newGrid();
});

// Create the starting grid of 16x16
createGrid();