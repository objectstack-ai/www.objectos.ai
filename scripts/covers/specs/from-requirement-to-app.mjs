// A requirement becomes one piece of metadata (the indigo hero tile), and
// the running app comes from it.
export const topic = 'app-building';
export const aria = 'A written requirement becomes a blue metadata tile, from which a running app window is produced.';

export default ({ C, line, arrow, tile, fill, box, dot }) => {
  const W = C.white;
  return [
    line('M200 130H310a40 40 0 0 1 40 40v40a40 40 0 0 1-40 40H296l8 34-46-34H200a40 40 0 0 1-40-40v-40a40 40 0 0 1 40-40z'),
    line('M198 176H312M198 206H270'),
    arrow('M330 300C380 300 400 330 416 346'),
    tile(450, 220, 300, 270, {
      deg: 3,
      inner: [fill(494, 270, 44, 44, W, 14), line('M564 292H706', W, 16), fill(494, 334, 44, 44, W, 14), line('M564 356H680', W, 16), fill(494, 398, 44, 44, W, 14), line('M564 420H696', W, 16)],
    }),
    arrow('M792 355H828'),
    box(860, 230, 180, 250, C.ink, 32), dot(892, 266, 8), dot(918, 266, 8), line('M890 330H1010M890 380H980M890 430H1000'),
  ];
};
