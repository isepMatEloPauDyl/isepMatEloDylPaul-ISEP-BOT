import test from 'ava'
var client = require('node-rest-client-promise').Client()
const config = require('../config.js')

// on teste avec l'api youtube si la recherhe d'une vidéo marche
test('test youtube vidéo', t => {
  return client.getPromise('https://www.googleapis.com/youtube/v3/search?part=snippet&q=usher&type=video&maxResults=3&key=' + config.keyYoutube)
    .then((res) => {
      console.log('TEST UNITAIRE youtube / fonction -> chaîne : vidéo : ' + res.response.statusCode)
      t.is(res.response.statusCode, 200)
    })
    .catch((error) => {
      t.fail()
      console.log('TEST UNITAIRE youtube / fonction -> video : Erreur')
      console.log(error)
    })
})
