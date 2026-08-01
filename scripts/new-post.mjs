#!/usr/bin/env node
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const [title, author] = process.argv.slice(2);

if (!title) {
  console.error('Usage: yarn new-post "Post Title" ["Author Name"]');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/(^-|-$)/g, "");

const date = new Date().toISOString().slice(0, 10);
const blogDir = join(process.cwd(), "src", "blog");
const filePath = join(blogDir, `${slug}.md`);

if (existsSync(filePath)) {
  console.error(`${filePath} already exists.`);
  process.exit(1);
}

const frontMatter = ["---", `title: ${title}`, `date: ${date}`, author && `author: ${author}`, "---", "", ""]
  .filter((line) => line !== undefined)
  .join("\n");

mkdirSync(blogDir, { recursive: true });
writeFileSync(filePath, frontMatter);

console.log(`Created ${filePath}`);
