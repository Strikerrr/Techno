const { Command } = require('discord-akairo');

class InviteCommand extends Command {
    constructor() {
        super('invite', {
            aliases: ['invite'],
            typing: true
        });
    }

    exec(msg) {
        msg.reply('Invite link: https://discordapp.com/oauth2/authorize?client_id=294141889010204684&scope=bot&permissions=8');
    }
}

module.exports = InviteCommand;