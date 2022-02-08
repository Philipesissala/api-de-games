const db = require("./db");
const sequelize = require("sequelize");

const users = db.define("users", {
  name: {
    type: sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: sequelize.STRING,
    allowNull: false,
  },
  passwod: {
    type: sequelize.STRING,
    allowNull: false,
  },
});

//users.sync({ force: true });

module.exports = users;
