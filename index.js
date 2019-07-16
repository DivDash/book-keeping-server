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

const app = express();
require('dotenv').config()
const PORT = process.env.PORT || 4000;

const mongoUrl = `mongodb+srv://${process.env.MONGO_USER}:${
  process.env.MONGO_PASS
}@cluster0-${process.env.CLUSTER_CODE}.mongodb.net/test?retryWrites=true&w=majority`;

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
app.use(cors());

// ROUTES
app.use("/bank", bank);
app.use("/cash", cash);
app.use("/journal-entries", journalEntry);
app.use("/entries", entryType); // Semantic change
app.use("/projects", project); // Semantic change
app.use("/non-profit", nonProfit); // New added
app.use("/user-management", user); // User

app.listen(PORT, hostname, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
