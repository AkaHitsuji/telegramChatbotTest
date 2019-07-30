const fbFunc = require('../firebaseFunctions');

const emote = (id) => {switch(id) {
  case 0:
    return '\u{1F947}';
  case 1:
    return '\u{1F948}';
  case 2:
    return '\u{1F949}';
  default:
    return '\u{1F538}';
  }
}
const constructLeaderboard = (leaderboard) => {
  console.log(leaderboard)
  const header = '*Leaderboard:* \n\n';
  const markdownLeaderboard = leaderboard.map((row, id) => {
    const {teamName, score} = row;
    return `${emote(id)}  ${id+1}.  *${teamName}*    ${score}\n`;
  });
  const mdLeaderboardString = markdownLeaderboard.join('');
  const res = header + mdLeaderboardString;
  return res;
};

module.exports = (bot, db, teleBot, leaderboard) => {
  bot.command('leaderboard')
  .invoke(function(ctx) {
    console.log('leaderboard')
    let username = ctx.meta.user.username;
    const data = fbFunc.checkIfusernameExists(db, username)
    .then(({data, role}) => {
        const {chatID, name} = data;
        console.log(data);
        console.log(typeof chatID);
        if (typeof chatID === 'number') {
            const message = constructLeaderboard(leaderboard)
            return teleBot.sendMessage(chatID, message, {parse_mode: "Markdown"});
        } else {
          return ctx.sendMessage('You are not registered. Use the command /start to continue');
        }
    }).catch((error) => {
      console.log(error);
      return ctx.sendMessage('Error occurred.');
    })
  })
}
