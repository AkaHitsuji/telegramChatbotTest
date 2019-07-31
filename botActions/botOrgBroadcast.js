const fbFunc = require('../firebaseFunctions');
const Utils = require('./Utils');
const { notStartedError, AUTHORIZATION_ERROR_MESSAGE } = require('./constants');
const totalCompTime = 86400000;

//wrapper function to run sleep in array.map
const sleep = ms => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};
//wraps asynchronous sendMessage function so that we can use it in main body
const sendMessage = async (teleBot, ids, message) => {
  const idArray = ids.map(async id => {
    const { mute, chatID } = id;
    await sleep(300);
    return await teleBot.sendMessage(chatID, message, {
      disable_notification: mute
    });
  });
  return await Promise.all(idArray);
};

module.exports = (bot, db, teleBot) => {
  bot.command('broadcast').invoke(function(ctx) {
      let username = ctx.meta.user.username;
      fbFunc.checkIfOrganiser(db, username).then(res => {
        if (res)
          return ctx.sendMessage(
            `Hello ${username}, please type your broadcast text.`
          );
        else {
          ctx.go('unauthorized');
        }
      });
    })
    .answer(function(ctx) {
      const message = ctx.data.answer;
      // cannot send message to multiple people on answer, hence we redirect to another command
      return ctx.go('broadcast_forward');
    });

  // the command that invokes the function to send messages to multiple people
  bot.command('broadcast_forward').invoke(function(ctx) {
    fbFunc.getParticipantList(db).then(res => {
      sendMessage(teleBot, res, ctx.message.text).then(() =>
        ctx.sendMessage('Broadcast sent.')
      );
    });
  });

  // the command for organizers that invokes the function to send time left to participants
  bot.command('broadcast_timeleft').invoke(function(ctx) {
    const username = ctx.meta.user.username;
    fbFunc
      .checkIfusernameExists(db, username)
      .then(({data, role}) => {
        const { chatID, name } = data;
        if (typeof chatID === 'number') {
          if (role === 'organiser') {
            const currTime = Math.floor(Date.now());
            fbFunc.getStartTime(db).then(startTime => {
              const timeLeft = totalCompTime - (currTime - startTime);
              fbFunc
                .getParticipantList(db)
                .then(participantList => {
                  console.log(participantList);
                  sendMessage(teleBot, participantList, Utils.parseTimeToString(timeLeft))
                  //return ctx.sendVideo(Utils.gifToSend(timeLeft));
                })
            });
          } else if (role === 'participant') {
            return ctx.sendMessage(AUTHORIZATION_ERROR_MESSAGE);
          }
        } else {
          return ctx.sendMessage(notStartedError(name));
        }
      })
  });
};
