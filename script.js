var fov = 500;

var canvas = document.querySelector("canvas");
var width = window.innerWidth;
var height = window.innerHeight;
var context = canvas.getContext("2d");
canvas.setAttribute("width", width);
canvas.setAttribute("height", height);
canvas.addEventListener("mousemove", getMouse, false);
var mouseX = 0;
var mouseY = 0;

function map(number, inMin, inMax, outMin, outMax) {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

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
console.log("sphere", sphere, sphere.verticies);

// const shapes = [];

// var point = [];
// var points = [];
// var point3d = [];
// var angleX = 0;
// var angleY = 0;
// var HALF_WIDTH = width / 2;
// var HALF_HEIGHT = height / 2;

// var x3d = 0;
// var y3d = 0;
// var z3d = 0;

// var lastScale = 0;
// var lastx2d = 0;
// var lasty2d = 0;

// // The below code creates a sphere of points
// var dim = 100; // This is the number of rings
// // Each ring has as many points as there are rings
// // This is the spacing for each ring
// var spacing = (Math.PI * 2) / dim;

// // This is the total number of points
// var numPoints = dim * dim;

// // This is how big the sphere is.
// var size = 200;

// let numRenderedRings = dim;

// // Now we build the sphere
// for (var i = 0; i < numRenderedRings; i++) {
//   // Calculate the depth spacing

//   // To calculate the depth spacing, we divide our spacing in half
//   // This is because otherwise, the cosine / sine waves will
//   // oscillate positively and negatively
//   // We only need the positive bit

//   //     COOL MEGA SHAPE: come back to this later
//   //      var z = size * Math.cos(spacing/2+1  * i);
//   var z = size * Math.cos((spacing / 2) * i);

//   // Calculate the size of the current ring
//   //  COOL hourglass
//   // var s = size * Math.sin(spacing  * i);
//   // COOL tubes
//   // var s = size * Math.sin(spacing* 10  * i);
//   var s = size * Math.sin((spacing / 2) * i);

//   // For each ring..

//   for (var j = 0; j < dim; j++) {
//     // ...create the next point in the circle at the current size s, at the current depth z

//     var point = [Math.cos(spacing * j) * s, Math.sin(spacing * j) * s, z];

//     // Add the point to the geometry.

//     points.push(point);
//   }
// }

// //
// console.log(points.length);

function draw() {
  context.fillStyle = "rgb(0,0,0)";
  context.fillRect(0, 0, width, height);

  //   cubeShape.draw();
  sphere.draw();

  //   sphere.translate({ z: -1 });
  sphere.scale({ x: -0.01, y: -0.01, z: -0.01 });
  sphere.translate({ x: 0.01, z: -0.01, y: -0.01 });
  sphere.rotate({ x: 0.01, y: 0.01, z: 0.01 });

  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

function rotateX(point3d, angleX) {
  var x = point3d[0];
  var z = point3d[2];

  var cosRY = Math.cos(angleX);
  var sinRY = Math.sin(angleX);

  var tempz = z;
  var tempx = x;

  x = tempx * cosRY + tempz * sinRY;
  z = tempx * -sinRY + tempz * cosRY;

  point3d[0] = x;
  point3d[2] = z;
}

function rotateY(point3d, angleY) {
  var y = point3d[1];
  var z = point3d[2];

  var cosRX = Math.cos(angleY);
  var sinRX = Math.sin(angleY);

  var tempz = z;
  var tempy = y;

  y = tempy * cosRX + tempz * sinRX;
  z = tempy * -sinRX + tempz * cosRX;

  point3d[1] = y;
  point3d[2] = z;
}

//here's our function 'getMouse'.
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
