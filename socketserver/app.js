const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017'; // Connection URL
const dbName = 'chatapp'; // Database Name
const colName = 'appDocs'; // Collection Name
const client = new MongoClient(url); // Create a new MongoClient
const funOrders = require('./dbOperations/funOrders'); // Define a sequence of db operations

// Use connect method to connect to the Server
client.connect(function(err) {
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const collection = db.collection(colName);
    funOrders(client, collection);
});