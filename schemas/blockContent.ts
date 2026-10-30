import {defineType, defineArrayMember} from 'sanity'

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      // Styles let you set what your user can mark up blocks with. These
      // correspond with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [{title: 'Bullet', value: 'bullet'}],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    }),
    /*
     * An image in a body, with the three things the template default left out.
     *
     * Without them this member was a bare image: no alt, no caption, and no
     * way to say how big it should be. A media-heavy page could not be
     * expressed at all, which is why the old site's one case study was
     * hand-written rather than authored here. A long write-up with real
     * layout intent is better off in MDX on the consuming site — but an
     * illustrated paragraph is not, and this is what it needs.
     */
    defineArrayMember({
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'What the image shows, for anyone who cannot see it.',
          /*
           * A warning, not an error, for the same reason the tag spelling
           * check is one: `post` bodies already contain images that predate
           * this field, and a hard failure would block publishing every one
           * of them until someone went back and filled it in. New images get
           * nudged; old documents stay editable.
           */
          validation: (Rule: any) =>
            Rule.custom((alt: string | undefined) => (alt ? true : 'An image needs alt text.')).warning(),
        },
        {
          name: 'caption',
          title: 'Caption',
          type: 'string',
          description: 'Shown under the image. Optional.',
        },
        {
          name: 'layout',
          title: 'Layout',
          type: 'string',
          initialValue: 'default',
          options: {
            list: [
              {title: 'Narrow — under half the column', value: 'narrow'},
              {title: 'Default — the text column', value: 'default'},
              {title: 'Wide — past the text column', value: 'wide'},
              {title: 'Full bleed', value: 'full'},
            ],
          },
        },
      ],
    }),
  ],
})
