const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class DiceRollCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'roll',
            group: 'first',
            memberName: 'roll',
            description: 'Just dice.',
            aliases: ['r', 'dice', 'd'],
            args: [
	{
		key: 'text',
		prompt: 'How many sides the dice should have?',
		type: 'integer',
	}
        ]});
    }
async run(message, { text }) {
    var roll = Math.floor(Math.random() * (text) + 1);
    const embed = new MessageEmbed()
      .setDescription("You rolled " + roll + " with a " + text + "-sided dice")
      .setColor('0xFF0000')
      .setAuthor(message.author.username, message.author.avatarURL)
      .setFooter(`Powered by ${this.client.user.username}`, `${this.client.user.avatarURL()}`)
      .setTimestamp();
    return message.embed(embed);
}


};

