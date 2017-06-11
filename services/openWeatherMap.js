var client = require('node-rest-client-promise').Client()
const regWeather = /^!weather:/
const regForecast = /^!forecast:/
const hostOpenWeather = 'http://api.openweathermap.org/data/2.5/'
const config = require('../config.js')

module.exports = {
  // fonction qui permet d'interroger l'API REST d'openweathermap
  // prend en entrée la recherche a effectué (recherche), le type de la recherche (type) et le channel (messageChannel)
  // retour : Succès -> affiche les résultats dans le channel grâce à displayResult / échec -> renvoie une erreur
  weatherSearch: function (recherche, type, msgChannel) {
    return client.getPromise(this.getUrl(hostOpenWeather, type, recherche, config.keyWeather))
            .catch((error) => {
              console.log(error)
              msgChannel.send('Veuillez nous excusez une erreur s\'est produite')
            })
            .then((res) => {
              this.displayResult(res, type, msgChannel)
            })
  },
  // fonction qui premet de construire l'url de manière dynamique
  // prend en entrée l'host,l'uri, la quey et l'apikey
  // retourne l'url
  getUrl: function (host, uri, query, apikey) {
    var url = host + uri + '/?q=' + query + '&units=metric&APPID=' + apikey + '&lang=fr'
    console.log(url)
    return url
  },
  // fonction qui prend en entrée un message saisi par un utilisateur sur le channel (msg)
  analyze: function (msg) {
    var index2Pts = msg.content.indexOf(':')
    // Si le le contenu du message match avec la régex on rentre dans les if
    if (msg.content.match(regWeather)) {
      this.weatherSearch(msg.content.substring(index2Pts + 1), 'weather', msg.channel) // on récupére la recherche utilisateur aprés les  ':' et on l'envoie à la fonction weatherSearch
    } if (msg.content.match(regForecast)) {
      this.weatherSearch(msg.content.substring(index2Pts + 1), 'forecast', msg.channel) // de même que ci-dessus
    }
  },
  // fonction qui permet de parcourir un json et affiche la météo sur cinq jours dans le channel
  // prend en entrée le json (items) et le channel pour envoyé le message : messageChannel
  parcourItems: function (Items, messageChannel) {
    if (Items.length === 0) {
      messageChannel.send('Aucun résultat')
    } else {
      for (var key in Items) {
        if (Items[key].dt_txt.substring(11) === '12:00:00') {
          messageChannel.send('Pour le  : ' + Items[key].dt_txt)
          messageChannel.send('il y aura : ' + Items[key].weather[0].description)
          messageChannel.send('La température actuel est de : ' + Items[key].main.temp + '°C')
        }
      }
    }
  },
  // fonction qui analyse le résultat pour afficher la recherche utilisteur dans le channel
  // prend en entrée un json (res, résultat retourné par l'api), le type de la recherche (type) et le channel pour envoyé le message : messageChannel
  displayResult: function (res, type, messageChannel) {
    if (type.match(/weather/)) { // si le type match avec la régle on rentre dans le if
      if (res.data.cod === 200) {
        messageChannel.send('Aujourd\'hui il y aura : ' + res.data.weather[0].description)
        messageChannel.send('La température actuel est de : ' + res.data.main.temp + '°C')
      } else {
        messageChannel.send('Aucun résultat')
      }
    }
    if (type.match(/forecast/)) { // si le type match avec la règle on rentre dans le if
      console.log(res)
      if (res.data.cod === '200') {
        var forecast = res.data.list
        this.parcourItems(forecast, messageChannel) // on appelle la fonction parcours parcourItems qui va parcourir le json et afficher la météo sur 5 jours
      } else {
        messageChannel.send('Aucun résultat')
      }
    }
  }
}
