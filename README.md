# telegramChatbotTest
test for telegram chatbot implementation

# References
https://firebase.google.com/docs/firestore/query-data/get-data
https://github.com/hosein2398/node-telegram-bot-api-tutorial#User
https://core.telegram.org/bots/api
https://github.com/SerjoPepper/bot-brother

# Telegram Commands
## Organiser

| Command  | Description |
| ------------- | ------------- |
| ~~/start~~ | ~~init conversation and map chatID to organiser~~  |
| /help  | instructions for organiser, list of commands available  |
| ~~/broadcast message~~  | ~~send message to all. text followed by command contains the message to be sent~~  |
| /stats teamName  | retrieve statistics for team. text followed by command contains the team name to be retrieved  |
| /leaderboard  | View competition leaderboard  |

## Participant

| Command  | Description |
| ------------- | ------------- |
| ~~/start~~  | ~~welcome message + map chatID to participant + gateway to turn away non-participants~~  |
| /help  | instructions for participants, list of commands available  |
| /timeleft  | time left for competition  |
| /mute  | disable push notifications  |
| /leaderboard  | retrieve competition leaderboard  |
| /stats  | retrieve team statistics (eg. position, number of submissions etc.)  |
| /feedback  | trigger feedback form after competition is over  |
| ~~/stop~~ | ~~Removes chatID of participant from database, so that they does not get updates at all~~ |
