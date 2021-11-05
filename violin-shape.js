class ViolinShape extends Shape {
  constructor({
    xCenter = 0,
    yCenter = 0,
    radius = 200,
    startAngle = Math.PI,
    // startFrame = 0,
    xStretch = 1.5,
    // playSpeed = 20, // lower number is faster
  }) {
    super();

    this.xCenter = xCenter;
    this.yCenter = yCenter;
    this.radius = radius;
    this.startAngle = startAngle;
    this.xStretch = xStretch;

    this.numPoints = 1000;

    this.numPointsPerRing = 100;
    this.ringRadius = 30;

    this.totalPoints = this.numPoints * this.numPointsPerRing;
    this.verticiesToDraw = 0;

    this.verticies = [];

    this.totalFrames = 2000;

    this.initVertices();
  }

  update() {
    this.verticies = [];

    const maxWidthFactor = 0.45;

    const spacing = TWO_PI / this.numPoints;

    for (let angle = 0; angle < TWO_PI; angle += spacing) {
      const multY = map(frameCount, 0, this.totalFrames, 502, 510);

      const widthFactor = Math.min(
        map(frameCount, 0, this.totalFrames, 0.4, 0.5),
        maxWidthFactor
      );

      var xCenter =
        this.xCenter +
        Math.cos(angle + this.startAngle) *
          this.radius *
          this.xStretch *
          (widthFactor * Math.cos(500 * angle + Math.PI) + Math.PI / 2);

      var yCenter =
        this.yCenter +
        Math.sin(angle + this.startAngle) *
          this.radius *
          (widthFactor * Math.sin(multY * angle + Math.PI) + Math.PI / 2);

      //   const xCenter =
      //     this.radius *
      //     Math.cos((angle * mouseY) / 100) *
      //     Math.cos((mouseX / 100) * angle);
      //   const yCenter =
      //     this.radius *
      //     Math.sin((angle * mouseY) / 100) *
      //     Math.cos((mouseX / 100) * angle);
      const zCenter = Math.sin(angle) * this.radius;

      //   const ringSpacing = TWO_PI / this.numPointsPerRing;

      //   for (let ringAngle = 0; ringAngle < TWO_PI; ringAngle += ringSpacing) {
      //     let x = Math.cos(ringAngle) * this.ringRadius;
      //     let y = 0;
      //     let z = Math.sin(ringAngle) * this.ringRadius;

      //     const rotatedX = x * Math.cos(ringAngle) - y * Math.sin(ringAngle);
      //     const rotatedY = x * Math.sin(ringAngle) + y * Math.cos(ringAngle);
      //     const rotatedZ = z;

      //     const translatedX = rotatedX + xCenter;
      //     const translatedY = rotatedY + yCenter;
      //     const translatedZ = rotatedZ + zCenter;

      //     this.verticies.push([translatedX, translatedY, translatedZ]);
      //   }

      this.verticies.push([xCenter, yCenter, zCenter]);
    }

    this.rotate({ x: 0.001, y: 0.001 });
  }

  initVertices() {
    this.update();
  }

  draw() {
    const projectedVertices = this.getProjectionTransform(this.verticies);

    context.strokeStyle = strokeColor;
    context.lineWidth = 1;

    context.beginPath();
    projectedVertices.forEach((vertex, i) => {
      //   if (i > this.verticiesToDraw) return;

      const [x, y, z] = vertex;
      if (i === 0) context.moveTo(x, y);
      context.lineTo(x, y);
    });
    context.stroke();
    context.closePath();
  }
}
