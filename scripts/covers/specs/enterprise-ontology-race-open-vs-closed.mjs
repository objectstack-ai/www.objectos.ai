// The business definition leaves the vendor's locked platform (grey, padlock
// shut) for an open definition you own (the indigo hero tile, padlock open).
export const aria = 'A business definition moves out of a grey locked platform into a blue open definition with an unlocked padlock.';

export default ({ C, box, line, arrow, tile, fill }) => {
  const W = C.white;
  return [
    // the vendor's platform: the definition sits inside, locked
    box(215, 180, 240, 300, C.grey, 40),
    line('M255 240H415M255 286H375', C.grey, 12),
    box(295, 372, 80, 64, C.grey, 16), line('M309 372v-22a26 26 0 0 1 52 0v22', C.grey),
    arrow('M495 330H585'),
    // the open definition, yours
    tile(645, 170, 340, 310, {
      deg: 2,
      inner: [
        line('M695 240H935M695 290H895M695 340H815', W, 16),
        fill(855, 396, 84, 62, W, 16),
        line('M869 396V362a28 28 0 0 1 56 0v4', W, 10),
      ],
    }),
  ];
};
