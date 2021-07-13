import { POST_PREVIEW_LENGTH } from "./constants.js";

export const getPostTitle = (post) =>
  post.text.split("\n")[0].replace("# ", "");

export const getPostPreview = (post) =>
  post.text
    .split("\n")
    .slice(1)
    .join("\n")
    .trim()
    .slice(0, POST_PREVIEW_LENGTH) + "...";
