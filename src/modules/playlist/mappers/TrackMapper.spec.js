const { describe, it } = require('mocha')
const { expect } = require('chai')
const { Track } = require('../entities')
const { TrackMapper } = require('../mappers')
const { getRandomInt } = require('../../utils')

describe('TrackMapper', () => {
  const trackParams = Object.freeze({
    id: getRandomInt(0, 1000),
    artist: 'Track Artist',
    title: 'Track Title',
    duration: getRandomInt(60000, 200000)
  })

  function createTrack(params) {
    return new Track(params)
  }

  it('should map to entity', () => {
    expect(TrackMapper.toEntity(trackParams)).to.be.instanceOf(Track)
  })

  it('should map to DTO', () => {
    expect(TrackMapper.toDto(createTrack(trackParams))).to.eql({
      artist: trackParams.artist,
      title: trackParams.title,
      duration: trackParams.duration
    })
  })

  it('should map to persist', () => {
    expect(TrackMapper.toPersist(createTrack(trackParams))).to.eql(trackParams)
  })
})
