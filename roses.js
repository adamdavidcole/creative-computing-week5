class Roses extends Shape {
  constructor() {
    super();

    this.numPoints = 1000;
    this.radius = 300;

    this.numPointsPerRing = 100;
    this.ringRadius = 30;

    this.totalPoints = this.numPoints * this.numPointsPerRing;
    this.verticiesToDraw = 0;

    this.verticies = [];

    this.initRosesVertices();
  }

  update() {
    this.verticies = [];
    const spacing = TWO_PI / this.numPoints;

    for (let angle = 0; angle < TWO_PI; angle += spacing) {
      const xCenter =
        this.radius *
        Math.cos((angle * mouseY) / 100) *
        Math.cos((mouseX / 100) * angle);
      const yCenter =
        this.radius *
        Math.sin((angle * mouseY) / 100) *
        Math.cos((mouseX / 100) * angle);
      const zCenter = map(angle, 0, TWO_PI, -300, 300);

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

    this.rotate({ x: 0.001, y: 0.001 });

    const loopPhase = Math.cos(frameCount / 100 + PI);
    this.verticiesToDraw = map(loopPhase, -1, 1, 0, this.totalPoints);
  }

  initRosesVertices() {
    this.update();
  }

  draw() {
    const projectedVertices = this.getProjectionTransform(this.verticies);

    context.strokeStyle = "rgb(255,255,255)";
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
