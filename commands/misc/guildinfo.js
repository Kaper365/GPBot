const { Command } = require(`discord.js-commando`)
const { MessageEmbed } = require(`discord.js`)

module.exports = class GuildInfoCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [
        `g_info`,
        `ginfo`,
        `guild_info`,
        `s_info`,
        `server_info`,
        `sinfo`
      ],
      description: `Shows information about the guild`,
      examples: [`guildinfo`],
      group: `misc`,
      guildOnly: true,
      memberName: `guildinfo`,
      name: `guildinfo`
    })
  }
  run (msg) {
    const checkBots = (guild) => {
      let memberCount = 0
      guild.members.cache.forEach(member => {
        if (member.user.bot) memberCount++
      })
      return memberCount
    }
    const channCount = (guild, type) => {
      let chann = 0
      guild.channels.cache.forEach(c => {
        if (c.type === type) chann++
      })
      return chann
    }

    const embed = new MessageEmbed()
      .addField(`Name`, msg.guild.name, true)
      .addField(`Owner`, `${msg.guild.owner.user.tag} (\`${msg.guild.owner.user.id}\`)`, true)
      .addField(`Created on`, msg.guild.createdAt.toLocaleString(), true)
      .addField(`Total channels`, msg.guild.channels.cache.size - channCount(msg.guild, `category`), true)
      .addField(`Text channels`, channCount(msg.guild, `text`), true)
      .addField(`Voice channels`, channCount(msg.guild, `voice`), true)
      .addField(`Total members`, msg.guild.memberCount, true)
      .addField(`Humans`, msg.guild.memberCount - checkBots(msg.guild), true)
      .addField(`Bots`, checkBots(msg.guild), true)
      .addField(`Region`, msg.guild.region, true)
      .addField(`Guild ID:`, msg.guild.id, true)
      .setAuthor(msg.author.username, msg.author.displayAvatarURL)
      .setColor("RANDOM")
      .setThumbnail(msg.guild.iconURL())
      .setTitle(`Info about this guild`)
      .setFooter(`Powered by ${this.client.user.username}`, `${this.client.user.avatarURL()}`)
      .setTimestamp();

    return msg.say({ embed })
  }
}
