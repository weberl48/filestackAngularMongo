var express = require('express');
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');

var superhero = require('./app/routes/superhero')();

var options = {
    server: {
        socketOptions: {
            keepAlive: 1,
            connectTimeoutMS: 30000
        }
    },
    replset: {
        socketOptions: {
            keepAlive: 1,
            connectTimeoutMS: 30000
        }
    }
};
var uri = 'mongodb://localhost/superHearo'
mongoose.connect(uri, options);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// Log with Morgan
app.use(morgan('dev'));

// parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
    type: 'application/json'
}));

// Static files
app.use(express.static(__dirname + '/public'));

app.route('/superhero')
    .post(superhero.post)
    .get(superhero.getAll);
app.route('/superhero/:id')
    .get(superhero.getOne);

app.listen(port);
console.log('listening on port ' + port);
