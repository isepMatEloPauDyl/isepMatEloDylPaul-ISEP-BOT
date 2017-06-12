var client = require('node-rest-client-promise').Client()
const config = require('../config.js')

// on teste avec l'api youtube si la recherhe d'une vidéo marche
client.getPromise('https://www.googleapis.com/youtube/v3/search?part=snippet&q=usher&type=video&maxResults=3&key=' + config.keyYoutube, function (data, response) {
  for (var x in response) {
    if (x === 'statusCode') {
      console.log('TEST UNITAIRE youtube / fonction -> video : Statut code : ' + response[x])
      break
    }
  }
})
  .catch((error) => {
    console.log('TEST UNITAIRE youtube / fonction -> video : Erreur')
    console.log(error)
  })

// on avec l'api youtube si la recherhe d'une playlist marche
client.getPromise('https://www.googleapis.com/youtube/v3/search?part=snippet&q=trap&type=playlist&maxResults=3&key=' + config.keyYoutube, function (data, response) {
  for (var x in response) {
    if (x === 'statusCode') {
      console.log('TEST UNITAIRE youtube / fonction -> playlist : Statut code : ' + response[x])
      break
    }
  }
})
  .catch((error) => {
    console.log('TEST UNITAIRE youtube / fonction -> playlist : Erreur')
    console.log(error)
  })

// on avec l'api youtube si la recherhe d'une chaîne marche
client.getPromise('https://www.googleapis.com/youtube/v3/search?part=snippet&q=ledoc&type=chaine&maxResults=3&key=' + config.keyYoutube, function (data, response) {
  for (var x in response) {
    if (x === 'statusCode') {
      console.log('TEST UNITAIRE youtube / fonction -> chaîne : Statut code : ' + response[x])
      break
    }
  }
})
  .catch((error) => {
    console.log('TEST UNITAIRE youtube / fonction -> chaîne : Erreur')
    console.log(error)
  })
