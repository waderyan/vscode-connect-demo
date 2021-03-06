var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');

var database = require('./database');

var server = express();
server.use(bodyParser.json());

server.use(function (req, res, next) {
  // allow origin for demo purposes
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});

// Routes

// Retrieve all todos
server.get('/todos', function (req, res, next) {
  database.getAll().then(function (todos) {
    res.send(todos); 
    next();
  });
});

// Add a new todo
server.post('/todos', function(req, res, next) {
  var todo = req.body;
  database.add(todo).then(function(todos) {
    res.send(todos);
    next();
  });
});

// Remove an existing todo
server.delete('/todos/:id', function(req, res, next) {
  var id = req.params.id;
  
  database.deleteById(id).then(function(todos) {
    res.send(todos);
    next();
  });
});

// Start listening
var PORT = 3001;
server.listen(PORT, function() {
  console.log('listening at %s', PORT);
});


