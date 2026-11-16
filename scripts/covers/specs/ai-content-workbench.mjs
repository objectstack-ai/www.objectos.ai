// The content chain: an idea becomes a draft (the indigo hero tile), the
// draft is published and measured, and the numbers loop back to the next idea.
export const topic = 'app-building';
export const aria = 'An idea note becomes a blue draft, the draft is measured as a bar chart, and a dotted path loops back to the next idea.';

export default ({ C, box, line, arrow, tile, bars, DOTTED }) => {
  const W = C.white;
  return [
    arrow('M890 250C890 120 300 120 300 262', C.ink, 9, DOTTED),
    box(200, 300, 200, 150, C.ink, 32), line('M236 350H364M236 396H320'),
    arrow('M424 375H460'),
    tile(496, 260, 260, 260, { deg: -3, inner: line('M544 330H708M544 390H708M544 450H650', W, 18) }),
    arrow('M800 375H838'),
    box(870, 290, 160, 170, C.ink, 32), bars('M916 420V380M950 420V340M984 420V360', C.ink, 20),
  ];
};
