const { Track } = require('../entities')

class TrackMapper {
  static toEntity({ id, title, artist, duration }) {
    return new Track({ id, title, artist, duration })
  }

  static toDto(entity) {
    const { title, artist, duration } = entity
    return { title, artist, duration }
  }

  static toPersist(entity) {
    const { id, title, artist, duration } = entity
    return { id, title, artist, duration }
  }
}

module.exports = TrackMapper
