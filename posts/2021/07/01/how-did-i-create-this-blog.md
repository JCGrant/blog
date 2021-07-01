# How Did I Create This Blog? (In ~100 lines of JavaScript)

I've always thought the idea of a databaseless blog sounded pretty cool. Because, let's be real, most people won't ever write more than 100 posts on their blog. In fact, many die after a dozen or so. This is something we can easily store in a JSON file, instead of setting up a fully fledged server and database.

However, writing all of one's posts in a single file doesn't sound all too fun, so let's store the individual posts in their own files as text, and have a "DB file" just store a JSON list of references to these posts. Nothing revolutionary.

![Database Architecture](/posts/2021/07/01/db.svg)

We can now just use a simple frontend to fetch this "DB file", I call mine `posts.json`, and then decide how many of the actual posts we wish to fetch. Right now, I only have 2 posts at the time of writing, so I simply fetch all the posts.

![Fetching data](/posts/2021/07/01/fetch-data.png)

Once we have fetched the blog post(s) we wish to render, we can run some quick parsing over each text file to generate HTML. I have used Markdown to write my blog posts, so converting this to HTML isn't too difficult. In fact, a mini Markdown parser is included in this script! It's quite rudimentary at the moment (I'm literally adding features to it as I write this post!), but I might write a post of parsing Markdown in the future, once it is more complete.

![Fetching data](/posts/2021/07/01/parse-html.png)

Finally once we have the HTML, we can slap some CSS on it to make it look as pretty as we want. I currently choose to go for a more brutalist style, with just HTML and [very little CSS](https://github.com/JCGrant/blog/blob/main/style.css), but maybe this will change one day.

Here's how the blog looks at the time of writing:

![My Blog](/posts/2021/07/01/blog.png)

![An example post](/posts/2021/07/01/post.png)

One final piece of the puzzle is deciding which view to render: the list of posts, or a single post.

We do this by using the search parameter `p` in the URL:

![The URL](/posts/2021/07/01/url.png)

We first check if `p` exists, and if it does we check it's value against our list of posts. If we don't find a match, we render the list of posts, otherwise we render a single post.

![The main logic of the program](/posts/2021/07/01/main-logic.png)

All that's left is to deploy our blog. Because it's literally just files, we can host it pretty much anywhere which allows to host static websites. I've chosen to host mine on [GitHub](https://github.com/JCGrant/blog/), using GitHub Pages.

Some future goals for this project include:

- Improving the markdown parser. I had to implement a simple version of Markdown lists just for this paragraph 😅.
- Using GitHub Actions to automatically generate the "DB" file. At the moment I have to manually add references to new blog posts.
- Keeping things as simple as possible.
