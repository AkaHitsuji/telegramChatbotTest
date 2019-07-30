const leaderboardDummyOld = [
    {teamName: 'Vier', score: 4},
    {teamName: 'Drei', score: 3},
    {teamName: 'Zwei', score: 2},
    {teamName: 'Ein', score: 1},
]

const leaderboardDummy = [
  {teamName: 'Drei', score: 100},
  {teamName: 'Vier', score: 4},
  {teamName: 'Zwei', score: 2},
  {teamName: 'Ein', score: 1},
]

var leaderboardOld = leaderboardDummyOld;
var leaderboard = leaderboardDummy;
var differences = {};

const getDifferences = (leaderboard, leaderboardOld) => {

  // get team names
  let leaderboardTeams = leaderboard.map((row) => {
    return row.teamName;
  })

  const oldTeams = leaderboardOld.map((row) => {
    return row.teamName;
  })

  // compare team names
  leaderboardTeams = leaderboardTeams.map((row, index) => {
    const oldIndex = oldTeams.indexOf(row);
    return {teamName: row, diff: oldIndex - index, position: index+1}
  })

  return leaderboardTeams.filter(row => {
    return row.diff !== 0;
  })

}


module.exports.getDifferences = getDifferences;
module.exports.leaderboard = leaderboard;
module.exports.leaderboardDummy = leaderboardDummy;
module.exports.leaderboardDummyOld = leaderboardDummyOld;
