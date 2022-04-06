var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');
app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({     
  extended: true
}))

app.use(express.static('static'));

require('./route/index')(app);

app.use((err, req, res, next) => {
    res.end('Problem...');
    console.log(err);
});

var server = app.listen(3000, function () {
    console.log("On :3000");
});
