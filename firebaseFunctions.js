const ORGANISERS = 'organisers';
const PARTICIPANTS = 'participants';
const TIMESTAMPS = 'timestamps';

module.exports.checkIfusernameExists = async (db, username) => {
  const participantRef = db.collection(PARTICIPANTS).doc(username);
  let getDoc = await participantRef.get();
  if (!getDoc.exists) {
    // check if user is organiser
    const orgRef = db.collection(ORGANISERS).doc(username);
    let orgDoc = await orgRef.get();
    if (!orgDoc.exists) {
      return null;
    } else {
      const data = orgDoc.data();

      return { data, role: 'organiser' };
    }
  } else {
    const data = getDoc.data();
    return { data, role: 'participant' };
  }
};

module.exports.addIdToDatabase = async (db, name, role, charID) => {
  let docRef = db.collection(`${role}s`).doc(name);
  try {
    let updated = await docRef.update({ chatID: charID });
    return updated;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports.checkIfOrganiser = async (db, username) => {
  const orgRef = db.collection(ORGANISERS).doc(username);
  let orgDoc = await orgRef.get();
  if (!orgDoc.exists) {
    return false;
  } else {
    return true;
  }
};

module.exports.getParticipantList = async db => {
  const partRef = db.collection(PARTICIPANTS);
  try {
    let allDocs = await partRef.get();
    let res = [];
    allDocs.forEach(doc => {
      let indivDoc = doc.data();
      if (indivDoc.chatID !== '') {
        res.push(indivDoc);
      }
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

module.exports.removeChatID = async (db, username) => {
  const partRef = db.collection(PARTICIPANTS).doc(username);
  try {
    let updated = await partRef.update({ chatID: '' });
    return updated;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports.muteHandler = async (db, username, isMute) => {
  const partRef = db.collection(PARTICIPANTS).doc(username);
  try {
    const partDoc = await partRef.get();
    const muteStatus = partDoc.data().mute;
    const muteText = isMute ? 'muted' : 'unmuted';
    if (muteStatus !== isMute) {
      await partRef.update({ mute: isMute });
      return `You have ${muteText} me.`;
    } else {
      return `You have already ${muteText} me.`;
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.addStartTime = async (db, epochStartTime, username) => {
  const docRef = db.collection('timestamps').doc('compStartTime');
  try {
    const updated = await docRef.update({
      startTime: epochStartTime,
      setter: username
    });
    return updated;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports.getStartTime = async db => {
  const docRef = db.collection(TIMESTAMPS).doc('compStartTime');
  try {
    const timeDoc = await docRef.get();
    const startTime = timeDoc.data().startTime;
    return startTime;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports.getStartTimeAndSetter = async db => {
  const docRef = db.collection(TIMESTAMPS).doc('compStartTime');
  try {
    const timeDoc = await docRef.get();
    const data = timeDoc.data();
    console.log(data);
    const startTime = data.startTime;
    const setter = data.setter;
    return { startTime, setter };
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports.getTeamMembers = async (db, team) => {
  const partRef = db.collection(PARTICIPANTS).where('team', '==', team);
  try {
    const allDocs = await partRef.get();
    const res = [];
    allDocs.forEach(doc => {
      const indivDoc = doc.data();
      if (indivDoc.chatID !== '') {
        res.push(indivDoc);
      }
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
