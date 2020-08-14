const { Command } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')

module.exports = class PurgeCommand extends Command {
  constructor(client) {
    super(client, {
      name: "purge",
      group: "moderation",
      memberName: "purge",
      description: "Purges the Chat",
      clientPermissions: ["MANAGE_MESSAGES"],
      userPermissions: ["MANAGE_MESSAGES"],
      args: [
        {
          key: "purgecount",
          prompt: "How many messages should I purge??",
          type: "integer"
        }
      ],
      guildOnly: true
    });
  }

  async run(message, args) {
          let embed_200 = new MessageEmbed()
        .setTitle(`Too many messages`)
        .setDescription(`You can currently only clean up to 200 messages at a time.`)
        .setTimestamp()
        .setFooter(`Powered by ${this.client.user.username}`, `${this.client.user.avatarURL()}`)
        .setColor("#d90000");
        let embed_success = new MessageEmbed()
        .setTitle(`SUCCESS`)
        .setDescription(`Sucessfully deleted ${args.purgecount} messages.`)
        .setTimestamp()
        .setFooter(`Powered by ${this.client.user.username}`, `${this.client.user.avatarURL()}`)
        .setColor("#55ff00");
    if (message.author.bot) return;
    if (args.purgecount > 200)
      return message.say(embed_200);

    await message.channel.messages.fetch({ limit: args.purgecount })
      .then(async messages => {
        await message.channel.bulkDelete(messages);
      })
      .then(() => {
        message
          .say(embed_success)
          .then(async e => {
            await e.delete(5000);
          });
      });
  }
};
