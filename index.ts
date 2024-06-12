

import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


async function main() {
    const post = await prisma.post.update({
        where: { id: 1 },
        data: { published: true },
      })
      console.log(post)
  }

  main().then(async () => {
    await prisma.$disconnect()
  })

  .catch(async (err: Error) => {
    console.error(err)
    await prisma.$disconnect()
    process.exit(1)
  })
  
  