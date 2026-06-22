const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
  // Add syntax highlighting plugin
  eleventyConfig.addPlugin(syntaxHighlight);

  // Copy static assets to output build folder
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({ "src/assets/images/favicon.ico": "favicon.ico" });
  eleventyConfig.addPassthroughCopy({ "src/site.webmanifest": "site.webmanifest" });

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

  // Filter to extract YouTube embed URL from standard/short share links
  eleventyConfig.addFilter("youtubeEmbedUrl", (url) => {
    if (!url) return "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }
    return "";
  });

  // Dynamic breadcrumbs filter using collections
  eleventyConfig.addFilter("breadcrumbs", function(url, collections) {
    if (!url || url === "/") return [];

    const parts = url.split("/").filter(Boolean);
    const crumbs = [];

    // Always include Home as the root breadcrumb
    crumbs.push({
      title: "Home",
      url: "/"
    });

    let currentUrl = "/";
    for (let i = 0; i < parts.length; i++) {
      currentUrl += parts[i] + "/";
      
      // Search all pages in collections to find a matching URL
      const foundPage = collections && collections.all ? collections.all.find(p => p.url === currentUrl) : null;
      
      let title = parts[i];
      if (foundPage && foundPage.data && foundPage.data.title) {
        title = foundPage.data.title;
      } else {
        // Fallback: title case the URL segment
        title = parts[i].charAt(0).toUpperCase() + parts[i].slice(1).replace(/-/g, " ");
      }
      
      crumbs.push({
        title: title,
        url: currentUrl
      });
    }

    return crumbs;
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
