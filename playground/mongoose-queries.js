// const { request } = require("express");
const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { User } = require('./../server/models/user');


let id = '5efef5af3c63404e2bdfad16';

if (!ObjectID.isValid(id)) {
    console.log('ID not valid');
}


// Todo.find({
//     _id: id
// })
//     .then((todos) => {
//         console.log(`The todos: ${todos}`);
//     })
//     .catch((e) => {
//         console.log(e);
//     })

// Todo.findOne({
//     _id: id
// })
//     .then((todo) => {
//         console.log(`The todo: ${todo}`);
//     })
//     .catch((e) => {
//         console.log(e);
//     })

User.findById(id)
    .then((user) => {
        if (!user) {
            return console.log('Id not found');
        }
        console.log(user);
    }).catch((e) => {
        console.log(e);
    });
