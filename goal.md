# brettski.com personal website project

## Summary

The brettski.com personal website has not been in place for many years. The domain currently only redirects to the dated blog. brettski's blog, located at [https://blog.brettski.com](https://blog.brettski.com) is hosted at Wordpress.com. Hosting is cheep, but it is time to move the site. This is the goal of this project

The initial focus is to recreate the blog in a newer frontend framework. brettski worked in Svelt and Sveltkit and started to recreate the blog in that stack, and was bored with it.

I am a backend developer and don't know a lot about different frontend frameworks. I'd like to keep it to something versy straight forward with minimal maintenance. Adding a blogpost should be as simple as adding a new markdown file with the proper front matter and rebuilding the site, or whatever is needed to publish. All publish actions will be automatted.

## Preferences

- I prefer shorter answers in this project and terse language.
- I am an experienced developer who has written software for over twenty years. I've spent the last 6 years writing a GraphQL API with NodeJS and JavaScript. I always prefer to use best practices when coding, which is one reason I like GoLang, as it's a very opinionated language. Security best practices must be followed at all times. As someone who likes structure, it is helpful to know where a new file should live in a project.
- Structure the applicaiton using best practices for the framework we decide on. It is very important that the structure is maintained and the application can grow without falling over.
- Write unit tests for where they make sense. 100% coverage isn't the goal, knowing the stability of the applicaiton is.

## Goals

- The file, goal.md shoud not be edited directly without explicit permission.
- Decide on a framework to build the site in
  - I am complety open on what to use. Some thoughts are Svelete/Sveltekit, Astro, and hugo.
  - precompiles, active, or both is fine.
  - Tailwind CSS for styling.
  - The site must be reactive. Which it isn't now.
- The site will be hosted at Cloudflare.
- All builds and publishes will be automated from Github to Cloudflare.
- The new blog is to have the same navigation used now, were you can filter by year, month, and categories.
- The "categories" defined in the blog can be changed to tags if that makes design more straight-forward. This blog started before tags were popular.
- Search blog by titles and content
- Other pages will be added added to the blog in the future, but are out of scope for now. Ensure the solution will allow from them.
  - Include an about page or section
- All intial directories in this current project are temporary and should be moved to the best-practice location for the framework decided on.
  - The directory blog/posts are markdown versions of all the blog posts from the current site. I am ok with using these files, or new ones can be created from a Wordpress.com export if that is a better approach.
  - The directory blog/posts/images are all the images referenced in the post files.
- Coding best practices MUST be followed at all times. No shortcuts or assumptions.
- Security best practices MUST be followed and abided by at all times. No shortcuts or assumptions

## Blog

The blog is currently hosted in Wordpress.com. The site contents have been exported. There is even a version of the blog posts converted to markdown already. These files are located at blog/posts. Images for the posts are located at blog/posts/images. These files can be used, or the raw export from Wordpress.com if that is desired.

## Verification Policy

- Verify load-bearing claims — specific counts, file:line references, and assertions about what code does or how it behaves — against the actual code, docs, or command output before stating them; don't answer from memory alone when a tool can confirm it. Qualitative language ("small fix," "roughly") doesn't need the same rigor, but don't dress an unverified guess in a number that makes it sound checked.
- If something cannot be verified, say so directly ("I don't know" / "couldn't confirm this") instead of filling the gap with a plausible guess.
- Do not extrapolate beyond what the evidence supports. If the evidence only supports a narrower claim, state the narrower claim.
- Distinguish what was directly verified (read in code, confirmed by running a command) from what is inferred. Label inferences as inferences.
- Do not add confidence, framing, or detail beyond what was actually checked.
