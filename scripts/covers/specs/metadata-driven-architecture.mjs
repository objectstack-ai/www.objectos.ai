// The three layers of a metadata-driven system: presentation and behaviour
// in line art over the structure they are generated from (the indigo hero
// band).
export const topic = 'app-building';
export const aria = 'Three stacked layers: a screen, a flow of steps, and a blue structure layer of fields at the base.';

export default ({ C, box, line, ring, tile, fill }) => {
  const W = C.white;
  return [
    box(300, 110, 600, 120, C.ink, 40), line('M350 154H560M350 190H500'), box(730, 140, 120, 60, C.ink, 20),
    box(300, 260, 600, 120, C.ink, 40),
    ring(400, 320, 24), ring(600, 320, 24), ring(800, 320, 24), line('M436 320H564M636 320H764'),
    tile(300, 410, 600, 140, { inner: [fill(344, 450, 150, 60, W, 30), fill(525, 450, 150, 60, W, 30), fill(706, 450, 150, 60, W, 30)] }),
  ];
};
