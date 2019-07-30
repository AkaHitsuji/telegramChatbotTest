const serviceAccount = require('./config/serviceAccountKey.json');
const firebase = require('firebase-admin');

module.exports.checkIfusernameExists = async (db,username) => {
    const participantRef = db.collection('participants').doc(username);
    let getDoc = await participantRef.get()
    if (!getDoc.exists) {
      // check if user is organiser
      const orgRef = db.collection('organisers').doc(username);
      let orgDoc = await orgRef.get();
      if (!orgDoc.exists) {
        return null;
      } else {
        const data = orgDoc.data();

        return {data, role:'organiser'};
      }
    } else {
      const data = getDoc.data();
      return {data, role: 'participant'};
    }
}


module.exports.addIdToDatabase = async (db, name, role, charID) => {
  let docRef = db.collection(`${role}s`).doc(name);
  try {
    let updated = await docRef.update({chatID: charID});
    return updated;
  } catch(err) {
    console.log(err);
    return err;
  }

}

module.exports.checkIfOrganiser = async (db, username) => {
  const orgRef = db.collection('organisers').doc(username);
  let orgDoc = await orgRef.get();
  if (!orgDoc.exists) {
    return false;
  } else {
    return true;
  }
}

module.exports.getParticipantList = async (db) => {
  const partRef = db.collection('participants')
  try {
    let allDocs = await partRef.get();
    let res = []
    allDocs.forEach((doc) => {
      let indivDoc = doc.data()
      if (indivDoc.chatID !== '') {
        res.push(indivDoc)
      }
    })
    return res
  } catch (err) {
    console.log(err)
  }
}

module.exports.removeChatID = async (db, username) => {
  const partRef = db.collection('participants').doc(username);
  try {
    let updated = await partRef.update({chatID: ''});
    return updated;
  } catch(err) {
    console.log(err);
    return err;
  }
}

module.exports.muteHandler = async (db, username, isMute) => {
  const partRef = db.collection('participants').doc(username);
  try {
    let partDoc = await partRef.get();
    const muteStatus = partDoc.data().mute;
    if (muteStatus !== isMute) {
      let updated = await partRef.update({mute: isMute})
      return 'updated mute status'
    } else {
      return `Your mute status is already ${isMute}.`
    }
  } catch (err) {
    console.log(err)
  }
}

module.exports.getTeamMembers = async (db, team) => {
  const partRef = db.collection('participants').where("team", "==", team)
  try {
    let allDocs = await partRef.get();
    let res = []
    allDocs.forEach((doc) => {
      let indivDoc = doc.data()
      if (indivDoc.chatID !== '') {
        res.push(indivDoc)
      }
    })
    return res
  } catch (err) {
    console.log(err)
  }
}
