// Dare you click merge: the change a person can sign off is one short diff
// (the indigo hero tile) on a branch that joins the main line at the merge commit.
export const topic = 'app-building';
export const aria = 'A short blue diff sits on a branch that curves down into the main line; a person reviews it.';

export default ({ C, tile, line, dot, person }) => {
  const W = C.white;
  return [
    tile(300, 110, 340, 270, { deg: -2, inner: line('M350 190H590M350 250H550M350 310H570', W, 18) }),
    // the branch joins the main line at the merge commit
    line('M470 424C470 444 540 432 582 461'),
    line('M194 480H1006'), dot(194, 480, 22), dot(600, 480, 26), dot(1006, 480, 22),
    person(880, 230, { s: 0.8, withFace: true }),
  ];
};
