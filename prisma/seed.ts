import fs from "fs";
import path from "path";
// @TODO - get compilerOptions paths to work so we can use ~
import { prisma } from "../app/db.server";
import { syncPosts } from "./util.server";

async function seed() {
  const postsPath = path.join(process.cwd(), "posts");
  const files = fs.readdirSync(postsPath);
  syncPosts(files);
}

seed()
  .catch((e) => {
    console.error(e);
    console.log("Failed!");
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
