// Three homes for a business rule around the record being written (the
// indigo hero tile): a predicate checks it (validation rule), a loop rewrites
// it before save (hook), and an arrow writes another object (flow).
export const aria = 'A blue record being written: a green check tests it, a loop rewrites it before save, and an arrow writes another record.';

export default ({ C, tile, line, ring, arrow, box }) => {
  const W = C.white;
  return [
    // validation rule: a predicate on the one record
    ring(242, 372, 58, C.green), line('M216 374l18 18 34 -36', C.green, 11),
    line('M310 372H338', C.ink, 9),
    // the record being written
    tile(370, 248, 330, 250, { inner: line('M418 318H652M418 374H612M418 430H632', W, 18) }),
    // hook: rewrites the pending record before it is saved
    arrow('M632 228C632 136 448 136 448 204'),
    // flow: writes another object
    arrow('M744 372H812'),
    box(850, 300, 180, 144, C.ink, 36), line('M890 352H990M890 396H960', C.ink, 9),
  ];
};
