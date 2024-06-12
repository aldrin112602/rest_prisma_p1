import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
    const allUsers = await prisma.user.findMany();
    console.log(allUsers);
}


main().then(async () => await prisma.$disconnect())
.catch(async (err: Error) => {
    console.log(err);
    await prisma.$disconnect()
    process.exit(1);
})