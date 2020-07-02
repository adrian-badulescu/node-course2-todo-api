// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useUnifiedTopology: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB');
    }
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp')

    // delete many
    // db.collection('Todos').deleteMany({completed: true})
    // .then((deletedItems) => {
    //     console.log(`Deleted items: ${deletedItems}`)
    // })
    // .catch((err) => {
    //     console.log(`Unable to delete items, error: ${err}`)
    // })


     
    // delete one
    db.collection('Todos').deleteOne({_id: new ObjectID('5efd880a8567bd7d7bfe5c19')})
    .then((deletedObj) => {
        console.log(`Deleted successfully the object with ID: ${deletedObj}`)
    })
    .catch((err) => {
        console.log(`Could not perform the deletion, error: ${err}`)
    })




    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count: ${count}`);
    // }).catch((err) => {
    //     console.log(err);
    // }); 

    // client.close();
});