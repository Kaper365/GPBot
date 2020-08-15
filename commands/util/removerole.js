const { Command } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')

module.exports = class removeRoleCommand extends Command {
    constructor(client) {
        super(client, {
            name:"removerole",
            aliases: ["remove-role", "rrole"],
            group: 'moderation',
            memberName: 'removerole',
            description: 'Removes a role from a user.',
            guildOnly: true,
            args: [
                {
                    type:"member",
                    prompt:"Which user would you like to remove the role from?",
                    key:"member",
                },
                {
                    type:"role",
                    prompt:"Which role would you like to remove?",
                    key:"role"
                }
            ]
        })
    }
   async run(message, { member, role }) {
    const embed = new MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      .setColor("RANDOM")
      .setTitle(`Successfully took away the role ${role.name} from ${member.user.tag}`)
      .setFooter(`Powered by ${this.client.user.username}`, `${this.client.user.avatarURL()}`)
      .setTimestamp();
    const embed_dh = new MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      .setColor("#d90000")
      .setTitle(`I couldn't take ${role.name} from ${member.user.tag}`)
      .setFooter(`Powered by ${this.client.user.username}`, `${this.client.user.avatarURL()}`)
      .setTimestamp();
        if (!member.roles.cache.has(role.id)) return message.channel.send(embed_dh)


        try {
            await member.roles.remove(role)
            return message.channel.send(embed);
        } catch (err) {
            return message.channel.send(embed_dh)
        }
    }
}
