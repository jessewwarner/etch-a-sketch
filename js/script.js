// container -> grid

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
                e.target.style.background = 'black';
            });
            rowDiv.appendChild(div);
        }
        gridDiv.appendChild(rowDiv);
    }
}

function newGrid(newSize){
    const grid = document.querySelector('.grid');
    grid.remove();
    createGrid(newSize);
}

function clamp(value, min, max){
    return Math.min(Math.max(value, min), max);
}

const button = document.querySelector('.new-grid-btn');
button.addEventListener('click', (e) => {
    let gridSize = parseInt(window.prompt("Enter a grid size (1-100): "));
    if(Number.isInteger(gridSize)) {
        gridSize = clamp(gridSize, 1, 100);
        newGrid(gridSize)
    }
    else{
        alert("Invalid input! Try again.")
    }
});

createGrid();