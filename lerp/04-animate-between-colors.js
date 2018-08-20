/**
 * lessons → lerpArray → animate between colors
 * —
 *
 * Animate between two HSL colors using a cubic easing function
 * and perceptual color space (CIELAB).
 *
 * You can read about color interpolation here:
 * https://howaboutanorange.com/blog/2011/08/10/color_interpolation/
 *
 * You can visualize the cubic bezier easing function using this tool:
 * http://cubic-bezier.com/?#.85,0,.15,1
 */

const canvasSketch = require('canvas-sketch');
const { lerpArray } = require('canvas-sketch-util/math');
const colorSpace = require('color-space');
const BezierEasing = require('bezier-easing');

const settings = {
  dimensions: [ 512, 512 ],
  animate: true,
  duration: 3
};

const rect = (context, x, y, width, height, color) => {
  context.fillStyle = color;
  context.fillRect(x, y, width, height);
};

const circle = (context, x, y, radius, color, lineWidth) => {
  context.strokeStyle = context.fillStyle = color;
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2, false);
  context.lineWidth = lineWidth;
  if (lineWidth != null) context.stroke();
  else context.fill();
};

const progress = (context, time, width, height, margin = 0) => {
  context.fillStyle = 'white';
  context.fillRect(
    margin * 2,
    height - margin * 2,
    (width - margin * 4) * time,
    4
  );
};

const sketch = ({ width, height }) => {
  const margin = 25;

  // A sharp in-out easing to snap forward without staying
  // in the in-between frames for too long.
  const ease = new BezierEasing(0.85, 0, 0.15, 1.0);

  return props => {
    // Destructure a few props we need
    const { context, width, height, playhead } = props;

    // Fill off-white background
    rect(context, 0, 0, width, height, 'hsl(0, 0%, 98%)');

    // Fill color foreground with padding
    rect(context, margin, margin, width - margin * 2, height - margin * 2, '#e5b5b5');

    // Draw this scene
    draw(props);

    // Also draw a timeline at the bottom
    progress(context, playhead, width, height, margin);
  };

  function draw ({ context, width, height, playhead, deltaTime }) {
    const radius = 80;

    // Get our 0..1 range value
    let t = playhead;

    // Ease the value so we spend less time with in-between colors
    t = ease(t);

    // Choose a start and end color, let's use HSL here for fun
    const color0HSL = [ 0, 50, 50 ];
    const color1HSL = [ 200, 30, 40 ];

    // Convert both colors to a perceptual color space
    // Can also try others like 'xyz', 'hsl', 'hsluv', 'lch'
    // In some cases this will help reduce in-between hue/saturation shifts
    const space = 'lab';
    const color0Conv = colorSpace.hsl[space](color0HSL);
    const color1Conv = colorSpace.hsl[space](color1HSL);

    // Interpolate within this new color space from A to B color
    const colorConv = lerpArray(color0Conv, color1Conv, t);

    // Now convert to regular RGB for our canvas
    const [ R, G, B ] = colorSpace[space].rgb(colorConv);

    // Create a CSS color string with R, G, B components
    const color = `rgb(${R.toFixed(6)}, ${G.toFixed(6)}, ${B.toFixed(6)})`;

    // Draw circle with this color
    circle(context, width / 2, height / 2, radius, color);
  }
};

canvasSketch(sketch, settings);
