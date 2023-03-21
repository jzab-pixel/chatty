/**
 *  AUTHOR: Joanna Zabasajja
    COURSE: CSc 337 | Spring 2023 | Dicken
    FILENAME: server.js | PA5
    DESCRIPTION: This js file controls the functions that handle server side requests.
 */
const express = require('express');
const parser = require('body-parser')
const fs = require('fs');
const mongoose = require('mongoose');
const app = express();

const connectionString = 'mongodb://127.0.0.1/chatty';
mongoose.connect(connectionString, {useNewUrlParser: true});
mongoose.connection.on('error', () => {
  console.log('There was a problem connecting to mongoDB');
});

var chatSchema = new mongoose.Schema({
  time: Number,
  alias: String,
  message: String
});
var chat = mongoose.model('chat', chatSchema);

app.use(parser.text({type: '*/*'}) );
app.use(express.static('public_html'))

//get request
app.get('/chats', (req, res) => {
  let p1 = chat.find({}).exec();
  p1.then((results) => {
    var dict = {};
    for (i in results){
      dict[results[i].time] = results[i].alias + '@' + results[i].message;
    }
    string = "";
    var keys = Object.keys(dict);
    keys.sort();

    for (var i = 0; i < keys.length; i++){
      let key = keys[i];
      let val = dict[key];
      let arr = val.split("@");
      let name = arr[0];
      let message = arr[1];
      string += name + ": " + message + "\n";
    }
    res.end(string);
  });
  p1.catch((error) => {
    console.log(error);
    res.end("FAILED --apps.get | server.js");
  });
});

//post request
app.post('/chats/post/:alias/:message', (req, res) => {
  res.end('HELLO 2');
  let t = Date.now();
  let a = req.params.alias;
  let m = req.params.message;
  var newChat = new chat({
    time: t,
    alias: a,
    message: m
  });
  let p1 = newChat.save();
  p1.then((doc) => {
    console.log('here');
    res.end('saved succesfully');
  });
  p1.catch((err) => {
    console.log('something went wrong --app.post | server.js');
  });
});

const port = 80;
app.listen(port, () => {
  console.log('server has started!');
});