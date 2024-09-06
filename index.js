// documentation for tmi can be found at https://tmijs.com/
const tmi = require('tmi.js');
// common fetch from npm install node-fetch@2
const fetch = require('node-fetch');
// dotenv for environmental variables
const dotenv = require('dotenv').config();

// required node modules
// tmi.js, node-fetch, dotenv, discord.js

/* ------------- TO RUN THE BOT -------------
    1. CD to appropriate bot directory
    2. Enter command:
        node index.js

        Alternatively for logging:
            node index.js >>log-file.txt
            -> all logs will be appended to log-file.txt
   -----------------------------------------
*/

// customized random number functions (random, randomInclusive)
const rand = require(`../${process.env.TWITCH_BOT_USERNAME}/functions/randomNumber`);
// customized vats death functions (checkDeath, addDeath, removeDeath, clearDeaths)
const vatsFunctions = require(`../${process.env.TWITCH_BOT_USERNAME}/functions/vatsDeathLog`)
// channelForMessage is the channel messages will be sent in i.e. bot replies
const channelForMessage = process.env.TWITCH_BOT_CHANNELS;

// tmi connect options for the bot
const options = {
    options: {
        debug: true,
    },
    connection: {
        cluster: 'aws',
        reconnect: true,
    },
    identity: {
        username: process.env.TWITCH_BOT_USERNAME,
        password: process.env.TWITCH_BOT_OAUTH, 
    },
    reconnect: true,
    channels: [process.env.TWITCH_BOT_CHANNELS],
};

// create new client and connect to Twitch
const client = new tmi.client(options);
client.connect();

// automated message on connection relaying success status
client.on('connected', (address, port) => {
    console.log('===========================================');
    console.log('===========================================');
    console.log('===========================================');
    client.say(channelForMessage, 'Hello! The Bot is Connected!');
});

// --------- TIMERS --------- //
// options for enemy types to spawn at the set interval listed below
const pickEnemyType = () => {
    enemyOptions = ['goblins', 'orcs', 'craig'];
    enemyPick = enemyOptions[rand.random(enemyOptions.length, 0)];

    if (enemyPick === 'goblins') {
        console.log('ENEMY PICKED: Goblins');
        client.say(channelForMessage, "goblin goblin goblin goblin goblin goblin goblin goblin goblin goblin we're here to be pesky! we're here to pillage! goblin goblin goblin goblin goblin goblin goblin goblin goblin goblin");
    } else if (enemyPick === 'orcs') {
        console.log('ENEMY PICKED: Orcs');
        client.say(channelForMessage, "orc orc orc orc orc orc orc orc orc orc we bring war! death to all! orc orc orc orc orc orc orc orc orc orc");
    } else {
        console.log('ENEMY PICKED: Craig');
        client.say(channelForMessage, "craig craig craig craig craig craig craig craig craig craig craig hey, I work at BestBuy... please be nice... craig craig craig craig craig craig craig craig craig craig");
    }
}

// Periodic general announcements for chat
const announceChat = () => {
    announceOptions = [
        "Want to know when I go live? Join the Beardcord! WatchThisBird or don't idgaf https://discord.gg/XMXd6fZktU LazyHypers",
        "Stay up to date with me & hang with the community over at our discord LazyHypers - https://discord.gg/XMXd6fZktU",
        "Enjoying the stream? thanks for hanging :3 feel free to drop a follow, it means a lot! PotLove",
        "Sorry if I missed your message. I try my best to read chat whenever possible but I'm either just chillin or talking about some bs. If I miss something you said, feel free to repeat it! Just don't spam pls n' thx. PotLove ( WatchThisBird Also fck u I'm not sorry heheChatting )"
    ];
    annoucePick = announceOptions[rand.random(announceOptions.length, 0)];
    client.say(channelForMessage, annoucePick);
}

// timed interval (1 sec = 1000 ms) this controls events for stream messages
setInterval(pickEnemyType, 3600000);
setInterval(announceChat, 1500000);

