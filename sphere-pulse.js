// var dim = 100; // This is the number of rings
// Each ring has as many points as there are rings
// This is the spacing for each ring
// var spacing = (Math.PI * 2) / dim;

// This is the total number of points
// var numPoints = dim * dim;

// This is how big the sphere is.

// let numRenderedRings = dim;

class SpherePulse extends Shape {
  constructor({
    size = 100,
    scale,
    translation,
    rotation,
    numVerticesPerCircle = 100,
    numCircles = 100,
    startRotation = { x: Math.PI / 2, y: 0, z: 0 },
  }) {
    super();

    this.verticies = [];
    this.size = size;

    this.numCircles = numCircles;
    this.numVerticesPerCircle = numVerticesPerCircle;

    this.pulsePeriod = TWO_PI;

    // pulse factor as a fraction of the radius
    this.pulseFactor = 1 / 10;

    this.setRotation(startRotation);
  }

  update() {
    this.verticies = [];

    const angleIncr = TWO_PI / this.numVerticesPerCircle;

    for (let i = 0; i < this.numCircles; i++) {
      const depthSpacing = PI / this.numCircles;
      const z = Math.cos(depthSpacing * i) * this.size;
      const radius = Math.sin(depthSpacing * i) * this.size;

      // const phaseRange = map(mouseX, 0, width, 0, 100);
      // const zPhase = map(z, -this.size, this.size, 0, phaseRange * TWO_PI);
      const zPhase = map(z, -this.size, this.size, 0, this.pulsePeriod);

      for (let angle = 0; angle < TWO_PI - angleIncr; angle += angleIncr) {
        // const x = Math.cos(angle) * (Math.sin(frameCount / 100) + 1.25) * 0.25;
        // const y = Math.sin(angle) * (Math.sin(frameCount / 100) + 1.25) * 0.25;
        const x =
          Math.cos(angle) * // starting position in circle
          (radius + // starting radius (without pulse)
            (Math.sin(frameCount / 10 + zPhase) + 1) * // pulse factor (shifted to be between [0,1])
              (radius * this.pulseFactor)); // pulse factor radius
        const y =
          Math.sin(angle) *
          (radius +
            (Math.sin(frameCount / 10 + zPhase) + 1) *
              (radius * this.pulseFactor));

        // const z = 0;

        this.verticies.push([x, y, z]);
      }
    }
  }
}
