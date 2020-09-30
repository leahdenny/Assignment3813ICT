const docArray = [
    {
        name: "A",
        id: 1
    },
    {
        name: "B",
        id: 2
    },
    {
        name: "C",
        id: 3
    }
];
const queryJSONf = {}
const queryJSONup = { name: "A" };
const updateJSON = { id: 5 };
const queryJSONdel = { id: 3 };
const operations = require('./operations');

module.exports = function(client, col) {
    operations.insertDocuments(col, docArray,
        () => {
            operations.updateDocument(col, queryJSONup, updateJSON,
                () => {
                    operations.removeDocument(col, queryJSONdel,
                        () => {
                            operations.findDocuments(col, queryJSONf,
                                () => { client.close(); })
                        })
                })
        });
};