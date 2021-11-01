var dim = 100; // This is the number of rings
// Each ring has as many points as there are rings
// This is the spacing for each ring
var spacing = (Math.PI * 2) / dim;

// This is the total number of points
var numPoints = dim * dim;

// This is how big the sphere is.

let numRenderedRings = dim;

class Sphere extends Shape {
  constructor({ size, scale, translation, rotation }) {
    super();

    this.verticies = [];
    this.size = size || 1;

    this.initSphereVertices();
    console.log("this.vertices", this.verticies);
  }

  initSphereVertices() {
    for (var i = 0; i < numRenderedRings; i++) {
      // Calculate the depth spacing

      // To calculate the depth spacing, we divide our spacing in half
      // This is because otherwise, the cosine / sine waves will
      // oscillate positively and negatively
      // We only need the positive bit

      //     COOL MEGA SHAPE: come back to this later
      //      var z = size * Math.cos(spacing/2+1  * i);
      var z = this.size * Math.cos((spacing / 2) * i);

      // Calculate the size of the current ring
      //  COOL hourglass
      // var s = size * Math.sin(spacing  * i);
      // COOL tubes
      // var s = size * Math.sin(spacing* 10  * i);
      var s = this.size * Math.sin((spacing / 2) * i);

      // For each ring..

      for (var j = 0; j < dim; j++) {
        // ...create the next point in the circle at the current size s, at the current depth z

        var vertex = [Math.cos(spacing * j) * s, Math.sin(spacing * j) * s, z];

        // Add the point to the geometry.

        this.verticies.push(vertex);
      }
    }
  }
}
