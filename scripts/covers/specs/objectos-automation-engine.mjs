// The green-but-idle run: it selected rows, finished green (the hero tile)
// and acted on nothing; the run record says so.
export const topic = 'app-building';
export const aria = 'A list of selected rows enters a green completed run, which hands nothing to an empty dashed box marked acted=0.';

export default ({ C, box, line, arrow, tile, label, DASHED }) => {
  const rows = [210, 250, 290, 330, 370, 410].map((y, i) => `M184 ${y}H${[266, 244, 260, 232, 262, 240][i]}`).join('');
  return [
    box(150, 160, 150, 310, C.ink, 36), line(rows),
    arrow('M322 315H362'),
    tile(400, 165, 290, 290, { color: C.green, tint: C.greenTint, deg: -2, inner: line('M486 316l42 42 82-84', C.white, 26) }),
    arrow('M736 315H776'),
    box(812, 200, 200, 210, C.ink, 40, { extra: DASHED }),
    label(912, 510, 'acted=0', C.ink, 'middle'),
  ];
};
