// A run parked at a paused node (the indigo hero tile) between a finished
// step and the next one; the declared approver resumes it.
export const topic = 'app-building';
export const aria = 'A run is parked at a blue paused step between a finished step and the next one; a person resumes it.';

export default ({ C, line, arrow, ring, tile, fill, box, person, DASHED }) => {
  const W = C.white;
  return [
    ring(230, 250, 48, C.grey), line('M292 250H402', C.grey),
    tile(430, 130, 300, 240, { inner: [fill(540, 180, 36, 140, W, 18), fill(584, 180, 36, 140, W, 18)] }),
    arrow('M772 250H830'),
    box(866, 190, 150, 120, C.ink, 40, { extra: DASHED }),
    person(310, 470, { s: 0.75 }),
    arrow('M380 470C470 470 520 462 520 420'),
  ];
};
