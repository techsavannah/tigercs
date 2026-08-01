export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  eleventyConfig.addFilter("readableDate", (date) =>
    date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  );

  eleventyConfig.addShortcode(
    "boardMemberHero",
    (image, alt, name, bio, buttonText, buttonUrl) => `
<div class="hero bg-base-200 rounded-box mb-16">
  <div class="hero-content flex-col lg:flex-row">
    <div class="flex flex-col items-center gap-4">
      <img src="${image}" alt="${alt}" class="w-64 h-64 object-cover rounded-box shadow-2xl" />
      <a href="${buttonUrl}" class="btn btn-primary">${buttonText}</a>
    </div>
    <div>
      <h2 class="text-2xl font-bold">${name}</h2>
      <p class="py-4">${bio}</p>
    </div>
  </div>
</div>`
  );

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
  };
}
