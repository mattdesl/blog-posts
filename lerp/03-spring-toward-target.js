/**
 * lessons → lerp → spring toward target
 * —
 *
 * Move in two dimensions toward a target using linear interpolation.
 * This produces a bit of a 'spring' effect when the target is far away.
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
  const targets = [
    [ width * 0.25, height * 0.5 ],
    [ width * 0.25, height * 0.25 ],
    [ width * 0.75, height * 0.75 ],
    [ width * 0.5, height * 0.5 ]
  ];

  const point = [ width * 0.5, height * 0.5 ];
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
    // Chosoe size of circle & stroke
    const lineWidth = 4;
    const radius = 20;

    // Choose one of the N targets based on loop time
    const targetIndex = Math.floor(playhead * targets.length);
    const target = targets[targetIndex];

    // Draw the start and end point
    circle(context, target[0], target[1], radius, 'white', lineWidth);

    // Determine a rate at which we will step forward each frame,
    // making it dependent on the time elapsed since last frame
    const rate = 4 * deltaTime;

    // Interpolate toward the target point at this rate
    point[0] = lerp(point[0], target[0], rate);
    point[1] = lerp(point[1], target[1], rate);

    // Draw current point
    circle(context, point[0], point[1], radius / 2, 'white');
  }
};

canvasSketch(sketch, settings);
