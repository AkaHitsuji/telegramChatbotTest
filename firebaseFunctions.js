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
    // return new Promise((resolve, reject) => {
    //     const participantRef = db.collection('participants').doc(username);
    //     const getDoc = participantRef.get()
    //       .then(doc => {
    //         if (!doc.exists) {
    //           //check if user is organiser
    //           let orgRef = db.collection('organisers').doc(username);
    //           const orgDoc = orgRef.get()
    //           .then( doc => {
  //                if (!doc.exists)
  //              })
    //
    //           console.log('No such document!');
    //           resolve(null);
    //         } else {
    //           console.log('Document data:', doc.data());
    //           resolve(doc.data());
    //         }
    //       })
    //       .catch(err => {
    //         console.log('Error getting document', err);
    //       });
    //     return getDoc;
    // })

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

  // return new Promise((resolve, reject) => {
  //   let cityRef = db.collection(role).doc(name);
  //
  //   return cityRef.update({
  //     chatID: charID
  //   }).then(() => resolve(true))
  //   .catch((err) => {
  //     console.log(err)
  //     resolve(false)
  //   });
  //
  // })
}
