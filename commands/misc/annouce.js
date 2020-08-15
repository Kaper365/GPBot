const { Command } = require('discord.js-commando');
const { oneLine } = require('common-tags');
const { MessageEmbed } = require('discord.js');

module.exports = class AnnounceCommand extends Command {
  constructor(bot) {
    super(bot, {
      name: 'announce',
      aliases: ['update', 'lann', 'sendupdate'],
      group: 'misc',
      memberName: 'announce',
      description: 'This command sends an announcemnt to selected channel',
      args: [{
        key: 'toAnn',
        label: 'announce',
        prompt: 'What would you like to announce?',
        type: 'string',
        infinite: false
      },
      {
        key: 'annChannel',
        label: 'announce',
        prompt: 'Where should your annoucement be posted?',
        type: 'channel',
      },
      {
        key: 'annRole',
        label: 'announce',
        prompt: 'Who should be mentioned about it?',
        type: 'role',
      }
      ],
      guarded: true
    });
  }

  async run(message, args) {
    args.annRole.setMentionable(true);
    const embed = new MessageEmbed()
      .setAuthor(message.author.username, message.author.avatarURL)
      .setDescription(args.toAnn)
      .setColor('0xFF0000')
      .setTimestamp();
    args.annChannel.send(args.annRole, { embed }).then(() => {
      message.reply('Announcement sent!');
    });
    args.annRole.setMentionable(false);
  }
};
