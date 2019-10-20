const { TrackMapper } = require('../mappers')
const { getRandomInt } = require('../../utils')

class PlaylistService {
  constructor({ trackRepository }) {
    this.repo = trackRepository
  }

  generate(length = 100) {
    if (length < 1)
      throw new Error('param "length" must be > 0')

    if (length > 1000)
      throw new Error('param "length" must be < 1001')

    const letters = this.repo.getLetters()
    const playlist = []

    let letter = letters[getRandomInt(0, letters.length - 1)]
    const track = this.repo.getRandomOneByLetter(letter)

    playlist.push(track)
    letter = track.getLastLetterOfTitle()

    for (let i = 1; i < length; ++i) {
      const track = this.repo.getRandomOneByLetter(letter)
      letter = track.getLastLetterOfTitle()
      playlist.push(track)
    }

    return playlist.map(e => TrackMapper.toDto(e))
  }
}

module.exports = PlaylistService
