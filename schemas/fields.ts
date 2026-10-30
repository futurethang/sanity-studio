import {defineField} from 'sanity'

/**
 * Fields shared by the types this studio feeds to more than one site.
 *
 * They are here rather than copied into each type because they are one idea
 * each, and the consuming sites test them as one idea: kevinhyde.com's
 * `src/content.config.ts` carries the same `visibility` enum over its local
 * collections, and `src/lib/tags.ts` canonicalises tags at every boundary.
 */

/**
 * Whether a document is published anywhere.
 *
 * The consuming sites are static, so "public" means built and "draft" means
 * absent from a build — there is no third thing a static site can do. Each
 * site queries for what it wants; this says only whether the document is ready
 * to be queried at all. Default is public, because the junk drawer is meant to
 * be seen; a draft is for something still being written.
 */
export const visibility = defineField({
  name: 'visibility',
  title: 'Visibility',
  type: 'string',
  initialValue: 'public',
  options: {
    list: [
      {title: 'Public — built and listed', value: 'public'},
      {title: 'Draft — not built anywhere', value: 'draft'},
    ],
    layout: 'radio',
  },
  validation: (Rule) => Rule.required(),
})

/**
 * Free tags, as references to tag documents.
 *
 * The vocabulary is lowercase and hyphenated. The consuming sites canonicalise
 * on the way in, so a stray capital renders correctly either way — but then
 * what is stored and what is shown are different strings, and the next tag gets
 * typed to match the wrong one. See the warning on the tag type itself.
 */
export const tags = defineField({
  name: 'tags',
  title: 'Tags',
  type: 'array',
  of: [{type: 'reference', to: [{type: 'tag'}]}],
  options: {layout: 'tags'},
})

/** Hand-curation: push one item to the front of whatever lists it. */
export const pinned = defineField({
  name: 'pinned',
  title: 'Pinned',
  type: 'boolean',
  initialValue: false,
  description: 'Show this first in any list that carries it.',
})
