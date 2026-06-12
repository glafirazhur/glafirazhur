# Glasha's Personal Website & Blog

Welcome to the repository for Glasha's personal website and blog. This site is built with a focus on simplicity, accessibility (WCAG AA/AAA standards), and performance. It is a fully static website generated using modern standards without any heavy runtime JavaScript frameworks.

---

## 🛠️ Technical Stack

- **Static Site Generator**: [Eleventy (11ty)](https://www.11ty.dev/) (v3.x)
- **Templating Engine**: [Liquid](https://liquidjs.com/) (configured in [eleventy.config.js](file:///c:/Users/glafi/Projects/glafirazhur/eleventy.config.js))
- **Styling**: Modern Vanilla CSS
- **Deployment**: Configured to compile to static HTML/CSS/JS ready for any static web host.

---

## 📂 Project Structure

Here is a simplified overview of how the files are organized:

```text
glafirazhur/
├── eleventy.config.js   # Eleventy static site configuration & build settings
├── package.json         # Node.js dependencies and run scripts
├── src/                 # Main source directory
│   ├── _data/           # Global data files (e.g., site metadata in site.json)
│   ├── _includes/       # Layouts and reusable HTML components
│   │   └── layouts/     # Page-level templates (base, post, etc.)
│   ├── assets/          # Static assets (CSS, JS, images, icons)
│   │   ├── css/         # Vanilla CSS styling
│   │   └── js/          # Minimal helper JavaScript (e.g., theme toggle)
│   ├── blog/            # Markdown files representing individual blog posts
│   ├── index.html       # Homepage
│   ├── blog.html        # Blog archive page listing posts
│   ├── talks.html       # Speaking engagements & talks page
│   └── contact.html     # Contact details page
└── _site/               # Auto-generated build output directory (ignored in Git)
```

---

## 🚀 Getting Started

### 1. Installation
Before starting, ensure you have [Node.js](https://nodejs.org/) installed. Then install the project dependencies:
```bash
npm install
```

### 2. Run Local Development Server
Start the Eleventy development server with hot-reloading (changes will refresh in your browser automatically):
```bash
npm start
```
The site will be available locally at `http://localhost:8080/`.

### 3. Build for Production
To compile the static files into the `_site/` directory for deployment:
```bash
npm run build
```

---

## ✍️ Content Workflows

### How to Write a Blog Post
1. Navigate to the `src/blog/` directory.
2. Create a new markdown (`.md`) file using a kebab-case name (e.g., `my-new-post.md`).
3. Add the required front matter metadata at the top of the file, followed by your Markdown content:
   ```markdown
   ---
   title: "My New Blog Post"
   description: "A short summary of what this post is about."
   date: 2026-06-12
   tags:
     - accessibility
     - web-development
   ---
   
   Your blog post content goes here in standard Markdown...
   ```
4. The post will automatically display in chronological order on the **Blog** page.

### How to Add a Talk
1. Open the talks data file at `src/_data/talks.json` (or your local talks management system).
2. Add a new entry to the JSON list with the following structure:
   ```json
   {
     "title": "Making the Web Accessible",
     "event": "Bilbao Web Dev Meetup",
     "date": "2026-08-15",
     "location": "Bilbao, Spain",
     "description": "A guide to building keyboard-friendly navigation.",
     "links": {
       "slides": "https://example.com/slides",
       "video": "https://example.com/video"
     }
   }
   ```
3. Save the file, and the **Talks** page will automatically render the talk under either "Upcoming" or "Past Talks" depending on the date.

---

## ♿ Accessibility & Best Practices

This project strictly adheres to accessibility best practices:
- **Semantic HTML**: Use proper tags (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`) with structured heading flows (`h1` through `h6`).
- **Keyboard Navigation**: Highly visible focus indicators (`:focus-visible`) and a keyboard-friendly "Skip to Content" link.
- **Responsive Typography**: Flexible sizing built using `rem` units to respect user browser font settings.
- **Color Contrast**: Accessible colors optimized to meet at least WCAG AA standards.
