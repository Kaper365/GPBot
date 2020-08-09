const { Command } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')

module.exports = class addRoleCommand extends Command {
    constructor(client) {
        super(client, {
            name:"addrole",
            aliases: ["add-role", "arole"],
            group: 'moderation',
            memberName: 'addrole',
            description: 'Adds a role to a user.',
            guildOnly: true,
            args: [
                {
                    type:"member",
                    prompt:"Which user would you like to add the role to?",
                    key:"member",
                },
                {
                    type:"role",
                    prompt:"Which role would you like to add?",
                    key:"role"
                }
            ]
        })
    }
    async run(message, { member, role }) {
    const embed = new MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      .setColor("RANDOM")
      .setTitle(`Successfully added ${role.name} to ${member.user.tag}`)
      .setFooter(`Powered by ${this.client.user.username}`, `${this.client.user.avatarURL()}`)
      .setTimestamp()
    const embed_ah = new MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      .setColor("#d90000")
      .setTitle(`${member.user.tag} already has this role.`)
      .setFooter(`Powered by ${this.client.user.username}`, `${this.client.user.avatarURL()}`)
      .setTimestamp()
      .setTimestamp()
        if (member.roles.cache.has(role.name)) return message.channel.send(embed_ah)

        try {
            await member.roles.add(role)
            return message.channel.send(embed)
        } catch (err) {
            return message.channel.send(embed_ah)
        }
    };
}; 
    
    

