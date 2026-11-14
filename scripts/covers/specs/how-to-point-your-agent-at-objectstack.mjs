// Three wires in (rule file, skills, tools) and one gate back: the agent's
// definition goes to the gate (the green hero tile), whose error comes back.
export const topic = 'ai-agents';
export const aria = 'Three sources wire into an AI agent; its work goes to a green gate, and the gate’s error loops back to it.';

export default ({ C, box, line, arrow, agent, tile, DOTTED }) => {
  const W = C.white;
  return [
    box(170, 130, 120, 104, C.ink, 30), line('M204 168H256M204 198H240'),
    box(170, 286, 120, 104, C.ink, 30), line('M206 338h48M230 314v48'),
    box(170, 442, 120, 104, C.ink, 30), line('M214 474v18M246 474v18M204 494h52v8a26 26 0 0 1-52 0z'),
    arrow('M310 182C390 182 410 286 466 290'),
    arrow('M310 338H466'),
    arrow('M310 494C390 494 410 390 466 386'),
    agent(560, 300, { s: 0.85, withFace: true }),
    arrow('M650 300H700'),
    tile(740, 150, 290, 320, { color: C.green, tint: C.greenTint, deg: 2, inner: line('M828 318l42 42 86-92', W, 22) }),
    // the corrective error comes back
    arrow('M884 512C884 568 704 570 660 456', C.ink, 9, DOTTED),
  ];
};
