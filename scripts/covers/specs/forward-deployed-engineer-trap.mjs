// The closed loop: what a deployment learns at the customer comes back into
// the substrate (the indigo hero tile), so revenue per engineer compounds.
export const topic = 'ai-agents';
export const aria = 'A blue platform ships to a customer and the work comes back into it; bars inside the platform rise.';

export default ({ C, tile, bars, arrow, box, line }) => {
  const W = C.white;
  return [
    tile(180, 160, 320, 350, { deg: -2, inner: bars('M262 440V390M332 440V340M402 440V270', W, 40) }),
    arrow('M546 230C640 160 740 170 790 236'),
    box(820, 250, 190, 180, C.ink, 40), line('M858 310H972M858 360H936'),
    arrow('M790 444C740 510 640 520 556 450'),
  ];
};
