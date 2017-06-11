var request = require('request')
// const config = require('../config.js')
const regGeneral = /^!spotify:/
const regArtiste = /^!spotifyArtiste:/
const regAlbum = /^!spotifyAlbum:/
const regTrack = /^!spotifyTrack:/
const host = 'https://api.spotify.com/v1/search?q='

// fonction qui permet de construire l'url
// entrée : host, recherche, type / sortie : retourne l'ul
function getUrl (host, recherche, type) {
  var url = host + recherche + '&type=' + type
  return url
}

// fonction qui effectue la recherche de l'utilisateur en fonction aprés identification au prés de l'api
// prend en entrée accessToken, tokenType, recherche, type, messageChannel
function getSearch (accessToken, tokenType, recherche, type, messageChannel) {
  var url = getUrl(host, recherche, type)
  var autor = tokenType + ' ' + accessToken
  console.log('Authorization: ' + autor)
  var headers = {
    'Authorization': autor
  }
  var options = {
    url: url,
    headers: headers
  }
  request(options, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      displayResult(body, type, messageChannel)
    } else {
      messageChannel.send('une erreur est survenue lors de la recherche')
      console.log('erreur recherche' + response.statusCode)
    }
  })
}

// fonction qui permet de récupérer le token pour accéder au service de recherche de l'api spotify
// entrée : recherche, type, messageChannel (objet qui permet d'écrire dans le channel)
function getToken (recherche, type, messageChannel) {
  // paramétrage du headers de la requête
  var headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ZGQwMzZkMzQ3NGJlNGFlNmI2ODM5ZDAwNDJmZmQ3YjQ6OWVmMTJiNGM1Y2M4NGUwZDhkNzllYmE3NjdhZGZjNTI='
  }
 // body de la requête
  var dataString = 'grant_type=client_credentials'
 // json d'options contenant les paramétres de la requête post exécutée par le request
  var options = {
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    json: true,
    headers: headers,
    body: dataString
  }
  // fonction request -> exécute un post pour récupérer l'access token
  request(options, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      // si l'on a un status 200 et pas d'erreur, on posséde le token et on appelle la fonction getSearch
      getSearch(body.access_token, body.token_type, recherche, type, messageChannel)
    } else {
      messageChannel.send('une erreur est survenue lors de l\'identification au prés de l’api')
      console.log('erreur identifications' + response.statusCode)
    }
  })
}

// fonction qui prend en entrée items ( un json ) et messageChannel
// parcours le json jusqu'à trouver l'url à retourner à l'utilisateur
function parcourItems (Items, messageChannel) {
  var compteur = 0
  if (Items.length === 0) {
    messageChannel.send('Aucun résultat')
  } else {
    for (var key in Items) {
      compteur = compteur + 1
      var resultat = Items[key].external_urls.spotify
      messageChannel.send(resultat)
      if (compteur === 3) break
    }
  }
}
// fonction qui analyse le résultat pour afficher la recherche utilisteur dans le channel
// prend en entrée un json (res, résultat retourné par l'api), le type de la recherche (type) et le channel pour envoyé le message : messageChannel
function displayResult (res, type, messageChannel) {
  var obj
  if (type.match(/artist/)) {
    // var artists = res.artists
    obj = JSON.parse(res)
    console.log(obj.artists.items)
    var artists = obj.artists.items
    messageChannel.send('Les artists : ')
    parcourItems(artists, messageChannel) // appelle de la fonction parcoursItems pour afficher les 3 artists les plus pertinantes
  }
  if (type.match(/album/)) {
    obj = JSON.parse(res)
    console.log(obj.albums.items)
    var albums = obj.albums.items
    messageChannel.send('Les albums : ')
    parcourItems(albums, messageChannel) // appelle de la fonction parcoursItems pour afficher les 3 albums les plus pertinantes
  }
  if (type.match(/track/)) {
    obj = JSON.parse(res)
    console.log(obj.tracks.items)
    var tracks = obj.tracks.items
    messageChannel.send('Les tracks: ')
    parcourItems(tracks, messageChannel) // appelle de la fonction parcoursItems pour afficher les 3 tracks les plus pertinantes
  }
}

module.exports = {
  // fonction qui permet d'analyser le contenue de message de l'utilisateur
  // prend en entrée l'objet msg du bot discord
  analyze: function (msg) {
    var index2Pts = msg.content.indexOf(':')
    if (msg.content.match(regGeneral)) { // Si le le contenu du message match avec la régex on rentre dans les if
      getToken(msg.content.substring(index2Pts + 1), 'album,track,artist', msg.channel) // on récupére la recherche utilisateur aprés les  ':' et on l'envoie à la fonction getToken
    } else if (msg.content.match(regArtiste)) {
      getToken(msg.content.substring(index2Pts + 1), 'artist', msg.channel)
    } else if (msg.content.match(regAlbum)) {
      getToken(msg.content.substring(index2Pts + 1), 'album', msg.channel)
    } else if (msg.content.match(regTrack)) {
      getToken(msg.content.substring(index2Pts + 1), 'track', msg.channel)
    }
  }
}
