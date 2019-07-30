module.exports = bot => {
  bot.command('unauthorised').invoke(ctx => {
    return ctx.sendMessage('You are unauthorised to do so.');
  });
};
