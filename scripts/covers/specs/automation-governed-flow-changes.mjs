// A sentence becomes a reviewable diff (the indigo hero tile) that is
// published to the live flow; a dotted path leads back for rollback.
export const topic = 'app-building';
export const aria = 'A spoken request becomes a blue diff that is published to a flow; a dotted path leads back for rollback.';

export default ({ C, line, arrow, tile, box, ring, DOTTED }) => {
  const W = C.white;
  return [
    // the request, in words
    line('M200 250H300a40 40 0 0 1 40 40v50a40 40 0 0 1-40 40H240l-44 36 10-36h-6a40 40 0 0 1-40-40v-50a40 40 0 0 1 40-40z'),
    line('M196 300H304M196 332H266'),
    arrow('M366 315H430'),
    // the diff the reviewer signs: one line out, two lines in
    tile(470, 165, 340, 300, {
      deg: -2,
      inner: [
        line('M518 235h28', W, 12), line('M576 235H730', W, 18),
        line('M518 315h28M532 301v28', W, 12), line('M576 315H762', W, 18),
        line('M518 395h28M532 381v28', W, 12), line('M576 395H700', W, 18),
      ],
    }),
    arrow('M856 315H890'),
    // the live flow
    box(916, 175, 124, 280, C.ink, 40),
    ring(978, 240, 22), ring(978, 315, 22), ring(978, 390, 22),
    line('M978 262V293M978 337V368'),
    // rollback: back to the version you were on
    arrow('M978 484C978 566 650 574 620 526', C.ink, 9, DOTTED),
  ];
};
