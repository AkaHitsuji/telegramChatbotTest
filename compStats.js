const leaderboardDummy = [
    {teamName: 'Ein', score: 1},
    {teamName: 'Zwei', score: 2},
    {teamName: 'Drei', score: 3},
    {teamName: 'Fier', score: 4},
]

const INTERVAL = 3000 // 30 seconds
var leaderboardOld = leaderboardDummy;
var leaderboard = leaderboardDummy;

setInterval(function(){
  leaderboardOld = leaderboard
  leaderboard = leaderboardDummy;
  console.log(leaderboardDummy)
}, INTERVAL)

module.exports.leaderboard = leaderboard;
