const fbFunc = require('../firebaseFunctions.js');
const { notStartedError, ERROR_MESSAGE, PARTICIPANT_HELP_MESSAGE, ORGANIZER_HELP_MESSAGE } = require('./constants');

module.exports = (bot, db) => {
  ///start command
  bot.command('help').invoke(ctx => {
    const username = ctx.meta.user.username;
    fbFunc
      .checkIfusernameExists(db, username)
      .then(({ data, role }) => {
        const { chatID, name } = data;
        if (typeof chatID === 'number') {
          if (role === 'organiser') {
            return ctx.sendMessage(organiserHelpMessage, {parse_mode: 'Markdown'});
          } else if (role === 'participant') {
            return ctx.sendMessage(participantHelpMessage,{parse_mode: 'Markdown'});
          }
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

const organiserHelpMessage = ORGANIZER_HELP_MESSAGE;
const participantHelpMessage = PARTICIPANT_HELP_MESSAGE;
