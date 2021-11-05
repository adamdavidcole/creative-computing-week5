let transitionLastSecond = -1;
const transitionTime2 = 58.078;
const transitionTime3 = 60.5;

class Scene4 {
  constructor() {
    this.organicSphereRing = new OrganicSphereRing({
      distance: 40,
      scaleFactor: 3.38,
    });

    this.organicSphereRing.addTransition({
      distance: 0.4,
      scaleFactor: 0.625,
      frameDuration: 30,
    });

    this.organicSphereRing.addTransition({
      distance: 11,
      scaleFactor: 1.72,
      frameDuration: 30,
    });

    this.organicSphereRing.addTransition({
      distance: 0.8,
      scaleFactor: 1.23,
      frameDuration: 60,
    });

    this.organicSphereRing.addTransition({
      distance: 7.407,
      scaleFactor: 1.846,
      frameDuration: 60,
    });
  }

  update() {
    if (
      audio.currentTime > transitionTime2 &&
      audio.currentTime < transitionTime2 + 0.1 &&
      transitionLastSecond !== Math.floor(audio.currentTime)
    ) {
      transitionLastSecond = Math.floor(audio.currentTime);

      this.organicSphereRing.addTransition({
        distance: 161,
        scaleFactor: 0.523,
        frameDuration: 30,
      });
    }

    if (
      audio.currentTime > transitionTime3 &&
      audio.currentTime < transitionTime3 + 0.1 &&
      transitionLastSecond !== Math.floor(audio.currentTime)
    ) {
      transitionLastSecond = Math.floor(audio.currentTime);

      this.organicSphereRing.addTransition({
        distance: 640,
        scaleFactor: -9.107,
        frameDuration: 90,
      });
    }

    // if (
    //   audio.currentTime > 2 &&
    //   audio.currentTime < 2.1 &&
    //   lastNextSecond !== Math.floor(audio.currentTime)
    // ) {
    //   lastNextSecond = Math.floor(audio.currentTime);
    //   rosesPoseSwapper.next();
    // }
    // if (
    //   audio.currentTime > 4 &&
    //   audio.currentTime < 4.1 &&
    //   lastNextSecond !== Math.floor(audio.currentTime)
    // ) {
    //   lastNextSecond = Math.floor(audio.currentTime);
    //   rosesPoseSwapper.next();
    // }
    // if (
    //   audio.currentTime > 6 &&
    //   audio.currentTime < 6.1 &&
    //   lastNextSecond !== Math.floor(audio.currentTime)
    // ) {
    //   lastNextSecond = Math.floor(audio.currentTime);
    //   rosesPoseSwapper.next();
    // }
    // if (
    //   audio.currentTime > 8 &&
    //   audio.currentTime < 8.1 &&
    //   lastNextSecond !== Math.floor(audio.currentTime)
    // ) {
    //   lastNextSecond = Math.floor(audio.currentTime);
    //   rosesPoseSwapper.next();
    // }

    this.organicSphereRing.update();
  }

  draw() {
    this.organicSphereRing.draw();
  }
}
