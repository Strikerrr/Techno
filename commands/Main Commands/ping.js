const { color } = require('../../db/db.js');
const { Command } = require('discord-akairo');

class PingCommand extends Command {
    constructor() {
        super('ping', {
                category: 'Main',
                aliases: ['ping', 'pong'],
                typing: true
            }),

            this.help = {
                'help': {
                    name: 'Ping',
                    description: 'Checks the response time of the bot',
                    category: 'Main',
                    usage: 't!ping',
                    aliases: 't!pong',
                    DMs: 'Yes',
                    UserPerms: 'None',
                    TechnoPerms: 'Send Messages'
                }
            };
    }

    async exec(msg) {
        console.log('Pinging!');
        const startTime = Date.now(),
            message = msg.content == 't!ping' ? await msg.channel.send('Ponging') : await msg.channel.send('Pinging'),
            endTime = Date.now(),
            ping = Math.round(endTime - startTime);
        let Os = 'o',
            Is = 'i';
        for (let x = 0; x < ping / 4; x++) {
            Os += 'o';
            Is += 'i';
        }
        const pingEmbed = this.client.util.embed()
            .setTimestamp()
            .setThumbnail(this.client.user.avatarURL())
            .setColor(`${color}`);
        msg.content == 't!ping' ? pingEmbed.addField(`P${Os}ng!`, `${ping} ms`) : pingEmbed.addField(`P${Is}ng!`, `${ping} ms`);
        console.log(`Pinged by ${msg.author.tag}`);
        return message.edit({
            embed: pingEmbed,
        });
    }
}

module.exports = PingCommand;