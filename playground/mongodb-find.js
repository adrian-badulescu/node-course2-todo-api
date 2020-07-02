// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useUnifiedTopology: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB');
    }
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp')

    // db.collection('Todos').find({
    //     _id: new ObjectID('5efd880a8567bd7d7bfe5c19')
    // }).toArray().then((docs) => {
    //     console.log(docs);
    // }).catch((err) => {
    //     console.log(err);
    // });

    db.collection('Todos').find().count().then((count) => {
        console.log(`Todos count: ${count}`);
    }).catch((err) => {
        console.log(err);
    }); 

    // client.close();
});