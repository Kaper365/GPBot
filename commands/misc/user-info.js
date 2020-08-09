const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const request = require('request');

module.exports = class UserInfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'user-info',
      aliases: ['user', 'uinfo', 'whois'],
      group: 'misc',
      memberName: 'user-info',
      description: 'Gets information about a user.',
      examples: ['user-info @Wumpus#0001 ', 'user-info Wumpus'],
      guildOnly: true,

      args: [{
        key: 'member',
        label: 'user',
        prompt: 'What user would you like to retrieve info on?',
        type: 'member'
      }]
    });
  }

  run(message, { member }) {
    const { user } = member;
    if (user.bot !== true) {
      message.channel.startTyping();
      const embed = new MessageEmbed()
        .setThumbnail(user.avatarURL())
        .setDescription(`Info on **${user.tag}** (ID: ${user.id})`)
        .setColor('0x0000FF')
        .setTitle(user.tag)
        .addField('**Guild-based Info:**', `Nickname: ${member.nickname ? member.nickname : 'No nickname'}\nRoles: ${member.roles.cache.map(roles => `\`${roles.name}\``).join(', ')}\nJoined at: ${member.joinedAt}`)
        .addField('**User Info:**', `Created at: ${user.createdAt}\n${user.bot ? 'Account Type: Bot' : 'Account Type: User'}\nStatus: ${user.presence.status}\nGame: ${user.presence.game ? user.presence.game.name : 'None'}`)
        .setFooter(`Powered by ${this.client.user.username}`, `${this.client.user.avatarURL()}`);
      message.channel.send({
        embed
      });
      message.channel.stopTyping();
    } else if (user.bot === true) {
      message.channel.startTyping();
      request.get(`https://discordbots.org/api/bots/${user.id}`, (err, res, body) => {
        if (err) return console.error;
        body = JSON.parse(body);
        const embed = new MessageEmbed()
          .setThumbnail(user.avatarURL())
          .setDescription(`Info on **${user.tag}** (ID: \`${user.id}\`)`)
          .setColor('0x0000FF')
          .setTitle(user.tag)
          .addField('**Guild-based Info:**', `Nickname: ${member.nickname ? member.nickname : 'No nickname'}\nRoles: ${member.roles.cache.map(roles => `\`${roles.name}\``).join(', ')}\nJoined at: ${member.joinedAt}`)
          .addField('**User Info:**', `Created at: ${user.createdAt}\n${user.bot ? 'Account Type: Bot' : 'Account Type: User'}\nStatus: ${user.presence.status}\nGame: ${user.presence.game ? user.presence.game.name : 'None'}`)
          .addField('**Bot Info:**', `Servers: ${body.server_count ? `${body.server_count}` : 'Could not get server count'}`)
	  .setFooter(`Powered by ${this.client.user.username}`, `${this.client.user.avatarURL()}`);
        message.channel.say({
          embed
        });
        message.channel.stopTyping();
      });
    }
  }
};
