// The ontology handover: when the engagement ends, the engineer hands the
// client a repo (the indigo hero tile, a branch glyph) they own and run.
export const topic = 'ai-agents';
export const aria = 'An engineer hands a blue repository to the client, who keeps it.';

export default ({ C, person, arrow, tile, ring, line }) => {
  const W = C.white;
  return [
    person(236, 250, { s: 0.8, color: C.grey, withFace: true }),
    arrow('M336 330H396'),
    tile(436, 170, 330, 330, {
      deg: -2,
      inner: [ring(540, 252, 26, W, 12), ring(540, 418, 26, W, 12), ring(664, 300, 26, W, 12), line('M540 280V390M664 328C664 380 600 380 566 404', W, 12)],
    }),
    arrow('M806 330H866'),
    person(964, 250, { s: 0.8, withFace: true }),
  ];
};
