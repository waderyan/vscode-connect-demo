var fs = require('fs');
var _ = require('lodash');
var promise = require('promise');

var DATA = 'data/todos.json';
var PRETTIFY_WS = 4;

DATA.

module.exports.getAll = function() {
    return new Promise(function(resolve, reject) {
        fs.readFile(DATA, function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
}

module.exports.commit = function(data) {
    return new Promise(function(resolve, reject) {
        fs.writeFile(DATA, JSON.stringify(data, null, PRETTIFY_WS), function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    });
}

module.exports.add = function(todo) {
    return getAll().then(function (data) {
        data.todos.push(todo);
        return commit(data);
    });
}

module.exports.deleteById = function(id) {
    return getAll().then(function (data) {

        var todos = [];

        // TODO remove todo then recommit

        todos = _.filter(data.todos, function(todo) {
            return todo.id != id;
        })

        data.todos = todos;
        return commit(data);
    });
}