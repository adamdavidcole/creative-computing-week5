/**
 * CONSTANTS
 */
var fov = 500;

/**
 * SCENE SETUP AND EVENT HANDLERS
 */
var canvas = document.querySelector("canvas");
var width = window.innerWidth;
var height = window.innerHeight;
var context = canvas.getContext("2d");
canvas.setAttribute("width", width);
canvas.setAttribute("height", height);
canvas.addEventListener("mousemove", getMouse, false);

// move sphere with arrow keys
document.addEventListener("keydown", function (event) {
  const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
  switch (key) {
    case "ArrowLeft":
      sphere.translate({ x: -5 });
      break;
    case "ArrowRight":
      sphere.translate({ x: 5 });
      // Right pressed
      break;
    case "ArrowUp":
      sphere.translate({ y: -5 });
      // Up pressed
      break;
    case "ArrowDown":
      sphere.translate({ y: 5 });
      // Down pressed
      break;
  }
});

/**
 * UTILITY FUNCTIONS
 */

var mouseX = 0;
var mouseY = 0;

function map(number, inMin, inMax, outMin, outMax) {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

function getMouse(mousePosition) {
  //for other browsers..
  if (mousePosition.layerX || mousePosition.layerX === 0) {
    // Firefox?
    mouseX = mousePosition.layerX;
    mouseY = mousePosition.layerY;
  } else if (mousePosition.offsetX || mousePosition.offsetX === 0) {
    // Opera?
    mouseX = mousePosition.offsetX;
    mouseY = mousePosition.offsetY;
  }
}

/**
 * SCENE LOGIC
 */

// create shapes
const cubeVertices = [
  [0, 0, 0],
  [1, 0, 0],
  [1, 1, 0],
  [0, 1, 0],
  [0, 0, 1],
  [1, 0, 1],
  [1, 1, 1],
  [0, 1, 1],
];
const cubeShape = new Shape({ verticies: cubeVertices });
const sphere = new Sphere({ size: 200 });

function draw() {
  // clear rect
  context.fillStyle = "rgb(0,0,0)";
  context.fillRect(0, 0, width, height);

  // draw sphere
  sphere.draw();

  // update position
  sphere.rotate({ z: 0.01, x: 0.01, y: 0.01 });
  sphere.setScale({
    x: map(mouseX, 0, width, -5, 5),
    y: map(mouseY, 0, height, -5, 5),
  });

  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
