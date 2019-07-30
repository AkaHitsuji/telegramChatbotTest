const TelegramBot = require('node-telegram-bot-api');
const bb = require('bot-brother');


// import db and bot from init file
const {db, bot, teleBot} = require('./init');

let {getDifferences, leaderboardDummy, leaderboardDummyOld} = require('./compStats');
//import commands from botActions
const {start, stop, help, botOrgBroadcast, unauthorised, botLeaderboard, botSendPositionChange, timer} = require('./botActions');
const INTERVAL = 3000;

start(bot, db);
botOrgBroadcast(bot, db, teleBot);
botLeaderboard(bot, db, teleBot, leaderboardDummy);
stop(bot, db);
help(bot);
timer(bot, db)
unauthorised(bot);

setInterval(function(){
  let leaderboard = leaderboardDummy;
  let leaderboardOld = leaderboardDummyOld;
  differences = getDifferences(leaderboard, leaderboardOld);
  botSendPositionChange(db, teleBot, differences);
}, INTERVAL)

// sending test
// function sendMessageEvery5sec() {
//     // bot.use('before', function (ctx) {
//     //   ctx.sendMessage('hello hello hello');
//     // });
//     console.log('message sent');
//     bot.sendMessage('this is the message');
// }
// setInterval(sendMessageEvery5sec, 5000);
