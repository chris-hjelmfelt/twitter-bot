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
//var rand = Math.random(10000, 120000)
//setTimeout(function() { postToStatus(mypost) }, rand)


// Upload a random image
const fs = require('fs')
const path = require('path')
var imageArray = ["cyberpunk03.png","cyberpunk04.png","cyberpunk05.png","cyberpunk07.png","cyberpunk08.png"]

function random_from_array(images){
  return images[Math.floor(Math.random() * images.length)]
}

function upload_random_image(images){
  console.log('Opening an image...')
  var image_path = path.join(__dirname, '/images/' + random_from_array(images))
  var b64content = fs.readFileSync(image_path, { encoding: 'base64' })

  console.log('Uploading an image...')

  user.post('media/upload', { media_data: b64content }, function (err, data, response) {
    if (err){
      console.log("Upload Error: \n" + JSON.stringify(err))
    }
    else{
      console.log('Image uploaded!')
      console.log('Now tweeting it...')

      user.post('statuses/update', {
        status: 'This image was generated using craiyon.com',
        media_ids: new Array(data.media_id_string)
      },
        function(err, data, response) {
          if (err){
            console.log("Post Error: \n" + JSON.stringify(err))
          }
          else{
            console.log('Posted an image!')
          }
        }
      );
    }
  });
}
//upload_random_image(imageArray)


// Search for Tweets
// example Search Strings
//'cyberpunk futurepunk cyberart -GenshinImpact -Overwatch -Overwatch2 -HONGJOONG -Edgerunners lang:en -is:retweet filter:twimg'
//'puppy filter:media'
var searchString = '#Minecraft lang:en -is:retweet'
async function getTweets() {
    user.get('search/tweets', { q: searchString, count: 20 }, function(err, data, response) {
      console.log(data)      
    })
}
//getTweets()


// Misc AI pieces
// Then go over there, there will you fall,
// and, when you fall we'll see you again.


