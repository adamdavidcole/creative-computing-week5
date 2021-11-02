class Taurus extends Shape {
  constructor() {
    super();

    this.verticies = [];
    this.verticiesPerRing = 20;
    this.totalRings = 100;
    this.initialRadius = 1;

    this.ringRadius = 0.5;
    // this.ringSize = 1;

    this.initTaurusVerticies();

    this.setScale({ x: 100, y: 100, z: 100 });
  }

  initTaurusVerticies() {
    // spacing between rings in taurus
    const ringAngleSpacing = TWO_PI / this.totalRings;

    for (
      let ringAngle = 0;
      ringAngle < TWO_PI - ringAngleSpacing;
      ringAngle += ringAngleSpacing
    ) {
      // center of ring in taurus loop
      const ringCenterX = Math.cos(ringAngle);
      const ringCenterY = Math.sin(ringAngle);

      // spacing between vertices in ring
      let angleSpacing = TWO_PI / this.verticiesPerRing;
      for (let angle = 0; angle < TWO_PI; angle += angleSpacing) {
        // construct flat circle in x and z dimensions
        const x = Math.cos(angle) * this.ringRadius;
        const y = 0;
        const z = Math.sin(angle) * this.ringRadius;

        // rotate ring around z so its "facing" center
        const rotatedX = x * Math.cos(ringAngle) - y * Math.sin(ringAngle);
        const rotatedY = x * Math.sin(ringAngle) + y * Math.cos(ringAngle);

        // translate ring to (x,y) coordinates
        const translatedX = rotatedX + ringCenterX;
        const translatedY = rotatedY + ringCenterY;

        this.verticies.push([translatedX, translatedY, z]);
      }
    }
  }
}
