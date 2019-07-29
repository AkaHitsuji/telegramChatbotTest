const fbFunc = require('../firebaseFunctions');

module.exports = (bot, db) => {
  bot.command('mute')
  .invoke(function (ctx) {
    let username = ctx.meta.user.username;
    const isMute = true;
    fbFunc.muteHandler(db, username, isMute).then(msg => {
      return ctx.sendMessage(msg);
    }).catch(err => {
      console.log(err);
      return ctx.sendMessage('An error occurred, please try again later.');
    });
  });

  bot.command('unmute')
  .invoke(function (ctx) {
    let username = ctx.meta.user.username;
    const isMute = false;
    fbFunc.muteHandler(db, username, isMute).then(msg => {
      return ctx.sendMessage(msg);
    }).catch(err => {
      console.log(err);
      return ctx.sendMessage('An error occurred, please try again later.');
    });
  })
}
