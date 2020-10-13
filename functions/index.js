// const functions = require('firebase-functions');

// const admin = require('firebase-admin');
// admin.initializeApp();
// const database = admin.firestore();


// exports.scheduledFunction = functions.pubsub.schedule('* * * * *').onRun((context) => {
//  return database.collection('stock').get().then(snapshot => {
//         const promises = [];
//         snapshot.forEach(doc => {
//           const {margin, max, min, name, past} = doc.data();
//           if(past.length > 3){
//             past.shift();
//           }
//           const random = (Math.random() * (max - min) + min).toFixed(1);
//           past.push(random);
//           promises.push(doc.ref.update({
//             margin, max, min, name, past
//           }));
//         });
//         return Promise.all(promises)
//     })
//     .catch(error => {
//       console.log(error);
//       return null;
//     });
// });
