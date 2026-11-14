// A diff, not an undo button: what the AI changed arrives as a diff (the
// indigo hero tile) and a person approves it before it ships.
export const topic = 'app-building';
export const aria = 'An AI agent hands over a blue diff with added and removed lines; a person approves it before it ships.';

export default ({ C, agent, arrow, tile, line, person, ring }) => {
  const W = C.white;
  const plus = (x, y) => line(`M${x} ${y - 14}v28M${x - 14} ${y}h28`, W, 10);
  return [
    agent(230, 190, { s: 0.75, withFace: true }),
    arrow('M230 330C230 420 290 436 350 436'),
    tile(390, 150, 380, 360, {
      deg: 2,
      inner: [plus(452, 240), line('M492 240H700', W, 18), plus(452, 330), line('M492 330H660', W, 18), line('M438 420h28', W, 10), line('M492 420H680', W, 18)],
    }),
    person(944, 200, { s: 0.75, withFace: true }),
    arrow('M816 430H848'),
    ring(944, 430, 50, C.green), line('M920 432l17 17 32-34', C.green, 11),
  ];
};
