const { PrismaClient } = require("@prisma/client");
const { hashSync } = require("bcryptjs");

(async () => {
  const db = new PrismaClient();
  let password = hashSync("Auh22&*$==25", 10);
  await db.user
    .create({
      data: { email: "admin@mycontext.com", password },
    })
    .then(() => {
      console.log("Admin user deployed");
    })
    .catch(() => {
      console.log("Failed on deployed admin");
    });
})();
