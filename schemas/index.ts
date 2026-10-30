import blockContent from './blockContent'
import category from './category'
import post from './post'
import author from './author'
import readingListEntry from './readingListEntry'
import tags from './tags'
import capture from './capture'
import artwork from './artwork'

/**
 * `post` and `readingListEntry` are on their way out, and are still here only
 * because the documents are. `post` is one type doing five jobs — books,
 * articles, blog posts, samples and art, told apart by a category reference —
 * which is why not one of its fields can be required. `capture` and `artwork`
 * replace the parts of it that are still wanted; the prose is moving to
 * markdown in kevinhyde.com. See docs/content-model.md over there.
 *
 * Nothing is removed yet: the live site still reads `post`, and the migration
 * wants the audit numbers first.
 */
export const schemaTypes = [
  capture,
  artwork,
  post,
  author,
  category,
  blockContent,
  readingListEntry,
  tags,
]