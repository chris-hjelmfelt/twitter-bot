var Twit = require('twit')
const config = require ('./secrets');

const user = new Twit({
  consumer_key: config.APIKey,
  consumer_secret: config.APIKeySecret,
  access_token: config.access_token,
  access_token_secret: config.access_token_secret
})


const mypost = "Trying out new methods"
async function postToStatus(status) { 
  try {
    const data = await user.post('statuses/update', {status: status})
    console.log(data)
  } catch(err) {
    console.log("Post Error: \n" + JSON.stringify(err))
  }
} 
//postToStatus(mypost)



async function getTweets() {
    user.get('search/tweets', { q: '#Minecraft lang:en', count: 20 }, function(err, data, response) {
      console.log(data)      
    })
}
getTweets()