const Database = use('Database')
const Helpers = use('Helpers')

const Restaurant = use('App/Models/Restaurant')
const TagRepository = use('App/Repositories/TagRepository')

const { slugify } = require('../Utils/index')

class RestaurantRepository {
  static async _processFile(file) {
    if (!file) return new Error('E_INVALID_FILE')

    const originalFileNameWithoutExt = file.clientName.replace(/\.[^/.]+$/g, '')
    const newFileName = `${slugify(originalFileNameWithoutExt)}_${Date.now()}.${
      file.extname
    }`

    await file.move(Helpers.publicPath('uploads'), {
      name: newFileName,
      overwrite: true,
    })

    if (!file.moved()) {
      return new Error('E_CANT_PROCESS_FILE')
    }

    return newFileName
  }

  static async all() {
    const restaurants = await Restaurant.query()
      .select('id', 'name', 'logo_url', 'latitude', 'longitude')
      .fetch()
    return restaurants
  }

  static async find(id) {
    const restaurant = await Restaurant.query()
      .with('tags', builder => {
        builder.select('id', 'name', 'slug')
      })
      .where('id', id)
      .first()

    return restaurant
  }

  static async create(payload) {
    const {
      name,
      description,
      phone_number,
      address,
      latitude,
      longitude,
      logo,
      tags,
      customTags,
    } = payload

    const trx = await Database.beginTransaction()

    try {
      const fileName = await this._processFile(logo)

      const restaurant = await Restaurant.create(
        {
          name,
          description,
          phone_number,
          address,
          latitude,
          longitude,
          logo_url: fileName,
        },
        trx
      )

      const tagIds = await TagRepository.findTagIdsBy('slug', tags, true)

      await restaurant.tags().attach(
        tagIds.map(tag => tag.id),
        null,
        trx
      )

      trx.commit()

      await restaurant.tags().createMany(customTags)
      return restaurant
    } catch (err) {
      trx.rollback()
      return null
    }
  }

  static async filterByTags(tagSlugs) {
    const query = Restaurant.query()
      .with('tags', builder => {
        builder.select('id', 'name', 'slug')
      })
      .select('id', 'name', 'logo_url', 'latitude', 'longitude')

    if (tagSlugs.length !== 0) {
      query.whereHas('tags', builder => {
        builder.whereIn('slug', tagSlugs)
      })
    }

    const restaurants = await query.fetch()

    return restaurants
  }
}

module.exports = RestaurantRepository
