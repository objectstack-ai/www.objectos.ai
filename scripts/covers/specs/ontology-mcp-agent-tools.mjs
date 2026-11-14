// The ontology (the indigo hero tile) projected into MCP tools: reads
// collapse into one wide tool, writes expand into one narrow tool per action.
export const topic = 'ai-agents';
export const aria = 'A blue ontology projects into one wide read tool and three narrow write tools.';

export default ({ C, tile, fill, line, arrow, box }) => {
  const W = C.white;
  return [
    tile(325, 105, 620, 200, { inner: [fill(380, 145, 150, 56, W, 24), fill(560, 145, 150, 56, W, 24), fill(740, 145, 150, 56, W, 24), line('M380 250H890', W, 16)] }),
    // reads: many object types, one wide tool
    arrow('M395 350V398'),
    box(195, 436, 400, 104, C.ink, 40), line('M240 488H550'),
    // writes: one narrow tool per action type
    arrow('M695 350V398'), arrow('M825 350V398'), arrow('M955 350V398'),
    box(645, 436, 100, 104, C.ink, 30), box(775, 436, 100, 104, C.ink, 30), box(905, 436, 100, 104, C.ink, 30),
  ];
};
