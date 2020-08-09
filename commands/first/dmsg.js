const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'dmsg',
            aliases: ['msg', 'sendto'],
            group: 'first',
            memberName: 'dmsg',
            description: 'Sends a message to the user you mention.',
            guildOnly: true,
            userPermissions: ['MANAGE_MESSAGES'],
            examples: ['!~dmsg `@User Hi there!`'],
            throttling: {
                usages: 1,
                duration: 10
    },
            args: [
                {
                    key: 'user',
                    prompt: 'Okay... Send DM to... Who?',
                    type: 'user'
                },
                {
                    key: 'ttle',
                    prompt: 'And message title?',
                    type: 'string'
                },
                {
                    key: 'content',
                    prompt: 'And message text?',
                    type: 'string'
                }
            ]
        });    
    }

    run(msg, { user, content, ttle }) {
            const embed = new MessageEmbed()
            .setTitle(ttle)
            .setDescription(content)
            .setAuthor(msg.author.username, msg.author.displayAvatarURL)
            .setColor(0x000000)
            .setTimestamp()
            .setFooter(`Powered by ${this.client.user.username}`, `${this.client.user.avatarURL()}`);
        return user.send(embed);
    }
};
