require("dotenv").config();
const db = require("./app/models/index");
const userController = require("./app/controllers/user.controller");
const bootcampController = require("./app/controllers/bootcamp.controller");

const main = async () => {
  // create users
  await userController.createUser("Mateo", "Díaz", "mateo.diaz@correo.com");
  await userController.createUser(
    "Santiago",
    "Mejías",
    "santiago.mejias@correo.com",
  );
  await userController.createUser("Lucas", "Rojas", "lucas.rojas@correo.com");
  await userController.createUser(
    "Facundo",
    "Fernandez",
    "facundo.fernandez@correo.com",
  );

  // create bootcamps
  await bootcampController.createBootcamp(
    "Introduciendo El Bootcamp De React",
    10,
    "React es la librería más usada en JavaScript para el desarrollo de interfaces.",
  );

  await bootcampController.createBootcamp(
    "Bootcamp Desarrollo Web Full Stack",
    12,
    "Crearás aplicaciones web utilizando las tecnologías y lenguajes más actuales" +
      "y populares, como: JavaScript, nodeJS, Angular, MongoDB, ExpressJS.",
  );
  await bootcampController.createBootcamp(
    "Bootcamp Big Data, Inteligencia Artificial & Machine Learning",
    18,
    "Domina Data Science, y todo el ecosistema de lenguajes y herramientas de" +
      "Big Data, e intégralos con modelos avanzados" +
      "de Artificial Intelligence y Machine Learning.",
  );

  // add users into bootcamps
  await bootcampController.addUser(1, 1);
  await bootcampController.addUser(2, 1);
  await bootcampController.addUser(1, 2);
  await bootcampController.addUser(1, 3);
  await bootcampController.addUser(2, 3);
  await bootcampController.addUser(3, 3);

  // queries...
  await bootcampController.findById(1);

  await bootcampController.findAll();

  await userController.findUserById(1);

  await userController.findAll();

  await userController.updateUserById(1, {
    firstName: "Pedro",
    lastName: "Sanchez",
  });
  await userController.findUserById(1);

  await userController.deleteUserById(1);
  await userController.findUserById(1);

  /**
   * Tests
   * */
  // test updateUserById
  // await userController.updateUserById(4, { firstName: "Facu" });
  // await userController.findUserById(4);

  // test deleteUserById
  // await userController.deleteUserById(4);
  // await userController.findAll();

  // test bootcampController.findById
  // await bootcampController.findById(8);

  // test bootcampController.findAll
  // await bootcampController.findAll();
};

db.sequelize.sync({ force: true }).then(() => {
  console.log("Eliminando y resincronizando la DB.");
  main();
});
