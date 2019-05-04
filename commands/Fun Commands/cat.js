const { getCat } = require('animals-api');
const { Command } = require('discord-akairo');

class CatCommand extends Command {
    constructor() {
        super('cat', {
            aliases: ['cat'],
            category: 'Fun',
            typing: true

        }),

            this.help = {
                'help': {
                    name: 'Cat',
                    description: 'Returns a randomized image of a cat =D',
                    category: 'Fun',
                    usage: 't!cat',
                    aliases: 'None',
                    DMs: 'Yes',
                    UserPerms: 'None',
                    TechnoPerms: 'Send Messages'
                }
            };
    }

    async exec(msg) {
        const catEmbed = this.client.util.embed();
        try {
            const url = await getCat(['jpg', 'png', 'gif']);
            catEmbed.setImage(url);
            return msg.channel.send({ embed: catEmbed });
        } catch (e) {
            return msg.reply(`An error occured! \`${e}\``);
        }
    }
}

module.exports = CatCommand;