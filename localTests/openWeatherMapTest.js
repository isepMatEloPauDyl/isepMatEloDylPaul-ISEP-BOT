var client = require('node-rest-client-promise').Client()
const config = require('../config.js')

// on teste avec l'api openWheaterMap si la recherche de la météo du jour
client.getPromise('http://api.openweathermap.org/data/2.5/weather/?q=Paris&units=metric&APPID=' + config.keyWeather, function (data, response) {
  for (var x in response) {
    if (x === 'statusCode') {
      console.log('TEST UNITAIRE openWheaterMap / fonction -> météo du jour : Statut code : ' + response[x])
      break
    }
  }
})
  .catch((error) => {
    console.log('TEST UNITAIRE openWheaterMap / fonction -> météo du jour : Erreur')
    console.log(error)
  })
// on teste avec l'api openWheaterMap si la prévision de la météo sur 5 jours marches
client.getPromise('http://api.openweathermap.org/data/2.5/forecast/?q=Paris&units=metric&APPID=' + config.keyWeather, function (data, response) {
  for (var x in response) {
    if (x === 'statusCode') {
      console.log('TEST UNITAIRE openWheaterMap / fonction -> prévision météo : Statut code : ' + response[x])
      break
    }
  }
})
  .catch((error) => {
    console.log('TEST UNITAIRE openWheaterMap / prévision météo : Erreur')
    console.log(error)
  })
