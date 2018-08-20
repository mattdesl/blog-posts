[Linear interpolation](https://en.wikipedia.org/wiki/Linear_interpolation) (sometimes called `lerp` or `mix`) is a really handy function for creative coding, game development, data visualization and generative art.

The function interpolates within the range `[start..end]` based on a *t* parameter, where *t* is typically within a `[0..1]` range.

```
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
```

For example, divide 'loop time' by 'loop duration' and you get a *t* value between 0.0 and 1.0.

Now you can map this *t* value to a new range, such as `lerp(20, 50, t)` to gradually increase a circle's radius, or `lerp(20, 10, t)` to gradually decrease its line thickness.

![map one range to another](https://github.com/mattdesl/blog-posts/raw/master/lerp/2018.08.19-22.40.29.gif)

<sup>
↳ Mapping a value from one range to another.
</sup>

Another example: you can use linear interpolation to smoothly animate from one coordinate to another. Define a start point `(x1, y1)` and end point `(x2, y2)`, then interpolate the *x* and *y* dimensions separately to find the computed point in between.

![animate between points](https://github.com/mattdesl/blog-posts/raw/master/lerp/2018.08.19-22.41.19.gif)

<sup>
↳ Animating between two points.
</sup>

Or use linear interpolation to spring toward a moving target. Each frame, interpolate from the current value to the target value with a small *t* parameter, such as 0.05.

It's like saying: walk 5% toward the target each frame.

![springing toward a target](https://github.com/mattdesl/blog-posts/raw/master/lerp/2018.08.19-22.40.53.gif)

<sup>
↳ Springing toward a target.
</sup>

A more advanced example, but built on the same concept, is interpolating from one color (red) to another (blue).

To do this, we interpolate the (R, G, B) or (H, S, L) channels of the color individually, just like we would with a 2D or 3D coordinate.

![animate between two colors](https://github.com/mattdesl/blog-posts/raw/master/lerp/2018.08.19-22.39.52.gif)

<sup>
↳ Animating between two colors.
</sup>

There are lots of ways to use linear interpolation, and lots more types of interpolation (cubic, bilinear, etc). These concepts also lead nicely into areas like: curves, splines and parametric equations.

—

Source code for each of these examples:

https://github.com/mattdesl/blog-posts/tree/master/lerp