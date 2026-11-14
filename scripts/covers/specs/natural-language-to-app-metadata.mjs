// One sentence decomposes into an app specification: an object graph (the
// indigo hero band), not a few pages.
export const topic = 'app-building';
export const aria = 'A spoken request drops into a wide blue tile holding a connected graph of objects.';

export default ({ C, line, arrow, tile, fill }) => {
  const W = C.white;
  return [
    line('M552 104H648a36 36 0 0 1 36 36v24a36 36 0 0 1-36 36H624l-24 28-24-28H552a36 36 0 0 1-36-36v-24a36 36 0 0 1 36-36z'),
    line('M556 152H644'),
    arrow('M600 250V276'),
    tile(260, 316, 660, 230, {
      inner: [
        fill(318, 396, 92, 70, W, 22), fill(554, 360, 92, 70, W, 22), fill(554, 456, 92, 70, W, 22), fill(790, 396, 92, 70, W, 22),
        line('M428 418L536 398M428 444L536 486M664 398L772 418M664 486L772 444', W, 10),
      ],
    }),
  ];
};
