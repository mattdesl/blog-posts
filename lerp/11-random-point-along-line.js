const { lerpArray } = require('canvas-sketch-util/math');

// Select a random point along the line segment A-B
const A = [ 20, 30 ];
const B = [ 40, 70 ];
const t = Math.random();
const point = lerpArray(A, B, t);