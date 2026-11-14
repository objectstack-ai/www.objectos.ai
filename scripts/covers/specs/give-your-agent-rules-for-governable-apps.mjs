// Rules for governability, not style: the rules file (the indigo hero tile)
// points the agent at governed metadata; hand-rolled auth is refused.
export const topic = 'ai-agents';
export const aria = 'A blue rules file sits above an AI agent; its governed output reaches an object, and a hand-rolled path is stopped.';

export default ({ C, tile, line, fill, arrow, agent, stopBar, box }) => {
  const W = C.white;
  return [
    tile(370, 105, 460, 190, { inner: [line('M420 160H700M420 210H660M420 260H680', W, 16)] }),
    arrow('M600 334V352'),
    agent(600, 452, { s: 0.7, withFace: true }),
    // hand-rolled auth: refused
    line('M500 500H372', C.red, 7), stopBar(356, 500),
    box(170, 440, 140, 120, C.grey, 32), line('M204 486H276M204 518H254', C.grey),
    // governed metadata: reaches the object
    arrow('M700 500H820'),
    box(856, 440, 170, 120, C.ink, 36), line('M902 500l20 20 40-42', C.green, 11),
  ];
};
