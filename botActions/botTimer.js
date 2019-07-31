const fbFunc = require('../firebaseFunctions');
const Utils = require('./Utils')
const { notRegisteredError } = require('./constants');
const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
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
            ctx.sendMessage(Utils.parseTimeToString(timeLeft));
            return ctx.sendVideo(Utils.gifToSend(timeLeft));
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
