//jshint esversion:8
const mongoose = require('mongoose');
const ts = require('time-stamp');
const weekday = require('weekday');




// //mongodb
mongoose.connect('YOUR_ENDPOINT/DBNAME', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


let supplySchema = new mongoose.Schema({
  senderAccount: String,
  recipientAccount: String,
  type: String,
  quantity: Number,
  timeStamp: String
});
//set the name of the collection in portfolioDB=> "visitors"
let supplyModel = mongoose.model('suppliers', supplySchema);

//WRITE TO DB
const writeToDB = async (senderAccount, recipientAccount, type, quantity) => {

  //create new one if not found
  const document = new supplyModel({
    senderAccount: senderAccount,
    recipientAccount: recipientAccount,
    type: type,
    quantity: quantity,
    timeStamp: ts(`YYYY/MM/DD(${weekday()}) HH:mm`)
  });

  let res1 = await document.save();
  if (res1) {
    console.log("created!");
    return Promise.resolve(true);
  } else {
    return Promise.reject(false);
  }
};

//READ FROM DB
const readFromDB = async (senderAccount) => {
  let res = await supplyModel.findOne({
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
  let one = await writeToDB("senderAccount17", "recipientAccount2", "mask", 100);
  let two = await writeToDB("senderAccount17", "recipientAccount2", "water", 200);
  //READ FROM MONGO DB
  let res = await readFromDB("senderAccount17");
  console.log(res);
  mongoose.connection.close();
})();