const { readFile } = require('fs')
const { TrackMapper } = require('../mappers')
const { getRandomInt } = require('../../utils')

class TrackRepository {
  constructor() {
    this.map = new Map()
  }

  async loadFromFile(fileName) {
    return new Promise((resolve, reject) => {
      readFile(fileName, (error, data) => {
        if (error)
          reject(error)

        try {
          this.map = new Map(Object.entries(JSON.parse(data)))
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    })
  }

  insertOne(track) {
    const doc = TrackMapper.toPersist(track)
    const letter = track.getFirstLetterOfTitle()

    this.map.has(letter)
      ? this.map.set(letter, [...this.map.get(letter), doc])
      : this.map.set(letter, [doc])
  }

  insertMany(tracks) {
    tracks.forEach(track => this.insertOne(track))
  }

  getLetters() {
    return Array.from(this.map.keys())
  }

  getRandomOneByLetter(letter) {
    let key = letter
    // Hack: if we don't have any track
    while ((this.map.get(key) || []).length === 0)
      key = String.fromCharCode(key.charCodeAt(0) - 1)

    const tracks = this.map.get(key) || []
    return TrackMapper.toEntity(tracks[getRandomInt(0, tracks.length - 1)])
  }
}

module.exports = TrackRepository
