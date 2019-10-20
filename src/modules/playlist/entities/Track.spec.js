const { describe, it } = require('mocha')
const { expect } = require('chai')
const { Track } = require('../entities')
const { getRandomInt } = require('../../utils')

describe('Track', () => {
  const trackParams = Object.freeze({
    id: getRandomInt(0, 1000),
    artist: 'Track Artist',
    title: 'Track Title',
    duration: getRandomInt(60000, 200000)
  })

  function createTrack(params) {
    return new Track(params)
  }

  it('should create track instance', () => {
    expect(createTrack(trackParams)).to.have.all.keys(['id', 'artist', 'title', 'duration'])
  })

  Object.keys(trackParams).forEach(key => {
    it(`should throw error if "${key}" param not defined`, () => {
      const params = { ...trackParams }
      Reflect.deleteProperty(params, key)

      expect(createTrack.bind(null, params)).to.throw(TypeError, `param "${key}" is not defined`)
    })
  })

  it('should return first letter of track title', () => {
    const track = createTrack(trackParams)
    const title = track.title
    expect(track.getFirstLetterOfTitle()).to.eq(title[0].toUpperCase())
  })

  it('should return last letter of track title', () => {
    const track = createTrack(trackParams)
    const title = track.title
    expect(track.getLastLetterOfTitle()).to.eq(title[title.length - 1].toUpperCase())
  })
})
