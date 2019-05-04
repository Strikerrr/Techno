const { Command } = require('discord-akairo');

class createInviteCommand extends Command {
    constructor() {
        super('createInvite', {
                aliases: ['createInvite'],
                args: [
                {
                    id: 'serverID',
                    type: 'string'
                }, {
                    id: 'time',
                    type: 'string'
                }],
                channel: 'guild',
                typing: true
            }),

            this.help = {
                'help': {
                    name: 'Kick',
                    description: 'Kicks a member',
                    category: 'Moderation',
                    usage: 't!kick <tag member>',
                    aliases: 'None',
                    UserPerms: 'Kick Members',
                    TechnoPerms: 'Kick Members'
                }
            };
    }

    exec(msg, args) {
        const embed = this.client.util.embed()
            .setTitle('ACCESS DENIED')
            .setAuthor(msg.author.tag)
            .setColor('#FF0000')
            .setDescription('You do not have the permissions needed to use this command. Missing perms: CREATE_INSTANT_INVITE')
            .setThumbnail(this.client.user.avatarURL())
            .setTimestamp();

        const invhelp = new this.this.client.util.embed()
            .setTitle('Create Invite Usage')
            .setAuthor('Techno')
            .setColor('#32CD32')
            .addField('About', 'Creates an invite for a server Techno IS in', false)
            .addField('Usage', 't!createInvite <server id>\nt!createInvite <server id> infinite\nThe above creates an INFINITE invite', false)
            .addField('Perms required', 'Create instant invite')
            .setThumbnail(this.client.user.avatarURL())
            .setTimestamp();

        const [serverID, time] = args.join(' ').split(' | ');
        const guild = this.client.guilds.get(serverID);

        if (!serverID) {
            return msg.channel.send({
                embed: invhelp,
            });
        }
        const channel = guild.channels.filter(c => c.permissionsFor(guild.me).has('SEND_MESSAGES') && c.type === 'text').first();
        const createinv = 'CREATE_INSTANT_INVITE';

        if (msg.member.hasPermission(createinv)) {
            if (time == 'infinite') {
                channel.createInvite({
                        maxAge: 0,
                    })
                    .then((invite) => {
                        msg.channel.send(`Here is an invite for Guild ID: ${guild.id} | ${invite} | This invite is infinite`);
                    });
            } else {
                channel.createInvite()
                    .then((invite) => {
                        msg.channel.send(`Here is an invite for Guild ID: ${guild.id} | ${invite} | This invite lasts 24 hours`);
                    });
            }
        } else {
            msg.channel.send({
                embed,
            });
        }
    }
}

module.exports = createInviteCommand;