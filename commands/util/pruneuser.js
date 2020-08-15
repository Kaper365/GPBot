const { Command } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')

module.exports = class PruneUserCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pruneuser',
            guildOnly: true,
            aliases: ['pruneu', 'pu'],
            group: 'moderation',
            clientPermissions: ['MANAGE_MESSAGES'],
            userPermissions: ['MANAGE_MESSAGES'],
            memberName: 'pruneuser',
            description: 'Prunes a specified number of messaged from a specific user!',
            examples: ['prune [user] [count]'],
            throttling: {
                usages: 1,
                duration: 10
            },
            args: [{
                key: 'user',
                label: 'which user to prune',
                prompt: 'Please provide me a user to prune!',
                type: 'user'
            },
            {
                key: 'count',
                label: 'messages to be pruned',
                prompt: 'Please provide me a set number of messages to prune!',
                type: 'integer',
            },]
        });
    }

    async run(message, args) {
        const { user, count } = args;
        
            const messages = await message.channel.messages.fetch({
                limit: count,
                before: message.id
            })
            const flushable = messages.filter(m => m.author.id == user.id);
        let embed_too_old = new MessageEmbed()
        .setTitle(`Too old messages`)
        .setDescription(`Sorry, I can't remove messages older than 2 weeks`)
        .setTimestamp()
        .setFooter(`Powered by ${this.client.user.username}`, `${this.client.user.avatarURL()}`)
        .setColor("#d90000");
        let embed_no_m = new MessageEmbed()
        .setTitle(`No messages matching criteria!`)
        .setDescription(`**${user.username}** did not send any messages in the last ${count} messages!`)
        .setTimestamp()
        .setFooter(`Powered by ${this.client.user.username}`, `${this.client.user.avatarURL()}`)
        .setColor("#d90000");
        let embed_success = new MessageEmbed()
        .setTitle(`Done`)
        .setDescription(`successfully pruned ${flushable.size} ${flushable.size == 1 ? `message from **${user.username}**!` : `messages from **${user.username}**!`}`)
        .setTimestamp()
        .setFooter(`Powered by ${this.client.user.username}`, `${this.client.user.avatarURL()}`)
        .setColor("#55ff00");

            if (flushable.size == 0) return message.channel.say(embed_no_m);

             await message.channel.bulkDelete(flushable)
            const m = await message.say(embed_success);

            return null;

                return message.say(embed_too_old);
        }
    }
