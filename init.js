const TelegramBot = require('node-telegram-bot-api');
const bb = require('bot-brother');
const firebase = require('firebase-admin');

const config = require('./config/config.json');
const serviceAccount = require('./config/serviceAccountKey.json');

const { apikey, databaseURL } = config;
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseAuthVariableOverride: { uid: 'admin' },
  databaseURL
});

module.exports.db = firebase.firestore();

module.exports.bot = bb({
  key: apikey,
  sessionManager: bb.sessionManager.memory(),
  polling: { interval: 0, timeout: 1 }
});

// telebot used for functions not available on bot-brother e.g. sending messages to other chats
module.exports.teleBot = new TelegramBot(apikey, { polling: false });
