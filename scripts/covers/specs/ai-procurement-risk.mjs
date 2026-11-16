// A supplier's risk score (the indigo hero tile) opens up into the evidence
// behind it: a qualification, a quote and a delivery.
export const topic = 'app-building';
export const aria = 'A blue supplier risk gauge opens up into three evidence cards behind it.';

export default ({ C, tile, line, box, ring }) => {
  const W = C.white;
  return [
    tile(170, 176, 380, 320, {
      inner: [line('M250 400a110 110 0 0 1 220 0', W, 12), line('M378 382L428 334', W, 18), ring(360, 400, 18, W, 10)],
    }),
    line('M598 270C668 270 660 200 726 200'),
    line('M598 340H726'),
    line('M598 410C668 410 660 480 726 480'),
    box(750, 146, 270, 108, C.ink, 32), line('M786 200H900'),
    box(750, 286, 270, 108, C.ink, 32), line('M786 340H960'),
    box(750, 426, 270, 108, C.ink, 32), line('M786 480H930'),
  ];
};
