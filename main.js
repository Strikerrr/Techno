const { AkairoClient } = require('discord-akairo');
const { settings } = require('./clientSettings.js');

const client = new AkairoClient({
    allowMention: true,
    handleEdits: true,
    automateCategories: true,
    ownerID: settings.ownerID,
    prefix: settings.prefix,
    commandDirectory: './commands/',
    listenerDirectory: './listeners/'
}, {
        disableEveryone: true
    });

client.login(process.env.TOKEN);

const cpuUsage = process.cpuUsage().system / 1000000;
client.setInterval(() => {
    cpuUsage > 80 ? process.exit() : undefined;
}, 3.6e+6);

const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