// --------- COMMANDS --------- //
client.on('message', async (channel, tags, message, self) => {
    // ignore bot messages
    if(self || !message.startsWith('!')) return;

    // split multi line inputs
    // i.e. !test text Here -> command = 'test' args = ['text', 'Here']
    const args = message.slice(1).split(' ');
	const command = args.shift().toLowerCase();

    // !testbot | Result: test reply functionality
    if (command === 'testbot') {
        client.say(channel, 'This is a custom test command reply BORT');
    }

    // !stats | Result: check user's stats (mid/cringe)
    if (command === 'stats') {
        /* custom setting for specific users
        if (tags.username.toLowerCase() === 'questionableketchup') {
            mid = rand.random(15);
            cringe = rand.random(10);
            client.say(channel, `@${tags.username}, you are about ${mid}% mid and ${cringe}% cringe, Nerdge ALSO ${hair}`);
            return;
        }*/
        mid = rand.random();
        cringe = rand.random();
        hairOptions = ['ur bald LOL', 'you\'re somewhat balding', 'ur hair is still growing', 'you have GIGA HAIR'];
        hairPick = hairOptions[rand.random(hairOptions.length, 0)];

        client.say(channel, `@${tags.username}, you are about ${mid}% mid and ${cringe}% cringe, Nerdge ALSO ${hairPick}`);
    }

    // !8ball | Result: standard 8ball functionality
    if (command === '8ball') {
        eightBallOptions = ['All signs point to yes...', 'Yes!', 'My sources say nope.', 'You may rely on it.', 'Concentrate and ask again...', 'Outlook not so good...', 'It is decidedly so!', 'Better not tell you.', 'Very doubtful.', 'Yes - Definitely!', 'It is certain!', 'Most likely.', 'Ask again later.', 'No!', 'Outlook good.', 'Don\'t count on it.'];
        eightBallPick = eightBallOptions[rand.random(eightBallOptions.length, 0)];

        if (args[0] == undefined) {
            client.say(channel, 'What is your question?');
        } else {
            client.say(channel, `🎱 ${eightBallPick}`);
        }
    }

    // !bald | Result: ur bald lol
    if (command === 'bald') {
        client.say(channel, `@${tags.username} ur bald BaldChamp`);
    }

    // !bug | Result: picks a random bug
    if (command === 'bug') {
        bugOptions = ['you\'re a pillbug, Adorable!', 'you\'re a lady bug, oooo!', 'you\'re a stinkbug, Ew stinky!', 'you\'re a moth, stalking your prey', 'you\'re a spider, an artist', 'you\'re an ant, so mighty', 'you\'re a Dung Beetle, truly a modern Sisyphus', 'you\'re a Insect, just an insect', 'you\'re a Cricket, such lovely tunes you make', 'you\'re a bedbug, Mmm, so cozy'];
        bugPick = bugOptions[rand.random(bugOptions.length, 0)];

        client.say(channel, `@${tags.username} ${bugPick}`);
    }

    // !d20 | Result: rolls a 20 sided dice
    if (command === 'd20') {
        d20Roll = rand.random(20);

        client.say(channel, `D20 rolled: ${d20Roll}`);
    }

    // !fibcheck | Result: checks a users fib.. levels?? idk
    if (command === 'fibcheck') {
        fibCheckOptions = ['fibs detected', 'no fibs detected!'];
        fibCheckPick = fibCheckOptions[rand.random(fibCheckOptions.length, 0)];

        client.say(channel, `Checking ${tags.username} for fibs... Nerdge ${fibCheckPick}`);
    }

    // !getbalded | Result: user gets balded and ratioed a varying amount of times
    if (command === 'getbalded') {
        getBaldedOptions = ['ratio', 'scarlet rot', 'no maidens', 'ur a rat', 'L', 'ur bad', 'maidenless', 'get ded', 'gravy on da mic'];
        getBaldedCount = rand.random(3);
        getBaldedString = "";

        for(i = 0; i < getBaldedCount; i++) {
            getBaldedString += getBaldedOptions[rand.random(getBaldedOptions.length, 0)];
            getBaldedString += ' + ';
        }
        
        // args[0] is the next word after the command i.e. !getbalded beard -> command: getbalded | args[0]: beard
        client.say(channel, `${args[0]} ur bald + ${getBaldedString} ${getBaldedOptions[rand.random(getBaldedOptions.length, 0)]}`);
    }

    // !henny | Result: various henny quotes
    if (command === 'henny') {
        hennyOptions = ['pepeSmile', 'LET\'S PLAY TEAM SCORCHED I FUCKING LOVE TEAM SCORCHED STRONKCAT', 'don\'t piss off the little green frog peepoPISSED', 'henny be tootin!'];
        hennyPick = hennyOptions[rand.random(hennyOptions.length, 0)];

        client.say(channel, `${hennyPick}`);
    }

    // !iam | Result: gives user a characteristic
    if (command === 'iam') {
        iamOptions = ['silly', 'rectangular', 'a silly goose', 'bald', 'a gigachad'];
        iamPick = iamOptions[rand.random(iamOptions.length, 0)];

        client.say(channel, `${tags.username} you are ${iamPick}`);
    }

    // !job | Result: picks a job for the user
    if (command === 'job') {
        jobOptions = ['Todds Mouth Feeder', 'Bard', 'BBL Wiper', 'Court Wizard', 'Bald Wizard', 'Alchemist', 'Warrior', 'Handsome Feller', 'Thief', 'Monk', 'Knight', 'Gunner', 'Frog Mage', 'Jester', 'Sex tutor', 'Nirnroot collector', 'Bald Advisor', 'Adoring Fan', 'Toque Warrior', 'Wasteland Courier', 'Lord of Furries', 'Pierogi Defender', 'Finnish Mechanic', 'McMoaner'];
        jobPick = jobOptions[rand.random(jobOptions.length, 0)];

        client.say(channel, `${tags.username} your new job is ${jobPick}`);
    }

    // !lizard | Result: gives the user's lizard percentage
    if (command === 'lizard') {
        client.say(channel, `${tags.username} you\'re about ${rand.random(100)}% Lizard Rizzard`);
    }

    // !lurk | Result: picks random lurk message
    if (command === 'lurk') {
        lurkOptions = ['is off to go find hair growth formula. GO Good luck! GO', 'wait no come back i miss you Rizzard', 'Cope', 'coolerCow ok no prob', 'You\'re leaving..? NOW?? hmm, much to think upon... MonkeCope', 'gizzFishing aight i\'ll be here', 'ok, fine. JarJarFinger', 'YouThrowing', 'ThreeHoursLater and then they never returned...'];
        lurkEmotes = ['zoroStache', 'shadowWizardJAM', 'gizzGuitarTime', 'zazaBinks'];
        lurkOptionsPick = lurkOptions[rand.random(lurkOptions.length, 0)];
        lurkEmotesPick = lurkEmotes[rand.random(lurkEmotes.length, 0)];

        client.say(channel, `${tags.username} ${lurkOptionsPick} - Thanks for hangin ${lurkEmotesPick}`);
    }

    // !shiton | Result: shitter combo
    if (command === 'shiton') {
        client.say(channel, 'shitter SkeletonDance');
    }

    // !shitter | Result: shiton combo
    if (command === 'shitter') {
        client.say(channel, 'get shit on SkeletonDance');
    }

    // !stock | Result: checks to see how Grace's Goodies have done stock-wise
    if (command === 'stock') {
        stockAmount = rand.random(100);
        stockOptions = [`Grace\'s Goodies has gone up ${stockAmount}%! 📈📈`, `Grace\'s Goodies has gone down ${stockAmount}%! 📉📉`];
        stockOptionsPick = stockOptions[rand.random(stockOptions.length, 0)];

        client.say(channel, `Currently, the stock of ${stockOptionsPick}`);
    }

    // !tax | Result: determines tax user must pay
    if (command === 'tax') {
        taxOptionEmotes = ['ohno', 'monkeyBusiness', 'BIGMONEY', 'zazaBinks'];
        taxAmount = rand.random(100);
        taxOptionsPick = taxOptionEmotes[rand.random(taxOptionEmotes.length, 0)];

        client.say(channel, `${tags.username} you must pay the lord ${taxAmount}% of your shillings this month. ${taxOptionsPick}`);
    }

    // !throwing | Result: picks a random throwing option
    if (command === 'throwing') {
        throwingOptions = ['throwing, stop it Smadge', 'not throwing FeelsGoodMan', 'just bad FeelsBadMan', 'Tilting LazyMad'];
        throwingPick = throwingOptions[rand.random(throwingOptions.length, 0)];

        client.say(channel, `${tags.username} you are ${throwingPick}`);
    }

    // !vats | Result: picks random body part and rolls a random number
    // if random number is > 50 (50% chance), there is increased chance to get better outcomes - else increased chance for worse outcomes
    if (command === 'vats') {
        vatsBodyOptions = ["\'s right arm,", "'s left arm,", "'s torso,", "'s right leg,", "'s left leg,", "'s head,"];
        vatsBodyPick = vatsBodyOptions[rand.random(vatsBodyOptions.length, 0)];
        vatsPercentToHit = rand.random(100);

        console.log('User calling vats: ', tags.username);
        console.log('Vats jail status false(off)/true(on): ', vatsFunctions.checkVatsJailStatus());    
        console.log('Vats death log contains: ', vatsFunctions.readDeaths());   

        vatsOutcomesGoodChance = ['You killed them!', 'You killed them!', 'You killed them, AND you leveled up!', 'You killed them, AND you leveled up!', 'You missed!', 'You\'re out of ammo, they killed you.', 'The game crashed.'];
        vatsOutcomesBadChance = ['You missed!', 'You missed!', 'You\'re out of ammo, they killed you.', 'You\'re out of ammo, they killed you.', 'You killed them!', 'You killed them, AND you leveled up!', 'The game crashed.'];

        if (!vatsFunctions.checkVatsJailStatus()) {
            if (vatsPercentToHit > 50) {
                vatsOutcomesGoodChancePick = vatsOutcomesGoodChance[rand.random(vatsOutcomesGoodChance.length, 0)];
                client.say(channel, `${tags.username} is shooting at ${args[0]}${vatsBodyPick} with a ${vatsPercentToHit}% chance to hit. ${vatsOutcomesGoodChancePick}`);
            } else {
                vatsOutcomesBadChancePick = vatsOutcomesBadChance[rand.random(vatsOutcomesBadChance.length, 0)];
                client.say(channel, `${tags.username} is shooting at ${args[0]}${vatsBodyPick} with a ${vatsPercentToHit}% chance to hit. ${vatsOutcomesBadChancePick}`);
            }  
        } else {
            if (vatsFunctions.checkDeath(tags.username)) {
                client.say(channel, `${tags.username} you cannot perform vats as you have died in a previous vats attempt!`);
            } else {
                if (vatsPercentToHit > 50) {
                    vatsOutcomesGoodChancePick = vatsOutcomesGoodChance[rand.random(vatsOutcomesGoodChance.length, 0)];
                    client.say(channel, `${tags.username} is shooting at ${args[0]}${vatsBodyPick} with a ${vatsPercentToHit}% chance to hit. ${vatsOutcomesGoodChancePick}`);
        
                    if (vatsOutcomesGoodChancePick === "You\'re out of ammo, they killed you.") {
                        vatsFunctions.addDeath(tags.username);
                        console.log('Vats death log contains: ', vatsFunctions.readDeaths());
                    }
                } else {
                    vatsOutcomesBadChancePick = vatsOutcomesBadChance[rand.random(vatsOutcomesBadChance.length, 0)];
                    client.say(channel, `${tags.username} is shooting at ${args[0]}${vatsBodyPick} with a ${vatsPercentToHit}% chance to hit. ${vatsOutcomesBadChancePick}`);
        
                    if (vatsOutcomesBadChancePick === "You\'re out of ammo, they killed you.") {
                        vatsFunctions.addDeath(tags.username);
                        console.log('Vats death log contains: ', vatsFunctions.readDeaths());
                    }
                }  
            }
        }        
    }

    // !clearvats | Result: empties list of deaths from vats
    if (command === 'clearvats' && (tags.username.toLowerCase() === 'questionableketchup' || tags.username.toLowerCase() === 'lazybeardd')) {
        vatsFunctions.clearDeaths();

        client.say(channel, 'Good news! Vats deaths have been cleared! Huzzah!');
    }

    // !turnvatsjailon | Result: toggle on the vats jail in vatsDeathLog.js -> this tracks vats deaths to prevent vats usage
    // also clears vats jail to ensure users are not prevented from vats'ing if they died when vats jail was toggled off
    if (command === 'turnvatsjailon' && (tags.username.toLowerCase() === 'questionableketchup' || tags.username.toLowerCase() === 'lazybeardd')) {

        if (vatsFunctions.checkVatsJailStatus()) {
            client.say(channel, 'Vats jail is already activated!');
        } else {
            vatsFunctions.turnVatsJailOn();
            client.say(channel, 'Careful everyone, the vats jail has been activated!');
        }
    }

    // !turnvatsjailoff | Result: toggle off the vats jail in vatsDeathLog.js -> stop tracking vats deaths
    if (command === 'turnvatsjailoff' && (tags.username.toLowerCase() === 'questionableketchup' || tags.username.toLowerCase() === 'lazybeardd')) {

        if (!vatsFunctions.checkVatsJailStatus()) {
            client.say(channel, 'Vats jail is already deactivated!');
        } else {
            vatsFunctions.turnVatsJailOff();
            client.say(channel, 'We\'re free! Vats jail has been deactivated!')
        }
    }

    // !quota | Result: determines the quota a user achieved (lethal company)
    if (command === 'quota') {
        quotaAmount = rand.random(500);
        quotaOptions = [`and found $${quotaAmount} worth of loot and successfully sold it!`, `and found $${quotaAmount} worth of loot... but the Bracken snuck up and snapped their neck bracken`, 'but got scared so they returned to the ship and danced'];
        quotaOptionsPick = quotaOptions[rand.random(quotaOptions.length, 0)];
        
        client.say(channel, `${tags.username} has gone into the dungeon ${quotaOptionsPick}`);
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

                client.say(channel, `${tags.username} went to the store and got ${grocerySelection[0]} ($${groceryPrices[0]}), ${grocerySelection[1]} ($${groceryPrices[1]}), ${grocerySelection[2]} ($${groceryPrices[2]}), ${grocerySelection[3]} ($${groceryPrices[3]}), and ${grocerySelection[4]} ($${groceryPrices[4]}). However, you experienced ${groceryCompOptionsPick} which comps your order to $0.00!`);
            } 
            // if random roll is > 170 (~15% chance) -> bill is reduced by 20% from coupons
            else if (groceryRandomRoll > 170) {
                totalItemPrice = Math.round((totalItemPrice * 0.80) * 100) / 100;

                client.say(channel, `${tags.username} went to the store and brought coupons! They got ${grocerySelection[0]} ($${groceryPrices[0]}), ${grocerySelection[1]} ($${groceryPrices[1]}), ${grocerySelection[2]} ($${groceryPrices[2]}), ${grocerySelection[3]} ($${groceryPrices[3]}), and ${grocerySelection[4]} ($${groceryPrices[4]}). Have a nice day! Here's your bill: $${totalItemPrice}`);
            } 
            // else, normal bill
            else {
                client.say(channel, `${tags.username} went to the store and got ${grocerySelection[0]} ($${groceryPrices[0]}), ${grocerySelection[1]} ($${groceryPrices[1]}), ${grocerySelection[2]} ($${groceryPrices[2]}), ${grocerySelection[3]} ($${groceryPrices[3]}), and ${grocerySelection[4]} ($${groceryPrices[4]}). Have a nice day! Here's your bill: $${totalItemPrice}`);
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
            client.say(channel, wouldYouRatherJSON[rand.random(wouldYouRatherJSON.length, 0)].question);

        } catch (error) {
            console.error(error.message);
        }
    }
});