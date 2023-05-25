import  App  from "./http/server";
import { prisma } from "./prisma/prisma-client";


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
