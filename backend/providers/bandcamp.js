const axios = require('axios')
// const cheerio = require('cheerio')

module.exports = {
  // _trackSearch(q, limit, page, results) {
  //   limit = limit || 20
  //   page = page || 1
  //   results = results || []
  //
  //   return axios.get('https://bandcamp.com/search', {
  //     params: {
  //       q: q,
  //       page: page
  //     }
  //   }).then(response => {
  //     const $ = cheerio.load(response)
  //
  //     $('.searchresult.track').each((idx, el) => {
  //       const name = $(el).find('.heading').text().trim()
  //       const url = $(el).find('.itemurl').text().trim()
  //       const artwork = $(el).find('.art img').attr('src')
  //
  //       if (results.length < limit)
  //         results.push({
  //           providerId: url,
  //           name: name,
  //           provider: 'bandcamp',
  //           artwork: artwork,
  //           duration: 0,
  //           leven: levenshtein(name, that.input)
  //         })
  //     })
  //
  //     if (results.length < limit)
  //       return this._trackSearch(q, limit, page + 1, results)
  //     else
  //       return results
  //   })
  // }

  trackSearch(q) {
    return axios.get('https://bandcamp.com/api/nusearch/2/autocomplete', {
      params: {
        q: q
      }
    }).then(response => {
      return Promise.all(
        response.data.results.filter(el => {
          return el.type === 't'
        }).map(track => {
          return this.getTrack(track.url).then(source => {
            return {
              providerId: track.url,
              name: `${track.name} - ${track.band_name}`,
              provider: 'bandcamp',
              artwork: track.img,
              duration: source.duration
            }
          })
        })
      )
    })
  },

  getTrack(url) {
    return axios.get(url).then(response => {
      const data = response.data

      return {
        duration: Number(data.match(/"duration":([\d\.]+),/)[1]) * 1000,
        stream: data.match(/{"mp3-128":"(.+)"}/)[1]
      }
    })
  }
}
