// os verify's two stages: the author-time rule list refuses first (the red
// path stops below it, and the runtime never starts); a passing stack boots
// into the runtime (the indigo hero tile), where one record goes out and comes
// back; the exit code reads one count. The one label: 0.
export const topic = 'app-building';
export const aria = 'A rule list passes into a blue runtime tile where one record goes out and comes back; a refused path stops below the rules, and one count reads 0.';

export default ({ C, box, line, arrow, tile, fill, ring, stopBar, label }) => {
  const W = C.white;
  return [
    // stage 1: the author-time rules
    box(150, 169, 220, 260, C.ink, 36),
    line('M196 239H324'), line('M196 299H300'), line('M196 359H316'),
    // a refusal leaves here, and nothing boots
    line('M260 453V509', C.red, 7), stopBar(260, 525, 'horizontal'),
    // passes: stage 2 boots
    arrow('M392 299H436'),
    tile(466, 149, 340, 300, {
      deg: -2,
      inner: [
        // one record, two fields
        fill(512, 231, 128, 136, W, 28),
        line('M542 275H610', C.brand), line('M542 323H596', C.brand),
        // created, read back
        arrow('M664 257C722 227 768 257 770 293', W),
        arrow('M768 325C764 363 718 381 666 349', W),
      ],
    }),
    // the exit code reads one count
    arrow('M832 299H868'),
    ring(974, 299, 70),
    label(974, 318, '0', C.ink, 'middle'),
  ];
};
