var express = require("express")
var mongoose = require("mongoose")
var bodyParser = require("body-parser")
const path = require('path');
var app = express()
var http = require("http").Server(app)
var io = require("socket.io")(http)
var conString = "mongodb://localhost:27017/chat5pts1";

// app.use(express.static(__dirname, 'ChatAngular6'));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '/src/index.html'));
// });
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))



var Chats = mongoose.model("Chats", {
  user: String,
  chat: String,
  ladate: String,
})

mongoose.connect(conString, (err) => {
  console.log("Database connection")
})


app.get("/chats", (req, res) => {
  Chats.find({}, (error, chats) => {
    // io.emit("chat", chats)
    res.send(chats)
  })
})

io.on("connection", (socket) => {
  console.log("Socket is connected...")

  socket.on('message',function(chat){

    io.in(chat).emit('new message', {message: chat});
    console.log('new message in socket')
  })

  app.post("/chats", (req, res) => {
    {
      console.log(' invoc post method')
      console.log('req==>',req.body)
      var chat = new Chats(req.body)
      chat.save()
      res.sendStatus(200)
      //Emit the event
      io.emit("chat")
      res.send(chat);
    }(error) => {
      res.sendStatus(500)
      console.error(error)
    }
  })



  socket.on('userjoin',function(dataUser){

    io.in(dataUser).emit('userjoin', {name: dataUser.user});
    console.log("new user join...")
  })

})

var server = http.listen(8200, () => {
  console.log(" I am listening on 8200")
})
