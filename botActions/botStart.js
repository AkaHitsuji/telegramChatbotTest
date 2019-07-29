const fbFunc = require('../firebaseFunctions');

module.exports = (bot, db) => {
  ///start command
  bot.command('start')
  .invoke(function (ctx) {
      // Setting data, data is used in text message templates.
      ctx.data.user = ctx.meta.user;
      let username = ctx.meta.user.username;
      let charID = ctx.meta.user.id;
      const data = fbFunc.checkIfusernameExists(db, username).then(({data, role}) => {
          const {chatID, name} = data;
          console.log(data);
          if (chatID.length === 0) {
              //add chatID into database
              fbFunc.addIdToDatabase(db, username, role, charID).then(res => {
                ctx.sendMessage(`Hello ${name}, your information as a ${role} has been registered.`)
              })
            }
      })


      // Invoke callback must return promise.
      return ctx.sendMessage('Hello I am Codi');
})
}
