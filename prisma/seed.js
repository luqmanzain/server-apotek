const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await prisma.user.create({
    data: {
      username: "admin",
      password: hashedPassword,
    },
  });
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
