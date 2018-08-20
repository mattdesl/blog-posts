## About

Interpolating between things using `lerp`.

```js
function lerp (start, end, t) {
  return start * (1 - t) + end * t;
}
```

The examples use the Canvas2D for rendering, [canvas-sketch](https://github.com/mattdesl/canvas-sketch/) to organize the loop, and [canvas-sketch-util](https://github.com/mattdesl/canvas-sketch-util) for the linear interpolation utilities.
