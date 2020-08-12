const { Command } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')

module.exports = class banCommand extends Command {
    constructor(client) {
        super(client, {
            name:"ban",
            group: 'moderation',
            memberName: 'ban',
            userPermissions: ['BAN_MEMBERS'],
            description: 'Bans a user.',
            guildOnly: true,
            args: [
                {
                    type:"member",
                    prompt:"Which user would you like to ban?",
                    key:"member",
                }
            ]
        })
    }
    run(msg, { member }) {
        let embed_admin = new MessageEmbed()
        .setTitle(`PERMISSION ERROR`)
        .setDescription(`They're the boss here, can't ban 'em`)
        .setTimestamp()
        .setFooter(`Powered by ${this.client.user.username}`, `${this.client.user.avatarURL()}`)
        .setColor("#d90000");
        let embed_perms = new MessageEmbed()
        .setTitle(`PERMISSION ERROR`)
        .setDescription(`Sorry, I don't have BAN_MEMBERS permission`)
        .setTimestamp()
        .setFooter(`Powered by ${this.client.user.username}`, `${this.client.user.avatarURL()}`)
        .setColor("#d90000");
        let embed_success = new MessageEmbed()
        .setTitle(`SUCCESS`)
        .setDescription(`Successfully banned ${member.user.tag}`)
        .setTimestamp()
        .setFooter(`Powered by ${this.client.user.username}`, `${this.client.user.avatarURL()}`)
        .setColor("#55ff00");
        if (msg.guild.member(member).hasPermission('ADMINISTRATOR', 'KICK_MEMBERS', 'BAN_MEMBERS')) return msg.say(embed_admin)
        if (!msg.guild.me.hasPermission('BAN_MEMBERS')) return msg.say(embed_perms)
        if (msg.guild.member(member).ban()) return msg.say(embed_success)
    }
}
