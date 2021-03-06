/**
 * CONSTANTS
 */
const fov = 500;
const PI = Math.PI;
const TWO_PI = 2 * PI;
let frameCount = 0;
const framesPerSecond = 60;

var audio = new Audio("sway.mp3");

let useCameraView = false;

const scene1End = 14;
const scene2End = 30.0;
const scene3End = 46.0;
const scene4End = 62.475;

const isEndingAnimation = false;

let lineWidthFactor = 1;

let backgroundColor = "#1a171c";
let strokeColor = "#f0d8db";

/**
 * SCENE SETUP AND EVENT HANDLERS
 */
var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");
canvas.addEventListener("mousemove", getMouse, false);
canvas.width = 1080;
canvas.height = (1 / 1.66) * canvas.width;
var width = canvas.width;
var height = canvas.height;
// context.globalCompositeOperation = "lighter";

const playButtonContainer = document.getElementById("playButtonContainer");
const playButton = document.getElementById("playButton");
let playAudio = async () => {
  // remove play button
  playButtonContainer.remove();

  audio.currentTime = 0;
  audio.play();
};

// This script listens to the play button
playButton.addEventListener("click", () => {
  playAudio();

  shouldAnimate = true;
  animate();
});

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
    case " ":
      rosesPoseSwapper.next();
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

const camera = new Camera();

// create shapes
const sphere = new Sphere({ size: 200 });
const spherePulse = new SpherePulse({ size: 200 });
const organicSpherePulse = new OrganicSpherePulse({
  loopPhaseStart: PI + PI / 3,
  loopSpeed: 3,
  size: 300,
});
const mirroredOrganicSpheres = new MirroredOrganicSpheres({});

const cube = new Rectangle({
  width: 200,
  height: 200,
  depth: 200,
  shouldDrawAsFaces: true,
  strokeStyle: "rgba(255, 255, 0, 0.25)",
  fillStyle: "rgba(255, 0, 255, 0.25)",
});
const cylinder = new Cylinder({ size: 200 });
const cone = new Cone({ size: 200 });
const taurus = new Taurus({ size: 200 });
const roses = new Roses({});
const rosesPoseSwapper = new RosesPoseSwapper({});
const violinShape = new ViolinShape({});
const organicSphereRing = new OrganicSphereRing({});

const coneOfCubes = new ConeOfCubes();

const scene1 = new Scene1();
const scene2 = new Scene2();
const scene3 = new Scene3();
const scene4 = new Scene4();

let lastNextSecond = -1;

function draw() {
  // clear rect
  context.fillStyle = backgroundColor;
  context.clearRect(0, 0, width, height);
  context.fillRect(0, 0, width, height);

  camera.update();

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

  // roses.update();
  // roses.draw();

  // rosesPoseSwapper.update();
  // rosesPoseSwapper.draw();

  // violinShape.update();
  // violinShape.draw();

  // mirroredOrganicSpheres.update();
  // mirroredOrganicSpheres.draw();

  // organicSphereRing.update();
  // organicSphereRing.draw();

  if (audio.currentTime < scene1End) {
    scene1.update();
    scene1.draw();
  } else if (audio.currentTime < scene2End) {
    scene2.update();
    scene2.draw();
  } else if (audio.currentTime < scene3End) {
    scene3.update();
    scene3.draw();
  } else if (audio.currentTime < scene4End) {
    scene4.update();
    scene4.draw();
  } else {
    if (!isEndingAnimation) endAnimation();
    isEndingAnimation = true;
  }

  frameCount++;

  // requestAnimationFrame(draw);
}

function endAnimation() {
  const audioFadeStep = 0.001;
  const fadeMusicInterval = setInterval(() => {
    if (audio.volume - audioFadeStep <= 0) {
      clearInterval(fadeMusicInterval);
      audio.pause();
      return;
    }

    audio.volume = audio.volume - audioFadeStep;
    console.log("audio.volume", audio.volume);
  }, 250);
}

function animate() {
  setTimeout(function () {
    requestAnimationFrame(animate);

    draw();

    // animating/drawing code goes here
  }, 1000 / framesPerSecond);
}
