class Shape {
  constructor({ verticies } = {}) {
    this.verticies = verticies;
    this.rotatation = [0, 0, 0];
    this.translation = [0, 0, 0];
    this.scaleFactor = [1, 1, 1];
  }

  /**
   * INCREMENTAL TRANSFORMS
   */
  translate({ x, y, z }) {
    console.log("x", x);
    this.translation[0] += x ?? 0; // x translation
    this.translation[1] += y ?? 0; // y translation
    this.translation[2] += z ?? 0; // z translation
  }

  rotate({ x, y, z }) {
    this.rotatation[0] += x || 0; // x rotation
    this.rotatation[1] += y || 0; // y rotation
    this.rotatation[2] += z || 0; // z rotation
  }

  scale({ x, y, z }) {
    this.scaleFactor[0] += x ?? 1; // x scale
    this.scaleFactor[1] += y ?? 1; // y scale
    this.scaleFactor[2] += z ?? 1; // z scale
  }

  /**
   * SET TRANSFORMS DIRECTLY
   */
  setTranslation({ x, y, z }) {
    const [currX, currY, currZ] = this.translation;
    this.translation[0] = x ?? currX; // x translation
    this.translation[1] = y ?? currY; // y translation
    this.translation[2] = z ?? currZ; // z translation
  }

  setRotation({ x, y, z }) {
    const [currX, currY, currZ] = this.rotatation;
    this.rotatation[0] = x || currX; // x rotation
    this.rotatation[1] = y || currY; // y rotation
    this.rotatation[2] = z || currZ; // z rotation
  }

  setScale({ x, y, z }) {
    const [currX, currY, currZ] = this.scaleFactor;
    this.scaleFactor[0] = x ?? currX; // x scale
    this.scaleFactor[1] = y ?? currY; // y scale
    this.scaleFactor[2] = z ?? currZ; // z scale
  }

  /**
   * ROTATION TRANSFORM OPERATIONS
   */
  rotateX(vertex, angleX) {
    if (angleX === 0) return vertex;

    let [x, y, z] = vertex;

    var cosRX = Math.cos(angleX);
    var sinRX = Math.sin(angleX);

    var tempy = y;
    var tempz = z;

    y = tempy * cosRX - tempz * sinRX;
    z = tempy * sinRX + tempz * cosRX;

    return [x, y, z];
  }

  rotateY(vertex, angleY) {
    if (angleY === 0) return vertex;

    let [x, y, z] = vertex;

    var cosRY = Math.cos(angleY);
    var sinRY = Math.sin(angleY);

    var tempx = x;
    var tempz = z;

    x = tempx * cosRY + tempz * sinRY;
    z = tempx * -sinRY + tempz * cosRY;

    return [x, y, z];
  }

  rotateZ(vertex, angleZ) {
    if (angleZ === 0) return vertex;

    let [x, y, z] = vertex;

    var cosRZ = Math.cos(angleZ);
    var sinRZ = Math.sin(angleZ);

    var tempx = x;
    var tempy = y;

    x = tempx * cosRZ - tempy * sinRZ;
    y = tempx * sinRZ + tempy * cosRZ;

    return [x, y, z];
  }

  /**
   * 3D TRANSFORMATION AND PROJECTION
   */

  // get transformed model without projection
  getTransform(verticies) {
    return verticies.map((vertex) => {
      // get transform values
      const [translationX, translationY, translationZ] = this.translation;
      const [rotationX, rotationY, rotationZ] = this.rotatation;
      const [scaleX, scaleY, scaleZ] = this.scaleFactor;

      // rotate the shape
      let rotatedVertex = [...vertex];
      rotatedVertex = this.rotateX(rotatedVertex, rotationX);
      rotatedVertex = this.rotateY(rotatedVertex, rotationY);

      let [x, y, z] = rotatedVertex;

      // scale and translate the shape
      x = scaleX * x + translationX;
      y = scaleY * y + translationY;
      z = scaleZ * z + translationZ;

      return [x, y, z];
    });
  }

  getProjectionTransform(verticies) {
    return verticies.map((vertex) => {
      // get transform values
      const [translationX, translationY, translationZ] = this.translation;
      const [rotationX, rotationY, rotationZ] = this.rotatation;
      const [scaleX, scaleY, scaleZ] = this.scaleFactor;

      // rotate the shape
      let rotatedVertex = [...vertex];
      rotatedVertex = this.rotateX(rotatedVertex, rotationX);
      rotatedVertex = this.rotateY(rotatedVertex, rotationY);
      rotatedVertex = this.rotateZ(rotatedVertex, rotationZ);

      let [x, y, z] = rotatedVertex;

      // scale and translate the shape
      x = scaleX * x + translationX;
      y = scaleY * y + translationY;
      z = scaleZ * z + translationZ;

      let modelVertex = [x, y, z];

      // camera
      if (useCameraView) {
        const [cameraRotationX, cameraRotationY, cameraRotationZ] =
          camera.rotatation;
        const [cameraTranslationX, cameraTranslationY, cameraTranslationZ] =
          camera.translation;
        const [cameraScaleX, cameraScaleY, cameraScaleZ] = camera.scaleFactor;

        rotatedVertex = this.rotateX(modelVertex, cameraRotationX);
        rotatedVertex = this.rotateY(rotatedVertex, cameraRotationY);
        rotatedVertex = this.rotateZ(rotatedVertex, cameraRotationZ);

        [x, y, z] = rotatedVertex;

        x = cameraScaleX * x + cameraTranslationX;
        y = cameraScaleY * y + cameraTranslationY;
        z = cameraScaleZ * z + cameraTranslationZ;
      }

      // get 3D projection scale factor
      const projectionScale = fov / (fov + z);

      // project the shape into 3D and translate to world center
      const projectionX = projectionScale * x + width / 2;
      const projectionY = projectionScale * y + height / 2;

      // return projected/transformed vertex with projectionScale as extra value for use later
      return [projectionX, projectionY, z, projectionScale];
    });
  }

  /**
   * DRAW SHAPE
   */
  draw() {
    // get 3D projected and transformed model
    const projectedVertices = this.getProjectionTransform(this.verticies);

    // draw each vertex
    projectedVertices.forEach(([x, y, z, projectionScale], i) => {
      context.lineWidth = projectionScale;

      // if point is beyond field of view, do not render it
      if (z < -fov) return;

      context.strokeStyle = strokeColor;
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x + projectionScale, y);
      context.stroke();
    });
  }
}
