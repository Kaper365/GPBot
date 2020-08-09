const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class EmbedCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'embed',
            group: 'first',
            memberName: 'embed',
            description: 'Creates embeds. Cool, isn\'t it?',
            examples: ['embed Embeds are cool.'],
            args: [
                {
                    key: 'ttle',
                    prompt: 'What\'s the title of your wonderful embed?',
                    type: 'string'
                },
                {
                    key: 'text',
                    prompt: 'And the text?',
                    type: 'string'
                }
               
            ]
        });    
    }

    run(msg, args) {
        const { text, ttle } = args;
        const embed = new MessageEmbed()
            .setTitle(ttle)
            .setDescription(text)
            .setAuthor(msg.author.username, msg.author.displayAvatarURL)
            .setColor(0x000000)
            .setTimestamp();
        return msg.embed(embed);
    }
};

