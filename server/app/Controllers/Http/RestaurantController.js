'use strict'

const { castStringAsArray, slugify } = require('../../Utils')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Helpers = use('Helpers')
const Restaurant = use('App/Models/Restaurant')

/**
 * Resourceful controller for interacting with restaurants
 */
class RestaurantController {
  /**
   * Show a list of all restaurants.
   * GET restaurants
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response }) {
    const { tags } = request.get()
    const tagsArray = castStringAsArray(tags)
    const restaurants = await Restaurant.query()
      .with('tags')
      .whereIn('slug', tagsArray)
      .select('name', 'logo_url', 'latitude', 'longitude')
      .fetch()
    return response.json({ ...restaurants.toJSON() })
  }

  /**
   * Create/save a new restaurant.
   * POST restaurants
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const {
      name,
      description,
      phone_number,
      address,
      latitude,
      longitude,
    } = request.all()

    const tags = castStringAsArray(request.all().tags)
    const customTags = castStringAsArray(request.all().custom_tags).map(
      tag => ({
        name: tag,
      })
    )

    const logo = request.file('logo', {
      types: ['image'],
    })

    const fileName = `${slugify(
      logo.clientName.replace(/\.[^/.]+$/g, '')
    )}_${Date.now()}.${logo.extname}`
    console.log(logo)

    await logo.move(Helpers.publicPath('uploads'), {
      name: fileName,
      overwrite: true,
    })

    if (!logo.moved())
      return response
        .status(400)
        .json({ error: 'E_INVALID_FILE', message: 'Cannot process the file' })

    const restaurant = await Restaurant.create({
      name,
      description,
      phone_number,
      address,
      latitude,
      longitude,
      logo_url: fileName,
    })

    await restaurant.tags().attach(tags)
    await restaurant.tags().createMany(customTags)

    return response.json({ ...restaurant.toJSON() })
  }

  /**
   * Display a single restaurant.
   * GET restaurants/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response }) {
    const { id } = params
    const restaurant = await Restaurant.find(id)

    return response.json({ ...restaurant.toJSON() })
  }

  /**
   * Update restaurant details.
   * PUT or PATCH restaurants/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a restaurant with id.
   * DELETE restaurants/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = RestaurantController
