class OrganicSpherePulse {
  constructor({ ...args }) {
    this.spherePulse = new SpherePulse({ ...args });
  }

  update() {
    const loopPhase = Math.cos(frameCount / 500 + PI);
    const currPulsePhase = map(loopPhase, -1, 1, 0, 5 * TWO_PI);

    this.spherePulse.pulsePeriod = currPulsePhase;

    this.spherePulse.update();

    // const zScalePhase = Math.cos(frameCount / 20 + PI);
    // const currZScalePhase = map(zScalePhase, -1, 1, 0.95, 1.05);

    // this.spherePulse.setScale({ y: currZScalePhase });
    // this.spherePulse.setScale({ z: 0, x: 0 });

    this.spherePulse.rotate({ x: 0.001, y: 0.001 });
    // this.spherePulse.setRotation({
    //   x: map(mouseX, 0, width, -TWO_PI, TWO_PI),
    //   y: map(mouseY, 0, height, -TWO_PI, TWO_PI),
    // });
  }

  draw() {
    this.spherePulse.draw();
  }
}
