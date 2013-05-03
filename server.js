var app = require("express")();

app.get("/", function (req, res) {
    res.send("Going ok Uhuru");
});

app.listen(process.env.VCAP_APP_PORT || process.env.PORT || 5000);
