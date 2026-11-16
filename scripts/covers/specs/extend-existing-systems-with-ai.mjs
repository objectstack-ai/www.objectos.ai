// The database stays where it is: a dotted read-only link lifts it into a
// governed object layer (the indigo hero tile, an eye for read-only), which
// the agent reads.
export const topic = 'integration-data';
export const aria = 'An existing database stays in place; a dotted link reads it into a blue read-only layer that an AI agent uses.';

export default ({ C, cylinder, arrow, tile, line, dot, agent, DOTTED }) => {
  const W = C.white;
  return [
    cylinder(270, 350, 190, 170, { bands: 2 }),
    arrow('M300 300C300 220 350 210 420 210', C.ink, 9, DOTTED),
    tile(460, 110, 330, 230, { deg: -2, inner: [line('M530 226Q625 150 720 226Q625 302 530 226z', W, 12), dot(625, 226, 24, W)] }),
    arrow('M834 226H874'),
    agent(950, 226, { s: 0.85 }),
  ];
};
