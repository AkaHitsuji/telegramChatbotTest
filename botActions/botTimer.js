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
    const hours = parseInt(t / 3600);
    t = t - hours * 3600;
    const minutes = parseInt(t / 60);
    t = t - minutes * 60;
    const seconds = t;
    if (hours > 0) {
      parsedString = `You have ${hours}hours, ${minutes}minutes, ${seconds}seconds left! `;
      parsedString += encouragement(getRandomInt(4));
    } else {
      parsedString = `There are ${minutes}minutes, ${seconds}seconds left! `;
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
    const hours = parseInt(t / 3600);
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
  bot.command('startTimer').invoke(function(ctx) {
    let username = ctx.meta.user.username;
    let charID = ctx.meta.user.id;
    const data = fbFunc
      .checkIfusernameExists(db, username)
      .then(({ data, role }) => {
        const { chatID, name } = data;
        if (typeof chatID === 'number') {
          if (role === 'organiser') {
            let currTime = Math.floor(Date.now() / 1000);
            fbFunc
              .addStartTime(db, currTime)
              .then(msg => {
                return ctx.sendMessage('Start time has been updated.');
              })
              .catch(err => {
                console.log(err);
                return ctx.sendMessage(
                  'An error occurred, please try again later.'
                );
              });
          } else if (role === 'participant') {
            return ctx.sendMessage(errorMessage);
          }
        } else {
          return ctx.sendMessage(NOT_REGISTERED_ERROR);
        }
      })
      .catch(error => {
        console.log(error);
        ctx.sendMessage('Error occurred.');
      });
  });

  bot.command('timeLeft').invoke(function(ctx) {
    let username = ctx.meta.user.username;
    let charID = ctx.meta.user.id;
    const data = fbFunc
      .checkIfusernameExists(db, username)
      .then(({ data, role }) => {
        const { chatID, name } = data;
        if (typeof chatID === 'number') {
          let currTime = Math.floor(Date.now() / 1000);
          fbFunc.getStartTime(db).then(startTime => {
            let timeLeft = totalCompTime - (currTime - startTime);
            ctx.sendMessage(parseTimeToString(timeLeft));
            return ctx.sendVideo(gifToSend(timeLeft));
          });
        } else {
          return ctx.sendMessage(
            `Hello ${name}, you have not been registered yet. Use the command /start to register.`
          );
        }
      })
      .catch(error => {
        console.log(error);
        ctx.sendMessage('Error occurred.');
      });
  });
};

const errorMessage = 'This function does not exist for this user.';
// 24 hours in seconds
const totalCompTime = 86400;
