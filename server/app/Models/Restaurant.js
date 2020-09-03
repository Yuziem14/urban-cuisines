'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Restaurant extends Model {
  tags() {
    return this.belongsToMany(
      'App/Models/Tag',
      'restaurant_id',
      'tag_id',
      'id',
      'id'
    )
      .pivotTable('restaurant_tags')
      .withTimestamps()
  }
}

module.exports = Restaurant
