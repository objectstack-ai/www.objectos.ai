// Build by table, change by chat: a request in a chat bubble adds a new
// column (green) to the table (the indigo hero tile).
export const topic = 'app-building';
export const aria = 'A chat request adds a green column of cells to a blue table.';

export default ({ C, line, arrow, tile, fill }) => {
  const W = C.white;
  const cells = [];
  for (const y of [204, 284, 364, 444]) {
    for (const x of [206, 318, 430]) cells.push(fill(x, y, 92, 54, W, 18));
    cells.push(fill(542, y, 72, 54, C.green, 18));
  }
  return [
    tile(170, 164, 480, 374, { inner: cells }),
    // the request
    line('M824 200H986a44 44 0 0 1 44 44v52a44 44 0 0 1-44 44H880l-40 34 6-34h-22a44 44 0 0 1-44-44v-52a44 44 0 0 1 44-44z'),
    line('M826 252H984M826 288H930'),
    arrow('M752 270H698'),
  ];
};
