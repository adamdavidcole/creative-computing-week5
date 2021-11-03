/**
 * CONSTANTS
 */
const fov = 500;
const PI = Math.PI;
const TWO_PI = 2 * PI;
let frameCount = 0;

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
context.globalCompositeOperation = "lighter";

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

var mouseX = width / 2;
var mouseY = height / 2;

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
const sphere = new Sphere({ size: 200 });
const spherePulse = new SpherePulse({ size: 200 });
const organicSpherePulse = new OrganicSpherePulse({ size: 300 });

const cube = new Rectangle({ width: 200, height: 200, depth: 200 });
const cylinder = new Cylinder({ size: 200 });
const cone = new Cone({ size: 200 });
const taurus = new Taurus({ size: 200 });
const roses = new Roses({});

const coneOfCubes = new ConeOfCubes();

function draw() {
  // clear rect
  context.fillStyle = "rgb(0,0,0)";
  context.clearRect(0, 0, width, height);
  context.fillRect(0, 0, width, height);

  // draw sphere
  // sphere.draw();
  // sphere.rotate({ z: 0.01, x: 0.01, y: 0.01 });
  // sphere.setScale({
  //   x: map(mouseX, 0, width, -5, 5),
  //   y: map(mouseY, 0, height, -5, 5),
  // });

  // draw cube
  // cube.draw();
  // cube.rotate({ z: 0.01, x: 0.01, y: 0.01 });
  // cube.setScale({
  //   x: map(mouseX, 0, width, -500, 500),
  //   y: map(mouseY, 0, height, -500, 500),
  // });

  // draw cylinder
  // cylinder.draw();
  // cylinder.rotate({ z: 0.01, x: 0.01, y: 0.01 });
  // cylinder.setScale({
  //   x: map(mouseX, 0, width, -500, 500),
  //   y: 2 * map(mouseY, 0, height, -500, 500),
  // });

  // draw cone
  // cone.draw();
  // cone.rotate({ z: 0.01, x: 0.01, y: 0.01 });
  // cone.setScale({
  //   x: map(mouseX, 0, width, -500, 500),
  //   y: 2 * map(mouseY, 0, height, -500, 500),
  // });

  // draw taurus
  // taurus.draw();
  // taurus.rotate({ z: 0.01, x: 0.01, y: 0.01 });
  // taurus.setScale({
  //   x: map(mouseX, 0, width, -500, 500),
  //   y: 2 * map(mouseY, 0, height, -500, 500),
  // });

  // spherePulse.update();
  // spherePulse.draw();
  // spherePulse.setRotation({
  //   x: map(mouseX, 0, width, -TWO_PI, TWO_PI),
  //   y: map(mouseY, 0, height, -TWO_PI, TWO_PI),
  // });

  // organicSpherePulse.update();
  // organicSpherePulse.draw();

  // coneOfCubes.update();
  // coneOfCubes.draw();

  roses.update();
  roses.draw();

  frameCount++;

  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
