const fbFunc = require('../firebaseFunctions');
const { emote, notStartedError, ERROR_MESSAGE } = require('./constants');

const constructLeaderboard = leaderboard => {
  console.log(leaderboard);
  const header = '*Leaderboard:* \n\n';
  const markdownLeaderboard = leaderboard.map((row, id) => {
    const { teamName, score } = row;
    return `${emote(id)}  ${id + 1}.  *${teamName}*    ${score}\n`;
  });
  const mdLeaderboardString = markdownLeaderboard.join('');
  const res = header + mdLeaderboardString;
  return res;
};

module.exports = (bot, db, teleBot, leaderboard) => {
  bot.command('leaderboard').invoke(ctx => {
    let username = ctx.meta.user.username;
    fbFunc
      .checkIfusernameExists(db, username)
      .then(({ data }) => {
        console.log('retrieved leaderboard');
        const { chatID, name } = data;
        if (typeof chatID === 'number') {
          const message = constructLeaderboard(leaderboard);
          return teleBot.sendMessage(chatID, message, {
            parse_mode: 'Markdown'
          });
        } else {
          return ctx.sendMessage(notStartedError(name));
        }
      })
      .catch(error => {
        console.log(error);
        return ctx.sendMessage(ERROR_MESSAGE);
      });
  });
};
