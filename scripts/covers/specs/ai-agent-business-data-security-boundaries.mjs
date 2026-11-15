// The agent acts as the person it works for (a dotted identity link): it
// reads inside that person's scope (the green hero tile), and a step
// outside it is stopped.
export const topic = 'governance';
export const aria = 'An AI agent linked to a person reads records inside a green scope; a step outside is stopped.';

export default ({ C, person, agent, line, arrow, tile, fill, stopBar, DOTTED }) => {
  const W = C.white;
  return [
    person(390, 160, { s: 0.8 }),
    line('M458 196H592', C.ink, 9, DOTTED),
    agent(660, 168, { s: 0.8 }),
    arrow('M660 300V326'),
    tile(440, 356, 440, 190, { color: C.green, tint: C.greenTint, inner: [fill(490, 396, 340, 34, W, 17), fill(490, 446, 280, 34, W, 17), fill(490, 496, 310, 34, W, 17)] }),
    line('M736 200H910', C.red, 7), stopBar(926, 200),
  ];
};
