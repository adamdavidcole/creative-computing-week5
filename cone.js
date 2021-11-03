class Cone extends Shape {
  constructor({ width, length, depth }) {
    super();

    this.verticesPerRing = 100;

    this.verticesPerLength = 20;
    this.totalLength = 1;

    this.ringsPerCap = 10;
    this.capRadius = 1;

    this.verticies = [];

    this.width = width || 50;
    this.length = length || 100;
    this.depth = depth || 50;

    this.setScale({ x: this.width, y: this.length, z: this.depth });

    this.initConeVertices();
  }

  initConeVertices() {
    const lengthSpacing = this.totalLength / this.verticesPerLength;
    const capSpacing = this.capRadius / this.ringsPerCap;
    const angleIncr = TWO_PI / this.verticesPerRing;

    this.verticies.push([0, 0, 0]);

    for (let i = 0; i < this.capRadius; i += capSpacing) {
      for (let angle = 0; angle < TWO_PI - angleIncr; angle += angleIncr) {
        const x = Math.cos(angle) * i;
        const z = Math.sin(angle) * i;
        const y = 0; // position of cap

        this.verticies.push([x, y, z]);
      }
    }

    for (let i = this.totalLength; i > 0; i -= lengthSpacing) {
      for (let angle = 0; angle < TWO_PI - angleIncr; angle += angleIncr) {
        const x = Math.cos(angle) * i;
        const z = Math.sin(angle) * i;
        const y = this.totalLength - i;

        this.verticies.push([x, y, z]);
      }
    }
  }
}
