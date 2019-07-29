const TelegramBot = require('node-telegram-bot-api');
const bb = require('bot-brother');


// import db and bot from init file
const {db, bot, teleBot} = require('./init');

let {leaderboard} = require('./compStats');
//import commands from botActions
const {start, stop, help, botOrgBroadcast, unauthorised, botLeaderboard} = require('./botActions');

start(bot, db);
botOrgBroadcast(bot, db, teleBot);
botLeaderboard(bot, db, teleBot, leaderboard);
stop(bot, db);
help(bot);
unauthorised(bot);

// sending test
// function sendMessageEvery5sec() {
//     // bot.use('before', function (ctx) {
//     //   ctx.sendMessage('hello hello hello');
//     // });
//     console.log('message sent');
//     bot.sendMessage('this is the message');
// }
// setInterval(sendMessageEvery5sec, 5000);
