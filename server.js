const TelegramBot = require('node-telegram-bot-api');
const bb = require('bot-brother');


// import db and bot from init file
const {db, bot, teleBot} = require('./init.js');

//import commands from botActions
const {start, uploadPhoto, botOrgBroadcast, stopBot} = require('./botActions');

start(bot, db);
uploadPhoto(bot);
botOrgBroadcast(bot, db, teleBot)
stopBot(bot, db);
// sending test
// function sendMessageEvery5sec() {
//     // bot.use('before', function (ctx) {
//     //   ctx.sendMessage('hello hello hello');
//     // });
//     console.log('message sent');
//     bot.sendMessage('this is the message');
// }
// setInterval(sendMessageEvery5sec, 5000);
