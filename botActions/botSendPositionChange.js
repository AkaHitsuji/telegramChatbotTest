const fbFunc = require('../firebaseFunctions');

const generateMessage = ({teamName, diff, position}) => {
  console.log(diff, teamName);
  const team_s = (Math.abs(diff) > 1) ? 'teams' : 'team';
  if (diff > 0) {
    return `You have overtaken ${diff} ${team_s}. You're now in ${position} position!`;
  }
  else if (diff < 0) {
    return `You have been overtaken by ${Math.abs(diff)} ${team_s}. You're now in ${position} position...`;
  }
  else return null;
}

const sendMessage = async (teleBot, teamMembers, message) => {
  const teams = teamMembers.map(async team => {
    const {mute, chatID} = team
    return await teleBot.sendMessage(chatID, message, {disable_notification: mute})
  })
  return await Promise.all(teams);
}

module.exports = (db, teleBot, differences) => {
  differences.forEach((difference) => {
    const message = generateMessage(difference);
    fbFunc.getTeamMembers(db, difference.teamName).then((teamMembers) => {
      return sendMessage(teleBot, teamMembers, message);
      // teamMembers.forEach((member) => {
      //   teleBot.sendMessage(member.chatID, message, {disable_notification: member.mute})
      // })
    })

  })

}
