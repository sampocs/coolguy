var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;
var keywords = [/shir/,/shri/,/cool guy/];

//take response, find keyword
function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = keywords;


  //checks if response has keyword
  if(request.text && testResponse(request.text, botRegex)) {
    this.res.writeHead(200);
    postMessage();
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

//checks if response has keyword
function testResponse (res, keywords) {
  // if (regex.test(res)) {
  //   return true;
  // }
  // else {
  //   return false;
  // }
  for (var i=0; i<keywords.length; i++) {
    if (keywords[i].test(res)) {
      return true;
    }
  }
  return false;
}

//determines response
function saying() {
  return "#diversityfrat";
}

//posts
function postMessage() {
  var botResponse, options, body, botReq;

  botResponse = saying();
  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
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