const TwitterLite = require('twitter-lite')
const config = require ('./secrets');

const user = new TwitterLite({
  consumer_key: config.APIKey,
  consumer_secret: config.APIKeySecret,
  access_token_key: config.access_token,
  access_token_secret: config.access_token_secret
})

async function main() { 
  var status = "First Try"

  try{
    const {data} = await user.post('statuses/update', {status: status})
    console.log(data)
  } catch(err) {
    console.log("Post Error: \n" + JSON.stringify(err))
  }
} 
main()