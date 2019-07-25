const fbFunc = require('../firebaseFunctions.js');

 module.exports = (bot, db) => {
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
          if(res) {
              const {chatID} = res;
              if (chatID.length === 0) {
                //add chatID into database
                console.log(username)
                fbFunc.addIdToDatabase(db, username, charID).then((res) => {
                  ctx.sendMessage('Your username has been registered.')
                })
                .catch((err) => {
                  console.log(err)
                  ctx.sendMessage('Error in processing your data, try again.')
                })
              }
          }
          else {
            ctx.sendMessage('Hello <%user.first_name%>, welcome to codeIT Suisse. You have not registered for the competition yet.')
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
}
