// Declared, enforceable, correct: the gate climbs the first two steps
// (green checks); the top step (the indigo hero, an eye: reading) is the human reviewer's.
export const topic = 'app-building';
export const aria = 'Three steps: the first two carry green checks, a person stands alone on the tall blue top step, marked with an eye.';

export default ({ C, box, line, fill, dot, offsetTint, person }) => [
  box(170, 445, 210, 100, C.ink, 30), line('M250 495l20 20 38-40', C.green, 11),
  box(410, 360, 210, 185, C.ink, 34), line('M490 452l20 20 38-40', C.green, 11),
  // the step no rule reaches (structural: square to the canvas)
  offsetTint(650, 270, 340, 275, C.brandTint, 44),
  fill(650, 270, 340, 275, C.brand, 44),
  // what is left is reading it
  line('M760 408q60 -52 120 0q-60 52 -120 0z', C.white), dot(820, 408, 17, C.white),
  person(820, 152, { s: 0.7, withFace: true }),
];
