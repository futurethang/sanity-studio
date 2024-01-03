export default {
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Name of the tag.',
    }
  ],

  preview: {
    select: {
      title: 'title'
    }
  }
}
