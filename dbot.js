const { Client, Intents } = require('discord.js');
const { token } = require('./auth.json');
const { prefix } = require('./config.json');

const winston = require('winston');

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      new winston.transports.Console({colorize:true})
    ],
  });

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	logger.info("Bot logged in as: " + client.user.username);
    logger.debug("Prefix is: " + prefix);
    client.user.setActivity(`Use ${prefix}help`);
});

client.on("messageCreate", function (message) {
    logger.debug(message.content.startsWith(prefix));
    if(!message.content.startsWith(prefix)) return;
    if(message.author.bot) return;
    var rawMsg = message.content.replace(prefix, '').split(' ');
    logger.debug(rawMsg);
    var command = rawMsg.splice(0,1)[0];
    var agruments = rawMsg;
    switch (command) {
        case "ping":
            message.reply("Pong!");
            return;
        default:
            message.reply("Unrecognised command: " + command);
    }
});

// Login to Discord with your client's token
client.login(token);