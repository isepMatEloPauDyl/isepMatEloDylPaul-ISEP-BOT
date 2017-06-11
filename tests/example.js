import test from 'ava'
var client = require('node-rest-client-promise').Client()

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

test('Example test', t => {
  return client.getPromise('https://pokeapi.co/api/v2/pokemon/charmander')
    .catch((error) => {
      t.fail()
      // throw error
      console.log(error)
    })
    .then((res) => {
      console.log('TEST UNITAIRE pokeapi / fonction -> pokemon : Statut code : ' + res.response.statusCode)
      t.is(res.response.statusCode, 200)
    })
})
