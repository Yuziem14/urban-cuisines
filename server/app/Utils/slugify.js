function slugify(str) {
  const slug = str
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/([^a-zA-Z0-9-])+/g, '')
    .toLowerCase()

  return slug
}

module.exports = slugify
