import {defineField, defineType} from 'sanity'
import {pinned, tags, visibility} from './fields'

/**
 * The junk drawer: anything caught on the way past.
 *
 * > "If I find a link on the go and I have a small thing to say about it,
 * > it'd be great for me to just save that link and have that publish easily
 * > and automatically to the site ... It's really just a place for me to kind
 * > of keep a constant brain dump going."
 *
 * One type for what used to be three overlapping ones: the `books` and
 * `articles` categories on `post`, the unused `readingListEntry`, and
 * kevinhyde.com's `links.yaml`. They were three models of a single idea —
 * something found, with a thought about it — and the differences between them
 * were accidents of when each was written.
 *
 * Shaped for capture, not for display. Everything but the title and the kind
 * is optional, because a capture that demands five fields does not get made
 * at a bus stop. `captured` fills itself. This is also the one type meant to
 * be written by things that are not the studio — a share sheet, a shortcut, a
 * browser extension — so it has to be cheap to POST.
 */
export default defineType({
  name: 'capture',
  title: 'Capture',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'kind',
      title: 'Kind',
      type: 'string',
      description: 'What this is. Tags say what it is about.',
      initialValue: 'link',
      options: {
        list: [
          {title: 'Link', value: 'link'},
          {title: 'Book', value: 'book'},
          {title: 'Thought', value: 'thought'},
          {title: 'Image', value: 'image'},
          {title: 'Album', value: 'album'},
          {title: 'Paper', value: 'paper'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'Where it was found. A thought has none.',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'A book cover, a screenshot, or the find itself.',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'What the image shows, for anyone who cannot see it.',
          validation: (Rule) =>
            Rule.custom((alt, context) =>
              context.parent && (context.parent as {asset?: unknown}).asset && !alt
                ? 'An image needs alt text.'
                : true,
            ),
        }),
      ],
    }),
    defineField({
      name: 'note',
      title: 'Note',
      type: 'text',
      rows: 3,
      description: 'Why it was worth keeping. Your own words.',
    }),
    tags,
    defineField({
      name: 'captured',
      title: 'Captured',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'to-read',
      options: {
        list: [
          {title: 'To read', value: 'to-read'},
          {title: 'Read', value: 'read'},
          {title: 'Referenced', value: 'referenced'},
        ],
        layout: 'radio',
      },
    }),
    visibility,
    pinned,
  ],

  orderings: [
    {
      title: 'Newest first',
      name: 'capturedDesc',
      by: [{field: 'captured', direction: 'desc'}],
    },
  ],

  preview: {
    select: {title: 'title', kind: 'kind', status: 'status', media: 'image'},
    prepare({title, kind, status}) {
      return {title, subtitle: [kind, status].filter(Boolean).join(' · ')}
    },
  },
})
