const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
  // Add syntax highlighting plugin
  eleventyConfig.addPlugin(syntaxHighlight);

  // Copy static assets to output build folder
  eleventyConfig.addPassthroughCopy("src/assets");

  // Format date helper for posts and events
  eleventyConfig.addFilter("postDate", (dateObj) => {
    if (!dateObj) return "";
    const date = new Date(dateObj);
    // Return ISO string or pretty format
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC"
    });
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["html", "md", "liquid"],
    htmlTemplateEngine: "liquid",
    markdownTemplateEngine: "liquid"
  };
};
