// container -> grid

function createGrid(){
    const gridDiv = document.querySelector('.grid');
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

let grid = 100;
createGrid();