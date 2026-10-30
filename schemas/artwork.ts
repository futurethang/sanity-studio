import {defineField, defineType} from 'sanity'
import {pinned, tags, visibility} from './fields'

/**
 * A piece of visual art or design work.
 *
 * > "It's more a portfolio, a showcase, good media viewing."
 *
 * The art lives at art.kevinhyde.com, which is its own site with its own
 * design — but it is managed here, because this studio is the single place
 * work gets put in regardless of where it comes out. Each consuming site
 * queries what it wants; nothing in the document names a site, so adding one
 * never means editing documents.
 *
 * Media-first, and the inverse of `capture`: an artwork with no image is not
 * a draft of anything, so the image is required and so is its alt text. On a
 * page that is mostly pictures, alt text is the content rather than metadata
 * about it — an empty alt leaves a screen reader with nothing at all.
 */
export default defineType({
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'What the piece shows. This is content here, not metadata.',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.integer().min(1900).max(new Date().getFullYear() + 1),
    }),
    defineField({
      name: 'medium',
      title: 'Medium',
      type: 'string',
      description: 'Ink, screen print, digital, mixed — however you would label it.',
    }),
    defineField({
      name: 'series',
      title: 'Series',
      type: 'string',
      description: 'Leave empty unless the piece belongs with others.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    tags,
    visibility,
    pinned,
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower sorts first. Leave empty to fall back to newest.',
    }),
  ],

  orderings: [
    {title: 'Manual order', name: 'manual', by: [{field: 'order', direction: 'asc'}]},
    {title: 'Newest first', name: 'yearDesc', by: [{field: 'year', direction: 'desc'}]},
  ],

  preview: {
    select: {title: 'title', year: 'year', medium: 'medium', media: 'image'},
    prepare({title, year, medium}) {
      return {title, subtitle: [year, medium].filter(Boolean).join(' · ')}
    },
  },
})
