const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const PORT = process.env.PORT || 3000;

const app = express();
let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/memes"

app.use(express.static("public"));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(session({
    secret: "youtubecommentsaren'tthatbad",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({mongooseConnection: mongoose.connection}),
}));

const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

mongoose.connect(MONGODB_URI, {useNewUrlParser: true , useUnifiedTopology: true });

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, () => {
    console.log("Listening in on " + PORT);
});
