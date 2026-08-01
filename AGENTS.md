# AGENTS.md

This file provides guidance to coding agents when working with code in this repository.

## What this is

Marketing/content site for the Savannah State University (SSU) CS Industry Advisory Board. Static site built with Eleventy, styled with Tailwind CSS v4 + DaisyUI. Small, fixed set of sections: homepage, blog, events, contact — not expected to grow into an app.

## Toolchain

- Node version pinned via `mise` (`.mise.toml`, currently Node 24). Run `mise install` once per checkout.
- Package manager is **Yarn** (classic node-modules linker, set in `.yarnrc.yml` — not PnP). Use `yarn`, not `npm`.

## Commands

```
yarn install     # install deps
yarn dev         # eleventy --serve + tailwind --watch, in parallel
yarn build       # tailwind build (minified) then eleventy build, output to _site/
```

There is no test suite or linter configured. Verify changes by running `yarn build` and checking `_site/`, or `yarn dev` and viewing in a browser.

## Architecture

- `eleventy.config.js` — ESM config (root-level, not `.eleventy.js`). Sets `src` as input dir, `_site` as output. Passthrough-copies `src/images`. Defines `year` shortcode and `readableDate` filter.
- **Content pages are Markdown, not Nunjucks.** Contributors adding or editing pages/posts/events should never need to write Nunjucks — just a `.md` file with front matter (`layout`, `title`) and Markdown/HTML body. Nunjucks (`.njk`) is reserved for the two shared layouts and the blog index loop, which are infrastructure, not content.
- `src/_includes/base.njk` — the one shared shell (nav, header, footer). Every page eventually wraps in this, either directly or via another layout.
- `src/_includes/content.njk` — plain-markdown content layout, wraps content in `.prose` and itself wraps in `base.njk`. Use this (`layout: content.njk`) for text-only pages like `contact.md` and `events/*.md` so headings/lists/links get sane typography without hand-adding classes to every element.
- `src/_includes/post.njk` — blog post layout (adds the date), also wraps content in `.prose`, itself wrapped in `base.njk`.
- "Designed" pages with their own custom HTML (hero sections, cards, etc.) — like `index.md` — set `layout: base.njk` directly and skip `content.njk`, since `.prose` defaults would fight with their explicit utility classes.
- `src/_data/site.json` — site title and nav links, referenced as `site.title` / `site.nav` in templates. Update nav here, not per-template.
- `src/css/tailwind.css` — Tailwind v4 CSS-first entry point (`@import "tailwindcss"; @plugin "daisyui";`). No `tailwind.config.js` — v4 auto-detects template content. CSS is built directly to `_site/css/style.css` by the Tailwind CLI (not through Eleventy passthrough), so `yarn build` runs the CSS build *before* the Eleventy build.
- `src/blog/` — directory-scoped data file `blog.json` sets `layout: post.njk`, `tags: ["posts"]`, and the `/blog/{slug}/` permalink for every file in the folder. Add a post by dropping a new Markdown file here with `title`/`date` front matter (optionally `author`) — no permalink or collection wiring needed. `src/blog/index.njk` is the one exception to the Markdown-only rule (it loops over `collections.posts`); it overrides `permalink` to `/blog/` and sets `eleventyExcludeFromCollections: true` so it isn't listed as a post itself.
- `src/events/` — no directory data file, no collection (only one event exists; not worth the machinery). `index.md` is a manually maintained Markdown list of links; each event is its own `.md` file relying on Eleventy's default permalink (`/events/<filename>/`). Add a new event by creating a Markdown file here and adding a link in `events/index.md`.
- `src/contact.md` — flat, one-off page at the root of `src/`.

When adding a new top-level page, follow the `contact.md` pattern (flat Markdown file in `src/`, `layout: base.njk`) unless it belongs to a growing section like blog/events.
