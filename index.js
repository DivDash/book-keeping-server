// BookKeeping MEAN app Server
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const hostname = "localhost";
const passport = require('passport');
const { bank } = require("./Bank_Account/routes");
const { journalEntry } = require("./Journal_Entries/routes");
const { cash } = require("./Cash_Account/routes");
const { entryType } = require("./Add_Entry_Type/routes");
const { project } = require("./Add_Projects/routes");
const { user } = require("./User/user");
const { nonProfit } = require("./Add_NonProfit/routes");
const http = require("http");
const { commonEmitter } = require('./events')

const app = express();
require('dotenv').config()
const PORT = process.env.PORT || 4000;

const mongoUrl = "mongodb+srv://admin:admin123@cluster0-byhyw.mongodb.net/test?retryWrites=true&w=majority"






mongoose.connect(mongoUrl, { useNewUrlParser: true });

const connection = mongoose.connection;

connection
  .once("open", () => console.log("MongoDb Connected"))
  .on("error", error => console.warn("Warning", error));

// Middlewares
app.use(bodyParser.json());
app.use(passport.initialize())
require("./config/passport")(passport);
app.use(morgan("tiny"));
app.use(cors({
  origin: '*'
}));
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.header('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', false);

  // Pass to next layer of middleware
  next();
});

// ROUTES
app.use("/bank", bank);
app.use("/cash", cash);
app.use("/journal-entries", journalEntry);
app.use("/entries", entryType); // Semantic change
app.use("/projects", project); // Semantic change
app.use("/non-profit", nonProfit); // New added
app.use("/user-management", user); // User

const server = http.createServer(app).listen(PORT, hostname, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
const socket = require('socket.io')
const io = socket.listen(server, {
  log: false,
  agent: false,
  origins: '*:*',
  transports: ['websocket', 'htmlfile', 'xhr-polling', 'jsonp-polling', 'polling']
});






io.on('connection', (socket)=>{
  commonEmitter.on('newData', function (data) {
    socket.broadcast.emit('newData', data)
  });
  console.log('Listener connected');
})

