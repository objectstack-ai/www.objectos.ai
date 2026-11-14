// Outside one suite's walls: an open runtime (the indigo hero tile) reads
// the systems your data already lives in, and the agent you choose works
// through it.
export const topic = 'ai-agents';
export const aria = 'A blue runtime links a database and a separate system on the left with an AI agent on the right.';

export default ({ C, cylinder, box, line, tile, agent, arrow }) => {
  const W = C.white;
  return [
    cylinder(250, 140, 160, 120, { bands: 1 }),
    box(170, 380, 160, 140, C.ink, 36), line('M206 430H294M206 470H266'),
    arrow('M352 214C396 214 404 268 426 280'), arrow('M352 450C396 450 404 404 426 392'),
    tile(460, 170, 300, 330, { deg: 2, inner: line('M510 250H710M510 330H670M510 410H690', W, 18) }),
    arrow('M846 336H806'),
    agent(944, 296, { s: 0.75, withFace: true }),
  ];
};
