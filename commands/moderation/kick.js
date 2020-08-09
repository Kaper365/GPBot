const { Command } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')

module.exports = class kickCommand extends Command {
    constructor(client) {
        super(client, {
            name:"kick",
            group: 'moderation',
            memberName: 'kick',
            userPermissions: ['KICK_MEMBERS'],
            description: 'Kicks a user.',
            guildOnly: true,
            args: [
                {
                    type:"member",
                    prompt:"Which user would you like to kick?",
                    key:"member",
                }
            ]
        })
    }
    run(msg, { member }) {
        let embed_admin = new MessageEmbed()
        .setTitle(`PERMISSION ERROR`)
        .setDescription(`They're the boss here, can't kick 'em`)
        .setTimestamp()
        .setFooter(`Powered by ${this.client.user.username}`, `${this.client.user.avatarURL()}`)
        .setColor("#d90000");
        let embed_perms = new MessageEmbed()
        .setTitle(`PERMISSION ERROR`)
        .setDescription(`Sorry, I don't have KICK_MEMBERS permission`)
        .setTimestamp()
        .setFooter(`Powered by ${this.client.user.username}`, `${this.client.user.avatarURL()}`)
        .setColor("#d90000");
        let embed_success = new MessageEmbed()
        .setTitle(`SUCCESS`)
        .setDescription(`Successfully kicked ${member.user.tag}`)
        .setTimestamp()
        .setFooter(`Powered by ${this.client.user.username}`, `${this.client.user.avatarURL()}`)
        .setColor("#55ff00");
        if (msg.guild.member(member).hasPermission('ADMINISTRATOR', 'KICK_MEMBERS', 'BAN_MEMBERS')) return msg.say(embed_admin)
        if (!msg.guild.me.hasPermission('KICK_MEMBERS')) return msg.say(embed_perms)
        if (msg.guild.member(member).kick()) return msg.say(embed_success)
    }
}
