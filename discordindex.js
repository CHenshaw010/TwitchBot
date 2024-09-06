// documentation for discord.js can be found at https://discord.js.org/
const { Client, IntentsBitField} = require('discord.js');
// dotenv for environmental variables
const dotenv = require('dotenv').config();
// common fetch from npm install node-fetch@2
const fetch = require('node-fetch');

// required node modules
// tmi.js, node-fetch, dotenv, discord.js

/* ------------- TO RUN THE BOT -------------
    1. CD to appropriate bot directory
    2. Enter command:
        node discordindex.js

        Alternatively for logging:
            node discordindex.js >>log-file-discord.txt
            -> all logs will be appended to log-file-discord.txt
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

// automatically reply to ping messages (keep the bot connected)
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    }
});

// connect the bot
client.login(process.env.DISCORD_BOT_OAUTH);

client.on('messageCreate', async (message) => {
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
        hairOptions = ['ur bald LOL :EggHead:', 'you\'re somewhat balding :LazyHands:', 'ur hair is still growing :SoyPoint:', 'you have GIGA HAIR :tafonyPOG:'];
        hairPick = hairOptions[rand.random(hairOptions.length, 0)];

        message.reply(`You are about ${mid}% mid and ${cringe}% cringe, :nerd: ALSO ${hairPick}`);
    }

    // !8ball | Result: standard 8ball functionality
    if (command === '8ball') {
        eightBallOptions = ['All signs point to yes...', 'Yes!', 'My sources say nope.', 'You may rely on it.', 'Concentrate and ask again...', 'Outlook not so good...', 'It is decidedly so!', 'Better not tell you.', 'Very doubtful.', 'Yes - Definitely!', 'It is certain!', 'Most likely.', 'Ask again later.', 'No!', 'Outlook good.', 'Don\'t count on it.'];
        eightBallPick = eightBallOptions[rand.random(eightBallOptions.length, 0)];

        if (args[0] == undefined) {
            message.reply('What is your question?')
        } else {
            message.reply(`🎱 ${eightBallPick}`);
        }
    }

    // !bald | Result: ur bald lol
    if (command === 'bald') {
        message.reply('Ur bald :bald:');
    }

    // !bug | Result: picks a random bug
    if (command === 'bug') {
        bugOptions = ['You\'re a :sparkles: pillbug :sparkles: adorable!', 'You\'re a lady :lady_beetle: bug, oooo!', 'You\'re a stinkbug, ew stinky! :sick:', 'You\'re a moth:bangbang:, stalking your prey', 'You\'re a :spider: spider, an artist :spider_web:', 'You\'re an ant, so mighty :muscle: :muscle:', 'You\'re a dung beetle, :poop: :woman_cartwheeling: truly a modern sisyphus', ':neutral_face: You\'re a insect, just an insect :beetle:', 'You\'re a cricket :pog: such lovely tunes you make :mega:', 'You\'re a :bed:bug, mmm, so cozy'];
        bugPick = bugOptions[rand.random(bugOptions.length, 0)];

        message.reply(`${bugPick}`);
    }

    // !d20 | Result: rolls a 20 sided dice
    if (command === 'd20') {
        d20Roll = rand.random(20);

        message.reply(`D20 rolled: ${d20Roll}`);
    }

    // !fibcheck | Result: checks a users fib.. levels?? idk
    if (command === 'fibcheck') {
        fibCheckOptions = ['fibs detected', 'no fibs detected!'];
        fibCheckPick = fibCheckOptions[rand.random(fibCheckOptions.length, 0)];

        message.reply(`Checking ${message.author.displayName} for fibs... :nerd: ${fibCheckPick}`);
    }

    // !getbalded | Result: user gets balded and ratioed a varying amount of times
    if (command === 'getbalded') {
        getBaldedOptions = ['ratio', 'scarlet rot', 'no maidens', 'ur a rat', 'L', ':EggHead:', 'ur bad', 'maidenless', 'get ded', 'gravy on da mic'];
        getBaldedCount = rand.random(3);
        getBaldedString = "";

        for(i = 0; i < getBaldedCount; i++) {
            getBaldedString += getBaldedOptions[rand.random(getBaldedOptions.length, 0)];
            getBaldedString += ' + ';
        }
        
        // args[0] is the next word after the command i.e. !getbalded beard -> command: getbalded | args[0]: beard
        message.reply(`${args[0]} ur bald + ${getBaldedString} ${getBaldedOptions[rand.random(getBaldedOptions.length, 0)]}`);
    }

    // !henny | Result: various henny quotes
    if (command === 'henny') {
        hennyOptions = [':3_:', 'LET\'S PLAY TEAM SCORCHED I FUCKING LOVE TEAM SCORCHED STRONKCAT', 'don\'t piss off the little green frog :peepoWtf:', 'henny be tootin!'];
        hennyPick = hennyOptions[rand.random(hennyOptions.length, 0)];

        message.reply(`${hennyPick}`);
    }

    // !iam | Result: gives user a characteristic
    if (command === 'iam') {
        iamOptions = ['silly', 'rectangular', 'a silly goose', 'bald', 'a gigachad', ':BASED:'];
        iamPick = iamOptions[rand.random(iamOptions.length, 0)];

        message.reply(`${message.author.displayName}, you are ${iamPick}`);
    }

    // !job | Result: picks a job for the user
    if (command === 'job') {
        jobOptions = ['Todds Mouth Feeder', 'Bard', 'BBL Wiper', ':Bardtholomew:','Court Wizard', ':bald: Wizard', 'Alchemist', 'Warrior', 'Handsome Feller', 'Thief', 'Monk', 'Knight', 'Gunner', 'Frog Mage', 'Jester', 'Sex tutor', 'Nirnroot collector', 'Bald Advisor', 'Adoring Fan', 'Toque Warrior', 'Wasteland Courier', 'Lord of Furries', 'Pierogi Defender', 'Finnish Mechanic', 'McMoaner'];
        jobPick = jobOptions[rand.random(jobOptions.length, 0)];

        message.reply(`${message.author.displayName}, your new job is ${jobPick}`);
    }

    // !lizard | Result: gives the user's lizard percentage
    if (command === 'lizard') {
        message.reply(`${message.author.displayName}, you\'re about ${rand.random(100)}% Lizard :lizard:`);
    }

    // !lurk | Result: picks random lurk message
    // DID NOT IMPLEMENT, SEEMS OUT OF PLACE FOR DISCORD

    // !shiton | Result: shitter combo
    if (command === 'shiton') {
        message.reply('shitter :BEARDMEGALUL:');
    }

    // !shitter | Result: shiton combo
    if (command === 'shitter') {
        message.reply('get shit on :ShitOn:');
    }

    // !stock | Result: checks to see how Grace's Goodies have done stock-wise
    if (command === 'stock') {
        stockAmount = rand.random(100);
        stockOptions = [`Grace\'s Goodies has gone up ${stockAmount}%! 📈📈`, `Grace\'s Goodies has gone down ${stockAmount}%! 📉📉`];
        stockOptionsPick = stockOptions[rand.random(stockOptions.length, 0)];

        message.reply(`Currently, the stock of ${stockOptionsPick}`);
    }

    // !tax | Result: determines tax user must pay
    if (command === 'tax') {
        taxOptionEmotes = [':LazyHands:', ':WatchThisBird:', ':sadCat:', ':weirdChamp:'];
        taxAmount = rand.random(100);
        taxOptionsPick = taxOptionEmotes[rand.random(taxOptionEmotes.length, 0)];

        message.reply(`${message.author.displayName} must pay the lord ${taxAmount}% of their shillings this month. ${taxOptionsPick}`);
    }

    // !throwing | Result: picks a random throwing option
    if (command === 'throwing') {
        throwingOptions = ['throwing, stop it :peepoWtf:', 'not throwing :yipee:', 'just bad :LazySadge:', 'Tilting :LazyRage:'];
        throwingPick = throwingOptions[rand.random(throwingOptions.length, 0)];

        message.reply(`${message.author.displayName}, you are ${throwingPick}`);
    }

    // !vats | Result: picks random body part and rolls a random number
    // if random number is > 50 (50% chance), there is increased chance to get better outcomes - else increased chance for worse outcomes
    if (command === 'vats') {
        vatsBodyOptions = ["\'s right arm,", "'s left arm,", "'s torso,", "'s right leg,", "'s left leg,", "'s head,"];
        vatsBodyPick = vatsBodyOptions[rand.random(vatsBodyOptions.length, 0)];
        vatsPercentToHit = rand.random(100);

        console.log('User calling vats: ', message.author.displayName);
        console.log('Vats jail status false(off)/true(on): ', vatsFunctions.checkVatsJailStatus());    
        console.log('Vats death log contains: ', vatsFunctions.readDeaths());   

        vatsOutcomesGoodChance = ['You killed them!', 'You killed them!', 'You killed them, AND you leveled up! :ShadowWizardGrey:', 'You killed them, AND you leveled up! :ShadowWizardGrey:', 'You missed!', 'You\'re out of ammo, they killed you. :ShitOn:', 'The game crashed. :confusedCat:'];
        vatsOutcomesBadChance = ['You missed!', 'You missed!', 'You\'re out of ammo, they killed you. :ShitOn:', 'You\'re out of ammo, they killed you. :ShitOn:', 'You killed them!', 'You killed them, AND you leveled up! :ShadowWizardGrey:', 'The game crashed. :confusedCat:'];

        if (!vatsFunctions.checkVatsJailStatus()) {
            if (vatsPercentToHit > 50) {
                vatsOutcomesGoodChancePick = vatsOutcomesGoodChance[rand.random(vatsOutcomesGoodChance.length, 0)];
                message.reply(`${message.author.displayName} is shooting at ${args[0]}${vatsBodyPick} with a ${vatsPercentToHit}% chance to hit. ${vatsOutcomesGoodChancePick}`);
            } else {
                vatsOutcomesBadChancePick = vatsOutcomesBadChance[rand.random(vatsOutcomesBadChance.length, 0)];
                message.reply(`${message.author.displayName} is shooting at ${args[0]}${vatsBodyPick} with a ${vatsPercentToHit}% chance to hit. ${vatsOutcomesBadChancePick}`);
            }  
        } else {
            if (vatsFunctions.checkDeath(message.author.displayName)) {
                message.reply(`${message.author.displayName} you cannot perform vats as you have died :SoyPoint: in a previous vats attempt! :SoyPoint:`);
            } else {
                if (vatsPercentToHit > 50) {
                    vatsOutcomesGoodChancePick = vatsOutcomesGoodChance[rand.random(vatsOutcomesGoodChance.length, 0)];
                    message.reply(`${message.author.displayName} is shooting at ${args[0]}${vatsBodyPick} with a ${vatsPercentToHit}% chance to hit. ${vatsOutcomesGoodChancePick}`);
        
                    if (vatsOutcomesGoodChancePick === "You\'re out of ammo, they killed you. :ShitOn:") {
                        vatsFunctions.addDeath(message.author.displayName);
                        console.log('Vats death log contains: ', vatsFunctions.readDeaths());
                    }
                } else {
                    vatsOutcomesBadChancePick = vatsOutcomesBadChance[rand.random(vatsOutcomesBadChance.length, 0)];
                    message.reply(`${message.author.displayName} is shooting at ${args[0]}${vatsBodyPick} with a ${vatsPercentToHit}% chance to hit. ${vatsOutcomesBadChancePick}`);
        
                    if (vatsOutcomesBadChancePick === "You\'re out of ammo, they killed you. :ShitOn:") {
                        vatsFunctions.addDeath(message.author.displayName);
                        console.log('Vats death log contains: ', vatsFunctions.readDeaths());
                    }
                }  
            }
        }        
    }

    // !clearvats | Result: empties list of deaths from vats
    if (command === 'clearvats' && (message.author.displayName.toLowerCase() === 'beasteux' || message.author.displayName.toLowerCase() === 'lazybeardd')) {
        vatsFunctions.clearDeaths();

        message.reply('Good news! Vats deaths have been cleared! Huzzah!');
    }

    // !turnvatsjailon | Result: toggle on the vats jail in vatsDeathLog.js -> this tracks vats deaths to prevent vats usage
    // also clears vats jail to ensure users are not prevented from vats'ing if they died when vats jail was toggled off
    if (command === 'turnvatsjailon' && (message.author.displayName.toLowerCase() === 'beasteux' || message.author.displayName.toLowerCase() === 'lazybeardd')) {

        if (vatsFunctions.checkVatsJailStatus()) {
            message.reply('Vats jail is already activated!');
        } else {
            vatsFunctions.turnVatsJailOn();
            message.reply('Careful everyone, the vats jail has been activated! :beardPLS:');
        }
    }

    // !turnvatsjailoff | Result: toggle off the vats jail in vatsDeathLog.js -> stop tracking vats deaths
    if (command === 'turnvatsjailoff' && (message.author.displayName.toLowerCase() === 'beasteux' || message.author.displayName.toLowerCase() === 'lazybeardd')) {

        if (!vatsFunctions.checkVatsJailStatus()) {
            message.reply('Vats jail is already deactivated!');
        } else {
            vatsFunctions.turnVatsJailOff();
            message.reply('We\'re free! Vats jail has been deactivated! :tafonyPOG:')
        }
    }

    // !quota | Result: determines the quota a user achieved (lethal company)
    if (command === 'quota') {
        quotaAmount = rand.random(500);
        quotaOptions = [`and found $${quotaAmount} worth of loot and successfully sold it! :5Head:`, `and found $${quotaAmount} worth of loot... but the Bracken snuck up and snapped their neck :Gilbert:`, 'but got scared so they returned to the ship and danced'];
        quotaOptionsPick = quotaOptions[rand.random(quotaOptions.length, 0)];
        
        message.reply(`${message.author.displayName} has gone into the dungeon ${quotaOptionsPick}`);
    }  

        // !groceries | Result: does a url fetch to a pastebin link with JSON files and does a random number from 1-200
    // picks five random items and gives a random value within the item's lower and upper margins (in the JSON element)
    // if random number = 1 (0.5% chance), bill is reduced to $0, if random number is > 170 (~15% chance) coupons reduce bill by 20%
    // else all item prices get added up for the total bill
    if (command === 'groceries') {
        // local variables
        groceryRandomRoll = rand.randomInclusive(200, 0);
        groceryCompOptions = ['a sewage pipe burst', 'a five-finger discount', 'a measels outbreak'];
        groceryPrices = [];
        grocerySelection = [];
        totalItemPrice = 0;

        // pastebin url -> KEEP /raw/
        const groceryUrl = 'https://pastebin.com/raw/az1zwUjB';

        // try async url fetch 
        try {
            const res = await fetch(groceryUrl);
            // check response is valid
            if (!res.ok) {
                throw new Error(`Response status: ${res.status}`);
            }
            // collect response as JSON in a new variable
            const groceryJSON = await res.json();

            // grocery/bot logic goes here
            // pick five random items and random prices in their price boundaries and add prices to total bill
            for (i = 0; i < 5; ++i) {
                groceryItemPick = rand.random(groceryJSON.length, 0)
                groceryPrices[i] = rand.randomInclusive(parseInt(groceryJSON[groceryItemPick].upperCostMargin), parseInt(groceryJSON[groceryItemPick].lowerCostMargin));
                grocerySelection[i] = groceryJSON[groceryItemPick].name;
                totalItemPrice += groceryPrices[i];
            }

            // if random roll is 1 (0.5% chance) -> bill is comped for a various reason
            if (groceryRandomRoll === 1) {
                groceryCompOptionsPick = groceryCompOptions[rand.random(groceryCompOptions.length, 0)];

                message.reply(`${message.author.displayName} went to the store and got ${grocerySelection[0]} ($${groceryPrices[0]}), ${grocerySelection[1]} ($${groceryPrices[1]}), ${grocerySelection[2]} ($${groceryPrices[2]}), ${grocerySelection[3]} ($${groceryPrices[3]}), and ${grocerySelection[4]} ($${groceryPrices[4]}). However, you experienced ${groceryCompOptionsPick} which comps your order to $0.00!`);
            } 
            // if random roll is > 170 (~15% chance) -> bill is reduced by 20% from coupons
            else if (groceryRandomRoll > 170) {
                totalItemPrice = Math.round((totalItemPrice * 0.80) * 100) / 100;

                message.reply(`${message.author.displayName} went to the store and brought coupons! They got ${grocerySelection[0]} ($${groceryPrices[0]}), ${grocerySelection[1]} ($${groceryPrices[1]}), ${grocerySelection[2]} ($${groceryPrices[2]}), ${grocerySelection[3]} ($${groceryPrices[3]}), and ${grocerySelection[4]} ($${groceryPrices[4]}). Have a nice day! Here's your bill: $${totalItemPrice}`);
            } 
            // else, normal bill
            else {
                message.reply(`${message.author.displayName} went to the store and got ${grocerySelection[0]} ($${groceryPrices[0]}), ${grocerySelection[1]} ($${groceryPrices[1]}), ${grocerySelection[2]} ($${groceryPrices[2]}), ${grocerySelection[3]} ($${groceryPrices[3]}), and ${grocerySelection[4]} ($${groceryPrices[4]}). Have a nice day! Here's your bill: $${totalItemPrice}`);
            }

        } catch (error) {
            console.error(error.message);
        }
        
        //basic fetch
        /*fetch(groceryUrl)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));*/
    }

    // !wyr | Result: does a url fetch to a pastebin link with JSON files. picks random JSON item (a would you rather question)
    if (command === 'wyr') {
        // pastebin url -> KEEP /raw/
        const wouldYouRatherUrl = 'https://pastebin.com/raw/L2k4vW7y';

        // try async url fetch 
        try {
            const res = await fetch(wouldYouRatherUrl);
            // check response is valid
            if (!res.ok) {
                throw new Error(`Response status: ${res.status}`);
            }
            // collect response as JSON in a new variable
            const wouldYouRatherJSON = await res.json();

            // wouldyourather/bot logic goes here
            // pick random JSON element
            message.reply(wouldYouRatherJSON[rand.random(wouldYouRatherJSON.length, 0)].question);

        } catch (error) {
            console.error(error.message);
        }
    }
});