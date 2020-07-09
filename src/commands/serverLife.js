module.exports = {
    name: 'serveruptime',
    aliases: [],
    args: false,
    guildOnly: true,
    usage: '',
    description: 'Type !serveruptime to get total uptime of the server',
    cooldown: 15,
    execute(message, args) {
        let differenceDates = Math.abs(Date.now() - message.guild.createdAt);
        let differenceDatesDays = Math.ceil(differenceDates / (1000*60*60*24));

        message.channel.send("Giorni passati dalla creazione: " + differenceDatesDays);
        message.channel.send("Ore passati dalla creazione: " + Math.ceil(differenceDatesDays*24));
        message.channel.send("Minuti passati dalla creazione: " + Math.ceil(differenceDatesDays*24*60));
    }
}