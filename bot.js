const Discord = require('discord.js')
const config = require('./config.js')
const spotify = require('./services/spotify.js')
const twitter = require('./services/twitter.js')
const youtube = require('./services/youtube.js')
const wheater = require('./services/openWeatherMap.js')
const pokebot = require('./services/pokebot.js')

const client = new Discord.Client()
const regSpotify = /^!spotify/ // régex à respecter pour appeler le service spotify
const regTwitter = /^!twitter:/ // régex à respecter pour appeler le service twitter
const regYoutube = /^!youtube/ // régex à respecter pour appeler le service youtube
const regWeather = /^!weather/ // régex à respecter pour appeler le service  weather de openWeatherMap
const regForecast = /^!forecast/ // régex à respecter pour appeler le service forecast de openWeatherMap
const regPokemon = /^!pokemon:/ // régex à respecter pour appeler le service pokemon

var nbActionsPokemon = 0
var autorPokemon = true

// instructions à exécuter dès la connexion du Bot au serveur discord
client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`) // Dès que le bot est connecté on affiche son nom en console
  twitter.watchTweets(postMessage) // On initialise la fonction watchtweets pour afficher les tweetes qui tag le compte tweeter du groupe (@Faengsel)
})

// fonction qui permet d'écouter sur les channels discords
client.on('message', msg => {
  //  si le message ne provient pas du channel privé du groupe ou n'est pas un message privé, le bot arrête d'écouter sur les channels
  if ((msg.channel.type !== 'dm' && config.channel !== msg.channel.id) || msg.author.id === client.user.id) return

  // If message is hello, post hello too
  if (msg.content === 'hello') {
    msg.channel.sendMessage('Hello to you too, fellow !')
  }
  // si le message match avec la régex spotify alors on appelle la fonction analyze du service spotify
  if (msg.content.match(regSpotify)) {
    spotify.analyze(msg) // Prend en paramètre le contenue de message pour le traité
  }
  // si le message match avec la régex tweeter alors on appelle la fonction analyze du service tweeter
  if (msg.content.match(regTwitter)) {
    if (msg.content.length < 141) { // le contenue du message ne peut pas être supérieur à 140 caractères
      twitter.analyze(msg) // Prend en paramètre le contenue de message pour le traité
    } else {
      msg.channel.sendMessage('Veuillez faire un tweet de moins de 140 caractères')
    }
  } // si le message match avec la régex youtube alors on appelle la fonction analyze du service youtube
  if (msg.content.match(regYoutube)) {
    youtube.analyze(msg) // Prend en paramètre le contenue de message pour le traité
  }
  // si le message match avec la régex weather alors on appelle la fonction analyze du service openWeatherMap
  if (msg.content.match(regWeather)) {
    wheater.analyze(msg) // Prend en paramètre le contenue de message pour le traité
  }
  // si le message match avec la régex forecast alors on appelle la fonction analyze du service openWeatherMap
  if (msg.content.match(regForecast)) {
    wheater.analyze(msg) // Prend en paramètre le contenue de message pour le traité
  }
  // si le message match avec la régex pokémon alors on appelle la fonction analyze du service pokebot
  if (msg.content.match(regPokemon)) {
    nbActionsPokemon = nbActionsPokemon + 1
    if (autorPokemon === true && nbActionsPokemon === 1) {
      pokebot.analyze(msg, client)
    }
    if (nbActionsPokemon === 2) {
      pokebot.analyze(msg, client)
      autorPokemon = false
      setTimeout(function () {
        autorPokemon = true
        nbActionsPokemon = 0
      }, 900000)
    }
    if (nbActionsPokemon > 2) {
      msg.channel.send('Uniquement deux actions toutes les 15 minutes sont autorisées pour changer l\'apparance du bot')
    }
  }
})

// fonction de callBack pour poster un message / entrée : content -> message à poster, channelID -> id du channel où poster le message
function postMessage (content, channelID = null) {
  if (channelID) {
    for (var channel of client.channels) {
      if (channel[0] === channelID) {
        channel[1].send(content)
        return
      }
    }
  }
}

client.login(config.token)
