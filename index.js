const { db } = require("./server/db");
const app = require("./server");
const port = process.env.PORT || 3000; // this can be very useful if you deploy to Heroku!
// we should do this in the same place we've set up express-session

/* const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const dbStore = new SequelizeStore({ db: db });

// sync so that our session table gets created
dbStore.sync();

// Plug the store into our session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "a wildly insecure secret",
    store: dbStore,
    resave: false,
    saveUninitialized: false,
  })
); */

db.sync() // sync our database
  // if you update your db schemas, make sure you drop the tables first and then recreate them
  .then(function () {
    console.log("The database  is synced!");
    app.listen(
      port,
      function () {
        console.log(`Listen my port ${port}`);
      } // then start listening with our express server once we have synced
    );
  });
