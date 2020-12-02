var HTTPS = require('https');
var cool = require('cool-ascii-faces');
var name = '';

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
  textfromrequest = request.text;

  
  


  if(request.text && textfromrequest.includes('http://extra-help')) {
    name = request.name;
    this.res.writeHead(200);
    postMessage();
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage() {
  var botResponse, options, body, botReq;

  botResponse = 'Could an admin check out ' + name +'? They are likely a spam bot!  (action preformed by Tyler Tech: The Bot)';

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse,
    "attachments" : [
    {
      "type"  : "image",
      "url"   : "https://i.groupme.com/717x1154.png.57ecbb9d2de9489792d838751e7e2be2.large"
    }
  ]
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;
