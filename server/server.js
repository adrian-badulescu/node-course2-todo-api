var express = require('express');
var bodyParser = require('body-parser');
const PORT = 3000;



var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');


var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    // console.log(req.body);
    let todo = new Todo({
        text: req.body.text
    });

    todo.save()
    .then((doc) => {
        console.log(`Todo item saved successfully as: ${doc}`);
        res.status(200).send(doc);
    })
    .catch((e) => {
        console.log(`Unable to save the todo item, the error is: ${e}`);
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {

});






app.listen(PORT, () => {
    console.log(`The app is running on port: ${PORT}`);
});