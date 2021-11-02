function vecDistance(vec1, vec2) {
  const [x1, y1, z1] = vec1;
  const [x2, y2, z2] = vec2;

  const distSquared =
    Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2);
  return Math.sqrt(distSquared);
}
