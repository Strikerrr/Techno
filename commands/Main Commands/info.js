const { Command } = require('discord-akairo');
const { stripIndents } = require('common-tags');
const { version } = require('../../package.json');

class InfoCommand extends Command {
    constructor() {
        super('info', {
            aliases: ['info']
        });
    }

    exec(msg) {
        const lastRestart = this.client.readyAt.toISOString().replace(/z|t/gi, ' ').trim();
        const totalMemUsage = Object.entries(process.memoryUsage())
            .map(
                ([key, value]) =>
                    `${key}: ${Math.round(value / 1024 / 1024 * 100) / 100} MB`
            )
            .join('\n');

        const guildInfo = stripIndents`
    Guilds: ${this.client.guilds.size}
    Channels: ${this.client.channels.size}
    `;

        const cpuUsage = String(process.cpuUsage().system / 1000000) + '%';

        const infoEmbed = this.client.util.embed()
            .setTitle(`Techno Version ${version}`)
            .setTimestamp()
            .setThumbnail(this.client.user.avatarURL())
            .addField('Memory Usage', totalMemUsage, true)
            .addField('Last restart', lastRestart, true)
            .addField('Guild Infos', guildInfo, true)
            .addField('CPU Usage', cpuUsage, true);
        msg.channel.send({ embed: infoEmbed });
    }
}

module.exports = InfoCommand;