// What a model lacks, supplied by one ontology: a world to stand on (the
// indigo hero tile of linked objects), hands (a tool it may call) and a fence
// (a call outside the grant is stopped).
export const aria = 'An AI agent stands on a blue world of linked objects, calls one tool, and is stopped at a fence.';

export default ({ C, tile, fill, line, agent, arrow, box, stopBar }) => {
  const W = C.white;
  const pickets = [866, 930, 994];
  return [
    tile(250, 420, 700, 140, {
      inner: [
        fill(310, 465, 124, 50, W, 25), fill(538, 465, 124, 50, W, 25), fill(766, 465, 124, 50, W, 25),
        line('M448 490H524M676 490H752', W, 9),
      ],
    }),
    agent(600, 214, { s: 0.9, withFace: true }),
    arrow('M600 352V384'),
    // hands: a tool the author armed
    box(214, 172, 120, 96, C.ink, 30), line('M260 198v44l36-22z'),
    arrow('M528 220H370'),
    // the fence: a call outside the grant stops at it
    line('M672 220H800', C.red, 7), stopBar(816, 220),
    line(pickets.map((x) => `M${x - 16} 292V178L${x} 156L${x + 16} 178V292`).join(''), C.ink, 9),
    line('M888 214H908M952 214H972M888 262H908M952 262H972', C.ink, 9),
  ];
};
