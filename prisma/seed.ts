import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import { syncPosts } from "./util.server";
const prisma = new PrismaClient();

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
