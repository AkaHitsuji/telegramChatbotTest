const TelegramBot = require('node-telegram-bot-api');
const bb = require('bot-brother');
const firebase = require("firebase-admin");

const config = require('./config/config.json');
const serviceAccount = require("./config/serviceAccountKey.json");
const fbFunc = require('./firebaseFunctions.js')

// initializing firebase connection
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://askcoditest.firebaseio.com"
});
const db = firebase.firestore();
// initializing application
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

    let username = ctx.meta.user.username;
    let charID = ctx.meta.user.id;
    let dbContainsUser;
    fbFunc.checkIfusernameExists(db,username).then(function(res) {
        console.log('this is the result: ',res);
        dbContainsUser = res;
        if(res) {
            //TODO: check if contains chatID, if yes continue, if no add chatID into database
        }
        else {
            //TODO: inform user that they have accessed the chatbot.
            //Message: welcome to codeIT Suisse. Please register for the competition via: link
        }
    });

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


// sending test
// function sendMessageEvery5sec() {
//     // bot.use('before', function (ctx) {
//     //   ctx.sendMessage('hello hello hello');
//     // });
//     console.log('message sent');
//     bot.sendMessage('this is the message');
// }
// setInterval(sendMessageEvery5sec, 5000);
