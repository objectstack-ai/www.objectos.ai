// One clause is lifted out of the contract and flagged for review (the
// indigo hero tile); legal makes the call.
export const topic = 'app-building';
export const aria = 'A clause is lifted out of a contract into a blue flagged card that a person reviews.';

export default ({ C, box, line, arrow, tile, person }) => {
  const W = C.white;
  return [
    box(210, 120, 240, 400, C.ink, 36), line('M250 180H410M250 230H380M250 380H400M250 430H360M250 470H390'),
    line('M250 305H290', C.grey, 9, ' stroke-dasharray="2 20"'),
    arrow('M340 305C440 305 470 262 530 258'),
    tile(570, 150, 400, 220, { deg: 2, inner: [line('M626 262H800', W, 18), line('M870 222V298M870 222h44l-10 14 10 14h-44', W, 9)] }),
    person(760, 470, { s: 0.7 }),
    arrow('M832 452C890 452 904 446 904 430'),
  ];
};
