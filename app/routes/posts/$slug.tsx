import type { LoaderFunction } from "@remix-run/node";
import { Response } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getPost } from "~/post.server";
import invariant from "tiny-invariant";

export const loader: LoaderFunction = ({ params }) => {
  invariant(params.slug, "Missing slug");
  const post = getPost(params.slug);
  if (!post) {
    throw new Response("Not found", { status: 404 });
  }
  return json(post);
};

export default function PostSlug() {
  const post = useLoaderData();

  return (
    <main>
      <h1 className="text-2xl font-bold">Some Post</h1>
      <pre>{JSON.stringify(post)}</pre>
    </main>
  );
}
