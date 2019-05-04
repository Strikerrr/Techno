const { getDog } = require('animals-api');
const { Command } = require('discord-akairo');

class DogCommand extends Command {
    constructor() {
        super('dog', {
            aliases: ['dog'],
            category: 'Fun',
            typing: true

        }),

            this.help = {
                'help': {
                    name: 'dog',
                    description: 'Returns a randomized image of a dog =D',
                    category: 'Fun',
                    usage: 't!dog',
                    aliases: 'None',
                    DMs: 'Yes',
                    UserPerms: 'None',
                    TechnoPerms: 'Send Messages'
                }
            };
    }

    async exec(msg) {
        const dogEmbed = this.client.util.embed();
        try {
            const url = await getDog(['jpg', 'png', 'gif']);
            dogEmbed.setImage(url);
            return msg.channel.send({ embed: dogEmbed });
        } catch (e) {
            return msg.reply(`An error occured! \`${e}\``);
        }
    }
}

module.exports = DogCommand;