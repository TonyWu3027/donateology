//jshint esversion:8
const mongoose = require('mongoose');
const ts = require('time-stamp');
const weekday = require('weekday');




// //mongodb
mongoose.connect('YOUR_ENDPOINT/DBNAME', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


let donationSchema = new mongoose.Schema({
  senderAccount: String,
  totalDonation: Number,
  donations: [{
    amount: Number,
    timeStamp: String,
    recipientAccount: String,
    url: String
  }]

});
//set the name of the collection in portfolioDB=> "visitors"
let donateModel = mongoose.model('donators', donationSchema);

//WRITE TO DB
const writeToDB = async (senderAccount, recipientAccount, amount, url) => {
  let res = await donateModel.findOne({
    senderAccount: senderAccount
  });
  if (res == null) {
    //create new one if not found
    const document = new donateModel({
      senderAccount: senderAccount,
      totalDonation: amount,
      donations: [{
        amount: amount,
        timeStamp: ts(`YYYY/MM/DD(${weekday()}) HH:mm`),
        recipientAccount: recipientAccount,
        url: url
      }]
    });
    let res1 = await document.save();

    if (res1) {
      console.log("created!");
      return Promise.resolve(true);
    } else {
      return Promise.reject(false);
    }
  } else {
    //update if found
    let update = {
      $set: {
        totalDonation: res.totalDonation + amount
      },
      $push: {
        donations: {
          amount: amount,
          timeStamp: ts(`YYYY/MM/DD(${weekday()}) HH:mm`),
          recipientAccount: recipientAccount,
          url: url
        }
      }
    };
    let res2 = await res.updateOne(update);
    console.log("ERR2", res2);
    if (res2) {
      console.log("updated!");
      return Promise.resolve(true);
    } else {
      return Promise.reject(false);
    }
  }
};

//READ FROM DB
const readFromDB = async (senderAccount) => {
  let res = await donateModel.findOne({
    senderAccount: senderAccount
  });
  if (res) {
    return Promise.resolve(res);
  } else {
    return Promise.reject("no data exist");
  }
}


//test
(async () => {
  //CREATE WRITE TO DB
  let one = await writeToDB("senderAccount17", "recipientAccount2", 15, "url");
  console.log("ONE", one);
  if (one) {
    let two = await writeToDB("senderAccount17", "recipientAccount2", 100, "newUrl");
    if (two) {
      console.log("DONE!");
    }
  }
  //READ FROM MONGO DB
  let res = await readFromDB("senderAccount16");
  console.log(res);
  mongoose.connection.close();
})();