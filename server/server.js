const _ = require('lodash');

const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;



var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');
const { ObjectID } = require('mongodb');


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
    Todo.find()
        .then((todos) => {
            res.status(200).send({ todos });
        })
        .catch((e) => {
            res.status(400).send(e);
        })
});

app.get('/todos/:id', (req, res) => {
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(400).send();
    }

    Todo.findById(id)
        .then((todo) => {
            if (!todo) {
                return res.status(404).send();
            }
            res.send({ todo });
        })
        .catch((e) => {
            res.status(400).send(e);
        })
})


app.delete('/todos/:id', (req, res) => {
    let id = req.params.id
    // get the ID


    // validate the ID
    if (!ObjectID.isValid(id)) {
        return res.status(400).send('Malformed ID request')
    }


    // remove by ID
    Todo.findByIdAndDelete(id)
        .then((todo) => {
            if (!todo) {
                return res.status(404).send('The requested ID don\'t exist.')
            }
            res.status(200).send({ todo })
        })
        .catch((e) => {
            res.status(400).send(e);
        })

});


app.patch('/todos/:id', (req, res) => {
    let id = req.params.id
    let body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid) {
        return res.status(400).send('Malformed ID request');
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
        .then((todo) => {
            if(!todo) { 
                return res.status(404).send();
            }
            return res.status(200).send({todo});
        })
        .catch((e) => {
            res.status(400).send(e)
        })
});



app.listen(port, () => {
    console.log(`The app is running on port: ${port}`);
});



module.exports = { app };