class Roses extends Shape {
  constructor() {
    super();

    this.numPoints = 1000;
    this.radius = 300;

    this.numPointsPerRing = 100;
    this.ringRadius = 30;

    this.totalPoints = this.numPoints * this.numPointsPerRing;
    this.verticiesToDraw = 0;

    this.multiplierA = 0;
    this.muliplierB = 0;

    this.verticies = [];
    this.verticiesToDraw = this.totalPoints;

    this.isFadingOut = false;
    this.fadeOutRate = 10000;

    this.initRosesVertices();
  }

  getMultipliers() {
    return { a: this.multiplierA, b: this.multiplierB };
  }

  setMultipliers({ a, b }) {
    this.multiplierA = a;
    this.multiplierB = b;
  }

  fadeOut() {
    this.isFadingOut = true;
  }

  update() {
    this.verticies = [];
    const spacing = TWO_PI / this.numPoints;

    if (this.isFadingOut) {
      this.verticiesToDraw -= this.fadeOutRate;

      if (this.verticiesToDraw < 0) {
        this.verticiesToDraw = 0;
        this.isFadingOut = false;
      }
    }

    // uncomment to control with mouse
    // this.multiplierA = mouseY / 250;
    // this.multiplierB = mouseX / 250;
    // console.log(
    //   "this.multiplierA",
    //   this.multiplierA,
    //   "this.multiplierB",
    //   this.multiplierB
    // );

    for (let angle = 0; angle < TWO_PI; angle += spacing) {
      const xCenter = this.radius * Math.cos(angle * this.multiplierA);
      Math.cos(this.multiplierB * angle);
      const yCenter =
        this.radius *
        Math.sin(angle * this.multiplierA) *
        Math.cos(this.multiplierB * angle);
      const zCenter = map(angle, 0, TWO_PI, -300, 300);
      //   const zCenter = 300 * Math.sin(angle);

      const ringSpacing = TWO_PI / this.numPointsPerRing;
      for (let ringAngle = 0; ringAngle < TWO_PI; ringAngle += ringSpacing) {
        let x = Math.cos(ringAngle) * this.ringRadius;
        let y = 0;
        let z = Math.sin(ringAngle) * this.ringRadius;

        const rotatedX = x * Math.cos(ringAngle) - y * Math.sin(ringAngle);
        const rotatedY = x * Math.sin(ringAngle) + y * Math.cos(ringAngle);
        const rotatedZ = z;

        const translatedX = rotatedX + xCenter;
        const translatedY = rotatedY + yCenter;
        const translatedZ = rotatedZ + zCenter;

        this.verticies.push([translatedX, translatedY, translatedZ]);
      }

      //   this.verticies.push([xCenter, yCenter, 0]);
    }

    this.rotate({ x: 0.01, y: 0.01, z: 0.01 });

    // const loopPhase = Math.cos(frameCount / 100 + PI);
    // this.verticiesToDraw = map(loopPhase, -1, 1, 0, this.totalPoints);
  }

  initRosesVertices() {
    this.update();
  }

  draw() {
    const projectedVertices = this.getProjectionTransform(this.verticies);

    context.strokeStyle = strokeColor;
    context.lineWidth = 1;

    context.beginPath();
    projectedVertices.forEach((vertex, i) => {
      if (i > this.verticiesToDraw) return;

      const [x, y, z] = vertex;
      if (i === 0) context.moveTo(x, y);
      context.lineTo(x, y);
    });
    context.stroke();
    context.closePath();
  }
}
