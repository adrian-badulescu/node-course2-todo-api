// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useUnifiedTopology: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB');
    }
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp')


    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5efc918cb4f467561cd806be')
    },
        {
            $set: {
                completed: true
            }
        },
        {
            returnOriginal: false
        }
    )
        .then((updatedObj) => {
            console.log(`Record ${JSON.stringify(updatedObj)} updated successfully`)
        })
        .catch((err) => {
            console.log(`Error -> ${err} occured during update.`)
        })

    // client.close();
});