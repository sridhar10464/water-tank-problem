document.getElementById("calculate-btn").addEventListener("click", function () {
    var blockHeightsInput = document.getElementById("block-heights");
    var blockHeights = blockHeightsInput.value.split(",").map(function(height) {
        return parseInt(height.trim());
    });

    var waterUnits = calculateWaterUnits(blockHeights);
    var svgElement = createSvgElement(blockHeights, waterUnits);
    var svgContainer = document.getElementById("water-svg");
    svgContainer.innerHTML = "";
    svgContainer.appendChild(svgElement);
});

function calculateWaterUnits(heights) {
    var leftMax = 0;
    var rightMax = 0;
    var left = 0;
    var right = heights.length - 1;
    var waterUnits = 0;

    while (left < right) {
        if (heights[left] < heights[right]) {
            if (heights[left] > leftMax) {
                leftMax = heights[left];
            } else {
                waterUnits += leftMax - heights[left];
            }
            left++;
        } else {
            if (heights[right] > rightMax) {
                rightMax = heights[right];
            } else {
                waterUnits += rightMax - heights[right];
            }

            right--;
        }
    }

    return waterUnits;
}

function createSvgElement(heights, waterUnits) {
    var svgNS = "http://www.w3.org/2000/svg";
    var svgElement = document.createElementNS(svgNS, "svg");
    var rectWidth = 40;
    var rectMargin = 10;
    var maxHeight = Math.max(...heights);

    for (var i = 0; i < heights.length; i++) {
        var rectHeight = heights[i] * 20;
        var rectX = i * (rectWidth + rectMargin);
        var rectY = maxHeight * 20 - rectHeight;

        var rect = document.createElementNS(svgNS, "rect");
        rect.setAttributeNS(null, "x", rectX);
        rect.setAttributeNS(null, "y", rectY);
        rect.setAttributeNS(null, "width", rectWidth);
        rect.setAttributeNS(null, "height", rectHeight);
        rect.setAttributeNS(null, "fill", "#4286f4");

        svgElement.appendChild(rect);
    }

    var text = document.createElementNS(svgNS, "text");
    text.setAttributeNS(null, "x", (heights.length * (rectWidth / rectMargin)) / 2);
    text.setAttributeNS(null, "y", maxHeight * 20 + 20);
    text.setAttributeNS(null, "text-anchor", "center");
    text.setAttributeNS(null, "font-size", "16");
    text.setAttributeNS(null, "fill", "#000");
    text.textContent = "Water Units: " + waterUnits;

    svgElement.appendChild(text);

    svgElement.setAttributeNS(null, "width", heights.length * (rectWidth + rectMargin));
    svgElement.setAttributeNS(null, "height", maxHeight * 20 + 50);
    
    return svgElement;
}


