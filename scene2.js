class Scene2 {
  constructor() {
    this.organicSpherePulse = new OrganicSpherePulse({
      loopPhaseStart: PI + PI / 3,
      loopSpeed: 3,
      size: 200,
    });

    const fadeInFrameDuration = 15;
    const fadeInStep = 1 / fadeInFrameDuration;

    this.hasBegunRotation = false;

    this.fadeInState = {
      isFadingIn: true,
      remainingFrameDuration: 15,
      fadeInStep,
    };

    this.rotationFactor = 0.01;
    this.rotationFactorAcceleration = 0.0001;

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

    if (!this.hasBegunRotation && audio.currentTime > 22) {
      this.hasBegunRotation = true;
    }

    if (this.hasBegunRotation) {
      this.organicSpherePulse.spherePulse.rotate({ y: this.rotationFactor });
      this.rotationFactor += this.rotationFactorAcceleration;
    }

    this.organicSpherePulse.update();
  }

  draw() {
    this.organicSpherePulse.draw();
  }
}
