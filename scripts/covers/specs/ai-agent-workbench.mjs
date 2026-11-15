// The agent works inside the business system (the green hero tile): what
// it does lands as an updated record and as rows in an audit log.
export const topic = 'app-building';
export const aria = 'An AI agent works inside a green business system; its work updates a record and adds rows to a log.';

export default ({ C, tile, agent, arrow, box, line, fill, dot }) => [
  tile(180, 160, 400, 340, { color: C.green, tint: C.greenTint, deg: -2, inner: agent(380, 296, { color: C.white, s: 0.95 }) }),
  arrow('M630 270C700 270 720 230 770 230'),
  box(810, 150, 220, 160, C.ink, 36), line('M846 196H994'), fill(842, 226, 120, 30, C.green, 15), line('M846 282H960'),
  arrow('M630 400C700 400 720 450 770 450'),
  box(810, 370, 220, 160, C.ink, 36),
  dot(848, 410, 9), line('M872 410H994'), dot(848, 450, 9), line('M872 450H966'), dot(848, 490, 9), line('M872 490H984'),
];
