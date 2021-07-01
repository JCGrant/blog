const BASE_URL = "https://www.jcgrant.com/blog";
const POST_PREVIEW_LENGTH = 300;

const postsHtml = (posts) =>
  `<div class="posts">
    ${listHtml(
      posts,
      (post) =>
        `${postHtml(post)}
        <hr>`
    )}
  </div>`;

const postHtml = (post) =>
  `<div class="post">
    <a href="?p=${post.slug}">
      <h2>${post.title}</h2>
    </a>
    ${markdownHtml(post.body.slice(0, POST_PREVIEW_LENGTH) + "...")}
    <a href="?p=${post.slug}">
      <p>Read More</p>
    </a>
  </div>`;

const singlePostHtml = (post) =>
  `<div class="single-post">
    ${markdownHtml(post.text)}
  </div>`;

/*
  Examples:
  ![](./image.png)
  ![image description](/posts/2021/07/01/image.png)
*/
const imgRegex = /!\[((\w*\s*)*)]\(([^\[\(]*)\)/;
/*
  Examples:
  ![](./image.png)
  ![image description](/posts/2021/07/01/image.png)
*/
const linkRegex = /\[((\w*\s*)*)]\(([^\[\()]*)\)/g;

const markdownHtml = (text) =>
  text
    .split("\n")
    .filter((line) => line !== "")
    .map((line) => {
      if (line.startsWith("# ")) {
        return `<h1>${line.replace("# ", "")}</h1>`;
      }
      if (line.startsWith("- ")) {
        return `<li>${line.replace("- ", "")}</li>`;
      }
      const match = line.match(imgRegex);
      if (match !== null) {
        return `<img src="${match[3]}" alt="${match[1]}"/>`;
      }
      return `<p>${line.replaceAll(linkRegex, `<a href="$3">$1</a>`)}</p>`;
    })
    .join("\n");

const listHtml = (objs, fn) => objs.map(fn).join("\n");

const zip = (xs, ys) => xs.map((x, i) => [x, ys[i]]);

const splitTitleAndBody = (text) => {
  const lines = text.split("\n");
  const title = lines[0].replace("# ", "");
  const body = lines.slice(1).join("\n").trim();
  return {
    title,
    body,
  };
};

const fetchSlugs = async () =>
  await fetch(`${BASE_URL}/posts.json`).then((res) => res.json());

const fetchPageTexts = async (slugs) =>
  await Promise.all(
    slugs.map((slug) =>
      fetch(`${BASE_URL}/posts/${slug}.md`).then((res) => res.text())
    )
  );

const parsePostTexts = (postTexts, slugs) =>
  zip(postTexts, slugs)
    .map(([text, slug]) => ({
      slug,
      text,
      ...splitTitleAndBody(text),
    }))
    .reduce(
      (acc, post) => ({
        ...acc,
        [post.slug]: post,
      }),
      {}
    );

(async () => {
  const slugs = await fetchSlugs();
  const postTexts = await fetchPageTexts(slugs);
  const posts = parsePostTexts(postTexts, slugs);
  const blogEl = document.getElementById("blog");
  const postSlug = new URL(document.location).searchParams.get("p");
  if (postSlug === null) {
    blogEl.innerHTML = postsHtml(Object.values(posts));
  } else {
    const post = posts[postSlug];
    if (post === undefined) {
      document.location = "/";
      return;
    }
    blogEl.innerHTML = singlePostHtml(post);
    document.title = `${post.title} | JC Blog`;
  }
})();
