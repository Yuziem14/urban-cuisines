'use strict'
const { castStringAsArray } = require('../../Utils')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const RestaurantRepository = use('App/Repositories/RestaurantRepository')

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
    const { tags: tagString } = request.get()
    const tags = castStringAsArray(tagString)
    const restaurants = await RestaurantRepository.filterByTags(tags)

    return response.json([...restaurants.toJSON()])
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
    const { tags: tagString, custom_tags } = request.all()
    const tags = castStringAsArray(tagString)
    const customTags = castStringAsArray(custom_tags).map(tag => ({
      name: tag,
    }))
    const logo = request.file('logo', {
      types: ['image'],
    })

    const restaurant = await RestaurantRepository.create({
      ...request.all(),
      tags,
      customTags,
      logo,
    })

    if (!restaurant) {
      return response.status(400).json({
        err: 'E_FAILED_TO_CREATE_RESTAURANT',
      })
    }

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
    const restaurant = await RestaurantRepository.find(id)

    if (!restaurant) {
      return response.status(400).json({ err: 'NOT_FOUND' })
    }

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
