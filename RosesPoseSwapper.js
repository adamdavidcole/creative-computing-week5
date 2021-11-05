class RosesPoseSwapper {
  constructor() {
    this.swapDuration = 250; // swap duration millis
    this.stepSize = 5; // step duration in millis

    this.swapFrameCount = 30;

    this.roses = new Roses({});

    this.currSwapState = {
      isSwapping: false,
      aIncrement: 0,
      bIncrement: 0,
      steps: 30,
    };

    this.currPose = 0;
    this.poses = [
      { a: 0, b: 0, swapFrameCount: this.swapFrameCount },
      { a: 2, b: 0, swapFrameCount: this.swapFrameCount },
      { a: 2, b: 2, swapFrameCount: this.swapFrameCount },
      { a: 3.4, b: 2.5, swapFrameCount: this.swapFrameCount },
      { a: 4.5, b: 1, swapFrameCount: this.swapFrameCount },
      { a: 0, b: 0, swapFrameCount: 90 },
    ];

    // set roses pose to initial values
    const { a, b } = this.poses[this.currPose];

    this.roses.setMultipliers({ a, b });
  }

  next() {
    console.log("RosesPoseSwapper: begin next()");

    const currPose = this.poses[this.currPose];
    const nextPose = this.poses[this.currPose + 1];
    this.currPose++;

    const { a: startA, b: startB } = currPose;
    const { a: nextA, b: nextB, swapFrameCount } = nextPose;

    const steps = swapFrameCount;

    const aDistance = nextA - startA;
    const bDistance = nextB - startB;
    const aIncrement = aDistance / steps;
    const bIncrement = bDistance / steps;

    this.currSwapState = {
      isSwapping: true,
      aIncrement,
      bIncrement,
      stepsRemaining: swapFrameCount,
    };

    // let counter = 0;
    // console.log("steps", steps, Date.now());
    // const swapInterval = setInterval(() => {
    //   if (counter >= steps) {
    //     clearInterval(swapInterval);
    //     console.log("RosesPoseSwapper: end next()", this.currPose, Date.now());

    //     if (this.currPose === this.poses.length - 1) {
    //       this.roses.fadeOut();
    //     }

    //     return;
    //   }

    //   const { a, b } = this.roses.getMultipliers();
    //   const nextA = a + aIncrement;
    //   const nextB = b + bIncrement;
    //   this.roses.setMultipliers({ a: nextA, b: nextB });
    //   counter++;
    // }, this.stepSize);
  }

  update() {
    const { isSwapping, aIncrement, bIncrement, stepsRemaining } =
      this.currSwapState;

    if (isSwapping) {
      const { a, b } = this.roses.getMultipliers();
      const nextA = a + aIncrement;
      const nextB = b + bIncrement;
      this.roses.setMultipliers({ a: nextA, b: nextB });
      this.currSwapState = {
        ...this.currSwapState,
        stepsRemaining: stepsRemaining - 1,
      };
    }

    if (this.currSwapState.stepsRemaining <= 0) {
      this.currSwapState = { isSwapping: false };

      if (this.currPose === this.poses.length - 1) {
        this.roses.fadeOut();
      }
    }

    this.roses.update();
  }

  draw() {
    this.roses.draw();
  }
}
