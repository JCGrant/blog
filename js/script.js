import { fetchSlugs, fetchPosts, fetchPost } from "./db.js";
import { postsHtml, singlePostHtml } from "./views.js";

const buildPage = async (postSlug) => {
  if (postSlug === null) {
    const slugs = await fetchSlugs();
    const posts = await fetchPosts(slugs);
    return {
      html: postsHtml(posts),
      title: "JC Blog",
    };
  }
  const post = await fetchPost(postSlug);
  return {
    html: singlePostHtml(post),
    title: `${post.title} | JC Blog`,
  };
};

const postSlug = new URL(document.location).searchParams.get("p");
try {
  const { html, title } = await buildPage(postSlug);
  document.getElementById("blog").innerHTML = html;
  document.title = title;
} catch (e) {
  console.log(e);
  document.location = "/blog";
}
