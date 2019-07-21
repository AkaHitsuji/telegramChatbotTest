const serviceAccount = require('./config/serviceAccountKey.json');
const firebase = require('firebase-admin');

module.exports.checkIfusernameExists = (db,username) => {
    return new Promise((resolve, reject) => {
        let cityRef = db.collection('participants').doc(username);
        let getDoc = cityRef.get()
          .then(doc => {
            if (!doc.exists) {
              console.log('No such document!');
              resolve(null);
            } else {
              console.log('Document data:', doc.data());
              resolve(doc.data());
            }
          })
          .catch(err => {
            console.log('Error getting document', err);
          });
        return getDoc;
    })

}

module.exports.addIdToDatabase = (db, name, charID) => {
  return new Promise((resolve, reject) => {
    let cityRef = db.collection('participants').doc(name);

    return cityRef.update({
      chatID: charID
    }).then(() => resolve(true))
    .catch((err) => {
      console.log(err)
      resolve(false)
    });

  })
}
