// server.js
// where your node app starts

// init project
var http = require('http');
var app = require('./app');

// app.use(express.static('public'));
// app.get("/", function (request, response) {
//   response.sendFile(__dirname + '/views/index.html');
// });

const server = http.CreateServer(app);


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
