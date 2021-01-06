// api/puppies.js
const router = require("express").Router();

// matches GET requests to /api/puppies/
router.get("/", function (req, res, next) {
  /* etc */
});
// matches POST requests to /api/puppies/
router.post("/", function (req, res, next) {
  /* etc */
});
// matches PUT requests to /api/puppies/:puppyId
router.put("/:puppyId", function (req, res, next) {
  /* etc */
});
// matches DELETE requests to /api/puppies/:puppyId
router.delete("/:puppyId", function (req, res, next) {
  /* etc */
});

// If someone makes a request that starts with `/api`,
// but you DON'T have a corresponding router, this piece of
// middleware will generate a 404, and send it to your
// error-handling endware!

router.use(function (req, res, next) {
  const err = new Error("Not found.");
  err.status = 404;
  next(err);
});

module.exports = router;
