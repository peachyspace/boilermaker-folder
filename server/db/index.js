// The purpose of this module is to bring your Sequelize instance (`db`) together
// with your models, for which you'll find some blank files in this directory:

const db = require("./database");
const User = require("./user");
const Puppy = require("./puppy");
const Kitten = require("./kitten");

// This is a great place to establish associations between your models
// (https://sequelize-guides.netlify.com/association-types/).
// Example:

// Puppy.belongsTo(Owner)
User.hasMany(Puppy);
Puppy.belongsTo(User);
User.hasMany(Kitten);
Kitten.belongsTo(User);

module.exports = {
  // Include your models in this exports object as well!
  db,
  User,
  Puppy,
  Kitten,
};
