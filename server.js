const TelegramBot = require('node-telegram-bot-api');
const config = require('./config/config.json')
const bb = require('bot-brother');
const bot = bb({
  key: config.apikey,
  sessionManager: bb.sessionManager.memory(),
  polling: { interval: 0, timeout: 1 }
});

///start command
bot.command('start')
.invoke(function (ctx) {
  // Setting data, data is used in text message templates.
  ctx.data.user = ctx.meta.user;
  console.log('user data: ',ctx.meta.user);
  // Invoke callback must return promise.
  return ctx.sendMessage('Hello <%=user.first_name%>. How are you?');
})
.answer(function (ctx) {
  ctx.data.answer = ctx.answer;
  // Returns promise.
  return ctx.sendMessage('OK. I understood. You feel <%=answer%>');
});


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
