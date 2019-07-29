module.exports = (bot) => {
  bot.command('unauthorised')
  .invoke(function(ctx) {
    return ctx.sendMessage('You are unauthorised to do so.')
  })
}
