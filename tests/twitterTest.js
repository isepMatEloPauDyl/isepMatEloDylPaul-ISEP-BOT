import test from 'ava'
var client = require('node-rest-client-promise').Client()

// on test, grâce à l'api tweeter, si l'on accès au compte tweeter du groupe
test('test twitter', t => {
  return client.getPromise('https://twitter.com/search?q=%40@Faengsel')
  .then((res) => {
    console.log('TEST UNITAIRE twitter / fonction -> accès au compte twitter du groupe : statut' + res.response.statusCode)
    t.is(res.response.statusCode, 200)
  })
    .catch((error) => {
      t.fail()
      console.log('TEST UNITAIRE twitter / fonction -> accès au compte twitter du groupe : Erreur')
      console.log(error)
    })
})
