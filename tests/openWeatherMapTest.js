import test from 'ava'
var client = require('node-rest-client-promise').Client()
const config = require('../config.js')

// on teste avec l'api openWheaterMap si la recherche de la météo du jour
test('test météo du jour sur paris', t => {
  return client.getPromise('http://api.openweathermap.org/data/2.5/weather/?q=Paris&units=metric&APPID=' + config.keyWeather)
    .then((res) => {
      console.log('TEST UNITAIRE openWheaterMap / fonction -> météo du jour : statut' + res.response.statusCode)
      t.is(res.response.statusCode, 200)
    })
  .catch((error) => {
    t.fail()
    console.log('TEST UNITAIRE openWheaterMap / fonction -> météo du jour : Erreur')
    console.log(error)
  })
})
// on teste avec l'api openWheaterMap si la prévision de la météo sur 5 jours marches
test('test météo sur 5 jours sur paris', t => {
  return client.getPromise('http://api.openweathermap.org/data/2.5/forecast/?q=Paris&units=metric&APPID=' + config.keyWeather)
  .then((res) => {
    console.log('TEST UNITAIRE openWheaterMap / prévision météo : statut' + res.response.statusCode)
    t.is(res.response.statusCode, 200)
  })
    .catch((error) => {
      t.fail()
      console.log('TEST UNITAIRE openWheaterMap / prévision météo : Erreur')
      console.log(error)
    })
})
