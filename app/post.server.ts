import path from "path";
import fs from "fs";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import { json } from "@remix-run/node";

export const getPost = async (slug: string) => {
  const postsDirectory = path.resolve(__dirname, "../posts");
  try {
    const post = fs.readFileSync(`${postsDirectory}/${slug}.md`, "utf8");
    const file = unified().use(remarkParse).use(remarkFrontmatter).parse(post);
    console.log(file);
    return json(file);
  } catch (error) {
    console.log(error);
    return null;
  }
};
