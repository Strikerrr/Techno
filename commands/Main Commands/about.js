const { Command } = require('discord-akairo');
const { color } = require('../../db/db.js');

class AboutCommand extends Command {
    constructor() {
        super('about', {
            aliases: ['about']
        });
    }

    exec(msg) {
        const info = this.client.util.embed()
            .setAuthor('Techno was made by Striker#1337!', this.client.users.get('215509157837537280').displayAvatarURL())
            .addField('When was Techno made?', 'Techno was made in March 2017, and is still actively being developed.')
            .addField('What is Techno\'s prefix?', 'Techno\'s prefix is t! and you can also do @Techno as a prefix')
            .addField('What commands does Techno have?', 'Techno has many commands.\nYou can see all our commands by using `t!help` to find out more!')
            .addField('Is Techno\'s source code up for free on Github?', 'Yes.\nThe code is at [this](https://github.com/strikerrr/Techno) github, managed under the [MIT license](https://github.com/Strikerrr/Techno/blob/master/LICENSE)')
            .addField('What library does Techno use?', 'Techno is currently using Discord.js master paired with Discord Akairo master.')
            .addField('How does such and such command work?', 'You can view the code on github [here](https://github.com/Strikerrr/Techno/tree/master/commands) for all commands')
            .setTimestamp()
            .setThumbnail(this.client.user.avatarURL())
            .setColor(color);

        msg.channel.send({
            embed: info,
        });
    }
}

module.exports = AboutCommand;