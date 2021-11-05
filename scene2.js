class Scene2 {
  constructor() {
    this.organicSpherePulse = new OrganicSpherePulse({
      loopPhaseStart: PI + PI / 3,
      loopSpeed: 3,
      size: 300,
    });

    const fadeInFrameDuration = 15;
    const fadeInStep = 1 / fadeInFrameDuration;

    this.fadeInState = {
      isFadingIn: true,
      remainingFrameDuration: 15,
      fadeInStep,
    };

    this.organicSpherePulse.spherePulse.setScale({ x: 0, y: 0, z: 0 });
  }

  update() {
    const { isFadingIn, remainingFrameDuration, fadeInStep } = this.fadeInState;

    if (isFadingIn) {
      this.organicSpherePulse.spherePulse.scale({
        x: fadeInStep,
        y: fadeInStep,
        z: fadeInStep,
      });

      this.fadeInState = {
        ...this.fadeInState,
        remainingFrameDuration: remainingFrameDuration - 1,
      };

      if (remainingFrameDuration <= 0) {
        this.fadeInState = { isFadingIn: false };
      }
    }

    this.organicSpherePulse.update();
  }

  draw() {
    this.organicSpherePulse.draw();
  }
}
