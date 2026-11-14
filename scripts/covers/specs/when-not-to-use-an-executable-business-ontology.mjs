// The six-kind test as a shape sorter: a workload that fits drops through
// the ontology's slot (the indigo hero tile); a data lake and a ledger are
// routed elsewhere.
export const topic = 'app-building';
export const aria = 'A green block drops into the slot of a blue ontology; a data lake and a ledger are routed away to other tools.';

export default ({ C, tile, fill, arrow, cylinder, box, line }) => [
  fill(565, 112, 70, 70, C.green, 20),
  arrow('M600 204V244'),
  tile(420, 290, 360, 250, { inner: fill(552, 330, 96, 96, C.white, 24) + line('M476 476H724', C.white, 16) }),
  // not this tool: a data lake and a ledger go elsewhere
  cylinder(250, 150, 150, 110, { color: C.grey }),
  arrow('M250 300C250 400 230 440 196 470', C.grey),
  box(880, 130, 150, 170, C.grey, 30), line('M916 182H994M916 222H994M916 262H966', C.grey),
  arrow('M955 336C955 420 975 450 1008 474', C.grey),
];
