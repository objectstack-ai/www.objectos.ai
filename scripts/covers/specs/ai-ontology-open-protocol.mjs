// An open protocol: the business definition sits in your repository as
// readable metadata (the indigo hero tile), so any agent can read it.
export const topic = 'governance';
export const aria = 'A blue definition in the middle is read by two different AI agents, one on each side.';

export default ({ C, tile, line, fill, agent, arrow }) => {
  const W = C.white;
  return [
    agent(230, 300, { s: 0.75, withFace: true }),
    arrow('M410 330C370 330 350 330 320 330'),
    tile(450, 160, 300, 340, { deg: -2, inner: [line('M500 240H700M500 310H660', W, 18), fill(500, 380, 90, 60, W, 22), fill(610, 380, 90, 60, W, 22)] }),
    arrow('M790 330H880'),
    agent(970, 300, { s: 0.75 }),
  ];
};
