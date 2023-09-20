// container -> grid
const slider = document.querySelector('.slider');
const colorPicker = document.querySelector('#color-picker');
const rainbowMode = document.querySelector('#rainbow-mode');
const solidRadio = document.querySelector('#solid-color');
const shaderRadio = document.querySelector('#shader-color');
const clearButton = document.querySelector('.clear-btn')

function clamp(value, min, max){
    return Math.min(Math.max(value, min), max);
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

function addAlphaToColor(currentColor, alphaDelta=0.1){
    let currentColorValues = parseRGBA(currentColor);
    alpha = currentColorValues.alpha + alphaDelta;
    alpha = clamp(alpha, 0, 1);
    return `rgba(${currentColorValues.red}, ${currentColorValues.green}, 
        ${currentColorValues.blue}, ${alpha})`;
}

function colorSquare(element) {
    const colorValues = rainbowMode.checked ? getRandomColor() : hexToRGBA(colorPicker.value);
    let newColor;
    if (shaderRadio.checked){
        const currentColor = window.getComputedStyle(element).backgroundColor;
        if (currentColor === 'rgba(0, 0, 0, 0)'){
            newColor = `rgba(${colorValues.red}, ${colorValues.green}, 
                ${colorValues.blue}, ${0.1})`
        } else {
            newColor = addAlphaToColor(currentColor);
        }
    } else {
        newColor = `rgba(${colorValues.red}, ${colorValues.green}, 
            ${colorValues.blue}, ${colorValues.alpha})`;
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
    let gridSize = parseInt(slider.value);
    gridSize = clamp(gridSize, 1, 100);
    grid.remove();
    createGrid(gridSize);
}

slider.addEventListener('input', (e) => {
    const sliderValue = document.querySelector('.slider-value');
    sliderValue.textContent = slider.value;
    newGrid();
});

clearButton.addEventListener('click', (e) => {
    newGrid();
});

// Create the starting grid of 16x16
createGrid();