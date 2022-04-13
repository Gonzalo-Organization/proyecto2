require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const passport = require("./helpers/passport");
const session = require("express-session");

const connectToMongo = async () => {
  await mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
  });
  return mongoose;
};

connectToMongo().then(async (x) => {
  console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
});

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true,
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

hbs.registerPartials(__dirname + "/views/partials");

// default value for title local
app.locals.title = "Express - Generated with IronGenerator";

const index = require("./routes/index");
app.use("/", index);

const auth = require("./routes/auth");
app.use("/", auth);

const member = require("./routes/member");
app.use("/member", member);

const client = require("./routes/client");
app.use("/client", client);

const problem = require("./routes/problem");
app.use("/problem", problem);

const quote = require("./routes/quotes");
app.use("/quote", quote);

const message = require("./routes/messages");
app.use("/message", message);

module.exports = app;
