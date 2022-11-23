import * as readLine from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
// @TODO - get compilerOptions paths to work so we can use ~
import { prisma } from "../app/db.server";

const rl = readLine.createInterface({ input, output });

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
