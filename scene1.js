class Scene1 {
  constructor() {
    this.rosesPoseSwapper = new RosesPoseSwapper({});
  }

  update() {
    this.rosesPoseSwapper.update();
  }

  draw() {
    // console.log("audio.currentTime", audio.currentTime);
    if (
      audio.currentTime > 0 &&
      audio.currentTime < 0.1 &&
      lastNextSecond !== Math.floor(audio.currentTime)
    ) {
      lastNextSecond = Math.floor(audio.currentTime);
      rosesPoseSwapper.next();
    }

    if (
      audio.currentTime > 2 &&
      audio.currentTime < 2.1 &&
      lastNextSecond !== Math.floor(audio.currentTime)
    ) {
      lastNextSecond = Math.floor(audio.currentTime);
      rosesPoseSwapper.next();
    }
    if (
      audio.currentTime > 4 &&
      audio.currentTime < 4.1 &&
      lastNextSecond !== Math.floor(audio.currentTime)
    ) {
      lastNextSecond = Math.floor(audio.currentTime);
      rosesPoseSwapper.next();
    }
    if (
      audio.currentTime > 6 &&
      audio.currentTime < 6.1 &&
      lastNextSecond !== Math.floor(audio.currentTime)
    ) {
      lastNextSecond = Math.floor(audio.currentTime);
      rosesPoseSwapper.next();
    }
    if (
      audio.currentTime > 8 &&
      audio.currentTime < 8.1 &&
      lastNextSecond !== Math.floor(audio.currentTime)
    ) {
      lastNextSecond = Math.floor(audio.currentTime);
      rosesPoseSwapper.next();
    }

    rosesPoseSwapper.update();
    rosesPoseSwapper.draw();
  }
}
