/**
 * A tag. One vocabulary, shared by every type here and by the consuming sites.
 *
 * The spelling rule is lowercase and hyphenated — `claude-code`, not
 * `Claude Code`. kevinhyde.com canonicalises tags at every boundary they
 * cross (`src/lib/tags.ts`), so a stray capital still renders correctly; the
 * cost is subtler than a broken page. What is stored stops matching what is
 * shown, and the next tag gets typed to match the version on screen, so the
 * vocabulary quietly forks into two documents meaning one thing.
 *
 * The check below is a warning rather than an error on purpose: existing tag
 * documents were typed before there was a rule, and a hard failure would make
 * every one of them unsaveable in the studio.
 */
export default {
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Lowercase and hyphenated, e.g. claude-code.',
      validation: (Rule: any) =>
        Rule.custom((title: string | undefined) => {
          if (!title) return 'A tag needs a title.'
          const canonical = title.trim().toLowerCase().replace(/\s+/g, '-')
          return title === canonical ? true : `The canonical spelling is "${canonical}".`
        }).warning(),
    },
  ],

  preview: {
    select: {
      title: 'title',
    },
  },
}
