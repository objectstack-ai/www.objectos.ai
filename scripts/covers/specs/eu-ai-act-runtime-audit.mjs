// Audit readiness: the runtime's ledger (the green hero tile) answers each
// of the auditor's questions with a recorded row; the auditor reads it.
export const topic = 'governance';
export const aria = 'A green ledger of three checked rows is read through a magnifier by an auditor.';

export default ({ C, tile, ring, line, person }) => {
  const W = C.white;
  const row = (y) => ring(260, y, 24, W, 10) + line(`M248 ${y}l9 9 16-18`, W, 8) + line(`M310 ${y}H500`, W, 16);
  return [
    tile(200, 140, 360, 380, { color: C.green, tint: C.greenTint, deg: 2, inner: [row(230), row(330), row(430)] }),
    // the magnifier
    ring(700, 300, 66), line('M748 348L800 400', C.ink, 14),
    person(930, 250, { s: 0.8, withFace: true }),
  ];
};
