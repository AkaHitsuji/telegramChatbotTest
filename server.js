const TelegramBot = require('node-telegram-bot-api');
const bb = require('bot-brother');


// import db and bot from init file
const {db, bot, teleBot} = require('./init.js');

//import commands from botActions
const {start, uploadPhoto, botOrgBroadcast, stopBot, botMute} = require('./botActions');

start(bot, db);
stopBot(bot, db);

uploadPhoto(bot);
botOrgBroadcast(bot, db, teleBot);

// botMute contains /mute and /unmute commands
botMute(bot, db);
