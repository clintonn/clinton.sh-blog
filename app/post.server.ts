import path from "path";
import fs from "fs";

export const getPost = (slug: string) => {
  const postsDirectory = path.resolve(__dirname, "../posts");
  try {
    const post = fs.readFileSync(`${postsDirectory}/${slug}.md`, "utf8");
    return post;
  } catch {
    return null;
  }
};
