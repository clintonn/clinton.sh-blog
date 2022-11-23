import { extractPostData } from "~/util/extractPostData";
export const getPost = async (slug: string) => {
  try {
    return await extractPostData(slug);
  } catch (error) {
    console.log(error);
    return null;
  }
};
