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

function getRandomColor() {
    return Math.floor(Math.random()*16777215).toString(16);
}

const gridContainer = document.querySelector("#grid-container");
const toggleGridButton = document.querySelector("#toggle-grid");
const rainbowButton = document.querySelector("#toggle-rainbow");
const clearCanvasButton = document.querySelector("#clear-canvas");
const gridSizeSlider = document.querySelector("#grid-size-slider");
const sliderValueText = document.querySelector("#slider-value");

createGrid(16, gridContainer, true);
sliderValueText.textContent = `Grid size ${gridSizeSlider.value}x${gridSizeSlider.value}`;

document.addEventListener("mousemove", e => {
    if(e.buttons === 0) return;
    if (e.target.parentNode === gridContainer) {
        if (e.buttons === 1) {
            if(rainbowButton.classList.contains("pressed")) {
                e.target.style.backgroundColor = "#" + getRandomColor();
            } else {
                e.target.style.backgroundColor = "black";
            }
        } else if (e.buttons === 4) {
            e.target.style.backgroundColor = null;
        }
    }
    
});

toggleGridButton.addEventListener("click", () => 
    gridContainer.childNodes.forEach(square => 
        square.classList.toggle("border"))
);

rainbowButton.addEventListener("click", () => {
    rainbowButton.classList.toggle("pressed");
});

clearCanvasButton.addEventListener("click", () =>
    gridContainer.childNodes.forEach(square =>
        square.style.backgroundColor = null)
);

gridSizeSlider.addEventListener("change", () => {
        let sliderValue = gridSizeSlider.value;
        let oldSize = gridContainer.childElementCount; 
        sliderValueText.textContent = `Grid size ${sliderValue}x${sliderValue}`;
        for(let i = 0; i < oldSize; i++) {
            gridContainer.removeChild(gridContainer.firstChild);
        }
        createGrid(sliderValue, gridContainer, true);
    }
);