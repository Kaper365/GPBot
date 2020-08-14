const { Command } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')

module.exports = class UnMuteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'unmute',
            aliases: ['undeafen', 'speakup'],
            group: 'moderation',
            memberName: 'unmute',
            guildOnly: true,
            clientPermissions: ['MANAGE_CHANNELS', 'MANAGE_MESSAGES'],
            userPermissions: ['MANAGE_CHANNELS', 'MANAGE_MESSAGES'],
            description: 'Unmutes the given user in this channel!',
            examples: ['~unmute [user]'],
            throttling: {
                usages: 1,
                duration: 15
            },
            args: [{
                key: 'member',
                prompt: 'Please provide me a user to unmute!',
                type: 'member'
            }]
        });
    }

    async run(message, args) {
        const { member } = args;
        let embed_perms = new MessageEmbed()
        .setTitle(`PERMISSION ERROR`)
        .setDescription(`They're the boss here, can't unmute 'em`)
        .setTimestamp()
        .setFooter(`Powered by ${this.client.user.username}`, `${this.client.user.avatarURL()}`)
        .setColor(0xd90000);
        let embed_err = new MessageEmbed()
        .setTitle(`Something happened.`)
        .setDescription(`For some reason I couldn't unmute this user...`)
        .setTimestamp()
        .setFooter(`Powered by ${this.client.user.username}`, `${this.client.user.avatarURL()}`)
        .setColor(0xd90000);
        let embed_sure = new MessageEmbed()
        .setTitle(`Are you sure you want to unmute this user?`)
        .setDescription(`Are you sure you want to unmute **${member.user.tag}** in **${message.channel.name}**? \`[YES (Y)/NO (N)]\``)
        .setTimestamp()
        .setFooter(`Powered by ${this.client.user.username}`, `${this.client.user.avatarURL()}`)
        .setColor(0xd90000);
        let embed_done = new MessageEmbed()
        .setTitle(`Done!`)
        .setDescription(`**${member.user.tag}** started speaking again.`)
        .setTimestamp()
        .setFooter(`Powered by ${this.client.user.username}`, `${this.client.user.avatarURL()}`)
        .setColor(0x55ff00);
        let guildMember = message.member
        if (guildMember.roles.highest.position > guildMember.roles.highest.position - 1) {
            return message.say(embed_perms);
        }
        if (!member.bannable) return message.say(embed_perms);

        await message.say(embed_sure);
        const msgs = await message.channel.awaitMessages(res => res.author.id === message.author.id, {
            max: 1,
            time: 30000
        });
        if (!msgs.size || !['y', 'yes'].includes(msgs.first().content.toLowerCase())) return message.send('Cancelled');
        if (['n', 'no'].includes(msgs.first().content.toLowerCase())) return message.send('Cancelled')

            await message.channel.overwritePermissions(member, {
                SEND_MESSAGES: true,
                ADD_REACTIONS: true
            })


        return await message.say(embed_done);

    }
}
