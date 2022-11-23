import fs from "fs";
import path from "path";
import { prisma } from "../app/db.server";
import { extractPostData } from "../app/util/extractPostData";

const exists = async (fileName: string) => {
  return (await prisma.post.count({ where: { slug: fileName } })) !== 0;
};

const isUpdated = async (fileName: string) => {
  // if the file itself is updated, we'll want to upsert
  try {
    const post = await prisma.post.findUnique({ where: { slug: fileName } });
    if (!post) {
      throw new Response("Post not found", { status: 404 });
    }
    return (
      post.updatedAt <
      fs.statSync(path.join(process.cwd(), "posts", fileName)).mtime
    );
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const upsertPost = async (fileName: string) => {
  const fileExists = await exists(fileName);
  const postData = await extractPostData(fileName);
  if (!fileExists) {
    return prisma.post.create({
      data: {
        slug: fileName,
        content: postData.content,
        title: postData.frontmatter.title,
      },
    });
  }
  if (await isUpdated(fileName)) {
    return prisma.post.update({
      where: { slug: fileName },
      data: {
        content: postData.content,
        title: postData.frontmatter.title,
        isPublished: postData.frontmatter.is_published,
      },
    });
  }
};

export const cullPosts = async (fileNames: string[]) => {
  const posts = await prisma.post.findMany();
  const postsToDelete = posts.filter((post) => !fileNames.includes(post.slug));
  return prisma.post.deleteMany({
    where: { slug: { in: postsToDelete.map((post) => post.slug) } },
  });
};

export const syncPosts = async (fileNames: string[]) => {
  await cullPosts(fileNames);
  return Promise.all(fileNames.map((fileName) => upsertPost(fileName)));
};
