import test from 'ava'
var client = require('node-rest-client-promise').Client()
const config = require('../config.js')
var translate = require('@google-cloud/translate')({
  key: config.keyGoogle
})

test('Example test', t => {
  return client.getPromise('http://api.openweathermap.org/data/2.5/weather?q=London&APPID=b05787eda8d8f7967925692ea52134d2')
    .catch((error) => {
      t.fail()
      // throw error
      console.log(error)
    })
    .then((res) => {
      console.log(res.response.statusCode)
      t.is(res.response.statusCode, 200)
    })
})

test('test googleTranslate', t => {
  translate.translate('hello', 'fr', function (err, translation) {
    if (!err) {
      console.log('TEST UNITAIRE  / fonction -> googleTranslate : Statut code : 200')
      t.is(200)
    } else {
      console.log('TEST UNITAIRE  / fonction -> googleTranslate : Statut code : 200 : aucun résultat')
      t.is(200)
    }
    if (err) {
      t.fail()
      console.log('TEST UNITAIRE googleTranslate / fonction -> googleTranslate  : Erreur')
      console.log(err)
      // Test
    }
  })
})
