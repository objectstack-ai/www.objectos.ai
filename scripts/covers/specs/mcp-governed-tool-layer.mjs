// Behind the protocol, a governed tool layer (the indigo hero tile): every
// agent's call passes through it with identity, then reaches your data.
export const topic = 'ai-agents';
export const aria = 'Three AI agents call through a blue tool layer, each through its own slot, before reaching a database.';

export default ({ C, agent, arrow, tile, fill, slotChevron, line, cylinder }) => {
  const W = C.white;
  const ys = [200, 335, 470];
  return [
    ...ys.map((y) => agent(230, y - 30, { s: 0.5 })),
    ...ys.map((y) => arrow(`M300 ${y}H420`)),
    tile(460, 120, 260, 430, { inner: ys.map((y) => fill(500, y - 28, 180, 56, W, 28) + slotChevron(590, y, C.ink, 'right')) }),
    line('M766 335H812'),
    cylinder(920, 250, 180, 170, { bands: 1 }),
  ];
};
