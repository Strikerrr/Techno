const { Command } = require('discord-akairo');
const { urban } = require('urban.js');

class UrbanCommand extends Command {
    constructor() {
        super('urban', {
                aliases: ['urban'],
                args: [{
                    id: 'word',
                    type: 'string',
                    match: 'content'
                }]
            }),

            this.help = {
                'help': {
                    name: 'Urban',
                    description: 'Searches Urban dictionary for a word',
                    category: 'Main',
                    usage: 't!urban <word>',
                    aliases: 'None',
                    DMs: 'Yes',
                    UserPerms: 'None',
                    TechnoPerms: 'Send Messages'
                }
            };
    }

   async exec(msg, args) {

        const word = args.word;
        try {
            const d = await urban(word);
            let tags = d.tags.join(', ');
            let author = d.author;
            let definition = d.definition;
            let example = d.example;
            let worrd = d.word;
            if (!author) author = 'NA';
            if (!tags) tags = 'none';
            if (!definition) definition = 'none';
            if (!example) example = 'none';
            if (worrd) worrd = word;
            const defembed = this.client.util.embed()
                .setAuthor(`Definition by ${author}`)
                .addField('__WORD__', worrd)
                .addField('__DEFINITION__', definition)
                .addField('__EXAMPLE__', example)
                .addField('__TAGS__', tags)
                .addField('__URL__', `Click **[here](${d.URL})** to access the Urban Dictionary page`)
                .setTimestamp()
                .setThumbnail(this.client.user.avatarURL());
            msg.channel.send({
                embed: defembed,
            });
        } catch (err) {
            msg.channel.send(`Sorry, your search could not be completed. Error: ${err.message}`);
        }
    }
}

module.exports = UrbanCommand;