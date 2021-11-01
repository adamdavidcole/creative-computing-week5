class Shape {
  constructor({ verticies }) {
    this.verticies = verticies;
    this.rotatation = [0, 0, 0];
    this.translation = [0, 0, 0];
    this.scale = [1, 1, 1];
  }

  translate({ x, y, z } = { x: 0, y: 0, z: 0 }) {
    this.translation[0] += x; // x translation
    this.translation[1] += y; // y translation
    this.translation[2] += z; // ztranslation
  }

  rotate({ x, y, z } = { x: 0, y: 0, z: 0 }) {}

  scale({ x, y, z } = { x: 1, y: 1, z: 1 }) {
    this.translation[0] += x; // x scale
    this.translation[1] += y; // y scale
    this.translation[2] += z; // z scale
  }

  getModelTransform(verticies) {
    const transformedVertices = verticies.forEach(([x, y, z]) => {
      const [translateX, translateY, translateZ] = this.translation;

      return [x + translateX, y + translateY, z + translateZ];
    });
  }

  getProjectionTransform(transformedVertices) {
    const projectedVertices = transformedVertices.forEach(([x, y, z]) => {
      //   if (z3d < -fov) z3d += fov;
      var scale = fov / (fov + z);
      return [x * scale, y * scale, z, scale];
    });

    for (var i = 0; i < numRenderedRings * numRenderedRings; i++) {
      point3d = points[i];
      z3d = point3d[2];

      // This is the speed of the z
      // It moves the points forwards in space
      // We don't need it for the pure rotate
      z3d -= 1.0;

      // Check that the points aren't disappearing into space and if so push them back
      // This also stops them stretching
      // When they get too close
      if (z3d < -fov) z3d += 2 * fov;

      point3d[2] = z3d;

      // Calculate the rotation

      //     rotateX(point3d,angleX/4);
      //     rotateY(point3d,angleY/4);

      // Get the point in position

      x3d = point3d[0];
      y3d = point3d[1];
      z3d = point3d[2];
      // Convert the Z value to a scale factor
      // This will give the appearance of depth
      var scale = fov / (fov + z3d);

      // Store the X value with the scaling
      // FOV is taken into account
      // (just pushing it over to the left a bit too)
      var x2d = x3d * scale + HALF_WIDTH;

      // Store the Y value with the scaling
      // FOV is taken into account

      var y2d = y3d * scale + HALF_HEIGHT;

      // Draw the point

      // Set the size based on scaling
      context.lineWidth = scale;

      context.strokeStyle = "rgb(255,255,255)";
      context.beginPath();
      context.moveTo(x2d, y2d);
      context.lineTo(x2d + scale, y2d);
      context.stroke();
    }
  }

  draw() {
    const transformedVertices = this.getModelTransform(this.verticies);
    const projectedVertices = this.getProjectionTransform(transformedVertices);

    const projectedVertices = transformedVertices.forEach(
      ([x, y, z, scale]) => {
        context.lineWidth = scale;

        context.strokeStyle = "rgb(255,255,255)";
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x + scale, y);
        context.stroke();
      }
    );
  }
}
