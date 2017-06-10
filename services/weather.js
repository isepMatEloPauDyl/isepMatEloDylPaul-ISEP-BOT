var client = require('node-rest-client-promise').Client()
const regWeather = /^!weather:/
const regForecast = /^!forecast:/
const hostOpenWeather = 'http://api.openweathermap.org/data/2.5/'
const config = require('../config.js')

module.exports = {

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
    getUrl: function (host, uri, query, apikey) {
        var url = host + uri + '/?q=' + query + '&units=metric&APPID=' + apikey + '&lang=fr'
        return url
    },
    Analyse: function (msg) {
        var index2Pts = msg.content.indexOf(':')
        if (msg.content.match(regWeather)) {
            this.weatherSearch(msg.content.substring(index2Pts + 1), 'weather', msg.channel)
        } if (msg.content.match(regForecast)) {
            this.weatherSearch(msg.content.substring(index2Pts + 1), 'forecast', msg.channel)
        }
    },
    parcourItems: function (Items, messageChannel) {
        // var compteur = 0
        if (Items.length === 0) {
            messageChannel.send('Aucun résultat')
        } else {
            for (var key in Items) {
                var result = Items[key].description
                messageChannel.send(result)
            }
        }
    },
    displayResult: function (res, type, messageChannel) {
        console.log('type', type)
        if (type.match(/weather/)) {
            messageChannel.send('Aujourd\'hui il y aura : ' + res.data.weather[0].description)
            messageChannel.send('La température du jour est de : ' + res.data.main.temp + '°C')
        }
        if (type.match(/forecast/)) {
            var date = new Date()
            var year = date.getFullYear()
            var month = date.getMonth()
            console.log('Dayyyyyyyy' + month)
            var day = date.getDay()
            var currentDate = year + '-' + month + '-' + day
            console.log('DATE' + currentDate)
            var forecast = res.data
            console.log(forecast)
            messageChannel.send('La météo sur les cinq prochains jours : ')
            // this.parcourItems(albums, messageChannel)
        }
    },
    getCurrentDate: function () {
        Date.prototype.yyyymmdd = function () {
            var mm = this.getMonth() + 1 // getMonth() is zero-based
            var dd = this.getDate()

            return [this.getFullYear(),
            (mm > 9 ? '' : '0') + mm,
            (dd > 9 ? '' : '0') + dd
            ].join('')
        }
    }
}
