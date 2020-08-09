const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'say',
            group: 'first',
            memberName: 'say',
            description: 'Tell me what to say',
            examples: ['say Hi there!'],
            throttling: {
                usages: 1,
                duration: 10
    },
            args: [
                {
                    key: 'text',
                    prompt: 'What text would you like me to say?',
                    type: 'string',
                    validate: text => {
            if (text.length < 200) return true;
            return 'Message cannot exceed 200 characters. Try again with **shorter** message'},
                },
            ],
        });    
    }

    run(msg, { text }) {
        msg.delete();
        return msg.say(text);
    }
};
