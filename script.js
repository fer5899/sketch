function getWidth(element) {
    const style = getComputedStyle(element);
    return style.width;
}

function createGrid(gridSize, gridContainer, withBorder) {

    let gridSquare = document.createElement("div");
    gridSquare.draggable = false;
    gridSquare.dataset = "sketch";
    gridSquare.style.boxSizing = "border-box";
    gridSquare.style.width = parseInt(getWidth(gridContainer)) 
                                / gridSize
                                + "px";
    gridSquare.style.height = gridSquare.style.width;

    if (withBorder) {
        gridSquare.classList.add("border");
    }
    

    for(let i = 0; i < gridSize**2; i++) {
        gridContainer.appendChild(gridSquare.cloneNode());
    }

}


const gridContainer = document.querySelector("#grid-container");

createGrid(8, gridContainer, true);

document.addEventListener("mousedown", e => console.log(e));

document.addEventListener("mousemove", e => {
    if(e.buttons === 0) return;
    if (e.target.parentNode === gridContainer) {
        if (e.buttons === 1) {
            e.target.style.backgroundColor = "black";
        } else if (e.buttons === 4) {
            e.target.style.backgroundColor = null;
        }
    }
    
});