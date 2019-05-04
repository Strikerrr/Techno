const yt = require('simple-youtube-api');
const { Command } = require('discord-akairo');

const youtube = new yt(process.env.YTKEY);

class YoutubeCommand extends Command {
    constructor() {
        super('youtube', {
                aliases: ['youtube', 'yt'],
                args: [
                {
                    id: 'term',
                    type: 'string'
                }]
            }),

            this.help = {
                'help': {
                    name: 'Youtube',
                    description: 'Searches YouTube for the first resulting video.',
                    category: 'Main',
                    usage: 't!youtube <search term>',
                    aliases: 't!yt',
                    DMs: 'Yes',
                    UserPerms: 'None',
                    TechnoPerms: 'Send Messages'
                },
            };
    }

    exec(msg, args) {
        const searchTerm = args.term;
        if (!searchTerm) return msg.reply('Must specify a search term!');
        else {
            youtube.searchVideos(searchTerm, 1)
                .then((results) => {
                    const video = results[0];
                    const resultEmbed = this.client.util.embed()
                        .setAuthor(video.channel.title)
                        .setTitle(video.title)
                        .setDescription(video.description)
                        .setTimestamp(video.publishedAt)
                        .setThumbnail(video.thumbnails.default.url)
                        .setURL(video.channel.url)
                        .addField('Click on the link down below to watch the video!', `[Here!](${video.url})`);
                    msg.channel.send({
                        embed: resultEmbed,
                    });
                })
                .catch((err) => {
                    msg.reply(`An error occured!\n\`\`\`${err.message}\`\`\``);
                });
        }
    }
}

module.exports = YoutubeCommand;