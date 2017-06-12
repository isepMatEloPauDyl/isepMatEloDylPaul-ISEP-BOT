import test from 'ava'
var client = require('node-rest-client-promise').Client()

// on teste avec l'api pokemon si l'on accéde au serivce pokemon
test('test recherche pokémon', t => {
  client.getPromise('https://pokeapi.co/api/v2/pokemon/charmander/')
  .then((res) => {
    console.log('TEST UNITAIRE pokeapi / fonction -> : pokemon statut : ' + res.response.statusCode)
    t.is(res.response.statusCode, 200)
  })
  .catch((error) => {
    t.fail()
    console.log('TEST UNITAIRE pokeapi / fonction -> pokemon : Erreur')
    console.log(error)
  })
})

test('test recherche évolution pokémon', t => {
// on teste avec l'api pokemon si l'on accéde au serivce pokemon-species
  client.getPromise('https://pokeapi.co/api/v2/pokemon-species/charmander/')
  .then((res) => {
    console.log('TEST UNITAIRE pokeapi / fonction -> : pokemon-species statut : ' + res.response.statusCode)
    t.is(res.response.statusCode, 200)
  })
  .catch((error) => {
    t.fail()
    console.log('TEST UNITAIRE pokeapi / fonction -> : Erreur pokemon-species ')
    console.log(error)
  })
})
