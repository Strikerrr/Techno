const { Listener } = require('discord-akairo');

class guildMemberAddListener extends Listener {
    constructor() {
        super('guildMemberAdd', {
            emitter: 'client',
            event: 'guildMemberAdd'
        });
    }

    exec(member) {
        const guild = member.guild;
        const welcomeChannel = guild.channels.find(channel => channel.name == 'techno-welcome');
        if (!welcomeChannel) return;
        welcomeChannel.send(`Welcome to ${guild.name}, ${member}!`);
    }
}

module.exports = guildMemberAddListener;