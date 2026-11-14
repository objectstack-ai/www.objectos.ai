// Many entry points, one process: a clock, a record change and an inbound
// call converge on one flow runtime (the green hero tile).
export const topic = 'app-building';
export const aria = 'A clock, a record and an inbound API call each feed one green flow runtime.';

export default ({ C, line, arrow, ring, box, tile, dot, fill }) => {
  const W = C.white;
  return [
    // time-relative / schedule
    ring(230, 175, 52), line('M230 140V175H258'),
    // record change
    box(178, 292, 104, 88, C.ink, 26), line('M206 322H254M206 350H240'),
    // inbound API
    line('M214 474l-30 30 30 30M246 474l30 30-30 30'),
    arrow('M304 180C460 180 470 282 598 282'),
    arrow('M304 336H598'),
    arrow('M304 500C460 500 470 390 598 390'),
    // one runtime: one condition gate, one action set, one run record
    tile(640, 180, 360, 310, {
      color: C.green, tint: C.greenTint, deg: 2,
      inner: [dot(712, 335, 30, W), line('M758 335H790', W, 12), fill(806, 300, 88, 70, W, 24), line('M910 335H932', W, 12), dot(962, 335, 16, W)],
    }),
  ];
};
