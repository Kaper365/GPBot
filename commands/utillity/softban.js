const { Command } = require('discord.js-commando');
const { stripIndents } = require('common-tags');
const { MessageEmbed } = require('discord.js');

module.exports = class SoftbanCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'softban',
            aliases: ['softb'],
            group: 'moderation',
            memberName: 'softban',
            description: 'Kicks a user and deletes all their messages in the past 7 days!',
            guildOnly: true,
            clientPermissions: ['BAN_MEMBERS'],
            userPermissions: ['BAN_MEMBERS'],
            args: [{
                    key: 'member',
                    prompt: 'Please provide me a member to softban!',
                    type: 'member'
                },
                {
                    key: 'reason',
                    prompt: 'Please set a reason for the softban!',
                    type: 'string',
                    default: 'none',                    
                    validate: reason => {
                        if (reason.length < 140) return true;
                        return 'Reason must be under 140 characters!';
                    }
                }
            ]
        });
    }

    async run(message, args) {
       const { member, reason } = args;
        let embed_perms = new MessageEmbed()
        .setTitle(`PERMISSION ERROR`)
        .setDescription(`They're the boss here, can't softban 'em`)
        .setTimestamp()
        .setFooter(`Powered by ${this.client.user.username}`, `${this.client.user.avatarURL()}`)
        .setColor("#d90000");
        let embed_you = new MessageEmbed()
        .setTitle(`S-Senpai!`)
        .setDescription(`I'd never dare to softban you!`)
        .setTimestamp()
        .setFooter(`Powered by ${this.client.user.username}`, `${this.client.user.avatarURL()}`)
        .setColor("#d90000");
        let embed_me = new MessageEmbed()
        .setTitle(`W-What?`)
        .setDescription(`I- I can't softban myself, baka!`)
        .setTimestamp()
        .setFooter(`Powered by ${this.client.user.username}`, `${this.client.user.avatarURL()}`)
        .setColor("#d90000");
        let embed_err = new MessageEmbed()
        .setTitle(`Something happened.`)
        .setDescription(`For some reason I couldn't softban this user...`)
        .setTimestamp()
        .setFooter(`Powered by ${this.client.user.username}`, `${this.client.user.avatarURL()}`)
        .setColor("#d90000");
        let embed_sure = new MessageEmbed()
        .setTitle(`Are you sure you want to softban this user?`)
        .setDescription(`Are you sure you want to softban **${member.user.tag}**? \`[YES (Y)/NO (N)]\``)
        .setTimestamp()
        .setFooter(`Powered by ${this.client.user.username}`, `${this.client.user.avatarURL()}`)
        .setColor("#d90000");
        let embed_done = new MessageEmbed()
        .setTitle(`Done!`)
        .setDescription(`**${member.user.tag}** got softbanned.`)
        .setTimestamp()
        .setFooter(`Powered by ${this.client.user.username}`, `${this.client.user.avatarURL()}`)
        .setColor("#55ff00");
        if (member.id === this.client.user.id) return message.channel.send(embed_me);
        if (member.id === message.author.id) return message.channel.send(embed_you);
        if (message.member.roles.highest.position > message.member.roles.highest.position - 1) {
            return message.channel.send(embed_perms);
        }
        if (!member.bannable) return message.channel.send(embed_perms);

        await message.channel.send(embed_sure);
        const msgs = await message.channel.awaitMessages(res => res.author.id === message.author.id, {
            max: 1,
            time: 30000
        });

        if (!msgs.size || !['y', 'yes'].includes(msgs.first().content.toLowerCase())) return message.channel.send('Cancelled!');

        try {
            await member.send(`You were softbanned from **${message.guild.name}** by **${message.author.tag}**!\n\**Reason:** ${reason}`);
        } catch (err) {
            await message.channel.send(embed_err);
        }

        await member.ban({
            days: 7,
            reason: `${message.author.tag}: ${reason} \[Softban\]`
        });

        await message.guild.unban(member.user, 'Softban');
        return message.channel.say(embed_done);
    }
};
