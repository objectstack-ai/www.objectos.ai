// Comprehension debt: the reviewer cannot get into a tall pile of generated
// code nobody has read (refused), but can read the whole definition (the
// indigo hero tile) and change it.
export const topic = 'app-building';
export const aria = 'A person is stopped before a tall grey column of unread code, and reads a short blue definition instead.';

export default ({ C, box, line, person, arrow, stopBar, tile }) => {
  const W = C.white;
  const rows = [150, 190, 230, 270, 310, 350, 390, 430, 470, 510].map((y, i) => `M206 ${y}H${[330, 300, 344, 280, 320, 344, 296, 330, 270, 310][i]}`).join('');
  return [
    box(170, 110, 210, 450, C.grey, 36), line(rows, C.grey, 9),
    person(560, 280, { s: 0.9 }),
    line('M490 284H440', C.red, 7), stopBar(424, 284),
    arrow('M630 284H700'),
    tile(736, 200, 300, 300, { deg: -2, inner: line('M784 280H984M784 346H944M784 412H964', W, 18) }),
  ];
};
