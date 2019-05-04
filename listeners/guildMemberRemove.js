const { Listener } = require('discord-akairo');

class guildMemberRemoveListener extends Listener {
    constructor() {
        super('guildMemberRemove', {
            emitter: 'client',
            event: 'guildMemberRemove'
        });
    }

    exec(member) {
        const guild = member.guild;
        const welcomeChannel = guild.channels.find(channel => channel.name == 'techno-welcome') ;
        if (!welcomeChannel) return;
        welcomeChannel.send(`Welcome to ${guild.name}, ${member}!`);
    }
}

module.exports = guildMemberRemoveListener;