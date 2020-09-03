'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RestaurantTagsSchema extends Schema {
  up() {
    this.create('restaurant_tags', table => {
      table.increments()
      table.integer('restaurant_id').unsigned().notNullable()
      table.integer('tag_id').unsigned().notNullable()
      table.foreign('restaurant_id').references('id').inTable('restaurants')
      table.foreign('tag_id').references('id').inTable('tags')
      table.timestamps()
    })
  }

  down() {
    this.drop('restaurant_tags')
  }
}

module.exports = RestaurantTagsSchema
