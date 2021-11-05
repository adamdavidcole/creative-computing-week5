// HACK to get transform functions from shape -- doens't really extend shape's capabilities since has no vertices or draw function

class Camera extends Shape {
  constructor() {
    super();
  }

  update() {}
}
