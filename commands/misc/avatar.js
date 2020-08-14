const { Command } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')

module.exports = class AvatarCommand extends Command {
    constructor(client) {
        super(client, {
            name:"avatar",
            aliases: ["profilepicture"],
            group: 'misc',
            memberName: 'avatar',
            description: 'Sends the avatar of a mentioned user user.',
            args: [
                {
                    type:"user",
                    prompt:"Which user would you like to see the avatar of?",
                    key:"user",
                    default: msg => msg.author
                }
            ]
        })
    }
    run(msg, { user }) {

        let embed = new MessageEmbed()
        .setTitle(`${user.tag}s profile picture`)
        .setURL(user.displayAvatarURL())
        .setImage(user.displayAvatarURL())
        .setColor("RANDOM")
        .setFooter(`Powered by ${this.client.user.username}`, `${this.client.user.avatarURL()}`);
        msg.embed(embed)
    
    }
}
