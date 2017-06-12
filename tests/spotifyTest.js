import test from 'ava'
var request = require('request')

var headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Authorization': 'Basic ZGQwMzZkMzQ3NGJlNGFlNmI2ODM5ZDAwNDJmZmQ3YjQ6OWVmMTJiNGM1Y2M4NGUwZDhkNzllYmE3NjdhZGZjNTI='
}

var dataString = 'grant_type=client_credentials'

var options = {
  method: 'POST',
  url: 'https://accounts.spotify.com/api/token',
  json: true,
  headers: headers,
  body: dataString
}

function callback (error, response, body) {
  test('test twitter', t => {
    if (error) {
      console.log('err ', error)
      t.fail()
    } else if (body.response.statusCode === 200) {
      console.log('TEST UNITAIRE spotify / fonction -> récupération de l\'acces token : Statut code : ' + body.response.statusCode)
      t.is(body.response.statusCode, 200)
    } else {
      console.log('TEST UNITAIRE spotify / fonction -> récupération de l\'acces token : Statut code : ' + response.statusCode)
      t.fail()
    }
  })
}

request(options, callback)
