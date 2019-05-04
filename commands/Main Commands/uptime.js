const moment = require('moment');
require('moment-duration-format');
const { color } = require('../../db/db.js');
const { Command } = require('discord-akairo');

class UptimeCommand extends Command {
    constructor() {
        super('uptime', {
            aliases: ['uptime']
        }),

        this.help = {
            'help': {
                name: 'Uptime',
                description: 'Returns how long Techno has been online for',
                category: 'Main',
                usage: 't!uptime',
                aliases: 'None',
                DMs: 'Yes',
                UserPerms: 'None',
                TechnoPerms: 'Send Messages'
            }
        };
    }

    exec(msg) {
        const embed = this.client.util.embed()
            .setTitle('Uptime')
            .setDescription(moment.duration(this.client.uptime).format(' D [days], H [hours], m [minutes], s [seconds]'))
            .setColor(color)
            .setThumbnail(this.client.user.avatarURL())
            .setTimestamp();
        msg.channel.send({
            embed,
        });
    }
}

module.exports = UptimeCommand;