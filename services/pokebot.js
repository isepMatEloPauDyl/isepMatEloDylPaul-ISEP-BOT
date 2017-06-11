var client = require('node-rest-client-promise').Client()
const regPokemon = /^!pokemon:/
const regEvolution = /^!pokemon: evolve/
const host = 'https://pokeapi.co/api/v2/'

module.exports = {

  // fonction qui permet d'interroger l'API REST pokéapi pour chercher un pokémon en fonction de son nom
  // prend en entrée la recherche a effectué (recherche), le type de la recherche (type), le l'objet msg et l'objet bot discord
  // retour : Succès -> affiche les résultats dans le channel grâce à displayResult / échec -> renvoie une erreur
  pokemonSearch: function (recherche, type, msg, bot) {
    return client.getPromise(this.getUrl(host, recherche, type))
      .catch((error) => { // si une erreur se léve (statut != 200) alors on affiche un message d'erreur dans le channel
        msg.channel.send('une erreur s\'est produite, veuillez nous excuser pour ce contre-temps')
        // throw error
        console.log(error)
      })
      .then((res) => { // si la Promise nous retourne un résultat valide (statut 200)
        if (res.data.detail === 'Not found.') { // si l'on a aucun détail dans le résultat alors on dit à l'utilisateur que rien n'a été trouvé pour sa recherche
          msg.channel.send('Aucun résultat')
          this.autorNewBot = false
        } else { // sino, alors on met à jour le bot avec la fonction majAvatar
          this.majAvatar(res, msg, bot, client)
        }
      }
  )
  },
  // fonction qui premet de construire l'url de manière dynamique
  // prend en entrée l'host,la recherche , et le type
  // retourne l'url
  getUrl: function (host, recherche, type) {
    var url = host + type + '/' + recherche
    console.log(url)
    return url
  },
 // fonction qui prend en entrée un message saisit par un utilisateur sur le channel (msg) et analyse la demande
  analyze: function (msg, bot) {
    var index2Pts = msg.content.indexOf(':')
    if (msg.content.match(regEvolution)) {
      var nickname = msg.guild.members.get(bot.user.id).nickname
      // on effectue une premiére promise pour voir si le pokémon appartient à une espéce et récupérer l'url de la chaine d'évolution à laquelle il appartient
      client.getPromise(this.getUrl(host, nickname, 'pokemon-species'))
        .catch((error) => {
          console.log(error)
        })
        .then((res) => {
          client.getPromise(res.data.evolution_chain.url)
            .catch((error) => {
              console.log(error)
            })
            .then((res) => {
              var evolutionTab = this.evolutionTab(res)
              var evolutionName = this.evolutionName(evolutionTab, nickname)
              if (evolutionName !== null) {
                console.log('Le pokémon évolue en ' + evolutionName)
                this.pokemonSearch(evolutionName, 'pokemon', msg, bot)
              } else {
                msg.channel.send('Ce pokémon ne peut pas évolué')
              }
            })
        })
    } else if (msg.content.match(regPokemon)) {
      var content = msg.content.toLowerCase()
      this.pokemonSearch(content.substring(index2Pts + 1), 'pokemon', msg, bot)
    }
  },
  // fonction qui met à jour l'avatar du bot et son nickname
  // prend en entrée : res (json), msg (objet msg pour écrire dans le channel, bot (objet bot discord)
  majAvatar: function (res, msg, bot) {
    bot.user.setAvatar(res.data.sprites.front_default) // on met à jour l'avatar
.then(function () {
   // si on réussit à mettre à jour l'avatar on envoie un message dans le channel avec les caracs du pokémon et on change le nickname
  var message = 'Hello, my name is ' + res.data.name + ' and I\'m Pokemon number ' + res.data.id + '! I\'m  a ' + res.data.types[0].type.name + 'I\'m ' + res.data.height + ' feet tall, and I weight ' + res.data.weight + ' pounds!'
  msg.guild.members.get(bot.user.id).setNickname(res.data.name).then(msg.channel.send(message))
})
 .catch(function (error) {
   console.log(error)
   msg.channel.send('veuillez attendre pour effectuer de nouveau cette action')
 })
  },
  // fonction qui stock les évolutions d'un pokémon dans un tableau
  evolutionTab: function (res) {
    var evoChain = []
    var evoData = res.data.chain
    if (res.data.chain.evolves_to.length === 0) {
      console.log('aucune évolution possible')
      return evoChain
    } else {
      do {
        var evoDetails = evoData['evolution_details'][0]
        evoChain.push({
          'species_name': evoData.species.name,
          'min_level': !evoDetails ? 1 : evoDetails.min_level,
          'trigger_name': !evoDetails ? null : evoDetails.trigger.name,
          'item': !evoDetails ? null : evoDetails.item
        })

        evoData = evoData['evolves_to'][0]
      } while (!!evoData && evoData.hasOwnProperty('evolves_to'))
      return evoChain
    }
  },
  // fonction qui permet de de déterminer l'évolution d'un pokémon si il en a une
  evolutionName: function (Tab, pokeName) {
    var name = ''
    var evolution
    var i
    if (Tab.length === 0) {
      evolution = null
      return evolution
    } else {
      for (i = 0; i < Tab.length; i++) {
        name += Tab[i].species_name
        if (name === pokeName) {
          break
        }
        name = ''
      }
      var indexEvolution = i + 1
      if (Tab.length === indexEvolution) {
        name = null
        return name
      } else {
        name = Tab[indexEvolution].species_name
        return name
      }
    }
  }
}
