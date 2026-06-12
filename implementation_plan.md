# Minimalist Vanilla Web Blog - Implementation Plan

This plan outlines the architecture, design, and workflow for a personal, minimalistic, and highly accessible blog. The development philosophy is strictly native, using modern web standards (vanilla HTML, CSS, JavaScript) and markdown compilation without any runtime client-side frameworks.

---

## Technical Stack & Rationale

We propose using **Eleventy (11ty)** as the static build tool. Eleventy compiles Markdown files into native HTML and copies assets (CSS, images) without introducing any framework overhead, client-side JS hydration, or server-side runtime.

### The Stack

1. **Static Compiler**: **Eleventy (11ty) v3.x**
   - **Why**: It aligns perfectly with the vanilla web philosophy. It parses Markdown files (with front matter) and renders them into static HTML at build time. It generates zero client-side JavaScript by default.
   - **Alternative**: A custom Node.js build script using `marked` and `gray-matter`. We recommend Eleventy because it provides an optimized dev server, live reloading, pagination support, and clean URL structure out-of-the-box, saving weeks of custom build tool maintenance.
2. **Templating**: **WebC** or **Liquid / Nunjucks**
   - We will use plain HTML with **Liquid** (Eleventy's default, which uses simple syntax like `{{ title }}`) for layouts and loops.
3. **Styling**: **Vanilla CSS (Modern)**
   - **Typography**: Custom fonts loaded via modern `@font-face` or system font stacks. Responsive type using CSS `clamp()`.
   - **Layout**: CSS Grid, Flexbox, and Container Queries.
   - **Themes**: Native dark/light mode switching using CSS Custom Properties (Variables) and `@media (prefers-color-scheme: dark)`, with an optional toggle using light client-side JS (`localStorage`).
   - **Nesting**: Native CSS Nesting (`.card { & .title { ... } }`).
4. **Accessibility (A11y)**:
   - Strict WCAG 2.1 AA/AAA compliance by default.
   - Keyboard navigation optimization: highly visible focus styles using `:focus-visible`, skip-to-content links.
   - Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`).
   - Screen-reader-friendly labels and descriptions for all interactive features.

---

## Project Folder Structure

Below is the proposed folder layout for the repository:

```text
glafirazhur/
├── .eleventy.js          # Eleventy configuration file
├── package.json          # Node dependencies (eleventy, markdown plugins)
├── src/                  # Source files
│   ├── _data/            # Global data files (e.g., site metadata)
│   │   └── site.json     # Site title, author, contact links
│   ├── _includes/        # Templates and reusable layout fragments
│   │   ├── layouts/
│   │   │   ├── base.html # Base HTML skeleton (HTML5 shell, a11y skip-link, header, footer)
│   │   │   ├── page.html # Layout for standard info pages
│   │   │   └── post.html # Layout for individual blog posts
│   │   └── components/
│   │       ├── header.html
│   │       └── footer.html
│   ├── assets/           # Static files
│   │   ├── css/
│   │   │   ├── main.css  # Core design system & page layouts
│   │   │   └── a11y.css  # Focus indicators, skip-links, and print styles
│   │   ├── js/
│   │   │   └── main.js   # Optional light vanilla script (e.g. theme toggle)
│   │   └── images/       # SVG icons and presentation media
│   ├── blog/             # Blog collection folder
│   │   ├── blog.json     # Configuration file setting layout and tags for all posts
│   │   ├── first-post.md # Markdown file for first blog post
│   │   └── second-post.md
│   ├── talks/            # Talks collection folder
│   │   ├── talks.json    # Configuration setting layouts for talks
│   │   └── index.html    # Talks list layout (aggregating talk files)
│   ├── index.html        # Main/Home page
│   ├── contact.html      # Contact page
│   └── blog.html         # Blog list page (aggregates blog files)
└── _site/                # Auto-generated output folder (compiled static site)
```

---

## Plan for Content on Each Page

### 1. Base Layout (Shared Template)
To maintain consistent styling and accessibility, a base template will structure every page:
- **Skip Link**: `Skip to main content` invisible links at the top of the viewport, readable by screen readers and focusable by keyboards.
- **Header**: Navigation bar containing the brand/name and semantic navigation (`<nav>`) links: Home, Blog, Talks, Contact.
- **Footer**: Dynamic copyright year, minimalist links to primary profiles (e.g., GitHub, LinkedIn), and accessibility certification indicator.

### 2. Main (Home) Page (`src/index.html`)
An informational landing page providing context on who you are.
- **Hero / Bio Section**: Short statement introducing yourself (e.g., "Hi, I'm Glafira Zhur. An Accessibility Expert based in Bilbao...").
- **Current Focus / Interests**: Bullet points detailing your current research areas or professional services.
- **Recent Activities**: A feed listing the 2-3 most recent blog posts and talks automatically linked from those sections.

### 3. Blog (`src/blog.html` & `src/blog/*.md`)
A readable space built entirely for content.
- **List Page (`blog.html`)**:
  - Lists all blog posts dynamically sorted by date.
  - Lists each item using semantic `<article>` tags containing heading, publishing date, and a short excerpt.
- **Post Page Template (`src/_includes/layouts/post.html`)**:
  - Main heading (`<h1>`), publication date metadata, and reading time indicator.
  - The markdown-rendered article body.
  - Generous line height (1.6 - 1.8), limited reading width (`65ch` max) to prevent fatigue, and optimized font sizes.
  - Light syntax styling for code blocks if applicable.

### 4. Talks Page (`src/talks/index.html` & data inputs)
A single-page overview of public speaking engagements, panels, or workshops.
- **Content Outline**:
  - Organized chronologically (newest talks first).
  - Categorized into "Upcoming Talks" and "Past Talks".
  - Each talk lists:
    - Title of the talk.
    - Event name and date.
    - Venue / Location (or indicator if virtual).
    - Status/Links: Slides, Video recording, code repositories (if any).
    - Brief summary (2-3 sentences explaining the topic).

### 5. Contact Page (`src/contact.html`)
An informational page centered around outreach.
- **Content Outline**:
  - Brief call-to-action inviting users to reach out for speaking events, accessibility consultations, or chat.
  - Minimalist lists of links: Email, LinkedIn, GitHub, Mastodon/Bluesky.
  - External links clearly state they open in a new window/tab and utilize the necessary screen reader tags (e.g. `aria-label="LinkedIn, opens in a new tab"` or visible indicators).

---

## Content Upload Workflow (How to Publish Info)

Adding posts or talks is simple, using markdown files and Git.

### Step 1: Writing a Blog Post
To add a new blog post:
1. Navigate to the `src/blog/` directory.
2. Create a new markdown file named in kebab-case (e.g., `src/blog/demystifying-accessible-forms.md`).
3. Fill in the file with **Front Matter** configuration and markdown content:

```markdown
---
title: Demystifying Accessible Forms
description: A deep dive into modern CSS styling techniques for forms while maintaining native screen reader interactions.
date: 2026-06-12
tags:
  - accessibility
  - css
---

Writing forms is simple, but ensuring they are accessible to everyone requires precision.
Let's look at the basic markup structure...
```

4. Eleventy automatically compiles this to `_site/blog/demystifying-accessible-forms/index.html` during build.

### Step 2: Adding a Talk
Talks can be managed in two ways:
- **Option A (Separate Markdown files)**: Create `src/talks/accessible-svgs.md` with metadata in front matter.
- **Option B (Single Data File)**: Add entries to a global JSON file (`src/_data/talks.json`).

**We recommend Option B for absolute simplicity**, as all talks can be added to a single file:
```json
[
  {
    "title": "A11y in the Age of Vanilla Web Components",
    "event": "Bilbao Web Dev Meetup",
    "date": "2026-08-15",
    "location": "Bilbao, Spain",
    "description": "Explaining how to manage keyboard focus inside Shadow DOM elements.",
    "links": {
      "slides": "https://slides.com/glafira/webcomponents",
      "video": "https://youtube.com/watch?example"
    }
  }
]
```
The page template will automatically loop over this list to render the items chronologically.

### Step 3: Deployment
1. Write files locally.
2. Run `npm run build` to compile the `_site/` directory.
3. Commit and push changes to GitHub. If using a service like GitHub Pages, Vercel, Netlify, or Cloudflare Pages, they will automatically run the build and publish the changes to your domain.

---

## Accessibility Best Practices (Default Core)

We will enforce accessibility guidelines:
- **Semantic Structure**: Proper nested markup (`header`, `nav`, `main`, `footer`, headers `h1`-`h6` in order).
- **Responsive Font Sizing**: Avoid pixel-based units for layout or typography (`rem`/`em` and `clamp()` relative to user root settings).
- **Color Contrast**: Double-check color palettes to meet WCAG AA standards (4.5:1 text-to-background ratio minimum, target AAA 7:1 ratio).
- **Keyboard Navigation**: Distinct custom `:focus-visible` outlines. No hidden content blocking tab index.
- **Screen Reader Support**: Use proper attributes (`aria-current="page"` on navigation menus, `aria-describedby` or labels for links).
- **Media**: Provide alternate descriptions (`alt` text) for all images, and specify layout sizes to avoid layout shifts.

---

## Verification Plan

### Automated Checks
- **Build Linting**: Use standard node scripts to compile HTML.
- **A11y Linting**: Integrate `axe-core` checks (e.g. running Lighthouse during build or testing locally using browser developer tools).
- **Lighthouse CI**: Run audits targeting Performance, Accessibility, Best Practices, and SEO.

### Manual Verification
- **Keyboard Audit**: Verify all interactive elements are reachable and have a visible focus indicator using `Tab` and `Shift + Tab`.
- **Screen Reader Run**: Navigate the pages using standard screen readers (NVDA on Windows, VoiceOver on macOS/iOS).
- **Zoom Verification**: Ensure that viewport resizing (e.g., zooming to 200%) maintains reading flow without horizontal scrolling.
