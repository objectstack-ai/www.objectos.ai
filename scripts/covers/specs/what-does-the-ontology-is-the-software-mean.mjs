// One executable business ontology (the indigo hero tile, its six kinds as
// white cells) is the software: the database, the API and the agent's tools
// are read straight from it.
export const aria = 'A blue definition with six kinds feeds a database, an API and an AI agent directly.';

export default ({ C, tile, fill, arrow, cylinder, box, line, agent }) => {
  const cells = [];
  for (const x of [247, 393]) for (const y of [206, 306, 406]) cells.push(fill(x, y, 110, 62, C.white, 22));
  const brace = (x, d) => `M${x} 280c${-12 * d} 0 ${-12 * d} 10 ${-12 * d} 18s${-5 * d} 14 ${-10 * d} 14c${5 * d} 0 ${10 * d} 4 ${10 * d} 14s0 18 ${12 * d} 18`;
  return [
    tile(195, 158, 360, 360, { deg: -2, inner: cells }),
    arrow('M614 250C684 250 714 166 784 166'),
    arrow('M614 338H784'),
    arrow('M614 426C684 426 714 470 784 470'),
    cylinder(915, 126, 180, 76, { bands: 1 }),
    box(831, 252, 168, 120, C.ink, 32),
    line(`${brace(888, 1)}${brace(942, -1)}`, C.ink, 7),
    agent(915, 470, { s: 0.74 }),
  ];
};
