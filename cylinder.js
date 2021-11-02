class Cylinder extends Shape {
  constructor() {
    super();

    this.verticies = [];

    this.drawWithVerticies = true;

    this.verticiesPerCircle = 100;
    this.verticiesPerLength = 20;
    this.ringsPerCap = 10;

    this.initCylinderVertices();

    this.setScale({ x: 50, y: 400, z: 1 });
    // this.rotate({ x: PI / 6, y: PI / 8, z: PI / 12 });
  }

  initCylinderVertices() {
    const topCircleVeritices = [];
    let bottomCircleVeritices = [];

    const lengthIncr = 1 / this.verticiesPerLength;
    const ringDistIncr = 1 / this.ringsPerCap;
    const angleIncr = (2 * TWO_PI) / this.verticiesPerCircle;

    for (let i = -0.5; i < 0.5; i += lengthIncr) {
      for (let angle = 0; angle < TWO_PI; angle += angleIncr) {
        const x = Math.cos(angle);
        const y = i;
        const z = Math.sin(angle);

        if (this.drawWithVerticies) {
          this.verticies.push([x, y, z]);
        } else {
          topCircleVeritices.push([x, y, z]);
        }
      }
    }

    if (this.drawWithVerticies) {
      for (let i = 0; i < 1; i += ringDistIncr) {
        for (let angle = 0; angle < TWO_PI; angle += angleIncr) {
          const x = Math.cos(angle) * i;
          const z = Math.sin(angle) * i;
          const topY = -0.5;
          const bottomY = 0.5;

          this.verticies.push([x, topY, z]);
          this.verticies.push([x, bottomY, z]);
        }
      }
    }

    if (!this.drawWithVerticies) {
      bottomCircleVeritices = topCircleVeritices.map(([x, y, z]) => [
        x,
        y + 1,
        z,
      ]);

      this.verticies = [...topCircleVeritices, ...bottomCircleVeritices];
    }
  }

  draw() {
    if (this.drawWithVerticies) {
      super.draw();
      return;
    }
    // get 3D projected and transformed model
    const projectedVertices = this.getProjectionTransform(this.verticies);

    const topCircleVertexCount = this.verticies.length / 2;

    for (let i = 0; i < topCircleVertexCount; i++) {
      const topVertex = projectedVertices[i];
      const bottomVertex = projectedVertices[i + topCircleVertexCount];

      const [topX, topY, topZ, topScale] = topVertex;
      const [bottomX, bottomY, bottomZ, bottomScale] = bottomVertex;

      if (i == 0) console.log({ topX, topY, bottomX, bottomY });

      context.strokeStyle = "rgb(255,255,255)";
      context.lineWidth = topScale;
      context.beginPath();
      context.moveTo(topX, topY);
      context.lineTo(bottomX, bottomY);
      context.stroke();
    }

    // // draw each vertex
    // projectedVertices.forEach(([x, y, z, projectionScale], i) => {
    //   context.lineWidth = projectionScale;

    //   // if point is beyond field of view, do not render it
    //   if (z < -fov) return;

    //   context.strokeStyle = "rgb(255,255,255)";
    //   context.beginPath();
    //   context.moveTo(x, y);
    //   context.lineTo(x + projectionScale, y);
    //   context.stroke();
    // });
  }
}
