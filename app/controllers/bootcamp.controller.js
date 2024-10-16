const db = require("../models/index");

// createBootcamp
const createBootcamp = async (name, cue, description) => {
  let newBootcamp;
  try {
    newBootcamp = await db.Bootcamp.create({
      name: name,
      cue: cue,
      description: description,
    });
  } catch (err) {
    console.error(err);
    return;
  }
  console.log("\nSe ha creado el bootcamp:");
  console.dir(newBootcamp.dataValues);
};

// addUser
const addUser = async (UserId, BootcampId) => {
  let newRelation;
  try {
    newRelation = await db.UserBootcamp.create({
      UserId: UserId,
      BootcampId: BootcampId,
    });
  } catch (err) {
    console.error(err);
  }
  console.log(
    "\nAgregado el usuario id =",
    UserId,
    "al bootcamp con id=",
    BootcampId,
  );
  console.log(newRelation.dataValues);
};

// findById
const findById = async (id) => {
  let foundBootcamp;
  try {
    foundBootcamp = await db.Bootcamp.findByPk(id);
  } catch (err) {
    console.error(err);
    return;
  }
  if (!(foundBootcamp === null)) {
    console.log(`\nBootcamp con id ${id} seleccionado.`);
    console.log(foundBootcamp.dataValues);
    return foundBootcamp;
  } else {
    console.log("There is no `bootcamp` with id", id);
    console.log("\n");
    return;
  }
};

// findAll
const findAll = async () => {
  let allBootcamps;
  try {
    allBootcamps = await db.Bootcamp.findAll({
      include: [
        {
          model: db.User,
          through: { attribues: [] },
        },
      ],
    });
  } catch (err) {
    console.log(err);
    return;
  }

  console.log("\nMostrando todos los bootcamps");

  let index = 1;
  for (bootcamp of allBootcamps) {
    const { name } = bootcamp.dataValues;
    console.log(`\nBootcamp "${name}"`);
    console.log("Contiene los siguientes usuarios:");

    for (user in bootcamp.Users) {
      const { id, firstName, lastName } = bootcamp.Users[user].dataValues;
      console.log(`- id: ${id}, ${firstName} ${lastName}`);
    }
    index++;
  }
  console.log("\n");

  return allBootcamps;
};

module.exports = {
  createBootcamp,
  addUser,
  findById,
  findAll,
};
