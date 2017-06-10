const config = require('../config.js')
var translate = require('@google-cloud/translate')({
  key: config.keyGoogle
})

// const regGeneral = /^!translate:/
// const regLangue = /^!targetLanguage:/

module.exports = {

  Analyse: function (msg) {
    var donnees = msg.content.match(/\[(.*?)\]/ig)
    var langue = donnees[0].substring(1, donnees[0].length - 1)
    var indexDebut = msg.content.indexOf(']')
    var text = msg.content.substring(indexDebut + 1, msg.length)
    // console.log('index début : ' + indexDebut)
    // console.log('langue : ' + langue)
    // console.log('text : ' + text)
    this.searchTraduction(langue, text, msg)
  },
  // Translate a string of text.
  searchTraduction: function (langue, text, msg) {
    translate.translate(text, langue, function (err, translation) {
      if (!err) {
        console.log(translation)
        msg.channel.send('La traduction est : ' + translation)
      } else {
        msg.channel.send('Une erreur est survenue, veuillez nous excuser pour la gêne ocassionée  ')
      }
    })
  }
}
