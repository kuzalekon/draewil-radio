const { createContainer, asClass } = require('awilix')
const { TrackRepository } = require('./modules/playlist/repositories')
const { PlaylistService } = require('./modules/playlist/services')

module.exports =
  createContainer()
  .register({
    trackRepository: asClass(TrackRepository).singleton(),
    playlistService: asClass(PlaylistService).singleton()
  })
