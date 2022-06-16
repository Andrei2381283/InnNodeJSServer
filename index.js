const express = require("express");
const os = require('os');
const fs = require("fs");
const app = express();

require("./logger/index")(app);
process.on('uncaughtException', function (err) {
    console.error('Caught exception: ', err);
});

const sequelize = require("./sequelize");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    if(req.method != "GET") return next();
    const path = req.url == "/" ? "/index.html" : req.url;
    res.sendFile(__dirname + "/html" + path);
})

app.use(require("./routes/routes"));

const PORT = process.env.PORT || 58800;

global.admin_key = "123123123";

sequelize.sync().then(() => {
    console.log('');
    console.log("Successful connected to MySQL");
    app.listen(PORT, () => {
        const ip_adresses = os.networkInterfaces();
        console.log('');
        for(const i in ip_adresses){
            for(const k in ip_adresses[i])if(ip_adresses[i][k].family == 'IPv4')console.log("Server running at http://" + ip_adresses[i][k].address + ':' + PORT);
        }
    });
}).catch((err) => {
    console.log(err);
})