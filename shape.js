class Shape {
  constructor({ verticies } = {}) {
    this.verticies = verticies;
    this.rotatation = [0, 0, 0];
    this.translation = [0, 0, 0];
    // this.translation = [width / 2, height / 2, 0];
    this.scaleFactor = [1, 1, 1];
  }

  translate({ x, y, z }) {
    this.translation[0] += x || 0; // x translation
    this.translation[1] += y || 0; // y translation
    this.translation[2] += z || 0; // ztranslation
  }

  rotate({ x, y, z }) {
    this.rotatation[0] += x || 0;
    this.rotatation[1] += y || 0;
    this.rotatation[2] += z || 0;
  }

  scale({ x, y, z }) {
    this.scaleFactor[0] += x || 1; // x scale
    this.scaleFactor[1] += y || 1; // y scale
    this.scaleFactor[2] += z || 1; // z scale
  }

  rotateX(vertex, angleX) {
    let [x, y, z] = vertex;

    var cosRY = Math.cos(angleX);
    var sinRY = Math.sin(angleX);

    var tempz = z;
    var tempx = x;

    x = tempx * cosRY + tempz * sinRY;
    z = tempx * -sinRY + tempz * cosRY;

    return [x, y, z];
  }

  rotateY(vertex, angleY) {
    let [x, y, z] = vertex;

    var cosRX = Math.cos(angleY);
    var sinRX = Math.sin(angleY);

    var tempz = z;
    var tempy = y;

    y = tempy * cosRX + tempz * sinRX;
    z = tempy * -sinRX + tempz * cosRX;

    return [x, y, z];
  }

  getWorkingTransform(verticies) {
    return verticies.map((vertex) => {
      //   z -= 1.0;
      //   if (z < -fov) z = fov;
      const [translationX, translationY, translationZ] = this.translation;
      const [rotationX, rotationY, rotationZ] = this.rotatation;
      const [scaleX, scaleY, scaleZ] = this.scaleFactor;

      let rotatedVertex = [...vertex];
      rotatedVertex = this.rotateX(rotatedVertex, rotationX);
      rotatedVertex = this.rotateY(rotatedVertex, rotationY);

      let [x, y, z] = rotatedVertex;

      z = scaleZ * z + translationZ;
      //   if (z < -fov) {
      //     z = 0;
      //     vertex[2] = z;
      //   }

      const projectionScale = fov / (fov + z);

      const projectionX =
        projectionScale * scaleX * x + translationX + width / 2;
      const projectionY =
        projectionScale * scaleY * y + translationY + height / 2;

      return [projectionX, projectionY, z, projectionScale];
    });
  }

  getModelTransform(verticies) {
    const transformedVertices = verticies.map(([x, y, z], i) => {
      if (i == 100) console.log("mapping", { x, y, z });

      const [translateX, translateY, translateZ] = this.translation;
      const [scaleX, scaleY, scaleZ] = this.scaleFactor;
      const [rotationX, rotationY, rotationZ] = this.rotatation;

      var projectionScale = fov / (fov + z * scaleZ);

      const scaledVertex = [scaleX * x, scaleY * y, scaleZ * z];

      //   const rotatedVertex = scaledVertex;
      const rotatedVertex = this.rotateY(
        this.rotateX(scaledVertex, rotationX),
        rotationY
      );

      const translatedVertex = [
        rotatedVertex[0] + translateX,
        rotatedVertex[1] + translateY,
        rotatedVertex[2] + translateZ,
      ];

      return [...translatedVertex, projectionScale];
      //   return [
      //     scaleX * projectionScale * x + translateX,
      //     scaleY * projectionScale * y + translateY,
      //     scaleZ * z + translateZ,
      //     projectionScale,
      //   ];
    });

    return transformedVertices;
  }

  getProjectionTransform(transformedVertices) {
    const projectedVertices = transformedVertices.map(([x, y, z], i) => {
      if (i == 100) console.log("transformed", { x, y, z, scale });
      //   if (z3d < -fov) z3d += fov;
      var scale = fov / (fov + z);
      return [x * scale + width / 2, y * scale + height / 2, z, scale];
    });

    return projectedVertices;

    // for (var i = 0; i < numRenderedRings * numRenderedRings; i++) {
    //   point3d = points[i];
    //   z3d = point3d[2];

    //   // This is the speed of the z
    //   // It moves the points forwards in space
    //   // We don't need it for the pure rotate
    //   z3d -= 1.0;

    //   // Check that the points aren't disappearing into space and if so push them back
    //   // This also stops them stretching
    //   // When they get too close
    //   if (z3d < -fov) z3d += 2 * fov;

    //   point3d[2] = z3d;

    //   // Calculate the rotation

    //   //     rotateX(point3d,angleX/4);
    //   //     rotateY(point3d,angleY/4);

    //   // Get the point in position

    //   x3d = point3d[0];
    //   y3d = point3d[1];
    //   z3d = point3d[2];
    //   // Convert the Z value to a scale factor
    //   // This will give the appearance of depth
    //   var scale = fov / (fov + z3d);

    //   // Store the X value with the scaling
    //   // FOV is taken into account
    //   // (just pushing it over to the left a bit too)
    //   var x2d = x3d * scale + HALF_WIDTH;

    //   // Store the Y value with the scaling
    //   // FOV is taken into account

    //   var y2d = y3d * scale + HALF_HEIGHT;

    //   // Draw the point

    //   // Set the size based on scaling
    //   context.lineWidth = scale;

    //   context.strokeStyle = "rgb(255,255,255)";
    //   context.beginPath();
    //   context.moveTo(x2d, y2d);
    //   context.lineTo(x2d + scale, y2d);
    //   context.stroke();
    // }
  }

  draw() {
    // const transformedVertices = this.getModelTransform(this.verticies);
    // const projectedVertices = this.getProjectionTransform(transformedVertices);
    const projectedVertices = this.getWorkingTransform(this.verticies);

    projectedVertices.forEach(([x, y, z, scale], i) => {
      context.lineWidth = scale;

      //   if (i == 100) console.log({ x, y, z, scale });

      context.strokeStyle = "rgb(255,255,255)";
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x + scale, y);
      context.stroke();
    });

    // WORKING ORIGINAL
    // const points = this.verticies;

    // for (var i = 0; i < points.length; i++) {
    //   const point3d = points[i];
    //   //   let z3d = point3d[2];

    //   // This is the speed of the z
    //   // It moves the points forwards in space
    //   // We don't need it for the pure rotate

    //   // Check that the points aren't disappearing into space and if so push them back
    //   // This also stops them stretching
    //   // When they get too close
    //   //              z3d -= 1.0;

    //   //   if (z3d < -fov) z3d += 0;

    //   //   point3d[2] = z3d;

    //   // Calculate the rotation

    //   //     rotateX(point3d,angleX);
    //   //     rotateY(point3d,angleY);

    //   // Get the point in position

    //   let x3d = point3d[0];
    //   let y3d = point3d[1];
    //   let z3d = point3d[2];
    //   // Convert the Z value to a scale factor
    //   // This will give the appearance of depth
    //   var scale = fov / (fov + z3d);

    //   // Store the X value with the scaling
    //   // FOV is taken into account
    //   // (just pushing it over to the left a bit too)
    //   var x2d = x3d * scale + width / 2;

    //   // Store the Y value with the scaling
    //   // FOV is taken into account

    //   var y2d = y3d * scale + height / 2;

    //   // Draw the point

    //   // Set the size based on scaling
    //   context.lineWidth = scale;

    //   context.strokeStyle = "rgb(255,255,255)";
    //   context.beginPath();
    //   context.moveTo(x2d, y2d);
    //   context.lineTo(x2d + scale, y2d);
    //   context.stroke();
    // }
  }
}
