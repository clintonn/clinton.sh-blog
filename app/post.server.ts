import path from "path";
import fs from "fs";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import compiler from "rehype-stringify";
import { prisma } from "./db.server";
import invariant from "tiny-invariant";

export const queryFrontmatter = async (slug: string) => {
  const post = await prisma.post.findUnique({ where: { slug } });
  invariant(post, "Post not found");
  return {
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    isPublished: post.isPublished,
    title: post.title,
  };
};

export const getPost = async (slug: string) => {
  const postsDirectory = path.resolve(__dirname, "../posts");
  try {
    const post = fs.readFileSync(`${postsDirectory}/${slug}.md`, "utf8");
    const file = await unified()
      .use(remarkParse)
      .use(remarkFrontmatter)
      .use(compiler)
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .process(post);

    return {
      frontmatter: await queryFrontmatter(slug),
      content: file.value.toString(),
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
