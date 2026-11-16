// The ontology is the software: an AI agent writes the one definition (the
// indigo hero tile) and the runtime runs it directly; no code in between.
export const topic = 'ai-agents';
export const aria = 'An AI agent writes into a blue definition, and a runtime runs the definition directly.';

export default ({ C, tile, agent, arrow, box, line }) => {
  const W = C.white;
  return [
    tile(190, 150, 340, 340, { deg: 2, inner: line('M244 240H476M244 320H436M244 400H456', W, 18) }),
    agent(880, 196, { s: 0.8, withFace: true }),
    // AI writes it
    arrow('M790 246C700 246 650 262 590 290'),
    // the runtime runs it
    arrow('M590 440C660 456 720 456 784 456'),
    box(820, 382, 170, 150, C.ink, 36), line('M884 424v66l52-33z'),
  ];
};
