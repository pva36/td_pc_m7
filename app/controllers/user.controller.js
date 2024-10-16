const db = require("../models/index");

const createUser = async (firstName, lastName, email) => {
  let newUser;
  try {
    newUser = await db.User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
    });
  } catch (err) {
    console.error(err);
    return;
  }
  console.log("\nSe ha creado el usuario:");
  console.dir(newUser.dataValues);
  console.log("\n");
};

// findUserById
const findUserById = async (id) => {
  let foundUser;
  try {
    foundUser = await db.User.findByPk(id, {
      include: [
        {
          model: db.Bootcamp,
          through: { attibutes: [] },
        },
      ],
    });
    if (foundUser === null) {
      console.log(`\nNo se encontró usuario con id ${id}`);
      return;
    }
  } catch (err) {
    console.error(err);
    return;
  }
  const { id: foundUserid, firstName, lastName } = foundUser.dataValues;
  console.log("\nSe ha encontrado el usuario:");
  console.log(`id: ${foundUserid}, ${firstName} ${lastName}`);
  console.log("Que pertenece a los siguientes bootcamps:");

  for (bootcamp in foundUser.Bootcamps) {
    console.log(`-"${foundUser.Bootcamps[bootcamp].dataValues.name}`);
  }
  console.log("\n");
};

// findAll
const findAll = async () => {
  let allUsers;
  try {
    allUsers = await db.User.findAll({
      include: [
        {
          model: db.Bootcamp,
          through: { attibutes: [] },
        },
      ],
    });
  } catch (err) {
    console.error(err);
    return;
  }
  console.log("\nMostrando todos los usuarios");

  let index = 1;
  for (user of allUsers) {
    const { id, firstName, lastName } = user.dataValues;
    console.log(`\nUsuario ${index}:`);
    console.log(`id: ${id}, ${firstName} ${lastName}`);
    console.log("Que pertenece a los siguientes bootcamps:");

    for (bootcamp in user.Bootcamps) {
      console.log(`- "${user.Bootcamps[bootcamp].dataValues.name}"`);
    }

    index++;
  }
  console.log("\n");
};

// updateUserById
const updateUserById = async (id, data) => {
  const user = await db.User.update(data, {
    where: {
      id: id,
    },
  });
  return user;
};

// deleteUserById
const deleteUserById = async (id) => {
  await db.User.destroy({
    where: {
      id: id,
    },
  });
};

module.exports = {
  createUser,
  findUserById,
  findAll,
  updateUserById,
  deleteUserById,
};
