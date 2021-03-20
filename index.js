require('dotenv').config()
const express = require('express');
const logger = require('morgan');
const app = express();
const port = 8000
const mainRouter = require('./src/routes/index')
const cors = require('cors')
const http = require('http')
const server = http.createServer(app)
const socketio = require("socket.io")
const io = socketio(server).sockets
 
global.io = io

io.on("connection", (socket) => {
  const id = socket.handshake.query.user_id;
  console.log("a user connected ...",id, socket.id);
  socket.join(id);
  // socket.on("chat message", (msg, id_recipient) => {
  //   console.log(`=====================`)
  //   console.log('sender'+msg.sender);
  //   console.log('penerima '+id_recipient);
  //   console.log('id handshake'+id)
  //   console.log(msg)
  //   io.to(id_recipient).to(id).emit("chat message", msg);
  // });
  // socket.on('fromBuyer', msgEvent =>{
	//   socket.emit('fromBuyer',msgEvent);
  // });
  // socket.on('fromSeller', msgEvent =>{
	//   socket.emit('fromSeller',msgEvent);
  // });
});

server.listen(port, () => console.log("server running on port:" + port));

//memperbolehkan akses dari semua origin
app.use(express.static('public'))

//use cors
app.use(cors())

// tambah logger
app.use(logger("dev"))

// body-parser untuk x-www-form-urlencoded
app.use(express.urlencoded({
    extended: false
}))

// parser untuk raw json
app.use(express.json())

app.use('/', mainRouter)

module.exports = app