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

### Using Open Source Coding Agents and Models

You'll notice we have a CLAUDE.md in the repo, but we _also_ have an AGENTS.md and a .agents directory!  So, you can use pretty much _any_ coding agent you want, and you're not stuck with paying Anthropic or OpenAI for the privilege of using their models.  

In August 2026, here's what we think is worth trying out that's either free or _really_ cheap:

#### Coding Agents

* [OpenCode](https://opencode.ai) - If you're coming from Claude Code, this will be the most comfortable for you. 
* [Oh My Pi](https://omp.sh) - Based on the very barebones but _very_ configurable [pi](https://pi.dev), oh-my-pi is pi with fireworks. It comes with all the bells and whistles and is great to work with. It's currently my (hi, it's Kevin) daily driver at work.

#### Models

It's worth creating an OpenRouter account just to play with new models.  They offer a _lot_ of free models to play with, and if you're working on open source projects like this one, it's _fine_ to use the free models. If you're working on closed source, use a paid model that doesn't train on your prompts (there's a setting in the Privacy section of OpenRouter where you can disable showing models that store or train on prompts).  For this project, it's fine to use free models!

* [Laguna S 2.1](https://openrouter.ai/poolside/laguna-s-2.1:free) (Free) 
* [Laguna XS 2.1](https://openrouter.ai/poolside/laguna-xs-2.1:free) (Free)
* [North Mini Code](https://openrouter.ai/cohere/north-mini-code:free)

Poolside's Laguna series is both fast and _really_ good. I've been very impressed with the results, especially in Oh My Pi with advisor mode turned on.  North Mini Code is worth playing with, but I prefer Laguna.

## Commands

```
yarn dev     # eleventy --serve + tailwind --watch, in parallel
yarn build   # tailwind build (minified) then eleventy build, output to _site/
```

There's no test suite or linter configured. Verify changes by running `yarn build` and checking `_site/`, or `yarn dev` and viewing in a browser.

## Adding content

Content pages are plain Markdown, not Nunjucks — contributors adding or editing pages/posts/events shouldn't need to touch template code.

- **Blog post**: run `yarn new-post "Post Title" ["Author Name"]` to scaffold a new `.md` file in `src/blog/` with `title`/`date`/`author` front matter, or drop one in by hand. Layout, tags, and the `/blog/{slug}/` permalink are wired up automatically.
- **Event**: add a `.md` file in `src/events/` and link it from `src/events/index.md`.
- **Top-level page**: add a flat `.md` file in `src/`, following the pattern in `src/contact.md` (`layout: base.njk`).

Nav links live in `src/_data/site.json`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) and our [Code of Conduct](CODE_OF_CONDUCT.md).

## See also

- [Eleventy docs](https://www.11ty.dev/docs/)
- [Tailwind CSS docs](https://tailwindcss.com/docs)
- [daisyUI docs](https://daisyui.com/docs/)
