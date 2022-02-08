const Sequelize = require("sequelize");
const Connection = new Sequelize("Gdb", "root", "S1ssala23", {
  host: "localhost",
  dialect: "mysql",
  timezone: "+01:00",
});

Connection.authenticate()
  .then(() => {
    console.log("Database is connected!");
  })
  .catch((err) => {
    console.error("Error to connect with database: " + err);
  });

module.exports = Connection;
