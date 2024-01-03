export default {
  name: 'readingListEntry',
  title: 'Reading List Entry',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The title of the article.',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'url',
      description: 'The link to the article.',
    },
    {
      name: 'previewImage',
      title: 'Preview Image',
      type: 'image',
      description: 'An image that represents the article.',
      options: {
        hotspot: true,  // Enables custom cropping
      },
    },
    {
      name: 'shortSummary',
      title: 'Short Summary',
      type: 'string',
      description: 'A brief summary or excerpt from the article.',
    },
    {
      name: 'detailedSummary',
      title: 'Detailed Summary',
      type: 'text',  // This type is more suitable for longer texts than 'string'
      description: 'A more detailed summary or analysis of the article.',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'tag' }
          ]
        }
      ],
      description: 'Tags or categories related to the article.',
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Indicate if this article should be highlighted or featured.',
    }
  ],
}
