class OrganicSphereRing {
  constructor() {
    this.totalSpheres = 12;
    this.sphereRadius = 150;
    this.distance = 200;

    this.spheres = [];

    for (let i = 0; i < this.totalSpheres; i++) {
      const sphere = new OrganicSpherePulse({
        size: this.sphereRadius,
        dimension: 10,
        numVerticesPerCircle: 26,
        numCircles: 52,
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

  update() {
    this.distance = map(mouseX, 0, width, -1000, 1000);
    this.scaleFactor = map(mouseY, 0, height, -10, 10);

    this.setSphereDistanceFromCenter();
    this.spheres.forEach((sphere) => sphere.update());
  }

  draw() {
    this.spheres.forEach((sphere) => sphere.draw());
  }
}
