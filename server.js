var
    app = require("express")(),
    mongoDB = require("mongodb"),
    mongoDBInstance, connections;

mongoDBInstance = new mongoDB.Db("torrentz_db", new mongoDB.Server("localhost", 27017, { auto_reconnect: true }), { safe: false });

mongoDBInstance.open(function (err, db) {
    if (!err) { 
        console.log("Connected with mongodb!");
        db.createCollection("connections", function (err, collection) {
            if (!err) {
                console.log("Collection connections active!");
                connections = collection;
            }
        });
    } else {
        console.log("Fail! =(", err);
    }
});

app.get("/", function (req, res) {
    res.send("Going ok Uhuru");
});

app.get("/test_mongo", function (req, res) {
    connections.findOne(function (err, result) {
        res.send("Im alive!" + JSON.stringify(result));
    });
});

app.get("/announce", function (req, res) {
    res.send("Query param example!" + req.query.peer_id);
    connections.insert({peer_id: req.query.peer_id}, function (err, result) {
        connections.createIndex("peer_id", { expireAfterSeconds: (60 * 60) }, function (err, index) {});
    });
});

app.listen(process.env.VCAP_APP_PORT || process.env.PORT || 5000);
