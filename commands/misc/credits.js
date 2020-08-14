const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class UserInfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'credits',
      aliases: ['author', 'about'],
      group: 'misc',
      memberName: 'credits',
      description: 'Shows information about a bot.'
    });
  }

  run(message) {
      const embed = new MessageEmbed()
	.setThumbnail('https://cdn.discordapp.com/avatars/720303417892929597/c0084bd0c69350f047c6a56e803ba781.png?size=1024')
	.setColor('0xd90000')
	.setTitle(`About ${this.client.user.tag}`)
	.addField('**Lead Developer**', `Kaper365#0282`)
	.addField('**Development, Testing**', `Tortzs`)
	.addField('**Testing**', `Snowrose`)
        .setFooter(`Powered by ${this.client.user.username}`);
        message.say({
          embed
        });
      };
    }
