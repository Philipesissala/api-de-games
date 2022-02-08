const db = require("./db");
const sequelize = require("sequelize");

const games = db.define("games", {
  title: {
    type: sequelize.STRING,
    allowNull: false,
  },
  year: {
    type: sequelize.INTEGER,
    allowNull: false,
  },
  price: {
    type: sequelize.INTEGER,
    allowNull: false,
  },
});

//games.sync({ force: true });

module.exports = games;
