const { Listener } = require('discord-akairo');
const superagent = require('superagent');
const { settings } = require('../clientSettings.js');

class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    exec() {
        const prefix = 't!';
        const guilds = this.client.guilds.size;

        this.client.user.setActivity(`for ${prefix}help | ${guilds} servers`, {
            type: 'WATCHING',
        });
        console.log(`${this.client.user.username} is connected to the Discord WebSocket`);
        const channel = this.client.channels.get(settings.loggingChannelID);
        if (channel) channel.send(`${this.client.user.username} is now online!`);
        if (process.env.DBENABLED == 'no') return;
        else {
            superagent.post('https://discordbots.org/api/bots/stats')
                .set('Authorization', process.env.DBTOKEN)
                .send({
                    server_count: this.client.guilds.size,
                })
                .then(() => console.log('Updated discordbots.org stats!'))
                .catch(err => console.error(`Error updating discordbots.org stats: ${err.body} || ${err}`));
        }
    }
}

module.exports = ReadyListener;
