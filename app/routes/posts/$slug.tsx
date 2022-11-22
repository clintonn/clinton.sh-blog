import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Response } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getPost } from "~/post.server";
import invariant from "tiny-invariant";

interface LoaderData {
  post: Awaited<ReturnType<typeof getPost>>;
}

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, "Missing slug");
  const post = await getPost(params.slug);
  return json<LoaderData>({ post });
};

export default function PostSlug() {
  const { post } = useLoaderData() as LoaderData;
  invariant(post, () => {
    throw new Response("Post not found", { status: 404 });
  });

  return (
    <main>
      <h1 className="text-2xl font-bold">Some Post</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </main>
  );
}
