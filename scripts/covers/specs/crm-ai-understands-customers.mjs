// The customer record (the green hero tile) is the hub, connected to a
// contact, a deal and a case; the agent reads it through that record.
export const topic = 'integration-data';
export const aria = 'A green customer record at the centre connects to three cards; an AI agent reads the record.';

export default ({ C, tile, ring, line, box, agent, arrow }) => {
  const W = C.white;
  return [
    box(170, 140, 170, 100, C.ink, 30), line('M204 190H306'),
    box(170, 430, 170, 100, C.ink, 30), line('M204 480H290'),
    box(860, 140, 170, 100, C.ink, 30), line('M894 190H996'),
    line('M362 200C410 200 420 240 436 256'),
    line('M362 470C410 470 420 430 436 414'),
    line('M838 200C800 200 796 222 794 240'),
    tile(460, 220, 300, 250, { color: C.green, tint: C.greenTint, inner: [ring(540, 300, 34, W, 10), line('M600 290H710M600 330H680M510 400H710', W, 16)] }),
    arrow('M868 420H808'),
    agent(944, 420, { s: 0.8 }),
  ];
};
