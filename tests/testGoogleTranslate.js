import test from 'ava'
const config = require('../config.js')
var translate = require('@google-cloud/translate')({
  key: config.keyGoogle
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
