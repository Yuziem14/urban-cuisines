'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tag extends Model {
  static boot() {
    super.boot()
    this.addHook('beforeSave', 'TagHook.normalize')
  }

  restaurants() {
    return this.belongsToMany(
      'App/Models/Restaurant',
      'tag_id',
      'restaurant_id',
      'id',
      'id'
    )
      .pivotTable('restaurant_tags')
      .withTimestamps()
  }
}

module.exports = Tag
