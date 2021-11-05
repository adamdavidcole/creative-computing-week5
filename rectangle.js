const cubeVertices = [
  [-0.5, -0.5, -0.5], // top, left, front
  [0.5, -0.5, -0.5], // top, right, front
  [0.5, 0.5, -0.5], // bottom, left, front
  [-0.5, 0.5, -0.5], // bottom, right, front
  [-0.5, -0.5, 0.5], // top, left, back
  [0.5, -0.5, 0.5], // top, right, back
  [0.5, 0.5, 0.5], // bottom, right, back
  [-0.5, 0.5, 0.5], // bottom, left, back
];

const frontFace = [0, 1, 2, 3];
const backFace = [4, 5, 6, 7];
const topFace = [0, 4, 5, 1];
const rightFace = [1, 2, 6, 5];
const bottomFace = [3, 7, 6, 2];
const leftFace = [0, 4, 7, 3];

const faces = [frontFace, backFace, topFace, rightFace, bottomFace, leftFace];

class Rectangle extends Shape {
  constructor({
    width,
    height,
    depth,
    numPointsPerLine,
    shouldDrawAsFaces,
    strokeStyle,
    fillStyle,
  } = {}) {
    super();

    this.strokeStyle = strokeStyle;
    this.fillStyle = fillStyle;
    this.shouldDrawAsFaces = shouldDrawAsFaces ?? false;

    this.verticies = [];
    this.width = width || 200;
    this.height = height || 200;
    this.depth = depth || 200;

    this.numPointsPerLine = numPointsPerLine || 20;

    this.initRectangleVertices();

    this.setScale({ x: this.width, y: this.height, z: this.depth });
  }

  getFaceVerticies(face, axis) {
    const v0 = cubeVertices[face[0]];
    const v1 = cubeVertices[face[1]];
    const v2 = cubeVertices[face[2]];
    const v3 = cubeVertices[face[3]];

    const distanceWidth = vecDistance(v1, v0);
    const distanceHeight = vecDistance(v1, v2);

    const spacingHeight = distanceHeight / this.numPointsPerLine;
    const spacingWidth = distanceWidth / this.numPointsPerLine;

    for (let i = 0; i < distanceHeight + spacingHeight; i += spacingHeight) {
      for (let j = 0; j < distanceWidth + spacingWidth; j += spacingWidth) {
        // draw face on X axis
        let x, y, z;
        if (axis === 0) {
          x = v0[0];
          y = v0[1] + j;
          z = v0[2] + i;
        }
        // draw face on Y axis
        if (axis === 1) {
          x = v0[0] + j;
          y = v0[1];
          z = v0[2] + i;
        }
        // draw face on Z zxis
        if (axis === 2) {
          x = v0[0] + j;
          y = v0[1] + i;
          z = v0[2];
        }

        this.verticies.push([x, y, z]);
      }
    }
  }

  initRectangleVertices() {
    if (!this.shouldDrawAsFaces) {
      this.getFaceVerticies(frontFace, 2);
      this.getFaceVerticies(backFace, 2);
      this.getFaceVerticies(rightFace, 0);
      this.getFaceVerticies(leftFace, 0);
      this.getFaceVerticies(topFace, 1);
      this.getFaceVerticies(bottomFace, 1);
    } else {
      cubeVertices.forEach((vertex) => {
        this.verticies.push(vertex);
      });
    }
  }

  draw() {
    if (!this.shouldDrawAsFaces) {
      super.draw();
      return;
    } else {
      // context.globalCompositeOperation = "lighter";
      const projectedVerticies = this.getProjectionTransform(this.verticies);

      const [v0, v1, v2, v3] = projectedVerticies;
      context.fillStyle = this.fillStyle;
      context.strokeStyle = this.strokeStyle;

      faces.forEach((face) => {
        const [startX, startY] = projectedVerticies[face[0]];
        context.beginPath();
        context.moveTo(startX, startY);

        face.forEach((index, i) => {
          const [x, y, z] = projectedVerticies[index];
          context.lineTo(x, y);
        });
        context.closePath();
        context.fill();
        context.stroke();
      });
    }
  }
}
