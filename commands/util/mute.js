const { Command } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')

module.exports = class MuteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'mute',
            aliases: ['deafen', 'shutup', 'silent', 'shh', 'shut'],
            group: 'moderation',
            memberName: 'mute',
            guildOnly: true,
            clientPermissions: ['MANAGE_CHANNELS', 'MANAGE_MESSAGES'],
            userPermissions: ['MANAGE_CHANNELS', 'MANAGE_MESSAGES'],
            description: 'Mutes the given user in this channel!',
            examples: ['~mute [user]'],
            throttling: {
                usages: 1,
                duration: 15
            },
            args: [{
                key: 'member',
                prompt: 'Please provide me a user to mute!',
                type: 'member'
            }]
        });
    }

    async run(message, args) {
        const { member } = args;
        let embed_perms = new MessageEmbed()
        .setTitle(`PERMISSION ERROR`)
        .setDescription(`They're the boss here, can't mute 'em`)
        .setTimestamp()
        .setFooter(`Powered by ${this.client.user.username}`, `${this.client.user.avatarURL()}`)
        .setColor("#d90000");
        let embed_you = new MessageEmbed()
        .setTitle(`S-Senpai!`)
        .setDescription(`You can't mute yourself.`)
        .setTimestamp()
        .setFooter(`Powered by ${this.client.user.username}`, `${this.client.user.avatarURL()}`)
        .setColor("#d90000");
        let embed_me = new MessageEmbed()
        .setTitle(`W-What?`)
        .setDescription(`Sorry, you can't mute me this way.`)
        .setTimestamp()
        .setFooter(`Powered by ${this.client.user.username}`, `${this.client.user.avatarURL()}`)
        .setColor("#d90000");
        let embed_err = new MessageEmbed()
        .setTitle(`Something happened.`)
        .setDescription(`For some reason (\`${err}\`) this user wasn't muted.`)
        .setTimestamp()
        .setFooter(`Powered by ${this.client.user.username}`, `${this.client.user.avatarURL()}`)
        .setColor("#d90000");
        let embed_sure = new MessageEmbed()
        .setTitle(`Are you sure you want to mute this user? You'll have to use \`!-unmute\` to let them speak again.`)
        .setDescription(`Are you sure you want to mute **${member.user.tag}** in **${message.channel.name}**? \`[YES (Y)/NO (N)]\``)
        .setTimestamp()
        .setFooter(`Powered by ${this.client.user.username}`, `${this.client.user.avatarURL()}`)
        .setColor("#d90000");
        let embed_done = new MessageEmbed()
        .setTitle(`Done!`)
        .setDescription(`**${member.user.tag}** stopped speaking.`)
        .setTimestamp()
        .setFooter(`Powered by ${this.client.user.username}`, `${this.client.user.avatarURL()}`)
        .setColor("#55ff00");
        let guildMember = message.member
        if (member.id === this.client.user.id) return message.say(embed_me);
        if (member.id === message.author.id) return message.say(embed_you);
        if (guildMember.roles.highest.position > guildMember.roles.highest.position - 1) {
            return message.say(embed_perms);
        }
        if (!member.bannable) return message.say(embed_perms);

        await message.say(embed_sure);
        const msgs = await message.channel.awaitMessages(res => res.author.id === message.author.id, {
            max: 1,
            time: 30000
        });
        if (!msgs.size || !['y', 'yes'].includes(msgs.first().content.toLowerCase())) return message.channel.send('Cancelled');
        if (['n', 'no'].includes(msgs.first().content.toLowerCase())) return message.channel.send('Cancelled')


            await message.channel.overwritePermissions(member, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            })


        return await message.say(embed_done);

    }
}
