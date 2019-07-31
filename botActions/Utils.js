const {
    encouragement,
    finalMoments,
  } = require('./constants');

const getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
};

module.exports.parseTimeToString = t => {
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