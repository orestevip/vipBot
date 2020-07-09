module.exports = {
    name: 'ping',
    args: false,
    cooldown: 3,
    guildOnly: false,
    usage: '',    
    description: 'Type !ping to receive back a pong.. by a parrBot',
    execute(message, args) {
        message.channel.send('Ping!');
    }
}