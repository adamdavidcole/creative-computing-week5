class MirroredOrganicSpheres {
  constructor() {
    this.sphereA = new OrganicSpherePulse({ size: 200 });
    this.sphereB = new OrganicSpherePulse({ size: 200 });

    this.sphereA.spherePulse.translate({ x: -300 });
    this.sphereB.spherePulse.translate({ x: 300 });

    // const scaleFactor = 0.9;
    // this.sphereB.spherePulse.setScale({
    //   x: scaleFactor,
    //   y: scaleFactor,
    //   z: scaleFactor,
    // });
  }

  update() {
    this.sphereA.update();
    this.sphereB.update();

    const distance = map(mouseY, 0, height, -300, 300);

    const rotationX = map(mouseX, 0, width, -TWO_PI, TWO_PI);
    const rotationY = map(mouseX, 0, width, -TWO_PI, TWO_PI);

    this.sphereA.spherePulse.setTranslation({ x: -distance });
    this.sphereB.spherePulse.setTranslation({ x: distance });

    this.sphereA.spherePulse.setRotation({ x: -rotationX, y: -rotationY });
    this.sphereB.spherePulse.setRotation({ x: rotationX, y: rotationY });
  }

  draw() {
    this.sphereA.draw();
    this.sphereB.draw();
  }
}
