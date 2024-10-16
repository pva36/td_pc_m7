const sequelize = require("../config/db.configs");
const User = require("./user.model");
const Bootcamp = require("./bootcamp.model");

const db = {};

db.sequelize = sequelize; // should I add this?

db.User = User(sequelize);
db.Bootcamp = Bootcamp(sequelize);

// define junction table
db.User.belongsToMany(db.Bootcamp, { through: "UserBootcamp" });
db.Bootcamp.belongsToMany(db.User, { through: "UserBootcamp" });

db.UserBootcamp = db.sequelize.models.UserBootcamp;

module.exports = db;
