class ConeOfCubes {
  constructor({ size } = {}) {
    this.size = size || 100;

    this.cubes = [];
    this.cone = new Cone({ width: 200, length: 500, depth: 200 });
    // this.cone.setRotation({ x: PI / 2, y: PI / 3 });

    this.cone.setTranslation({ y: 500 / 2 - 50 });
    const scaleFactor = 100;
    this.cone.scale({ x: scaleFactor, y: scaleFactor, z: scaleFactor });
    this.initSquares();

    this.loopLength = 1000;
  }

  initSquares() {
    const coneVertices = this.cone.getTransform(this.cone.verticies);

    // const cube = new Rectangle();
    // this.cubes.push(cube);

    for (let i = 0; i < coneVertices.length; i++) {
      let [x, y, z] = coneVertices[i];

      const cubeSize = 30;
      const cube = new Rectangle({
        width: cubeSize,
        height: cubeSize,
        depth: cubeSize,
        numPointsPerLine: 1,
        shouldDrawAsFaces: true,
      });

      this.cubes.push(cube);
      cube.setTranslation({ x, y, z });

      //   const cube = new Rectangle({ width: 10, length: 10, depth: 10 });
      //   console.log("cube", cube);
      //   // cube.setTranslation({ x, y, z });
      //   this.cubes.push(cube);
    }

    // console.log("this.cubes", this.cubes);
    // cylinderVertices.forEach(([x, y, z]) => {
    //   const cube = new Rectangle({ width: 10, height: 10, depth: 10 });
    //   cube.setTranslation({ x, y, z });
    //   this.cubes.push(cube);
    // });
  }

  update() {
    const loopPhase = Math.cos(frameCount / 1000 + PI);
    const numCubesToDraw = map(loopPhase, -1, 1, 0, this.cone.verticies.length);

    const coneVertices = this.cone.getTransform(this.cone.verticies);

    for (let i = 0; i < this.cubes.length; i++) {
      const cube = this.cubes[i];
      const [x, y, z] = coneVertices[i];

      cube.setTranslation({ x, y, z });
      // cube.setRotation({ x: PI / 3 });

      if (i < numCubesToDraw) {
        cube.shouldDraw = true;
      } else {
        cube.shouldDraw = false;
      }
      cube.shouldDraw = true;
    }
  }

  draw() {
    // this.cone.draw();
    this.cubes.forEach((cube) => {
      if (cube.shouldDraw) cube.draw();
    });
    this.cone.setRotation({ x: PI });
    this.cone.rotate({ y: 0.001 });
  }
}
