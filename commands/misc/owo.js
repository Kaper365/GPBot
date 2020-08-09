const { Command } = require('discord.js-commando')
const faces = ['(・`ω´・)', ';;w;;', 'owo', 'UwU', '>w<', '^w^'];

module.exports = class OwOCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'owo',
			aliases: ['uwu'],
			group: 'misc',
			memberName: 'owo',
			description: 'OwO.',
			credit: [
				{
					name: 'devsnek',
					url: 'https://github.com/devsnek',
					reason: 'Code'
				}
			],
			args: [
				{
					key: 'text',
					prompt: 'What text would you like to OwO?',
					type: 'string',
					validate: text => {
						if (this.owo(text).length < 2000) return true;
						return 'Your text is too long. Try again with something **shorter**.';
					}
				}
			]
		});
	}

	run(msg, { text }) {
		return msg.say(this.owo(text));
	}

	owo(text) {
		return text
			.replace(/(?:r|l)/g, 'w')
			.replace(/(?:R|L)/g, 'W')
			.replace(/n([aeiou])/g, 'ny$1')
			.replace(/N([aeiou])/g, 'Ny$1')
			.replace(/N([AEIOU])/g, 'NY$1')
			.replace(/ove/g, 'uv')
			.replace(/!+/g, ` ${faces[Math.floor(Math.random() * faces.length)]} `)
			.trim();
	}
};
