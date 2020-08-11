const { CommandoClient } = require('discord.js-commando');
require('dotenv').config();
const path = require('path');
const winston = require('winston')
const client = new CommandoClient({
	commandPrefix: '!-',
	owner: process.env.OWNER,
    unknownCommandResponse: false,
    disableEveryone: true
});
const logger = winston.createLogger({
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: 'log' }),
	],
	format: winston.format.printf(log => `[${log.level.toUpperCase()}] - ${log.message}`),
});

client.on('ready', () => logger.log('info', 'all set'));
client.on('debug', m => logger.log('debug', m));
client.on('warn', m => logger.log('warn', m));
client.on('error', m => logger.log('error', m));

process.on('uncaughtException', error => logger.log('error', error));
process.on('unhandledRejection', error => logger.log('error', error));

client.registry
	.registerDefaultTypes()
	.registerGroups([
		['first', 'Vanilla'],
		['misc', 'Miscellaneous'],
		['moderation', 'Moderation' ],
		['owner', 'Owner-only'],
	])
	.registerDefaultGroups()
	.registerDefaultCommands()
	.registerCommandsIn(path.join(__dirname, 'commands'));


client.once('ready', () => {
	console.log(`${client.user.tag} \/ ${client.guilds.cache.size} guilds`);
client.user.setPresence({ activity: { name: 'prefix is !-', type: 'WATCHING' }, status: 'dnd' });
});

client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setPresence({ activity: { name: 'you', type: 'PLAYING' }});
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setPresence({ activity: { name: 'you', type: 'WATCHING' }, status: 'dnd' });
});

client.on('error', console.error);

client.login();

