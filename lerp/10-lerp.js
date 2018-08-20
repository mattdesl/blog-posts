// Linear Interpolation
// Also known as "lerp" or "mix"
function lerp (start, end, t) {
  return start * (1 - t) + end * t;
}

// Examples:
lerp(0, 100, 0.5); // 50
lerp(20, 80, 0); // 20
lerp(30, 5, 1); // 5
lerp(-1, 1, 0.5); // 0
lerp(0.5, 1, 0.5); // 0.75