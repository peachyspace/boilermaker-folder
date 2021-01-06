const { db, User } = require("./server/db");

const seed = async () => {
  try {
    await db.sync({ force: true });
    await User.create({
      name: "Cody",
      email: "cody@email.com",
      password: "12345",
    });
    await User.create({
      name: "Puga",
      email: "puga@email.com",
      password: "puglife",
    });
    console.log(`
      Seed success!
    `);
    db.close();
  } catch (err) {
    console.error(`
      Oh noes!
    `);
    console.error(err.stack);
    db.close();
  }
};

seed();
