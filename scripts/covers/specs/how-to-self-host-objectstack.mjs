// Self-hosting: one compiled artifact runs on a server you operate (the
// indigo hero tile) against one database you operate.
export const topic = 'governance';
export const aria = 'One compiled file runs on a blue server you operate, which talks to your own database.';

export default ({ C, tile, fill, dot, line, arrow, cylinder }) => {
  const W = C.white;
  const racks = [200, 305, 410];
  return [
    // the one artifact
    line('M210 230H280L330 280V410Q330 440 300 440H210Q180 440 180 410V260Q180 230 210 230Z'),
    line('M280 230V260Q280 280 300 280H330'),
    line('M214 340H284M214 386H264'),
    arrow('M358 335H404'),
    // the server you operate
    tile(450, 140, 290, 390, { inner: racks.map((y) => fill(490, y, 210, 70, W, 35) + dot(656, y + 35, 13, C.ink)) }),
    line('M786 345H828'),
    // the database you operate
    cylinder(942, 262, 170, 156, { bands: 1 }),
  ];
};
