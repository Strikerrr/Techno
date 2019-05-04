const { Listener } = require('discord-akairo');
const superagent = require('superagent');
const prefix = 't!';
const { settings } = require('../clientSettings.js');

class guildCreateListener extends Listener {
    constructor() {
        super('guildCreate', {
            emitter: 'client',
            event: 'guildCreate'
        });
    }

    async exec(guild) {
        const server = this.client.guilds.get(guild.id);
        const channel = await server.channels.create('techno-info', 'text');
        const invite = await channel.createInvite({
            maxAge: 0,
        });

        const serveradded = this.client.util.embed()
            .setAuthor('Techno')
            .setColor('#08ff00')
            .setTitle('New server added!')
            .setThumbnail(this.client.user.avatarURL())
            .setDescription('Techno has been added to a new server!\nThe server info will be displayed below.')
            .addField('Server info', `Name: ${server.name}\nID: ${server.id}\nMade: ${server.createdAt}\nOwner: ${server.owner.user.tag} (ID: ${server.ownerID})\nRegion: ${server.region}\nRoles: ${server.roles.size}\nVerification Level: ${server.verificationLevel}\nMembers: ${server.members.size} \nInvite link: ${invite}`)
            .setTimestamp();

        const welcome = this.client.util.embed()
            .setAuthor('Techno')
            .setThumbnail(this.client.user.avatarURL())
            .setColor('#ff4500')
            .addField('Thanks for adding Techno!', 'Hi! I\'m Techno, thanks for adding me.\nI have many features, and if you wish to know them use "t!help" to get a list of all the amazing stuff I can do!\nThanks for listening, and I hope you enjoy using Techno!')
            .addField('Need to contact us?', 'You can always join the official server and ask for help there!\nWe are English speaking, but we can speak some foreign languages too.\nJoin here: https://discord.gg/vJBrsY6')
            .setTimestamp();

        this.client.user.setActivity(`for ${prefix}help | ${this.client.guilds.size} servers`, {
            type: 'WATCHING',
        });

        this.client.channels.get(settings.loggingChannelID).send({
            embed: serveradded,
        });

        server.owner.send({
            embed: welcome,
        });

        channel.send({
            embed: welcome,
        });

        channel.send('Techno requires certain channels to function. To know more, run t!config');

        if (process.env.DBENABLED == 'no') return;
        else {
            superagent.post('https://discordbots.org/api/bots/stats')
                .set('Authorization', process.env.DBTOKEN)
                .send({
                    server_count: this.client.guilds && this.client.guilds.size ? this.client.guilds.size : (this.client.Guilds ? this.client.Guilds.size : Object.keys(this.client.Servers).length),
                })
                .then(() => console.log('Updated discordbots.org stats!'))
                .catch(err => console.error(`Error updating discordbots.org stats: ${err.body} || ${err}`));
        }
    }
}

module.exports = guildCreateListener;
