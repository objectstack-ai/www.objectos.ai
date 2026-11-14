// One object definition (the indigo hero tile) gains a field; the projections
// derived from it gain it too, the pinned ones stay as they were.
export const topic = 'app-building';
export const aria = 'A blue object definition gains a new green field; the form and API on the right gain it too, the grey list view and dashboard on the left stay unchanged.';

export default ({ C, tile, line, fill, box, bars }) => [
  tile(450, 110, 300, 430, { deg: 2, inner: line('M494 196H700M494 268H660M494 340H690', C.white, 16) + fill(486, 416, 310, 64, C.green, 32) }),
  // pinned (grey): list view, dashboard, unchanged
  box(150, 130, 210, 170, C.grey), line('M150 188H360M220 130V300M290 130V300', C.grey, 7),
  box(150, 370, 210, 170, C.grey), bars('M200 500V450M255 500V410M310 500V470', C.grey, 22),
  // derived (ink): form and API, each gains the new field
  box(850, 130, 200, 170), line('M884 186H1016', C.ink, 9, ' stroke-opacity=".35"'), fill(880, 226, 140, 40, C.green, 20),
  box(850, 370, 200, 170), line('M908 400c-16 0-16 16-16 32s-8 23-16 23c8 0 16 7 16 23s0 32 16 32M992 400c16 0 16 16 16 32s8 23 16 23c-8 0-16 7-16 23s0 32-16 32', C.ink, 7),
  fill(922, 437, 56, 36, C.green, 18),
];
