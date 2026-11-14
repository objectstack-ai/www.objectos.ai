// A person and an agent open the same record; each opening drops a row into
// the audit log (the green hero tile).
export const topic = 'governance';
export const aria = 'A person and an AI agent open the same record; each opening adds a row to a green audit log.';

export default ({ C, person, agent, box, line, dot, ring, arrow, tile }) => {
  const W = C.white;
  return [
    person(282, 132, { s: 0.92, withFace: true }), agent(918, 140, { s: 0.92, withFace: true }),
    box(498, 104, 204, 196, C.ink, 44),
    line('M532 202q68 -56 136 0q-68 56 -136 0z'), dot(600, 202, 19, C.ink),
    arrow('M384 236C414 218 436 214 466 214'), arrow('M816 236C786 218 764 214 734 214'),
    arrow('M600 320V350'),
    tile(190, 380, 820, 180, {
      color: C.green, tint: C.greenTint, deg: -2,
      inner: [
        // a row that starts with a person
        ring(266, 430, 15, W, 8), line('M240 474a26 22 0 0 1 52 0', W, 8), line('M332 446H770', W, 16),
        // a row that starts with an agent
        box(246, 488, 40, 32, W, 12, { w: 8 }), line('M240 546a26 18 0 0 1 52 0', W, 8), line('M332 520H700', W, 16),
      ],
    }),
  ];
};
