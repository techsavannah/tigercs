# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
- `src/_includes/base.njk` — the one shared layout (nav, header, footer). Every page sets `layout: base.njk` in front matter.
- `src/_includes/post.njk` — blog post layout, itself wrapped in `base.njk`.
- `src/_data/site.json` — site title and nav links, referenced as `site.title` / `site.nav` in templates. Update nav here, not per-template.
- `src/css/tailwind.css` — Tailwind v4 CSS-first entry point (`@import "tailwindcss"; @plugin "daisyui";`). No `tailwind.config.js` — v4 auto-detects template content. CSS is built directly to `_site/css/style.css` by the Tailwind CLI (not through Eleventy passthrough), so `yarn build` runs the CSS build *before* the Eleventy build.
- `src/blog/` — directory-scoped data file `blog.json` sets `layout: post.njk`, `tags: ["posts"]`, and the `/blog/{slug}/` permalink for every file in the folder. Posts are plain Markdown files with `title`/`date` front matter. `src/blog/index.njk` overrides `permalink` to `/blog/` and sets `eleventyExcludeFromCollections: true` so the index isn't listed as a post; it renders `collections.posts`.
- `src/events/` — no directory data file (only one event exists; not worth a collection). `index.njk` is a manually maintained list of links; each event is its own `.njk` file with an explicit `permalink`. Add new events by creating a file here and adding a link in `events/index.njk`.
- `src/contact.njk` — flat, one-off page at the root of `src/`.

When adding a new top-level page, follow the `contact.njk` pattern (flat file in `src/`, `layout: base.njk`) unless it belongs to a growing section like blog/events.
