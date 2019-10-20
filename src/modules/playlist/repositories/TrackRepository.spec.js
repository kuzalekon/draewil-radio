const { describe, it } = require('mocha')
const { expect } = require('chai')
const faker = require('faker')
const { Track } = require('../entities')
const { TrackMapper } = require('../mappers')
const { TrackRepository } = require('../repositories')
const { getRandomInt } = require('../../utils')

describe('TrackRepository', () => {
  function createTrack() {
    return new Track({
      id: getRandomInt(0, 1000),
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

  it('should insert one track', () => {
    const repo = new TrackRepository()
    const tracks = createTrack()
    const docs = TrackMapper.toPersist(tracks)

    repo.insertOne(tracks)

    expect([].concat.apply([], Array.from(repo.map.values()))).to.eql([docs])
  })

  it('should insert many tracks', () => {
    const repo = new TrackRepository()
    const tracks = createTracks()
    const docs = tracks.map(e => TrackMapper.toPersist(e))

    repo.insertMany(tracks)

    expect([].concat.apply([], Array.from(repo.map.values()))).to.have.deep.members(docs)
  })

  it('should get all letter keys', () => {
    const repo = new TrackRepository()
    const tracks = createTracks(10)
    const letters = Array.from(new Set(tracks.map(t => t.getFirstLetterOfTitle())))

    repo.insertMany(tracks)

    expect(repo.getLetters()).to.have.members(letters)
  })

  it('should get one random track by first letter of title', () => {
    const repo = new TrackRepository()
    const tracks = createTracks()

    repo.insertMany(tracks)

    const letters = repo.getLetters()
    const letter = letters[getRandomInt(0, letters.length - 1)]

    expect(repo.getRandomOneByLetter(letter)).to.have.all.keys(['id', 'artist', 'title', 'duration'])
  })
})
