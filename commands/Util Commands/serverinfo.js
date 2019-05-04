const { Command } = require('discord-akairo');
const { color } = require('../../db/db.js');

class serverInfoCommand extends Command {
    constructor() {
        super('serverInfo', {
                aliases: ['serverInfo'],
                channel: 'guild',
                typing: true
            }),

            this.help = {
                'help': {
                    name: 'serverInfo',
                    description: 'Shows information about current server',
                    category: 'Util',
                    usage: 't!serverInfo',
                    aliases: 'None',
                    UserPerms: 'None',
                    TechnoPerms: 'Send Messages'
                }
            };
    }
    exec(msg) {
        const serverInfo = this.client.util.embed()
            .setTitle(`Server info for ${msg.guild.name}`)
            .setThumbnail(this.client.user.avatarURL())
            .setImage(msg.guild.iconURL({
                size: 256,
            }))
            .setColor(color)
            .addField('Owner', `${msg.guild.owner} ID: ${msg.guild.owner.id}`)
            .addField('Created at', msg.guild.createdAt, true)
            .addField('Channels', msg.guild.channels.size, true)
            .addField('Roles', msg.guild.roles.size, true)
            .addField('Users', msg.guild.members.filter(m => !m.user.bot).size, true)
            .addField('Total users', msg.guild.members.size, true);
        msg.channel.send({
            embed: serverInfo,
        });
    }
}

module.exports = serverInfoCommand;