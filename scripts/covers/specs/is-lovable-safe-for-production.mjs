// "It works" is not "it's safe": the builder sees the polished app (the
// indigo hero tile); the policy that guards the data sits behind it in a
// form the builder cannot read (grey scribble).
export const topic = 'governance';
export const aria = 'A person sees a polished blue app; behind it, the policy guarding the database is an unreadable grey scribble.';

export default ({ C, person, tile, fill, line, box, cylinder }) => {
  const W = C.white;
  return [
    person(220, 270, { s: 0.8, withFace: true }),
    tile(340, 150, 330, 330, { deg: -2, inner: [line('M390 220H560', W, 18), fill(390, 270, 230, 56, W, 28), fill(390, 352, 230, 56, W, 28), line('M470 440l16 16 30-32', W, 10)] }),
    // what the builder cannot read
    box(770, 120, 250, 170, C.grey, 36),
    line('M806 176q20-20 40 0t40 0 40 0 40 0M806 234q20-20 40 0t40 0 40 0', C.grey, 9),
    line('M895 314V352', C.grey, 9),
    cylinder(895, 390, 190, 130, { bands: 1 }),
  ];
};
