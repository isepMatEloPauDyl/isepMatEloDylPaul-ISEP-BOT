import test from 'ava'
var client = require('node-rest-client-promise').Client()

// on teste avec l'api pokemon si l'on accéde au serivce pokemon
test('test recherche pokémon', t => {
  client.getPromise('https://pokeapi.co/api/v2/pokemon/charmander', function (data, response) {
    for (var x in response) {
      if (x === 'statusCode') {
        console.log('TEST UNITAIRE pokeapi / fonction -> pokemon : Statut code : ' + response[x])
        t.is(response[x], 200)
        break
      }
    }
  })
  .catch((error) => {
    t.fail()
    console.log('TEST UNITAIRE pokeapi / fonction -> pokemon : Erreur')
    console.log(error)
  })
})

test('test recherche évolution pokémon', t => {
// on teste avec l'api pokemon si l'on accéde au serivce pokemon-species
  client.getPromise('https://pokeapi.co/api/v2/pokemon-species/charmander', function (data, response) {
    for (var x in response) {
      if (x === 'statusCode') {
        console.log('TEST UNITAIRE pokeapi / fonction -> pokemon-species : Statut code : ' + response[x])
        t.is(response[x], 200)
        break
      }
    }
  })
  .catch((error) => {
    t.fail()
    console.log('TEST UNITAIRE pokeapi / fonction -> : Erreur')
    console.log(error)
  })
})
