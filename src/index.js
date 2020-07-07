const Discord = require("discord.js");
const { prefix, token } = require("./config.json");

const client = new Discord.Client();

client.once("ready", () => {
	console.log("Ready!");
});

client.login(token);

client.on("message", message => {

    let args = message.content.slice(prefix.length).split(/ +/);
    let cmd = args.shift().toLocaleLowerCase();

    if(!message.content.startsWith(prefix) || message.author.bot)
        return;
        
    if(!args.length) {
        return message.channel.send("bucchi manda un comando");
    } else {
        message.channel.send("bella, ecco i comandi: " + args);
    }

    if(cmd === "bella") {
        const taggedUser = message.mentions.users.first();

        message.channel.send(`Bella ${taggedUser.username}`);
    }

    // if(tempMessage[0].length === 5 && message.content.startsWith(`${prefix}ping`))
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

    //     let differenceDates = Math.abs(Date.now()-message.guild.createdAt);
    //     let differenceDatesDays = Math.ceil(differenceDates / (1000*60*60*24));

    //     message.channel.send("Giorni passati dalla creazione: " + differenceDatesDays);
    //     message.channel.send("Ore passati dalla creazione: " + Math.ceil(differenceDatesDays*24));
    //     message.channel.send("Minuti passati dalla creazione: " + Math.ceil(differenceDatesDays*24*60));
    // }
});