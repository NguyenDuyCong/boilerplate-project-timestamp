// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Api for date
app.get("/api/:date?", (req, res) => {
  let date;
  
  // check param
  if (req.params.date) {
    if (isNaN(req.params.date)) {
      date = new Date(req.params.date);
      console.log(date);
    } else {
      date = new Date(Number(req.params.date));
    }
  } else {
    date = new Date();
  }

  const output = {
    unix: date.getTime(),
    utc: date.toUTCString()
  }
  
  // check valid date
  if (!isNaN(date.getTime())) {
    return res.json(output);
  } else {
    return res.json({
      error: "Invalid Date"
    });
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
