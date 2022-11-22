import path from "path";
import fs from "fs";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remarkParseFrontmatter from "remark-parse-frontmatter";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";
import compiler from "rehype-stringify";
import { parse as yamlParse } from "yaml";
import type { Post } from "~/util/types/Post";

export const getPost = async (slug: string) => {
  const postsDirectory = path.resolve(__dirname, "../posts");
  try {
    const post = fs.readFileSync(`${postsDirectory}/${slug}.md`, "utf8");
    const file = await unified()
      .use(remarkParse)
      .use(compiler)
      .use(remarkGfm)
      .use(remarkFrontmatter)
      .use(remarkParseFrontmatter, { yaml: yamlParse })
      .use(remarkRehype, { allowDangerousHtml: true })
      .process(post);

    return {
      frontmatter: file.data.frontmatter as Post["frontmatter"],
      content: file.value.toString(),
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
