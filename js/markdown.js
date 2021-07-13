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

export const markdownHtml = (text) =>
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
