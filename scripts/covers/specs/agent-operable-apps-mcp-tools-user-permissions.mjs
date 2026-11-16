// Two users' agents call the same tools at one endpoint (the indigo hero
// tile); the permission decision is made per call: one is stopped, one
// writes the record.
export const topic = 'ai-agents';
export const aria = 'Two people call the same blue set of tools; one call is stopped, the other updates a record.';

export default ({ C, person, arrow, tile, line, stopBar, box }) => [
  person(236, 150, { s: 0.75, withFace: true }),
  person(236, 396, { s: 0.75, withFace: true }),
  arrow('M326 196C380 196 380 254 414 254'),
  arrow('M326 442C380 442 380 404 414 404'),
  tile(450, 186, 320, 290, { inner: line('M500 254H720M500 330H690M500 404H710', C.white, 18) }),
  line('M812 254H904', C.red, 7), stopBar(920, 254),
  arrow('M812 404H872', C.green),
  box(910, 340, 130, 130, C.ink, 32), line('M940 396l22 22 40-42', C.green, 11),
];
