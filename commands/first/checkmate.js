const { Command } = require('discord.js-commando');
const { MessageEmbed } = require(`discord.js`);

module.exports = class ChessCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'checkmate',
			aliases: ['check', 'chess'],
			group: 'first',
			memberName: 'checkmatee',
			description: 'Checkmate.',
		});
}

run(message) {
        const embed = new MessageEmbed()
            .setTitle("Checkmate.")
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setColor(0x000000)
            .setTimestamp();
        return message.embed(embed);
	}
};
