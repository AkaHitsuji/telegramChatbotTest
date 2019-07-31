const fbFunc = require('../firebaseFunctions.js');
const { notStartedError, ERROR_MESSAGE, ABOUT_ME_MESSAGE } = require('./constants');

module.exports = (bot,db) => {
  ///start command
  bot.command('aboutMe').invoke(ctx => {
    const username = ctx.meta.user.username;
    fbFunc
      .checkIfusernameExists(db, username)
      .then(({ data, role }) => {
        const { chatID, name } = data;
        console.log(data);
        if (typeof chatID === 'number') {
          return ctx.sendMessage(aboutMeMessage);
        } else {
          return ctx.sendMessage(notStartedError(name));
        }
      })
      .catch(error => {
        console.log(error);
        ctx.sendMessage(ERROR_MESSAGE);
      });
  });
};

const aboutMeMessage = ABOUT_ME_MESSAGE;