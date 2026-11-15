// The runtime (the indigo hero tile) and the data sit inside your own
// boundary; an outside model is reached through one opening, dotted.
export const topic = 'governance';
export const aria = 'A blue runtime and a database sit inside a boundary; a dotted line leaves through an opening to an outside model cloud.';

export default ({ C, line, cylinder, tile, DOTTED }) => {
  const W = C.white;
  return [
    line('M800 290V164a44 44 0 0 0-44-44H204a44 44 0 0 0-44 44v347a44 44 0 0 0 44 44h552a44 44 0 0 0 44-44V390'),
    cylinder(272, 250, 140, 170, { bands: 1 }),
    line('M362 340H388'),
    tile(410, 190, 300, 290, { inner: line('M460 270H660M460 336H620M460 402H640', W, 18) }),
    line('M752 340H866', C.ink, 9, DOTTED),
    line('M914 400a44 44 0 0 1-4-88a60 60 0 0 1 112-6a48 48 0 0 1-4 94z'),
  ];
};
