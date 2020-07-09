const { prefix } = require('../config.json');

module.exports = {
    name: 'help',
    aliases: ['aiuto', 'h'],
    args: false,
    cooldown: 5,
    guildOnly: false,
    usage: 'none || <command>',
    description: 'Type !help for all commands aviable or look up for a specific one',
    execute(message, args) {
        const data = [];                            //To print data for the user
        const { commands } = message.client;        //Collection of commands avaible

        //If the user did not type any specific command, show them all
        if(!args.length) {
            data.push('Lista di tutti i comandi:');
            data.push(commands.map(command => command.name).join(', '));
            data.push('Prova ' + prefix + 'help <command> per un comando specifico');

            return message.channel.send(data, { split: true })
                .catch(error => {
                    console.error('Cannot send help command data to ' + message.author.tag, error);
                });
        }

        //Get the specific command name from input and look up for it
        const name = args[0].toLowerCase();
        const command = commands.get(name) 
            || commands.find(cmd => cmd.aliases && cmd.aliases && cmd.aliases.includes(name));

        if(!command)
            return message.reply('inizia scrivendo il comando correttamente.. fai !help');

        //Populate the data array to be printed out for the user
        data.push(`*Nome:* ${command.name}`);
        if (command.description) data.push(`*Descrizione:* ${command.description}`);
        if (command.usage) data.push(`*Modi d'uso:* ${prefix}${command.name} ${command.usage}`);
        data.push(`*Cooldown:* ${command.cooldown || 3} second(s)`);
        
        message.channel.send(data, { split: true });
    }
}