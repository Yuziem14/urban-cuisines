function capitalize(str) {
  const capitalized = str
    .replace(/\s+/g, ' ')
    .toLowerCase()
    .split(' ')
    .map(uncapitalized => {
      const firstLetter = uncapitalized.charAt(0)
      const lastLetters = uncapitalized.slice(1)
      return `${firstLetter.toUpperCase()}${lastLetters}`
    })
    .join(' ')

  return capitalized
}

module.exports = capitalize
