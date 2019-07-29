const fbFunc = require('../firebaseFunctions.js');

 module.exports = (bot, db) => {
  ///start command
  bot.command('help')
  .invoke(function (ctx) {
      ctx.data.user = ctx.meta.user;
      let username = ctx.meta.user.username;
      let charID = ctx.meta.user.id;
      const data = fbFunc.checkIfusernameExists(db, username).then(({data, role}) => {
          const {chatID, name} = data;
          console.log(data);
          if (chatID.length > 0) {
              if (role === 'organiser') {
                return ctx.sendMessage(organiserHelpMessage)
              }
              else if (role === 'participant') {
                return ctx.sendMessage(participantHelpMessage)
              }
            }
          else {
            return ctx.sendMessage(`Hello ${name}, you have not been registered yet. Use the command /start to register.`)
          }
      }).catch((error) => {
        console.log(error);
        ctx.sendMessage('Error occurred.');
      })
  });
}

const organiserHelpMessage = '';
const participantHelpMessage = '';