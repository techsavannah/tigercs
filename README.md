# tigercs

Marketing/content site for the Savannah State University (SSU) CS Industry Advisory Board.

Static site built with [Eleventy](https://www.11ty.dev/), styled with [Tailwind CSS v4](https://tailwindcss.com/) + [daisyUI](https://daisyui.com/).

## Getting set up

Node version is pinned via [mise](https://mise.jdx.dev/). Install mise, then from the repo root:

```
mise install
```

Package manager is **Yarn** (classic node-modules linker). Use `yarn`, not `npm`.

```
yarn install
```

## Commands

```
yarn dev     # eleventy --serve + tailwind --watch, in parallel
yarn build   # tailwind build (minified) then eleventy build, output to _site/
```

There's no test suite or linter configured. Verify changes by running `yarn build` and checking `_site/`, or `yarn dev` and viewing in a browser.

## Adding content

Content pages are plain Markdown, not Nunjucks — contributors adding or editing pages/posts/events shouldn't need to touch template code.

- **Blog post**: drop a new `.md` file in `src/blog/` with `title`/`date` front matter. Layout, tags, and the `/blog/{slug}/` permalink are wired up automatically.
- **Event**: add a `.md` file in `src/events/` and link it from `src/events/index.md`.
- **Top-level page**: add a flat `.md` file in `src/`, following the pattern in `src/contact.md` (`layout: base.njk`).

Nav links live in `src/_data/site.json`.

## See also

- [Eleventy docs](https://www.11ty.dev/docs/)
- [Tailwind CSS docs](https://tailwindcss.com/docs)
- [daisyUI docs](https://daisyui.com/docs/)
