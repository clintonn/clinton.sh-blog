import path from "path";
import fs from "fs";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remarkParseFrontmatter from "remark-parse-frontmatter";
import remarkRehype from "remark-rehype";
import compiler from "rehype-stringify";
import { parse as yamlParse } from "yaml";
import { json } from "@remix-run/node";

export const getPost = async (slug: string) => {
  const postsDirectory = path.resolve(__dirname, "../posts");
  try {
    const post = fs.readFileSync(`${postsDirectory}/${slug}.md`, "utf8");
    const file = await unified()
      .use(remarkParse)
      .use(compiler)
      .use(remarkFrontmatter)
      .use(remarkParseFrontmatter, { yaml: yamlParse })
      .use(remarkRehype, { allowDangerousHtml: true })
      .process(post);
    console.log(file);
    return json(file);
  } catch (error) {
    console.log(error);
    return null;
  }
};
