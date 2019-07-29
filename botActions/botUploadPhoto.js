const fbFunc = require('../firebaseFunctions');

module.exports= (bot) => {
  // Creating command '/upload_photo'.
  bot.command('upload_photo')
  .invoke(function (ctx) {
    return ctx.sendMessage('Drop me a photo, please');
  })
  .answer(function (ctx) {
    // ctx.message is an object that represents Message.
    // See https://core.telegram.org/bots/api#message
    return ctx.sendPhoto(ctx.message.photo[0].file_id, {caption: 'I got your photo!'});
  });
}
