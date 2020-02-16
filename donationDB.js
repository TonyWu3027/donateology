//jshint esversion:8
const mongoose = require('mongoose');
const ts = require('time-stamp');
const weekday = require('weekday');
//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const cors = require('cors')

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());

// //mongodb
mongoose.connect('mongodb+srv://leo22:leo22@cluster0-o5tdp.mongodb.net/donationDB', {
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
//get request
app.get("/read/:caller", async (req, res) => {
  console.log(req.params)
  let result = await readFromDB(req.params.caller);
  res.json(result);
});
//post request
app.get('/update/sender/:sender/recipient/:recipient/amt/:amt/url/:url',async (req, res) => {
  console.log(req.params);
  let amount = parseInt(req.params.amt);
  await writeToDB(req.params.sender, req.params.recipient, amount, req.params.url);
  res.json({'msg':'success'});
});

var port = 5001
app.listen(port, function() {
  console.log(port);
});
