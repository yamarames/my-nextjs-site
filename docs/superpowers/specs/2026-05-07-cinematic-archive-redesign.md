# Design Spec: The Cinematic Archive Redesign

## Goal
Transform the generic, grid-based "Tours" and "Safaris" pages into high-end, professionally curated "Cinematic Archives" that match the visual fidelity and "Ultra-Luxe" aesthetic of the Home page.

## Core Aesthetic Principles
- **High-Energy Motion:** Use GSAP ScrollTrigger and Framer Motion for orchestrated, smooth, and dramatic transitions.
- **Asymmetry & Editorial Layout:** Move away from standard 4-column grids. Use varying image sizes, intentional whitespace, and overlapping elements.
- **Cinematic Visuals:** 100vh headers with video backgrounds, grayscale-to-color transitions, and parallax typography.
- **Curated Grouping:** Organize content into "Chapters" or "Collections" rather than a single list.

## Implementation Details

### 1. Tours Page (Tours.tsx)
- **Header:** 100vh hero section with a fast-cut video loop or high-resolution stills. Large `font-display` typography with a "Chapter 01" style label.
- **Themed Series:** Group tours into "The Island Series," "The Cultural Series," etc.
- **Split-Screen Sections:** Each series starts with a split-screen section. Left side is a fixed cinematic visual; right side scrolls through the tours in that series.
- **Card Design:** Redesigned `TourCard` with more sophisticated hover states, custom cursors (using the existing `Cursor.tsx`), and better info hierarchy.

### 2. Safaris/Collections Page (Safaris.tsx)
- **Header:** 100vh hero section ("The Collection"). Deep parallax text.
- **Frontier Grouping:** Group by "Northern Frontier," "Southern Wilderness," etc.
- **Immersive Grid:** Use a staggered, asymmetrical grid for the cards. Some cards will span 2 columns or have different aspect ratios (e.g., vertical vs. wide).
- **Video Interstitials:** Full-width cinematic video breaks between major geographic collections.

### 3. Shared Components & Hooks
- **GSAP Orchestrator:** A shared hook or wrapper to handle the complex ScrollTrigger logic across both pages.
- **Enhanced Motion Primitives:** Reusable Framer Motion components for "Staggered Bleed" (images fading in with a clip-path) and "Kinetic Text" (text that moves with scroll).

## Success Criteria
- The pages must feel like part of the same "Ultra-Luxe" world as the Home page.
- No "boilerplate" feel; every section should feel intentionally designed by a human with high design experience.
- Interaction must be fluid and high-fidelity (60fps motion).

## Technical Requirements
- React (TypeScript)
- Framer Motion
- GSAP + ScrollTrigger
- Tailwind CSS
- Lucide React Icons
