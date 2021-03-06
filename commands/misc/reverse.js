const { Command } = require('discord.js-commando')
module.exports = class ReverseCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'reverse',
			group: 'misc',
			memberName: 'reverse',
			description: 'Reverses text.',
			args: [
				{
					key: 'text',
					prompt: 'What text would you like to see in reverse?',
					type: 'string'
				}
			]
		});
	}

	run(msg, { text }) {
		return msg.say(text.split('').reverse().join(''));
	}
};
