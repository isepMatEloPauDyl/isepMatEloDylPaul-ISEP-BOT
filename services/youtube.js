var client = require('node-rest-client-promise').Client()
const regGeneral = /^!youtube:/
const regVideo = /^!youtubeVideo:/
const regChaine = /^!youtubeChaine:/
const regPlaylist = /^!youtubePlayList:/
const hostYoutubeApi = 'https://www.googleapis.com/'
const hostYoutube = 'http://www.youtube.com/'
const config = require('../config.js')

module.exports = {
  // fonction qui permet d'interroger l'API REST de youtube
  // prend en entrée la recherche a effectuée (recherche), le type de la recherche (type) et le channel (messageChannel)
  // retour : Succés -> affiche les résultats dans le channel grâce à display résult / échec -> renvoie une erreur
  youtubesearch: function (recherche, type, messageChannel) {
    return client.getPromise(this.getUrl(hostYoutubeApi, 'youtube/v3/search', 'part=snippet&q=' + recherche + '&type=' + type + '&maxResults=3&key=' + config.keyYoutube))
      .catch((error) => {
        messageChannel.send('une erreur s\'est produite, veuillez nous excuser pour ce contre-temps')
        // throw error
        console.log(error)
      })
      .then((res) => {
        this.displayResult(res, type, messageChannel)
      }
  )
  },
  // fonction qui prend en entrée un tableau de json (items), le channel (messageChannel),
  // host et uri permettent de construire le liens à affichier pour l'utilisateur
  // si le tableau est vide alors on retourne dans le channel qu'aucun résultat n'a été trouvé
  // Sinon on affiche dans le channel l'url des ressources qui se trouvent dans le tableau Items
  parcourItems: function (Items, messageChannel, host, uri, id) {
    if (Items.length === 0) {
      messageChannel.send('Aucun résultat')
    } else {
      for (var key in Items) {
        var resultat
        var urlRetour
        if (id === 1) {
          resultat = Items[key].id.playlistId
          urlRetour = this.getUrl(host, uri, 'list=' + resultat)
        } else if (id === 2) {
          resultat = Items[key].snippet.channelId
          urlRetour = this.getUrl(host, uri + resultat, null)
        } else if (id === 3) {
          resultat = Items[key].id.videoId
          urlRetour = this.getUrl(host, uri, 'v=' + resultat)
        }
        messageChannel.send(urlRetour)
      }
    }
  },
  // fonction qui prend en entrée host, l'uri et la query (recherche en fin d'url)
  // retourne l'url pour qui va pointer vers l'API youtube
  getUrl: function (host, uri, query) {
    var url
    if (query != null) {
      url = host + uri + '?' + query
    } else {
      url = host + uri
    }
    console.log(url)
    return url
  },
  // fonction qui analyse le résultat pour afficher la recherche utilisteur dans le channel
  // prend en entrée un json (res, résultat retourné par l'api), le type de la recherche (type) et le channel pour envoyé le message : messageChannel
  displayResult: function (res, type, messageChannel) {
    if (type.match(/playlist/)) { // si le type match avec la régle on rentre dans le if
      var playlist = res.data.items
      messageChannel.send('Les playlist : ')
      this.parcourItems(playlist, messageChannel, hostYoutube, 'playlist', 1) // appelle de la fonction parcoursItems pour afficher les 3 playlists les plus pertinantes
    }
    if (type.match(/chaine/)) { // si le type match avec la régle on rentre dans le if
      var albums = res.data.items
      messageChannel.send('Les chaines : ')
      this.parcourItems(albums, messageChannel, hostYoutube, 'channel/', 2) // appelle de la fonction parcoursItems pour afficher les 3 chaines les plus pertinantes
    }
    if (type.match(/video/)) { // si le type match avec la régle on rentre dans le if
      var video = res.data.items
      messageChannel.send('Les videos: ')
      this.parcourItems(video, messageChannel, hostYoutube, 'watch', 3) // appelle de la fonction parcoursItems pour afficher les 3 vidéos les plus pertinantes
    }
  },
  // fonction qui prend en entrée un message saisit par un utilisateur sur le channel (msg) et analyse la demande
  analyze: function (msg) {
    var index2Pts = msg.content.indexOf(':')
    if (msg.content.match(regVideo) || msg.content.match(regGeneral)) { // Si le le contenu du message match avec la régex on rentre dans les if
      this.youtubesearch(msg.content.substring(index2Pts + 1), 'video', msg.channel) // on récupére la recherche utilisateur aprés les  ':' et on l'envoie à la fonction youtubesearch
    } if (msg.content.match(regChaine) || msg.content.match(regGeneral)) {
      this.youtubesearch(msg.content.substring(index2Pts + 1), 'chaine', msg.channel) // de même que ci-dessus
    } if (msg.content.match(regPlaylist) || msg.content.match(regGeneral)) {
      this.youtubesearch(msg.content.substring(index2Pts + 1), 'playlist', msg.channel) // de même que ci-dessus
    }
  }
}
