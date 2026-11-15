// An agent's one-word edit flips one cell of the committed access matrix
// (the green hero tile); the build stops the release until the drift is
// signed.
export const topic = 'governance';
export const aria = 'An AI agent flips one cell of a green access matrix; the release path is stopped.';

export default ({ C, agent, arrow, tile, fill, line, stopBar, box }) => {
  const cells = [];
  for (const [i, y] of [214, 300, 386].entries()) {
    for (const [j, x] of [474, 560, 646].entries()) {
      cells.push(fill(x, y, 62, 62, i === 1 && j === 2 ? C.ink : C.white, 18));
    }
  }
  return [
    agent(242, 300, { s: 0.85 }),
    arrow('M332 300H392'),
    tile(430, 170, 320, 320, { color: C.green, tint: C.greenTint, deg: -2, inner: cells }),
    line('M792 330H880', C.red, 7), stopBar(896, 330),
    box(926, 262, 104, 136, C.ink, 30), line('M978 352V302M958 322l20-20 20 20'),
  ];
};
