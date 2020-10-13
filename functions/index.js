const functions = require('firebase-functions');

const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

exports.scheduledFunction = functions.pubsub.schedule('every 5 minutes').onRun((context) => {
    return db.collection('stock')
      .get().then(snapshot => {
        const promises = [];
        snapshot.forEach(doc => {
            const {margin, min, max, past, name} = doc.data();
            if(past.length > 4){
                past.shift();
            }
            const random = (Math.random() * (max - min) + min).toFixed(2);
            past.push(random);

            promises.push(doc.ref.update({
                margin, min, max, name, past 
          }));
        });
        return Promise.all(promises)
    })
    .catch(error => {
      console.log(error);
      return null;
    });
});