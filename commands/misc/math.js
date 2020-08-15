const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const math = require('mathjs');


module.exports = class MathCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'math',
            aliases: ['solve', 'calc'],
            group: 'misc',
            memberName: 'math',
            description: 'I\'ll do your math homework!',
            examples: ['math [equation]'],
            throttling: {
                usages: 1,
                duration: 5
            },
            args: [{
                key: 'equation',
                prompt: 'Please provide me with an equation to solve!',
                type: 'string'
            }]
        });
    }

    run(message, args) {
        var { equation } = args;
        try {
            var solution = math.evaluate(equation)
        } catch (err) {
            return message.channel.send(`I couldn\'t solve that equation! \`${err}\``)
        }
        
        const embed = new Discord.MessageEmbed()
            .setColor('#767CC1')
            .addField('**Expression**', `\`\`\`${equation}\`\`\``)
            .addField('**Result**', `\`\`\`${solution}\`\`\``)
            .setFooter(`Powered by ${this.client.user.username}`, `${this.client.user.avatarURL()}`);
        return message.channel.send({ embed })

    }
}
