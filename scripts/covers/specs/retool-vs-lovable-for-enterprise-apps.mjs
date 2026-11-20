// Who approves what the AI built: an agent hands over one small change (a
// card with one line out and one line in); it passes through an approval
// seal (the indigo hero, round, with a white check) that a person owns.
export const topic = 'app-building';
export const aria = 'An AI agent hands a small change card to a round blue approval seal with a white check; a person stands beside the seal.';

export default ({ C, agent, person, box, line, arrow, dot }) => {
  const W = C.white;
  return [
    agent(196, 240, { s: 0.8, withFace: true }),
    arrow('M286 340H312'),
    // the change: one line out, one line in
    box(332, 244, 158, 192, C.ink, 30),
    line('M362 298h22'), line('M408 298H460', C.grey),
    line('M362 380h22M373 369v22', C.green), line('M408 380H460', C.green),
    arrow('M510 340H536'),
    // the approval (round: the one shape that is not a tile)
    dot(748, 360, 172, C.brandTint),
    dot(728, 340, 172, C.brand),
    line('M654 342l48 48 100-100', W, 26),
    person(1000, 274, { s: 0.7, withFace: true }),
  ];
};
