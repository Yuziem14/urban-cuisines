'use strict'

const { slugify, capitalize } = require('../../Utils/index')

const TagHook = (exports = module.exports = {})

TagHook.normalize = async tag => {
  tag.slug = slugify(tag.name)
  tag.name = capitalize(tag.name)
}
