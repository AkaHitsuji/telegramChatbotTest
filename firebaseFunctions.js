var checkIfusernameExists = (db,username) => {
    let cityRef = db.collection('participants').doc(username);
    let getDoc = cityRef.get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          console.log('Document data:', doc.data());
        }
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
    return getDoc;
}

module.exports.checkIfusernameExists = checkIfusernameExists;
