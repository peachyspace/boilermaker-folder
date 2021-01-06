const express = require("express");
const path = require("path");
const { User } = require("./db");
const morgan = require("morgan");

const bodyParser = require("body-parser");
const app = express();

const session = require("express-session");
const passport = require("passport");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const { db } = require("./db/index");
const dbStore = new SequelizeStore({ db });

if (process.env.NODE_ENV !== "production") require("../secrets");
// passport registration
passport.serializeUser((user, done) => {
  try {
    console.log("gjgkjrttttt");
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    console.log("user: ");
    done(null, user);
  } catch (err) {
    done(err);
  }
});

//logging middleware.....
app.use(morgan("dev"));

//body parsering middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// sync so that our session table gets created
dbStore.sync();

// plug the store into our session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "a wildly insecure secret",
    store: dbStore,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
// establishes `req.user` for any middleware that runs after it
app.use(passport.session());

// auth and api routes
app.use("/auth", require("./auth")); // matches all requests made to /auth
app.use("/api", require("./api")); // matches all requests to /api

// you'll of course want static middleware so your browser can request things like your 'bundle.js'
///////////PUBLIC PATH
app.use(express.static(path.join(__dirname, "../public")));
// Any routes or other various middlewares should go here!

// Make sure this is right at the end of your server logic!
// The only thing after this might be a piece of middleware to serve up 500 errors for server problems
// (However, if you have middleware to serve up 404s, that go would before this as well)
///////////////PUBLIC PATH
app.get("*", function (req, res, next) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
}); // Send index.html for any other requests

// error handling middleware
app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

module.exports = app;
