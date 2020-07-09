const fs = require('fs');                               //Node FileSystem
const Discord = require("discord.js");                  //Discord.js
const { prefix, token } = require("./config.json");     //Config infos

const client = new Discord.Client();                    //Creates the client instance
client.commands = new Discord.Collection();             //Instantiate a collection of commands

const cooldowns = new Discord.Collection();             //Instantiate a collection of cooldowns

//Filter out each file not containing .js as extension
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
    //Retrieve the file from the directory
    const command = require(`./commands/${file}`);
    //Set the commands for this client. Example: (ping, *theWholeCommandObject*)
    client.commands.set(command.name, command);
}

//When the bot is setup
client.once("ready", () => {
	console.log("Ready!");
});

//Try to login to the client
client.login(token);

//When a message is sent
client.on("message", message => {
    //The message has to start with the prefix and not being sent by a bot
    //in order to being processed by vipBot
    if(!message.content.startsWith(prefix) || message.author.bot)
        return;

    //Isolate the args and the command
    let args = message.content.slice(prefix.length).split(/ +/);
    let commandName = args.shift().toLowerCase();

    //Retrieve the command object from the client commands collection or from aliases
    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    //Sanity check
    if(!command) return;
    
    //Check to know if the command can be executed outside a server/guild
    if(command.guildOnly && message.channel.type !== 'text')
        return message.reply('Cazzo fai con sto comando via DM');

    //Check if the command needs any argument and if any has been provided
    if(command.args && !args.length) {
        return message.channel.send('Vuoi usare ' + commandName + ' e po\' non lo sai usare.. :c Fai !help ' + commandName);
    }
    //Check if the command already is set in cooldowns, otherwise add it
    if(!cooldowns.has(command.name))
        cooldowns.set(command.name, new Discord.Collection());

    const now = Date.now();                                     //Right now
    const timestamps = cooldowns.get(command.name);             //Get the command from cooldowns
    const cooldownAmount = (command.cooldown || 1) * 1000;      //Set how long to wait to use it again

    //If the collection associated to the command already has the author id in it, calculate expiration time
    if(timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if(now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;            
            return message.reply('Abuso devi aspettare ancora ' + timeLeft.toFixed(1) + ' secondi per usare ' + commandName);
        }
    }

    //Set the author (key) and when used the command (value)
    timestamps.set(message.author.id, now);
    //Delete the author from command's timestamps after the cooldown
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    //Try to execute the command and catch any error
    try {
        command.execute(message, args);
    } catch(error) {
        console.error(error);
        message.reply('Error during ' + commandName + ' execution');
    }
 
    // if(!args.length) {
    //     return message.channel.send("bucchi manda un comando");
    // } else {
    //     message.reply("bella, ecco i comandi: " + args);
    //     message.channel.send(message.author.displayAvatarURL({ format: "png", dynamic: "true"}));
    // }

    // if(commandName === "bella") {
    //     const taggedUser = message.mentions.users.first();

    //     message.channel.send(`Bella ${taggedUser.username}`);
    // }

    // if(/*tempMessage[0].length === 5 && */message.content.startsWith(`${prefix}ping`))
    //     message.channel.send("Pong");
    // else if(message.content.startsWith(`${prefix}beep`))
    //     message.channel.send("Boop");
    // else if(message.content.startsWith(`${prefix}pif`))
    //     message.channel.send("paff");
    // else if(message.content.startsWith(`${prefix}paf`))
    //     message.channel.send("puff");
    // else if(message.content.startsWith(`${prefix}puaf`)) {
    //     message.channel.send(message.author.username + " non hai indicato, biv");
    // } else if((message.content.startsWith(`${prefix}puf`)) && tempMessage[1].length > 3) {
    //     message.channel.send(message.author.username + "ha indicato <@" + tempMessage[1].substr(4, (tempMessage[1].length) - 1) + " anche conosciuto col nome di: " + message.mentions.users.get('161518540258541568'));
    // } else if(tempMessage[0].startsWith(`${prefix}server`)) {

});