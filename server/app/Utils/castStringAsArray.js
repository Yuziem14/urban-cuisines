function castStringAsArray(str = '', separateBy = ',') {
  const array = str
    .replace(/\s+/g, ' ')
    .split(separateBy)
    .map(value => value.trim())
    .filter(value => !!value)

  return array
}

module.exports = castStringAsArray
