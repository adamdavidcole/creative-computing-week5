class Cone extends Shape {
  constructor() {
    super();

    this.verticesPerRing = 100;

    this.verticesPerLength = 20;
    this.totalLength = 1;

    this.ringsPerCap = 10;
    this.capRadius = 1;

    this.verticies = [];

    this.setScale({ x: 50, y: 100, z: 50 });

    this.initConeVertices();
    console.log("this.vertices", this.vertices);
  }

  initConeVertices() {
    const lengthSpacing = this.totalLength / this.verticesPerLength;
    const angleIncr = TWO_PI / this.verticesPerRing;

    this.verticies.push([0, 0, 0]);

    for (let i = lengthSpacing; i < this.totalLength; i += lengthSpacing) {
      for (let angle = 0; angle < TWO_PI - angleIncr; angle += angleIncr) {
        const x = Math.cos(angle) * i;
        const z = Math.sin(angle) * i;
        const y = i;

        this.verticies.push([x, y, z]);
      }
    }

    const capSpacing = this.capRadius / this.ringsPerCap;

    for (let i = 0; i < this.capRadius; i += capSpacing) {
      for (let angle = 0; angle < TWO_PI - angleIncr; angle += angleIncr) {
        const x = Math.cos(angle) * i;
        const z = Math.sin(angle) * i;
        const y = 1; // position of cap

        this.verticies.push([x, y, z]);
      }
    }
  }
}
