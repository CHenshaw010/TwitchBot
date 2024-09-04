// documentation for discord.js can be found at https://discord.js.org/
const { Client, IntentsBitField} = require('discord.js');
// dotenv for environmental variables
const dotenv = require('dotenv').config();

/* ------------- TO RUN THE BOT -------------
    1. CD to appropriate bot directory
    2. Enter command:
        node discordindex.js

        Alternatively for logging:
            node discordindex.js >>log-file-discord.txt
            -> all logs will be appended to log-file.txt
   -----------------------------------------
*/

// customized random number functions (random, randomInclusive)
const rand = require(`../${process.env.TWITCH_BOT_USERNAME}/functions/randomNumber`);
// customized vats death functions (checkDeath, addDeath, removeDeath, clearDeaths)
const vatsFunctions = require(`../${process.env.TWITCH_BOT_USERNAME}/functions/vatsDeathLog`)

// setup the client with appropriate intents
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

// automated message on connection relaying success status
client.on('ready', (c) => {
    console.log('===========================================');
    console.log('===========================================');
    console.log('===========================================');
    console.log(`💚 ${c.user.tag}: Hello! The bot is connected!`);
});

// connect the bot
client.login(process.env.DISCORD_BOT_OAUTH);

client.on('messageCreate', (message) => {
    // ignore bot messages
    if(message.author.bot) return;

    // split multi line inputs
    // i.e. !test text Here -> command = 'test' args = ['text', 'Here']
    const args = message.content.slice(1).split(' ');
	const command = args.shift().toLowerCase();

    if (command === "testbot") {
        message.reply('This is a custom test command reply');
    }

    // !stats | Result: check user's stats (mid/cringe)
    if (command === 'stats') {
        mid = rand.random();
        cringe = rand.random();
        hairOptions = ['ur bald LOL', 'you\'re somewhat balding', 'ur hair is still growing', 'you have GIGA HAIR'];
        hairPick = hairOptions[rand.random(hairOptions.length, 0)];

        message.reply(`You are about ${mid}% mid and ${cringe}% cringe, :nerd: ALSO ${hairPick}`);
    }
});