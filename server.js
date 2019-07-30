const TelegramBot = require('node-telegram-bot-api');
const bb = require('bot-brother');

// import db and bot from init file
const { db, bot, teleBot } = require('./init');

let {
  getDifferences,
  leaderboardDummy,
  leaderboardDummyOld
} = require('./compStats');

//import commands from botActions
const {
  botStart,
  botStop,
  botHelp,
  botOrgBroadcast,
  botUnauthorised,
  botLeaderboard,
  botSendPositionChange,
  botTimer,
  botMute
} = require('./botActions');
const INTERVAL = 30000;

botStart(bot, db);
botOrgBroadcast(bot, db, teleBot);
botLeaderboard(bot, db, teleBot, leaderboardDummy);
botStop(bot, db);
botHelp(bot, db);
botTimer(bot, db);
botUnauthorised(bot);
botMute(bot, db);
// call backend to get leaderboard. set as leaderboardOld.
setInterval(function() {
  let leaderboard = leaderboardDummy;
  let leaderboardOld = leaderboardDummyOld;

  // call backend to get leaderboard. set as leaderboard. then compare.
  differences = getDifferences(leaderboard, leaderboardOld);
  botSendPositionChange(db, teleBot, differences);
}, INTERVAL);

// sending test
// function sendMessageEvery5sec() {
//     // bot.use('before', function (ctx) {
//     //   ctx.sendMessage('hello hello hello');
//     // });
//     console.log('message sent');
//     bot.sendMessage('this is the message');
// }
// setInterval(sendMessageEvery5sec, 5000);
