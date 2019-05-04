const { Command } = require('discord-akairo');

class ConfigCommand extends Command {
    constructor() {
        super('config', {
            aliases: ['config'],
            args: [
            {
                id: 'selection',
                type: 'string'
            }]
        });
    }

    exec(msg, args) {
        const guild = msg.guild;
        const configSelection = args.selection;
        const configoptions = this.client.util.embed()
            .setTitle('CONFIG OPTIONS')
            .setAuthor('Techno')
            .setColor(0xFF0000)
            .addField('Current options', 'welcome messages\ngoodbye messages\nwarnings\nALL')
            .setThumbnail(this.client.user.avatarURL())
            .setTimestamp();

        if (configSelection == 'welcome messages') {
            msg.react('✅');
            guild.channels.create('Techno-welcome', 'text');
            msg.reply('Welcome messages configurated!');
        }

        if (configSelection == 'goodbye messages') {
            msg.react('✅');
            guild.channels.create('Techno-goodbye', 'text');
            msg.reply('Goodbye messages configurated!');
        }

        if (configSelection == 'warnings') {
            msg.react('✅');
            guild.channels.create('Techno-warnings', 'text');
            msg.reply('Warnings configurated!');
        }

        if (configSelection == 'options') {
            msg.react('✅');
            msg.channel.send({
                embed: configoptions,
            });
        }

        if (configSelection == 'ALL') {
            msg.react('✅');
            guild.channels.create('Techno-warnings', 'text');
            guild.channels.create('Techno-goodbye', 'text');
            guild.channels.create('Techno-welcome', 'text');
            msg.reply('Everything configurated!');
        }
    }
}

module.exports = ConfigCommand;