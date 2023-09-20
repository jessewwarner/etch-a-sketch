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

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);    
    const g = Math.floor(Math.random() * 256);    
    const b = Math.floor(Math.random() * 256);   
    return `rgba(${r}, ${g}, ${b}, ${1.0})`;
}

function addAlphaToColor(red=0, green=0, blue=0, alpha=0, alphaDelta=0.1){
    alpha += alphaDelta;
    alpha = clamp(alpha, 0, 1);
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function colorSquare(element) {
    let newColor = rainbowMode.checked ? getRandomColor() : colorPicker.value;

    if (shaderRadio.checked){
        let currentColor = window.getComputedStyle(element).backgroundColor;
        newColor = 'black';
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