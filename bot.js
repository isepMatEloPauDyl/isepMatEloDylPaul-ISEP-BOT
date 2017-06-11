const Discord = require('discord.js')
const config = require('./config.js')
const google = require('./services/googleTranslate.js')
const client = new Discord.Client()
const regTranslate = /^!translate\[(.*?)\]/

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`)
})

client.on('message', msg => {
  if ((msg.channel.type !== 'dm' && config.channel !== msg.channel.id) || msg.author.id === client.user.id) return

  // If message is hello, post hello too
  if (msg.content === 'hello') {
    msg.channel.send('Hello to you too, fellow !')
  }
  if (msg.content.match(regTranslate)) {
    google.Analyse(msg)
  }
})

client.login(config.token)
