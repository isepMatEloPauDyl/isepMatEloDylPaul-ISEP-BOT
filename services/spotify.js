var client = require('node-rest-client-promise').Client()

module.exports = {
  spotifiysearch: function (content) {
    return client.getPromise('https://api.spotify.com/v1/search?q=name:usher&type=album,track,artist,playlist')
      .catch((error) => {
        throw error
      })
      .then((res) => {
      //  console.log(res.data)
        var tracks = res.data.tracks.items
        console.log(tracks)
        // for (var track in tracks) {
        //   console.log('alex')
        //   console.log(track)
        // }
      })
  //  return 'Spotify handler'
  }
}
