const Tag = use('App/Models/Tag')

class TagRepository {
  static async all() {
    const tags = await Tag.query().select('id', 'name', 'slug').fetch()

    return tags
  }

  static async create(tags) {
    tags = Array.isArray(tags) ? tags : [tags]
    const newTags = await Tag.createMany(tags)

    return newTags
  }

  static async findTagIdsBy(column, values, serializeToJSON = false) {
    const tagIds = await Tag.query()
      .select('id')
      .whereIn(column, values)
      .fetch()

    return serializeToJSON ? tagIds.toJSON() : tagIds
  }
}

module.exports = TagRepository
