import * as readLine from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { PrismaClient } from "@prisma/client";

const rl = readLine.createInterface({ input, output });
const prisma = new PrismaClient();
prisma.$connect();

rl.question(
  "This script will destroy all posts in the database. Are you sure you want to proceed? (y/n)"
)
  .then((answer) => {
    if (answer === "y") {
      prisma.post.deleteMany({}).then(
        () => console.log("All posts have been deleted. 🧨"),
        () => console.error("Something went wrong when deleting the posts")
      );
    }
  })
  .finally(() => {
    rl.close();
    prisma.$disconnect();
    console.log("Goodbye! 👋");
  });
