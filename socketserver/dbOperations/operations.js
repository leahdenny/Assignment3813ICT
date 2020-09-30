exports.insert = function(req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
        if (err) throw err;
        let db = client.db("dbName"); // Create a Product
        let doc = req.body;
        // Use insertOne method with callback
        db.collection("colName").insertOne(doc, function(err, result) {
            console.log("Inserted the following document into the collection:");
            console.log(doc);
            res.send(doc);
            client.close();
        });
    });
};

exports.find = function(req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
        if (err) throw err;
        let db = client.db("dbName");
        let doc = req.body;
        // Use the method as promise
        db.collection("colName").find({}).toArray().then(function(docs) {
            console.log("Found the following records:");
            console.log(docs);
            res.send(docs);
        }).catch((err) => {console.log(err);}).finally(() => {client.close();});
    });
};

exports.update = function(req, res) {
    MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        let db = client.db("dbName");
        db.collection("colName", function(err, collection) {
            let queryJSON = req.params;
            let updateJSON = req.body;
            // Update document with queryJSON, set updateJSON
            collection.updateMany(queryJSON, { $set: updateJSON }, function(err, result) {
                console.log("For the documents with", queryJSON);
                console.log("SET: ", updateJSON);
                res.send(result);
                client.close();
            });
        });
    });
};

exports.delete = function(req, res) {
    MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        let db = client.db("dbName");
        db.collection("colName", function(err, collection) {
            let queryJSON = req.body;
            collection.deleteMany(queryJSON, function(err, result) {
                console.log("Removed the documents with: ", queryJSON);
                res.send(queryJSON);
                client.close();
            });
        });
    });
};

// exports.insertDocuments = function(collection, docArray, callback) {
//     collection.insertMany(docArray, function(err, result) {
//         console.log("Inserted the following documents into the collection:");
//         console.log(docArray);
//         callback(result);
//     });
// };

// exports.findDocuments = function(collection, queryJSON, callback) {
//     //Find some documents
//     collection.find(queryJSON).toArray(function(err, docs) {
//         console.log("Found the following records");
//         console.log(docs);
//         callback(docs);
//     });
// };

// exports.updateDocument = function(collection, queryJSON, updateJSON, callback) {
//     //Update document with queryJSON, set updateJSON
//     collection.updateOne(queryJSON, { $set: updateJSON }, function(err, result) {
//         console.log("for the documents with");
//         console.log(queryJSON);
//         console.log("SET: ");
//         console.log(updateJSON);
//         callback(result);
//     });
// };

// exports.removeDocument = function(collection, queryJSON, callback) {
//     collection.deleteOne(queryJSON, function(err, result) {
//         console.log("Removed the documents with");
//         console.log(queryJSON);
//         callback(result);
//     });
// };