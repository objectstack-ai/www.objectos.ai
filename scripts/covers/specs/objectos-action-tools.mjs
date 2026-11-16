// An AI agent calls one of the actions exposed to it (the indigo hero tile)
// and the same runtime updates the record.
export const topic = 'app-building';
export const aria = 'An AI agent calls an action from a blue panel of exposed actions, and a record is updated.';

export default ({ C, agent, arrow, tile, fill, dot, line, box }) => {
  const W = C.white;
  return [
    agent(240, 196, { s: 0.85 }),
    arrow('M322 268C380 268 404 340 436 354'),
    tile(470, 230, 320, 280, {
      deg: 2,
      inner: [
        fill(520, 290, 220, 66, W, 33), dot(558, 323, 13, C.brand), line('M592 323H700', C.brand, 12),
        fill(520, 384, 220, 66, W, 33), dot(558, 417, 13, C.brand), line('M592 417H680', C.brand, 12),
      ],
    }),
    arrow('M690 206C690 160 760 160 846 170'),
    box(880, 120, 160, 200, C.ink, 36),
    line('M916 172H1000'), fill(912, 214, 96, 32, C.green, 16), line('M916 280H976'),
  ];
};
