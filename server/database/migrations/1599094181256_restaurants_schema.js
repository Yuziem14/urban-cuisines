'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RestaurantsSchema extends Schema {
  up() {
    this.create('restaurants', table => {
      table.increments()
      table.string('name').notNullable()
      table.text('description').nullable()
      table.string('logo_url').notNullable()
      table.string('phone_number').notNullable()
      table.string('address').notNullable()
      table.decimal('latitude', 8, 6).notNullable()
      table.decimal('longitude', 8, 6).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('restaurants')
  }
}

module.exports = RestaurantsSchema
