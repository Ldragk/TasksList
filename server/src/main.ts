import  App  from "./http/server";
import { PrismaService } from "./prisma/prisma.service";

const prisma = new PrismaService();

(async function main() {  
  App()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
})()
