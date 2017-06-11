/* import test from 'ava'
var client = require('node-rest-client-promise').Client()

// on test, grâce à l'api tweeter, si l'on accès au compte tweeter du groupe
test('test twitter', t => {
  client.getPromise('https://twitter.com/search?q=%40@Faengsel', function (data, response) {
    for (var x in response) {
      if (x === 'statusCode') {
        console.log('TEST UNITAIRE twitter / fonction -> accès au compte twitter du groupe : Statut code : ' + response[x])
        t.is(response[x], 200)
        break
      }
    }
  })
    .catch((error) => {
      t.fail()
      console.log('TEST UNITAIRE twitter / fonction -> accès au compte twitter du groupe : Erreur')
      console.log(error)
    })
})

*/
