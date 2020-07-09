module.exports = {
    name: 'bella',
    aliases: ['greet', 'masa'],
    args: true,
    guildOnly: false,
    usage: '<user>',
    description: 'Type !bella followed by an user to greet him.. like a real Masian',
    execute(message, args) {
        message.channel.send('Bella ' + args[0]);
    }
}