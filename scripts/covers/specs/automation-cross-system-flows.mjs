// A step leaves the runtime: the flow's run record (the indigo hero tile)
// says acted=0, yet the call went out to another system, and after its
// retries a failed delivery lands in a dead-letter tray. The one label:
// acted=0.
export const topic = 'integration-data';
export const aria = 'A blue run record marked acted=0 sends a call to another system; a failed delivery drops into a dead-letter tray.';

export default ({ C, tile, label, arrow, box, line, DOTTED }) => [
  tile(170, 200, 360, 250, { inner: label(350, 345, 'acted=0', C.white, 'middle') }),
  arrow('M574 280H776'),
  box(812, 140, 210, 170, C.ink, 40), line('M852 200H982M852 250H950'),
  // after the retries: dead-letter
  arrow('M917 344V420', C.ink, 9, DOTTED),
  line('M832 450V500a40 40 0 0 0 40 40H962a40 40 0 0 0 40-40V450'),
];
