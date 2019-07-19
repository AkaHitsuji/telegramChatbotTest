var checkIfusernameExists = (db,username) => {
    return new Promise(function(resolve, reject) {
        let cityRef = db.collection('participants').doc(username);
        let getDoc = cityRef.get()
          .then(doc => {
            if (!doc.exists) {
              console.log('No such document!');
              resolve(false);
            } else {
              console.log('Document data:', doc.data());
              resolve(true);
            }
          })
          .catch(err => {
            console.log('Error getting document', err);
          });
        return getDoc;
    })

}

module.exports.checkIfusernameExists = checkIfusernameExists;
