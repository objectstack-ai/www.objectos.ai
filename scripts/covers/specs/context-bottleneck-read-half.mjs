// The read half is grounded by the context layer (the indigo hero tile);
// the write goes past it to a destination that enforces its own rules.
export const topic = 'ai-agents';
export const aria = 'A blue context layer feeds what an AI agent reads; the agent’s write goes past it to a locked destination.';

export default ({ C, tile, line, agent, arrow, box }) => {
  const W = C.white;
  return [
    tile(190, 110, 420, 240, { deg: -2, inner: line('M244 182H556M244 236H512M244 290H532', W, 18) }),
    // read: grounded by the context layer
    arrow('M652 226C756 226 796 248 806 290'),
    agent(890, 340, { s: 0.8, withFace: true }),
    // write: past the layer, to the destination's own rules
    arrow('M800 486C690 516 570 516 470 498'),
    box(220, 420, 210, 140, C.ink, 36),
    line('M297 490h56v40h-56z'), line('M307 490v-14a18 18 0 0 1 36 0v14'),
  ];
};
