// Dare you click merge: the change a person can sign off is one short
// diff (the indigo hero tile); it joins the main line (the merge glyph).
export const topic = 'app-building';
export const aria = 'A person reads a short blue diff, which joins the main line at a merge.';

export default ({ C, person, tile, line, arrow, ring, dot }) => {
  const W = C.white;
  return [
    person(220, 250, { s: 0.8, withFace: true }),
    tile(340, 170, 320, 320, { deg: -2, inner: [line('M390 250H610M390 320H570', W, 18), line('M390 390H590', W, 18)] }),
    arrow('M700 330H740'),
    // the merge: a branch joins the main line
    line('M840 160V500'), dot(840, 160, 22), dot(840, 500, 22),
    ring(960, 230, 30), line('M960 268C960 360 860 360 852 420'),
  ];
};
