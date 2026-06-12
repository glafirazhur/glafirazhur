---
title: Styling Accessible Focus Indicators
description: How to build gorgeous focus rings that work with keyboard navigation using modern CSS focus-visible.
date: 2026-06-08
tags:
  - css
  - accessibility
---

For many years, the first thing CSS resets did was strip away keyboard focus rings:

```css
/* The worst CSS rule ever written */
*:focus {
  outline: none;
}
```

Stripping focus indicators makes a website unusable for keyboard navigators, who rely on the outline to know where they are on the page. Historically, designers disliked the default outline because it appeared when clicking elements with a mouse.

Today, modern browsers support the `:focus-visible` pseudo-class, solving this issue completely.

## Enter `:focus-visible`

The `:focus-visible` pseudo-class allows you to apply focus styles *only* when the browser determines that focus should be visible (typically when navigating using a keyboard, or when focused via script).

Here is an accessible, modern focus strategy:

```css
/* 1. Remove the default browser outline */
*:focus {
  outline: none;
}

/* 2. Add custom, high-contrast outlines for keyboard focus only */
*:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 3px;
  border-radius: 4px;
}
```

### Why Outline Offset Matters

By using `outline-offset`, we push the focus indicator slightly away from the element boundary. This ensures that:
- The focus indicator doesn't overlap or hide borders.
- The contrast between the outline and the element background remains high.
- The indicator is clean and distinct.

## WCAG Contrast Requirements

According to WCAG 2.1 Success Criterion 1.4.11 (Non-text Contrast), the focus indicator must have a contrast ratio of at least **3:1** against the adjacent background.

Using CSS variables combined with custom focus styles makes it easy to satisfy this requirement in both dark and light modes.
