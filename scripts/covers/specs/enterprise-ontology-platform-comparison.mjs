// Five platforms on the read-write line: four describe or delegate (the
// outlines left of the dashed line), one executes actions inside its
// ontology (the indigo hero tile).
export const topic = 'integration-data';
export const aria = 'Four outlined platforms sit left of a dashed line; one blue platform on the right acts.';

export default ({ C, box, line, tile, ring, DASHED }) => {
  const W = C.white;
  return [
    box(170, 150, 130, 150, C.grey, 32), line('M204 202H266M204 246H250', C.grey),
    box(340, 150, 130, 150, C.grey, 32), line('M374 202H436M374 246H420', C.grey),
    box(170, 370, 130, 150, C.ink, 32), line('M204 422H266M204 466H250'),
    box(340, 370, 130, 150, C.ink, 32), line('M374 422H436M374 466H420'),
    // the read-write line
    line('M560 120V550', C.ink, 9, DASHED),
    tile(650, 150, 360, 370, {
      deg: 2,
      inner: [line('M700 230H900M700 300H860', W, 18), ring(830, 420, 46, W, 12), line('M820 398l24 22-24 22', W, 12)],
    }),
  ];
};
