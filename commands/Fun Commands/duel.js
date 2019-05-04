const { Command } = require('discord-akairo');

class DuelCommand extends Command {
    constructor() {
        super('duel', {
                category: 'Fun',
                aliases: ['duel'],
                typing: true
            }),

            this.help = {
                'help': {
                    name: 'Duel',
                    description: 'Fight with another user!',
                    category: 'Fun',
                    usage: 't!duel <tag user>',
                    aliases: 'None',
                    UserPerms: 'None',
                    TechnoPerms: 'Send Messages'
                }
            };
    }

    async exec(msg) {
          const duelhelp = new this.client.util.embed()
              .setTitle('Duel Usage')
              .setAuthor('Techno')
              .setColor(0x32CD32)
              .addField('About', 'Fight with another user!', false)
              .addField('Usage', 't!duel <user mention>', false)
              .addField('Perms required', 'None')
              .setThumbnail(this.client.user.avatarURL())
              .setTimestamp();
          const user1 = msg.author;
          const user2 = msg.mentions.users.first();
          if (!user2) {
              return msg.channel.send({
                  embed: duelhelp,
              });
          }

          if (user1 == user2) return msg.reply('You can\'t duel yourself!');
          const users = [];
          await users.push(user1);
          await users.push(user2);
          const winner = users[Math.floor(Math.random() * users.length)];
          const message = await msg.channel.send(`${user1} is dueling ${user2}!`);
          await message.edit('⚔ Dueling');
          await message.edit('⚔ Dueling.');
          await message.edit('⚔ Dueling..');
          await message.edit('⚔ Dueling...');
          await message.edit(`${winner} has won!`);
    }
}

module.exports = DuelCommand;