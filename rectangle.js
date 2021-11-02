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

class Rectangle extends Shape {
  constructor({ width, height, depth }) {
    super();

    this.verticies = [];
    this.width = 200;
    this.height = 200;
    this.depth = 200;

    this.numPointsPerLine = 20;

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

    const spacing = distanceWidth / this.numPointsPerLine;

    for (let i = 0; i <= distanceHeight + spacing; i += spacing) {
      for (let j = 0; j <= distanceWidth + spacing; j += spacing) {
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
    this.getFaceVerticies(frontFace, 2);
    this.getFaceVerticies(backFace, 2);
    this.getFaceVerticies(rightFace, 0);
    this.getFaceVerticies(leftFace, 0);
    this.getFaceVerticies(topFace, 1);
    this.getFaceVerticies(bottomFace, 1);
  }
}
