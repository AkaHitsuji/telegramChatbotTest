const fbFunc = require('../firebaseFunctions.js');

//wrapper function to run sleep in array.map
const sleep = (ms) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
//wraps asynchronous sendMessage function so that we can use it in main body
const sendMessage = async (teleBot, ids, message) => {
  const idArray = ids.map(async id => {
    await sleep(300)
    console.log(id)
    return await teleBot.sendMessage(id, message)
  })
  return await Promise.all(idArray);
}

module.exports = (bot, db, teleBot) => {
  bot.command('broadcast')
  .invoke(function(ctx) {
    let username = ctx.meta.user.username;

    fbFunc.checkIfOrganiser(db, username).then(res => {
      if (res) return ctx.sendMessage(`Hello ${username}, please type your broadcast text.`)
      else {
        ctx.go('unauthorized')
      }
    })
  })
  .answer(function(ctx) {
    const message = ctx.data.answer;
    // console.log(ctx);
    // fbFunc.getParticipantList(db).then(res => {
    //   console.log(res);
    //   sendMessage(ctx, res, message);
    //
    // })
    return ctx.go('broadcast_forward')
  })

  bot.command('broadcast_forward')
  .invoke(function(ctx) {
    fbFunc.getParticipantList(db).then(res => {
      sendMessage(teleBot, res, ctx.message.text).then(res => ctx.sendMessage('Broadcast sent.'))
    })
  })

  bot.command('unauthorized')
  .invoke(function(ctx) {
    return ctx.sendMessage('You are unauthorized to do so.')
  })
}
