// The context window is the constraint: a conventional codebase does not
// fit in the window (files spill out below it); one ontology (the indigo
// hero tile) fits whole, read in one pass.
export const topic = 'ai-agents';
export const aria = 'Grey files spill out of one window; a single blue definition fits whole inside the other.';

export default ({ C, box, line, tile }) => {
  const W = C.white;
  const file = (x, y, w = 120) => box(x, y, w, 82, C.grey, 24) + line(`M${x + 28} ${y + 41}H${x + w - 28}`, C.grey, 9);
  return [
    box(170, 120, 380, 300, C.ink, 40),
    file(212, 168), file(386, 168), file(212, 296), file(386, 296),
    // the rest of the codebase, outside the window
    file(170, 466, 110), file(305, 466, 110), file(440, 466, 110),
    box(640, 120, 390, 430, C.ink, 40),
    tile(690, 172, 290, 326, { inner: line('M736 252H934M736 322H894M736 392H914', W, 18) }),
  ];
};
