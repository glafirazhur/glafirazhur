---
title: "Semantic HTML: The Foundation of Digital Accessibility"
description: Why native HTML elements are the most important tools in an accessibility expert's toolkit.
date: 2026-06-01
tags:
  - HTML
  - accessibility
---

In the modern web ecosystem, developers often get caught up in complex state management, styling libraries, and bundlers. However, the most critical factor for making a site accessible happens before any script runs. It starts with **Semantic HTML**.

Semantic HTML is the use of HTML markup to reinforce the semantics, or meaning, of the information in webpages and web applications rather than merely to define its presentation or look.

## The Pitfall of the "Div-Button"

Consider a clickable element on a page. It's common to see developers write code like this:

```html
<!-- Avoid this! -->
<div class="my-custom-button" onclick="submitForm()">
  Save Settings
</div>
```

While this might look and act like a button for a sighted mouse user, it presents three major accessibility issues:

1. **No Keyboard Support**: A `div` is not in the default tab order. A keyboard-only user cannot tab to it.
2. **No Screen Reader Exposure**: A screen reader will announce this simply as "Save Settings, text" rather than identifying it as an interactive element.
3. **No Active State**: Keyboards usually trigger buttons using `Enter` or `Space`. A `div` doesn't listen to these by default.

### The Native Fix

By switching to native HTML elements, these problems vanish instantly:

```html
<!-- Native and accessible by default -->
<button onclick="submitForm()">
  Save Settings
</button>
```

The native `<button>` element is focusable by default, responds to `Enter` and `Space` keyboard inputs, and announces its role to assistive technologies automatically.

## Landmark Roles

Semantic HTML doesn't stop at buttons. Elements like `<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, and `<footer>` act as **landmarks**. Screen reader users can use navigation shortcuts to jump directly from landmark to landmark (e.g., bypassing a long navigation bar to get straight to the `<main>` content).

> **Important**: Always design with native elements first. Before writing custom ARIA attributes (`role="button"`, `tabindex="0"`), ask yourself if you can use a native element instead. As the first rule of ARIA states: **"If you can use a native HTML element or attribute with the semantics and behavior you require, do so rather than re-purposing an element and adding an ARIA role."**
