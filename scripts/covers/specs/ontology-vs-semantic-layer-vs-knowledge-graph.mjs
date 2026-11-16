// Three layers, one verb: an agent's action call passes over a semantic
// layer (a metric) and a knowledge graph (edges) and lands only on the
// ontology (the indigo hero tile), which carries actions and permissions.
export const topic = 'ai-agents';
export const aria = 'An AI agent’s action passes over a grey chart and a grey graph and lands on a blue ontology with a padlock.';

export default ({ C, agent, arrow, box, bars, ring, line, tile }) => {
  const W = C.white;
  return [
    agent(250, 170, { s: 0.7, withFace: true }),
    arrow('M340 200C560 150 760 160 820 254'),
    box(170, 350, 180, 180, C.grey, 36), bars('M220 480V440M260 480V400M300 480V420', C.grey, 22),
    box(390, 350, 180, 180, C.grey, 36),
    ring(434, 400, 16, C.grey), ring(526, 400, 16, C.grey), ring(480, 482, 16, C.grey),
    line('M454 400H506M444 416L470 466M516 416L490 466', C.grey, 7),
    tile(640, 290, 370, 250, {
      deg: 2,
      inner: [line('M690 360H860M690 420H830', W, 18), line('M900 410h64v52h-64z', W, 10), line('M912 410v-16a20 20 0 0 1 40 0v16', W, 10)],
    }),
  ];
};
