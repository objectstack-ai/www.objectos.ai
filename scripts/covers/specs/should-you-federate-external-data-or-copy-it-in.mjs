// The one-writer loop: a pull copies rows into a read-only copy (the indigo
// hero tile); a member's direct edit is refused and goes back through an action.
export const topic = 'integration-data';
export const aria = 'A pull arrow copies rows from a source database into a blue read-only copy; a member’s direct edit is stopped and goes through an action back to the source.';

export default ({ C, STROKE, cylinder, arrow, tile, line, person, stopBar, box, DOTTED }) => [
  cylinder(262, 140, 236, 214, { bands: 2 }),
  arrow('M350 104C450 22 620 22 694 98'),
  tile(744, 124, 300, 340, { deg: 3, inner: line('M794 204H994M794 284H994M794 364H950', C.white, 18) }),
  person(590, 448, { s: 0.82, withFace: true }),
  line('M654 432Q680 424 702 432', C.red, 7), stopBar(716, 434),
  box(160, 466, 214, 104, C.green, 52, { w: STROKE }),
  line('M232 518l24 24 46 -48', C.green, 12),
  line('M512 534C470 548 432 548 396 532', C.green, 10, DOTTED),
  arrow('M262 452V426', C.green),
];
