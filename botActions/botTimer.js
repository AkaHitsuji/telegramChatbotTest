const fbFunc = require('../firebaseFunctions');
const {
  encouragement,
  finalMoments,
  encouragementGIF,
  finalMomentsGif,
  notRegisteredError
} = require('./constants');

const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
};

const parseTimeToString = t => {
  let parsedString = '';
  if (t > 0) {
    const hours = parseInt(t / 3600000);
    t = t - hours * 3600000;
    const minutes = parseInt(t / 60000);
    t = t - minutes * 60000;
    const seconds = parseInt(t / 1000);
    if (hours > 0) {
      parsedString = `You have ${hours} hours, ${minutes} minutes, ${seconds} seconds left! `;
      parsedString += encouragement(getRandomInt(4));
    } else {
      parsedString = `There are ${minutes} minutes, ${seconds} seconds left! `;
      parsedString += finalMoments(getRandomInt(4));
    }
  } else {
    parsedString = 'The competition is over! Thank you for participating :)';
  }
  return parsedString;
};

const gifToSend = t => {
  let gifString = '';
  if (t > 0) {
    const hours = parseInt(t / 3600000);
    if (hours > 0) {
      gifString = encouragementGIF(getRandomInt(4));
    } else {
      gifString = finalMomentsGif(getRandomInt(4));
    }
  } else {
    gifString = 'https://media.giphy.com/media/3o7qDEq2bMbcbPRQ2c/giphy.gif';
  }
  return gifString;
};

module.exports = (bot, db) => {
  bot.command('starttimer').invoke(ctx => {
    const username = ctx.meta.user.username;
    fbFunc
      .checkIfusernameExists(db, username)
      .then(({ data, role }) => {
        const { chatID, name } = data;
        if (typeof chatID === 'number') {
          if (role === 'organiser') {
            fbFunc.getStartTimeAndSetter(db).then(({ startTime, setter }) => {
              if (setter.length > 0) {
                const date = new Date(startTime);
                return ctx.sendMessage(
                  `Failed to start time. Start time has already been set by @${setter} to be at ${date.toString()}.`
                );
              } else {
                const currTime = Math.floor(Date.now());
                fbFunc
                  .addStartTime(db, currTime, username)
                  .then(_ => {
                    const date = new Date(currTime);
                    return ctx.sendMessage(
                      `Start time has been set to ${date.toString()}.`
                    );
                  })
                  .catch(err => {
                    console.log(err);
                    return ctx.sendMessage(
                      'An error occurred, please try again later.'
                    );
                  });
              }
            });
          } else if (role === 'participant') {
            return ctx.sendMessage(errorMessage);
          }
        } else {
          return ctx.sendMessage(notRegisteredError(name));
        }
      })
      .catch(error => {
        console.log(error);
        ctx.sendMessage('Error occurred.');
      });
  });

  bot.command('removestarttime').invoke(ctx => {
    const username = ctx.meta.user.username;
    fbFunc
      .checkIfusernameExists(db, username)
      .then(({ data, role }) => {
        const { chatID, name } = data;
        if (typeof chatID === 'number') {
          if (role === 'organiser') {
            fbFunc.removeStartTime(db, username).then(setter => {
              if (setter.length === 0) {
                return ctx.sendMessage('Start time removed.');
              } else {
                return ctx.sendMessage(
                  `Failed to remove start time. @${setter} set the time. Approach him/her to do this.`
                );
              }
            });
          } else if (role === 'participant') {
            return ctx.sendMessage(errorMessage);
          }
        } else {
          return ctx.sendMessage(notRegisteredError(name));
        }
      })
      .catch(error => {
        console.log(error);
        ctx.sendMessage('Error occurred.');
      });
  });

  bot.command('timeleft').invoke(ctx => {
    const username = ctx.meta.user.username;
    fbFunc
      .checkIfusernameExists(db, username)
      .then(({ data }) => {
        const { chatID, name } = data;
        if (typeof chatID === 'number') {
          const currTime = Math.floor(Date.now());
          fbFunc.getStartTime(db).then(startTime => {
            const timeLeft = totalCompTime - (currTime - startTime);
            ctx.sendMessage(parseTimeToString(timeLeft));
            return ctx.sendVideo(gifToSend(timeLeft));
          });
        } else {
          return ctx.sendMessage(notRegisteredError(name));
        }
      })
      .catch(error => {
        console.log(error);
        ctx.sendMessage('Error occurred.');
      });
  });

  bot.command('checkstarttime').invoke(ctx => {
    const username = ctx.meta.user.username;
    fbFunc
      .checkIfusernameExists(db, username)
      .then(({ data }) => {
        const { chatID, name } = data;
        if (typeof chatID === 'number') {
          fbFunc.getStartTime(db).then(startTime => {
            const date = new Date(startTime);
            return ctx.sendMessage(
              `The competition started at ${date.toString()}.`
            );
          });
        } else {
          return ctx.sendMessage(notRegisteredError(name));
        }
      })
      .catch(error => {
        console.log(error);
        ctx.sendMessage('Error occurred.');
      });
  });
};

const errorMessage = 'This function does not exist for this user.';
// 24 hours in milliseconds
const totalCompTime = 86400000;
