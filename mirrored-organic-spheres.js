class MirroredOrganicSpheres {
  constructor() {
    const loopPhaseStart = 0 - PI * 0.05;
    this.sphereA = new OrganicSpherePulse({
      size: 200,
      loopPhaseStart: loopPhaseStart,
      autoRotate: false,
    });
    this.sphereB = new OrganicSpherePulse({
      size: 200,
      loopPhaseStart: loopPhaseStart,
      autoRotate: false,
    });

    // this.sphereA.spherePulse.translate({ x: -300 });
    // this.sphereB.spherePulse.translate({ x: 300 });

    // const scaleFactor = 0.9;
    // this.sphereB.spherePulse.setScale({
    //   x: scaleFactor,
    //   y: scaleFactor,
    //   z: scaleFactor,
    // });

    const xStart = -1820;
    const xEnd = 952;
    const yStart = 72;
    const yEnd = 0;
    const rotationEnd = 2.862;

    const fadeInFrameDuration = 240;
    const fadeInStep = 1 / fadeInFrameDuration;

    const xStep = (xEnd - xStart) * fadeInStep;
    const yStep = (yEnd - yStart) * fadeInStep;

    this.fadeInState = {
      isFadingIn: true,
      remainingFrameDuration: fadeInFrameDuration,
      xStep,
      yStep,
    };

    const scaleFactor = 4;
    this.sphereA.spherePulse.setScale({
      x: scaleFactor,
      y: scaleFactor,
      z: scaleFactor,
    });
    this.sphereB.spherePulse.setScale({
      x: scaleFactor,
      y: -scaleFactor,
      z: scaleFactor,
    });

    this.sphereA.spherePulse.setRotation({ x: -rotationEnd, y: -rotationEnd });
    this.sphereB.spherePulse.setRotation({ x: rotationEnd, y: rotationEnd });

    this.sphereA.spherePulse.translate({ x: xStart, y: yStart });
    this.sphereB.spherePulse.translate({ x: -xStart, y: -yStart });
  }

  update() {
    const { isFadingIn, remainingFrameDuration, fadeInStep, xStep, yStep } =
      this.fadeInState;

    if (isFadingIn) {
      this.sphereA.spherePulse.translate({
        x: xStep,
        y: yStep,
      });
      this.sphereB.spherePulse.translate({
        x: -xStep,
        y: -yStep,
      });
    }

    if (remainingFrameDuration <= 0) {
      this.fadeInState = { isFadingIn: false };
    }

    console.log("-----------");
    console.log(this.sphereA.spherePulse.rotatation);
    console.log(this.sphereB.spherePulse.rotatation);

    this.fadeInState = {
      ...this.fadeInState,
      remainingFrameDuration: remainingFrameDuration - 1,
    };

    this.sphereA.update();
    this.sphereB.update();

    // const distanceHorizontal = map(mouseX, 0, width, -2 * width, 2 * width);
    // const distanceVertical = map(mouseY, 0, height, -2 * height, 2 * height);

    // const rotationX = map(mouseX, 0, width, -TWO_PI, TWO_PI);
    // const rotationY = map(mouseX, 0, width, -TWO_PI, TWO_PI);

    // this.sphereA.spherePulse.setTranslation({
    //   x: -distanceHorizontal,
    //   y: -distanceVertical,
    // });
    // this.sphereB.spherePulse.setTranslation({
    //   x: distanceHorizontal,
    //   y: distanceVertical,
    // });

    // this.sphereA.spherePulse.setRotation({ x: -rotationX, y: -rotationY });
    // this.sphereB.spherePulse.setRotation({ x: rotationX, y: rotationY });

    // console.log("A:", {
    //   x: -distanceHorizontal,
    //   y: -distanceVertical,
    //   rx: -rotationX,
    //   ry: -rotationY,
    // });
    // console.log("B:", {
    //   x: distanceHorizontal,
    //   y: distanceVertical,
    //   rx: rotationX,
    //   ry: rotationY,
    // });
  }

  draw() {
    this.sphereA.draw();
    this.sphereB.draw();
  }
}
