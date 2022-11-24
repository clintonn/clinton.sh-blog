import path from "path";
import fs from "fs";
import { bundleMDX } from "mdx-bundler";

import type { Post } from "~/util/types/Post";

export const trimMd = (slug: string) => slug.replace(/\.mdx?$/, "");

export const extractPostData = async (slug: string) => {
  const postsDirectory = path.resolve(path.join(process.cwd(), "posts"));
  const trimmedSlug = trimMd(slug);
  try {
    const post = fs.readFileSync(`${postsDirectory}/${trimmedSlug}.md`, "utf8");
    const { code, frontmatter } = await bundleMDX({ source: post });

    return {
      frontmatter: frontmatter as Post["frontmatter"],
      content: code,
    };
  } catch (e) {
    console.error(e);
    throw new Error("Something went wrong while processing the post");
  }
};
