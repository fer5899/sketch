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
    gridSquare.style.backgroundColor = "rgba(0,0,0,0.0)";

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

function increaseShade(element) {
    let bgnd = element.style.backgroundColor;
    let rgbaPattern = /rgba\(0, 0, 0, 0?\.?[0-9]\)/;
    let alphaPattern = /, 0?\.?[0-9]\)/;

    if(rgbaPattern.test(bgnd)) {
        let alpha = parseFloat(alphaPattern.exec(bgnd)[0].slice(1,-1));
        if (alpha < 1) {
            element.style.backgroundColor = `rgba(0, 0, 0, ${alpha+0.1})`;
        } 
    } else if (bgnd === "rgb(0, 0, 0)") {
        return;
    } else {
        element.style.backgroundColor = "rgba(0,0,0,0.1)";
    }
}

const gridContainer = document.querySelector("#grid-container");
const toggleGridButton = document.querySelector("#toggle-grid");
const rainbowButton = document.querySelector("#toggle-rainbow");
const shaderButton = document.querySelector("#toggle-shader");
const clearCanvasButton = document.querySelector("#clear-canvas");
const gridSizeSlider = document.querySelector("#grid-size-slider");
const sliderValueText = document.querySelector("#slider-value");

createGrid(16, gridContainer, true);
sliderValueText.textContent = `Grid size ${gridSizeSlider.value}x${gridSizeSlider.value}`;

document.addEventListener("mouseover", e => {
    if(e.buttons === 0) return;
    if (e.target.parentNode === gridContainer) {
        if (e.buttons === 1) {
            if(rainbowButton.classList.contains("pressed")) {
                e.target.style.backgroundColor = "#" + getRandomColor();
            } else if (shaderButton.classList.contains("pressed")) {
                increaseShade(e.target);
            } else {
                e.target.style.backgroundColor = "rgb(0, 0, 0)";
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
    shaderButton.classList.remove("pressed");
});

shaderButton.addEventListener("click", () => {
    shaderButton.classList.toggle("pressed");
    rainbowButton.classList.remove("pressed");

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