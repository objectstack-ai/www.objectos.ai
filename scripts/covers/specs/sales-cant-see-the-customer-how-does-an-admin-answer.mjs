// A person's request to open a record is refused (the red path and stop
// bar); the explain report (the green hero tile) lays out the nine checks in
// order, and the third one, the check that refused, is marked solid ink.
export const topic = 'governance';
export const aria = 'A person is refused a record; a green report below lists nine checks and marks the third as the one that refused.';

export default ({ C, person, box, line, arrow, stopBar, tile, dot, ring }) => {
  const W = C.white;
  const xs = [270, 352, 434, 516, 598, 680, 762, 844, 926];
  return [
    person(244, 156, { s: 0.86 }),
    line('M352 216H690', C.red, 7), stopBar(706, 216),
    box(790, 108, 214, 200, C.ink, 40),
    line('M832 174H962'), line('M832 218H934'), line('M832 262H900'),
    arrow('M434 242V334'),
    tile(190, 364, 820, 170, {
      color: C.green, tint: C.greenTint, deg: -2,
      inner: xs.map((x, i) => (i === 2 ? [dot(x, 449, 27, C.ink), ring(x, 449, 27, W, 8)] : dot(x, 449, 22, W))).flat(),
    }),
  ];
};
