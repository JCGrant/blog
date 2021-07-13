import { BASE_URL } from "./constants.js";

const fetchOrError = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw Error(`fetching '${url}' failed`);
  }
  return response;
};

export const fetchSlugs = async () =>
  fetchOrError(`${BASE_URL}/posts.json`).then((res) => res.json());

const fetchPostText = async (slug) =>
  fetchOrError(`${BASE_URL}/posts/${slug}.md`).then((res) => res.text());

export const fetchPost = async (slug) => ({
  slug,
  text: await fetchPostText(slug),
});

export const fetchPosts = async (slugs) =>
  Promise.all(slugs.map((slug) => fetchPost(slug)));
