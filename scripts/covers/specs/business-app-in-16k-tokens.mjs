// Context-sized software: one agent context window as a meter; the whole
// app's business logic (the indigo hero) fills under half of it, the UI
// adds a smaller share, and room is left over (dashed).
export const topic = 'ai-agents';
export const aria = 'A context window drawn as a bar: a blue block of business logic, a smaller outlined block for the UI, and dashed room left free.';

export default ({ C, tile, line, box, DASHED }) => {
  const W = C.white;
  return [
    // the window
    box(150, 160, 900, 350, C.ink, 52),
    tile(196, 206, 410, 236, { inner: line('M244 272H558M244 324H518M244 376H538', W, 18) }),
    box(650, 206, 180, 258, C.ink, 36), line('M692 288H788M692 346H758'),
    box(864, 206, 140, 258, C.ink, 36, { extra: DASHED }),
  ];
};
