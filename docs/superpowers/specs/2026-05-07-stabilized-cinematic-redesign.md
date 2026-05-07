# Stabilized Cinematic Redesign Specification

**Date:** 2026-05-07
**Goal:** Transform the current "messy" cinematic layout into a high-quality, professional editorial experience with disciplined typography and orchestrated motion.

## 1. Visual Language

### Typography
- **Display Headings:** 'Cormorant Garamond', italic. Clamp size between `3rem` and `8rem` (max `8vw`).
- **Body Text:** 'Plus Jakarta Sans', `1rem` (16px), `1.6` line-height.
- **Labels/Utility:** 'Plus Jakarta Sans', bold, `8px` or `10px`, tracking `0.4em`, uppercase.
- **Pull Quotes:** 'Cormorant Garamond', italic, `1.5rem`, `charcoal/60`.

### Color Palette
- **Primary:** `Sand` (#F7F3ED) background.
- **Accent:** `Amber` (#C9965E) for highlights and cursor.
- **Text:** `Charcoal` (#141414) for primary, `Charcoal/60` for secondary.
- **Interactive:** Grayscale-to-color transitions (2000ms ease).

## 2. Layout System

### Grid Architecture
- **Global Grid:** Strict 12-column CSS grid.
- **Asymmetry Rules:** 
  - Featured items: Span 8 columns, offset by 1.
  - Sidebar text: Span 3 columns, offset by 1.
  - Spacing: Consistent `py-24` or `py-32` for major sections.

### Component Logic
- **Cards:** Aspect ratios fixed to `3:4` or `16:9`. No "floating" cards without grid anchors.
- **Headers:** 100vh cinematic heroes with video or high-res images.

## 3. Motion & Interaction

### Animation Orchestration (Framer Motion)
- **Entrance:** `y: 30` to `y: 0`, `opacity: 0` to `opacity: 1`, duration `1.2s`, ease `[0.16, 1, 0.3, 1]`.
- **Stagger:** `0.1s` delay between child elements in a list.
- **Reveal:** `clip-path` transitions for large section images.

### Custom Cursor
- Magnetize effect on `A` and `BUTTON` tags.
- Scale up and color bleed when hovering `hover-trigger` elements.

## 4. Page-Specific Refinements

- **Index:** Simplify hero text, align "Selected Arc" to grid.
- **Tours:** Stabilize "Chapter" sticky images; ensure text doesn't overlap on small screens.
- **Safaris:** Standardize the "Immersive Grid" aspect ratios.
- **Booking:** Clean up the "Temporal Selection" calendar for better density.

## 5. Success Criteria
- No horizontal scrolling on mobile.
- All text remains readable (contrast and size).
- Motion feels "heavy" and "intentional" rather than "glitchy."
