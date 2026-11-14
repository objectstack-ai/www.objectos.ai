// A CRM written by an agent: three linked objects (the indigo hero tile),
// read by a person as one small diff.
export const topic = 'app-building';
export const aria = 'An AI agent writes three linked objects on a blue tile; a person reads the change as one small card.';

export default ({ C, tile, dot, line, agent, arrow, box, person }) => {
  const W = C.white;
  return [
    agent(210, 236, { s: 0.8, withFace: true }),
    arrow('M292 306H334'),
    tile(370, 170, 350, 330, {
      deg: -2,
      inner: [
        dot(462, 262, 34, W), dot(628, 262, 34, W), dot(545, 410, 34, W),
        line('M508 262H582M484 301L523 371M606 301L567 371', W, 9),
      ],
    }),
    arrow('M766 405H806'),
    person(920, 190, { s: 0.7, withFace: true }),
    box(840, 330, 166, 150, C.ink, 32), line('M880 382H966', C.green, 12), line('M880 430H940', C.ink, 12),
  ];
};
