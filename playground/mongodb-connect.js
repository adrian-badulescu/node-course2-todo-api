// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

let obj = new ObjectID();
console.log(obj);

// let user = {name: 'Adi', age: 37};
// let {name} = user;
// console.log(name);
 


MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useUnifiedTopology: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB');
    }
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp')

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //       return  console.log('Unable to insert todo', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });


    // db.collection('Users').insertOne({
    //     name: 'Adic',
    //     age: 37,
    //     location: 'Bucharest'
    // }, (err, result) => {
    //     if(err) {
    //         return console.log('Unable to insert user', err)
    //     }

    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2))
    // })

    client.close();
});