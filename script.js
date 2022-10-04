function getWidth(element) {
    const style = getComputedStyle(element);
    return style.width;
}

function createGrid(gridSize, gridContainer, withBorder) {

    let gridSquare = document.createElement("div");

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

createGrid(32, gridContainer, true);