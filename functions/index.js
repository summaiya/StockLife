const functions = require('firebase-functions');

const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

exports.scheduledFunction = functions.pubsub.schedule('* * * * *').onRun((context) => {
    return db.collection('stock')
      .get().then(snapshot => {
          if(snapshot.length===0){

          }
        const promises = [];
        snapshot.forEach(doc => {
            const {margin, min, max, past, name} = doc.data();
            if(past.length > 4){
                past.shift();
            }
            const random = parseInt((Math.random() * (max - min) + min).toFixed(1));
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

/////////////////////////////////////////////////////////////////////////////////
const _data_1 = ["MCDonalds", "PizzaHut", "KFC", "711", "Korean", "Star buck"]
const _data_2 = ["KTV", "Puma","H&M", "Pharmacy", "Nike"]
const _data_3 = ["Real Estate Standard", "Apple", "Microsoft", "Google", "Polo", "Gucci"]
const _data_4 = ["Real Estate Premium", "Energy", "Network"];

const saveData=()=>{

    db.collection("stock").add({
    name: "Anbu Selvan",
    email: "anbu.selvan@email.com",
    age: 25
})
}
const randomBetween= (min, max)=>parseInt((Math.random() * (max - min) + min).toFixed(1))

const genData =(dataArr, level)=>dataArr.map(e=>{
    const num = randomBetween(level*100 - 100 + 30, level*100-10);
    switch (level) {
        case 1:
            return {
        name: e,
        max: num,
        min: num-2,
        past:[],
        margin: 1000
        }
        case 2:
            return {
        name: e,
        max: num,
        min: num-4,
        past:[],
        margin: 1000
        }
         case 3:
            return {
        name: e,
        max: num,
        min: num-6,
        past:[],
        margin: 1000
        }
        case 4:
            return {
        name: e,
        max: num,
        min: num-10,
        past:[],
        margin: 1000
        }
    }
})
