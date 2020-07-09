module.exports = {
    name: 'beep',
    args: false,
    cooldown: 5,
    guildOnly: false,
    usage: '',    
    description: 'Type !beep to receive back a boop.. by a parrBot',
    execute(message, args) {
        message.channel.send('BOoOoOoOoP!', { tts: true });
    }
}