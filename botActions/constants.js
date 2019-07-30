module.exports.encouragement = id => {
  switch (id) {
    case 0:
      return 'Jiayou!';
    case 1:
      return 'You can do it!';
    case 2:
      return 'Hang in there!';
    case 3:
      return 'You got this!';
  }
};

module.exports.finalMoments = id => {
  switch (id) {
    case 0:
      return 'Hurry up!!!';
    case 1:
      return 'Submit now if you have not!';
    case 2:
      return 'The clock is ticking..';
    case 3:
      return "Calm down. There's no more time left";
  }
};

module.exports.encouragementGIF = id => {
  switch (id) {
    case 0:
      return 'https://media.giphy.com/media/l0G17RknJuOlxnFO8/giphy.gif';
    case 1:
      return 'https://media.giphy.com/media/a2SR6Ag8ChUlO/giphy.gif';
    case 2:
      return 'https://media.giphy.com/media/hsGo8cKagvvSE/giphy.gif';
    case 3:
      return 'https://media.giphy.com/media/fUwOs80ja3sTPpjndh/giphy.gif';
  }
};

module.exports.finalMomentsGIF = id => {
  switch (id) {
    case 0:
      return 'https://media.giphy.com/media/dADDOp0Vket1ncEwvT/giphy.gif';
    case 1:
      return 'https://media.giphy.com/media/9u514UZd57mRhnBCEk/giphy.gif';
    case 2:
      return 'https://media.giphy.com/media/fs6cqdfDPSHB0A6agc/giphy.gif';
    case 3:
      return 'https://media.giphy.com/media/5fBH6zodw7VMuR8uUnu/giphy.gif';
  }
};

module.exports.emote = id => {
  switch (id) {
    case 0:
      return '\u{1F947}';
    case 1:
      return '\u{1F948}';
    case 2:
      return '\u{1F949}';
    default:
      return '\u{1F538}';
  }
};

module.exports.notStarterError = name =>
  `Hello ${name}, you have not initialized me yet. Use the command /start to do so.`;
module.exports.ERROR_MESSAGE = 'An error occurred, please try again later.';