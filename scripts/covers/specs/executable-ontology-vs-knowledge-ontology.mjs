// Every key you can write in the definition (the indigo hero tile) has a
// reader in the runtime; a key with none is refused. The one label is the key
// that was removed: abstract.
export const topic = 'app-building';
export const aria = 'Two keys of a blue definition each reach a reader; the third key, abstract, has none and is stopped.';

export default ({ C, tile, line, arrow, stopBar, label }) => {
  const eye = (cx, cy) => line(`M${cx - 60} ${cy}q60 -52 120 0q-60 52 -120 0z`) + `<circle cx="${cx}" cy="${cy}" r="17" fill="${C.ink}"/>`;
  return [
    tile(190, 140, 300, 380, { deg: -2, inner: line('M236 230H444M236 330H424M236 430H434', C.white, 18) }),
    arrow('M534 230H626'), eye(720, 230),
    arrow('M534 330H626'), eye(720, 330),
    line('M534 430H680', C.red, 7), stopBar(696, 430),
    label(734, 450, 'abstract', C.ink),
  ];
};
