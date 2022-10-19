const {
  db,
  models: { User },
} = require("../db");

async function seed() {
  await db.sync({ force: true });
  console.log("db synced");

  const users = await Promise.all([
    User.create({
      firstName: "cody",
      lastName: "martin",
      password: "123",
      passwordConfirm: "123",
      email: "lalalala@lala.com",
    }),
    User.create({
      firstName: "murphy",
      lastName: "stellar",
      password: "123",
      passwordConfirm: "123",
      email: "yoyo@yahoo.com",
    }),
    User.create({
      firstName: "zack",
      lastName: "lad",
      password: "123",
      passwordConfirm: "123",
      email: "zack@yahoo.com",
    }),
    User.create({
      firstName: "moseby",
      lastName: "mose",
      password: "123",
      passwordConfirm: "123",
      email: "moseby@yahoo.com",
    }),
  ]);
}

const runSeed = async () => {
  try {
    console.log("seeding...");
    await seed();
  } catch (err) {
    console.error(err);
    console.log("Something went wrong...");
    process.exitCode = 1;
  } finally {
    console.log("Closing DB");
    await db.close();
    console.log("DB closed");
  }
};

runSeed();
