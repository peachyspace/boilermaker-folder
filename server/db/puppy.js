const Sequelize = require("sequelize");
const db = require("./database");

module.exports = db.define("puppies", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  color: {
    type: Sequelize.STRING,
  },
});
