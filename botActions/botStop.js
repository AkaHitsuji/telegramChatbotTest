const fbFunc = require('../firebaseFunctions');

module.exports = (bot, db) => {
  bot.command('stop')
  .invoke(function (ctx) {
    let username = ctx.meta.user.username
    fbFunc.removeChatID(db, username).then(res => {
      return ctx.sendMessage('You have been unregistered from the bot. Press /start to register again')
    }).catch (error => console.log(error))
  })
}
