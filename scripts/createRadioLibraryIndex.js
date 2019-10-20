const fs = require('fs')
const { toJson } = require('xml2json')

fs.readFile(process.argv[2], (error, xml) => {
  if (error)    {
return console.error(error)
}

  const trackLibrary = toJson(xml.toString(), { object: true, trim: true }).Library.Artist
  const trackMap = {}

  // '0' - '9' keys
  for (let n = 48; n <= 57; ++n)    {
trackMap[String.fromCharCode(n)] = []
}

  // 'A' - 'Z' keys
  for (let c = 65; c <= 90; ++c)    {
 trackMap[String.fromCharCode(c)] = []
}

  trackLibrary.forEach(rec => {
    const artist = rec.name
    const songs = Array.isArray(rec.Song) ? rec.Song : [rec.Song]

    songs.forEach(song => {
      const { id, name: title, duration } = song
      const ch = title[0].toUpperCase()

      // Filter non-latin symbols
      if ((ch < 'A' || ch > 'Z') && (ch < '0' || ch > '9'))        {
return
}

      trackMap[ch].push({ id, artist, title, duration })
    })
  })

  fs.writeFile(process.argv[3], JSON.stringify(trackMap, null, 2), (error) => {
    if (error)      {
return console.error(error)
}

    console.info('Radio library database successfully created')
  })
})
