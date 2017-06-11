var Twitter = require('twitter')
const Discord = require('discord.js')
const config = require('../config.js')
const clientDiscord = new Discord.Client()
var client = new Twitter({
  consumer_key: config.consumer_key,
  consumer_secret: config.consumer_secret,
  access_token_key: config.access_token_key,
  access_token_secret: config.access_token_secret
})

// fonction qui analyse les flux twitter et retourne dans le channel tous lew twittes avec le tag @Faengsel
// entrée -> fonction de callback qui permet d'afficher un message dans le channel souhaité
function watchTweets (callback) {
  // initialisation de la fonction stream pour lire le flux de twitte
  client.stream('statuses/filter', {track: '@Faengsel'}, function (stream) {
    // léve un événement si @Faengsel est mentionné
    stream.on('data', function (event) {
      console.log(event)
      console.log(clientDiscord)
      if (callback) {
        var discordMessage = event.user.screen_name + ': ' + event.text + '\nhttp://twitter.com/' + event.user.screen_name + '/status/' + event.id_str
        console.log('tweet', discordMessage)
        callback(discordMessage, '306028204295192576')
      }
    })
    // en cas d'erreur on affiche celle-ci en console
    stream.on('error', function (error) {
      var errorMessage = 'Un problème est survenu, le boot a dépase le nombre de connexion autorisé'
      console.log(errorMessage)
      console.log(error)
      // throw error
    })
  })
}

// fonction pour twitter / entrée -> le twitte à envoyé (tweet), l'objet msg du bot (msg) pour pouvoir écrire dans le channel
var tweeter = function (tweet, msg) {
  client.post('statuses/update', {status: tweet}) // on poste le twitte
  .then(function (tweet) {
    console.log(tweet)
    msg.channel.send('Bonjour, votre twitte  a bien été envoyé') // si posté on envoie le message ci-contre dans le channel
  })
  .catch(function (error) {
    msg.channel.send('une erreur est survenue') // sinon on envoie un message d'erreur dans le channel
    console.log(error) // on affiche l'erreur en console
  })
}

// fonction analyze permet d'analyser le message et de récupérer le contenue à twitter
// entrée -> l'objet msg du bot (msg)
var analyze = function (msg) {
  var index2Pts = msg.content.indexOf(':')
  this.tweeter(msg.content.substring(index2Pts + 1), msg) // on récupère le contenue du message aprés les ':' puis on envoie le résultat à la fonction tweeter
}

module.exports = {
  watchTweets: watchTweets,
  tweeter: tweeter,
  analyze: analyze
}
