// The Dataverse tradeoff: the platform's one opening lets the app's
// metadata out (a sheet); the business data (the indigo hero tile) is
// stopped inside, with the runtime.
export const topic = 'governance';
export const aria = 'Inside a platform, a blue block of business data stays put; only a sheet of metadata leaves through the one opening.';

export default ({ C, line, tile, arrow, stopBar }) => {
  const W = C.white;
  return [
    // the platform, with one opening on the right
    line('M700 270V170a40 40 0 0 0-40-40H210a40 40 0 0 0-40 40v350a40 40 0 0 0 40 40H660a40 40 0 0 0 40-40V400'),
    tile(220, 180, 290, 330, { inner: line('M266 260H464M266 330H424M266 400H444', W, 18) }),
    // metadata leaves
    arrow('M556 335H800'),
    line('M860 250H930L980 300V390Q980 420 950 420H860Q830 420 830 390V280Q830 250 860 250Z'),
    line('M930 250V280Q930 300 950 300H980'), line('M864 352H930M864 384H912'),
    // the data does not
    line('M556 470H630', C.red, 7), stopBar(646, 470),
  ];
};
