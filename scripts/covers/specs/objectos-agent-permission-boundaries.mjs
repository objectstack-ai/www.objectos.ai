// The checks run before the model reads: rows come out of the database
// already scoped, and the record the agent receives (the green hero tile)
// has its sensitive field masked.
export const topic = 'governance';
export const aria = 'Rows leave a database as a green record with one field masked as dots before an AI agent reads it.';

export default ({ C, cylinder, arrow, tile, line, dot, agent }) => {
  const W = C.white;
  return [
    cylinder(250, 196, 180, 240, { bands: 2 }),
    arrow('M364 330H398'),
    tile(430, 180, 300, 300, {
      color: C.green, tint: C.greenTint, deg: -2,
      inner: [line('M482 256H680', W, 18), ...[486, 526, 566, 606, 646].map((x) => dot(x, 330, 12, W)), line('M482 404H640', W, 18)],
    }),
    arrow('M772 280H860'),
    agent(940, 280, { s: 0.85 }),
  ];
};
