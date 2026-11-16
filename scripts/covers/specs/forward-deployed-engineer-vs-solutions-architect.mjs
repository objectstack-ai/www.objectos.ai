// The pager test: four people in one room, and the phone (the indigo hero
// tile) rings for exactly one of them.
export const topic = 'ai-agents';
export const aria = 'Three grey people and one person in ink; a blue phone rings for the one in ink.';

export default ({ C, person, tile, line, fill }) => {
  const W = C.white;
  return [
    person(220, 290, { s: 0.62, color: C.grey }),
    person(360, 290, { s: 0.62, color: C.grey }),
    person(500, 290, { s: 0.62, color: C.grey }),
    person(650, 284, { s: 0.7, withFace: true }),
    // ringing
    line('M752 236q16 22 0 44M778 216q30 42 0 84'),
    tile(820, 140, 210, 390, { deg: 3, inner: [line('M895 190H955', W, 14), fill(860, 230, 130, 190, W, 22), line('M905 470H945', W, 18)] }),
  ];
};
