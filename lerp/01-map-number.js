/**
 * lessons → lerp → map to a new range
 * —
 *
 * Map a number within 0.0 to 1.0 to a new range, such as 20.0 to 50.0.
 * For example, scaling a parameter from a start to end value.
 */

const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');

const settings = {
  dimensions: [ 512, 512 ],
  animate: true,
  duration: 5
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
    // Get our 0..1 range value
    const t = playhead;

    // Interpolate from start=20 to end=50 radius using t
    const radius = lerp(20, 50, t);

    // Interpolate from start=20 to end=10 line width using t
    const lineWidth = lerp(20, 10, t);

    // Draw circle
    circle(context, width / 2, height / 2, radius, 'white', lineWidth);
  }
};

canvasSketch(sketch, settings);
