// One open spec (the indigo hero tile, in braces) that different
// implementations read: a database, an app and an agent.
export const topic = 'app-building';
export const aria = 'A blue specification in braces at the top; a database, an app window and an AI agent below each point up to it.';

export default ({ C, tile, line, arrow, cylinder, box, dot, agent }) => {
  const W = C.white;
  return [
    tile(330, 104, 540, 206, {
      inner: [
        line('M410 146q-26 0-26 26v26q0 14-18 14 18 0 18 14v26q0 26 26 26', W, 12),
        line('M790 146q26 0 26 26v26q0 14 18 14-18 0-18 14v26q0 26-26 26', W, 12),
        line('M470 176H730M470 220H690M470 264H710', W, 18),
      ],
    }),
    arrow('M400 400V368'), arrow('M600 400V368'), arrow('M800 392V368'),
    cylinder(400, 432, 150, 108),
    box(530, 422, 140, 130, C.ink, 30), dot(558, 452, 7), dot(580, 452, 7), line('M558 492H642M558 524H620'),
    agent(800, 474, { s: 0.7 }),
  ];
};
