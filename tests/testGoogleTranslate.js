var client = require('node-rest-client-promise').Client()
const config = require('../config.js')
var translate = require('@google-cloud/translate')({
  key: config.keyGoogle
})

  translate.translate('hello', 'fr', function (err, translation) {
      if (!err) {
        console.log('TEST UNITAIRE  / fonction -> video : Statut code : 200')
      } else {
        console.log('TEST UNITAIRE  / fonction -> video : Statut code : 200 : aucun résultat')
      }
      if (err) {
        console.log('TEST UNITAIRE youtube / fonction -> video : Erreur')
        console.log(err)
      }
    })