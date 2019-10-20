const { describe, it } = require('mocha')
const { expect } = require('chai')
const faker = require('faker')
const { Track } = require('../entities')
const { TrackRepository } = require('../repositories')
const { PlaylistService } = require('../services')
const { getRandomInt } = require('../../utils')

describe('PlaylistService', () => {
  function createTrack() {
    return new Track({
      id: getRandomInt(0, 1000000),
      artist: faker.name.findName(),
      title: faker.lorem.words(getRandomInt(2, 5)),
      duration: getRandomInt(60000, 200000)
    })
  }

  function createTracks(length = 5) {
    const tracks = []
    for (let i = 0; i < length; ++i) {
      tracks.push(createTrack())
    }

    return tracks
  }

  it('should generate playlist with default length', async () => {
    const repo = new TrackRepository()
    const service = new PlaylistService({ trackRepository: repo })

    await repo.loadFromFile('./data/RadioLibraryIndex.json')
    const playlist = service.generate()

    expect(playlist).to.be.an('array').lengthOf(100)
    playlist.forEach(t => expect(t).to.have.all.keys(['artist', 'title', 'duration']))
  })

  it('should generate playlist with custom length', async () => {
    const repo = new TrackRepository()
    const service = new PlaylistService({ trackRepository: repo })

    await repo.loadFromFile('./data/RadioLibraryIndex.json')
    const playlist = service.generate(1000)

    expect(playlist).to.be.an('array').lengthOf(1000)
    playlist.forEach(t => expect(t).to.have.all.keys(['artist', 'title', 'duration']))
  })

  it('should throw error when generate playlist with length < 1', () => {
    const service = new PlaylistService({ trackRepository: new TrackRepository() })
    expect(service.generate.bind(service, 0)).to.throw(Error, 'param "length" must be > 0')
  })

  it('should throw error when generate playlist with length > 1000', () => {
    const service = new PlaylistService({ trackRepository: new TrackRepository() })
    expect(service.generate.bind(service, 1001)).to.throw(Error, 'param "length" must be < 1001')
  })
})
