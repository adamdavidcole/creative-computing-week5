class Scene3 {
  constructor() {
    this.mirroredOrganicSpheres = new MirroredOrganicSpheres({});
  }

  update() {
    this.mirroredOrganicSpheres.update();
  }

  draw() {
    this.mirroredOrganicSpheres.draw();
  }
}
