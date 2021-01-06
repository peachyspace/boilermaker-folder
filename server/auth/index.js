const router = require("express").Router();
const { User } = require("../db");

module.exports = router;

router.put("/login", async (req, res, next) => {
  try {
    console.log(req.body.email);

    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      console.log("user not found: ", req.body.email);
      res.status(401).send("User not found");
    } else if (!user.correctPassword(req.body.password)) {
      console.log("Incorrect password for user:", req.body.email);
      res.status(401).send("Wrong username and/or password");
    } else {
      // attach user id to the session
      //req.session.userId = user.id;
      req.login(user, (err) => (err ? next(err) : res.json(user)));
      //console.log("req.session.userId: ", req.session.userId);
      //res.json(user);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    req.login(user, (err) => (err ? next(err) : res.json(user)));
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

/* router.get("/me", async (req, res, next) => {
  try {
    if (!req.session.userId) {
      if (req.user) {
        res.json(req.user);
      } else {
        res.sendStatus(401);
      }
    } else {
      const user = await User.findByPk(req.session.userId);
      console.log("req.user: ", req.user);
      if (!user) {
        res.sendStatus(401);
      } else {
        res.json(user);
      }
    }
  } catch (error) {
    next(error);
  }
}); */

router.get("/me", (req, res, next) => {
  console.log("req.user: ", req.user);
  res.json(req.user);
});

router.use("/google", require("./google"));
