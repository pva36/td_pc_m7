const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Bootcamp = sequelize.define(
    "Bootcamp",
    {
      // Model attributes
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cue: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          max: 20,
          min: 5,
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "bootcamps",
    },
  );
  return Bootcamp;
};
