'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

const Tag = use('App/Models/Tag')
const tags = require('../mocks/tags.json')

class AddInitialTagsSchema extends Schema {
  async up() {
    await Tag.createMany(tags)
  }

  down() {}
}

module.exports = AddInitialTagsSchema
