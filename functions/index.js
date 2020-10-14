const functions = require('firebase-functions');

const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
const cname = "stock"

exports.scheduledFunction = functions.pubsub.schedule('* * * * *').onRun((context) => {
    return db.collection(cname)
      .get().then(async (snapshot) => {
        const promises = [];
        snapshot.forEach(doc => {
            const {margin, min, max, past, name} = doc.data();

            const random = parseFloat((Math.random() * (max - min) + min).toFixed(2));
            past.push(random);

            if (past.length > 4) {
                past.shift()
            }
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

/////////////////////////////////////////////////////////////////////////////////
