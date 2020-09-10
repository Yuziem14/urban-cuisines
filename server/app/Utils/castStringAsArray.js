function castStringAsArray(str = '', separateBy = ',') {
  if (!str) {
    return []
  }

  const array = str
    .replace(/\s+/g, ' ')
    .split(separateBy)
    .map(value => value.trim())
    .filter(value => !!value)

  return array
}

module.exports = castStringAsArray
