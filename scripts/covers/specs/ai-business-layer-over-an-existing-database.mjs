// A business layer (the indigo hero band) over a running database: reads pass
// up through its slots to a member and an agent; the agent's write is refused.
export const topic = 'integration-data';
export const aria = 'Reads pass up through slots in a blue layer from a running database to a member and an AI agent; the agent’s write is stopped at the layer.';

export default ({ C, person, agent, layerBand, cylinder, line, stopBar }) => [
  person(440, 104, { withFace: true }), agent(760, 112, { withFace: true }),
  layerBand(150, 296, 900, 108, [440, 760]),
  cylinder(600, 478, 300, 58),
  // the agent's write curves down and is refused above the layer
  line('M858 196C900 196 912 214 912 256', C.red, 7), stopBar(912, 270, 'horizontal'),
];
