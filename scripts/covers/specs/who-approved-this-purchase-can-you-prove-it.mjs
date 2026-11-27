// A purchase request goes to its approver, who is away (grey); it is handed to
// a deputy, and every step lands as a row in the approval trail (the green
// hero tile): a decision, the hand-over, a decision.
export const topic = 'automation';
export const aria = 'A request passes an absent approver to a deputy; each step adds a row to a green approval trail.';

export default ({ C, person, box, line, arrow, tile }) => {
  const W = C.white;
  return [
    // the purchase request
    box(176, 128, 170, 220, C.ink, 32),
    line('M214 188H308'), line('M214 236H290'), line('M214 284H302'),
    arrow('M376 226H448'),
    // the approver, away
    person(560, 160, { s: 0.85, color: C.grey }),
    // handed to the deputy
    arrow('M636 186C680 136 736 136 776 180'),
    person(860, 160, { s: 0.85, withFace: true }),
    arrow('M860 306V346'),
    // the approval trail
    tile(190, 380, 820, 168, {
      color: C.green, tint: C.greenTint, deg: -2,
      inner: [
        line('M244 424l16 16 30-30', W, 10), line('M332 426H760', W, 14),
        line('M244 470H286M272 456l14 14-14 14', W, 10), line('M332 470H700', W, 14),
        line('M244 514l16 16 30-30', W, 10), line('M332 516H800', W, 14),
      ],
    }),
  ];
};
