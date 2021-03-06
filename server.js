'use strict';

var express = require('express');
var app = express();


app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/build'));

app.get('/*', function(req, res) {
	res.status(404).send('could not find page');
});

app.listen(app.get('port'), function() {
	console.log("Node app is running at localhost:" + app.get('port'));
});