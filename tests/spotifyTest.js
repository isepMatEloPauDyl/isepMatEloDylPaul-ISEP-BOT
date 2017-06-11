/* var request = require('request')

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
  if (!error && response.statusCode === 200) {
    console.log('access_token : ' + body.access_token)
    console.log('token_type : ' + body.token_type)

    console.log('TEST UNITAIRE spotify / fonction -> récupération de l\'acces token : Statut code : ' + response.statusCode)
  } else {
    console.log('TEST UNITAIRE spotify / fonction -> récupération de l\'acces token : Statut code : ' + response.statusCode)
  }
}

request(options, callback)
*/
