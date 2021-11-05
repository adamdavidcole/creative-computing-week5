class OrganicSphereRing {
  constructor({ distance, scaleFactor } = {}) {
    this.totalSpheres = 12;
    this.sphereRadius = 150;
    this.distance = distance || 200;
    this.scaleFactor = scaleFactor || 1;

    this.spheres = [];

    this.transitionFrameDuration = 30;

    this.transitions = [];

    this.addTransition({
      distance: 0,
      scaleFactor: 0.25,
      frameDuration: 30,
    });

    this.transitionState = {
      isTransitioning: false,
    };

    for (let i = 0; i < this.totalSpheres; i++) {
      const sphere = new OrganicSpherePulse({
        size: this.sphereRadius,
        dimension: 10,
        numVerticesPerCircle: 26,
        numCircles: 52,
        loopPhaseStart: PI + PI / 4,
        startRotation: { x: PI / 2, z: -PI / 6 },
      });
      this.spheres.push(sphere);
    }

    this.setSphereDistanceFromCenter();
  }

  setSphereDistanceFromCenter() {
    for (let i = 0; i < this.totalSpheres; i++) {
      const sphere = this.spheres[i];

      const angle = (TWO_PI / this.totalSpheres) * i;
      const xCenter = Math.cos(angle) * this.distance;
      const yCenter = Math.sin(angle) * this.distance;

      sphere.spherePulse.setTranslation({ x: xCenter, y: yCenter });
      sphere.spherePulse.setScale({
        x: this.scaleFactor,
        y: this.scaleFactor,
        z: this.scaleFactor,
      });
    }
  }

  addTransition(transition) {
    this.transitions.push(transition);
  }

  startTransition() {
    const transition = this.transitions.shift();
    const {
      distance: endDistance,
      scaleFactor: endScaleFactor,
      frameDuration,
    } = transition;

    const transitionStep = 1 / frameDuration;

    const distanceStep = (endDistance - this.distance) * transitionStep;
    const scaleFactorStep =
      (endScaleFactor - this.scaleFactor) * transitionStep;

    this.transitionState = {
      isTransitioning: true,
      remainingFrameDuration: frameDuration || this.transitionFrameDuration,
      distanceStep,
      scaleFactorStep,
    };
  }

  update() {
    const {
      isTransitioning,
      remainingFrameDuration,
      distanceStep,
      scaleFactorStep,
    } = this.transitionState;

    if (this.transitions.length && !isTransitioning) {
      this.startTransition();
      console.log("OrganicSphereRing: start transition", this.transitionState);
    }

    if (isTransitioning) {
      this.distance += distanceStep;
      this.scaleFactor += scaleFactorStep;

      this.transitionState = {
        ...this.transitionState,
        remainingFrameDuration: remainingFrameDuration - 1,
      };

      if (remainingFrameDuration <= 0) {
        console.log("OrganicSphereRing: end transition");
        this.transitionState = { isTransitioning: false };
      }
    }

    // this.distance = map(mouseX, 0, width, -1000, 1000);
    // this.scaleFactor = map(mouseY, 0, height, -10, 10);

    // console.log(
    //   "this.distance",
    //   this.distance,
    //   "this.scaleFactor",
    //   this.scaleFactor
    // );

    this.setSphereDistanceFromCenter();
    this.spheres.forEach((sphere) => sphere.update());
  }

  draw() {
    this.spheres.forEach((sphere) => sphere.draw());
  }
}
