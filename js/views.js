import { markdownHtml } from "./markdown.js";
import { getPostPreview, getPostTitle } from "./selectors.js";

export const postsHtml = (posts) =>
  `<div class="posts">
  ${posts.map((post) => `${postHtml(post)}<hr>`).join("\n")}
</div>`;

export const postHtml = (post) => {
  return `
  <div class="post">
    <a href="?p=${post.slug}">
      <h2>${getPostTitle(post)}</h2>
    </a>
    ${markdownHtml(getPostPreview(post))}
    <a href="?p=${post.slug}">
      <p>Read More</p>
    </a>
  </div>`;
};

export const singlePostHtml = (post) =>
  `<div class="single-post">
  ${markdownHtml(post.text)}
</div>`;
