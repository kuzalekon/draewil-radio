
class Track {
  constructor({ id, artist, title, duration }) {
    if (!id) throw new TypeError('param "id" is not defined')
    if (!artist) throw new TypeError('param "artist" is not defined')
    if (!title) throw new TypeError('param "title" is not defined')
    if (!duration) throw new TypeError('param "duration" is not defined')

    this.id = id
    this.artist = artist
    this.title = title
    this.duration = duration
  }

  getFirstLetterOfTitle() {
    return normalizeTitle(this.title)[0]
  }

  getLastLetterOfTitle() {
    const normalizedTitle = normalizeTitle(this.title)
    return normalizedTitle[normalizedTitle.length - 1]
  }
}

function normalizeTitle(title) {
  return title
  .trim()
  .replace(/\(.+?\)/g, '')
  .replace(/[^a-z0-9+]+/gi, '')
  .toUpperCase()
}

module.exports = Track
