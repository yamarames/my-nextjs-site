# Cinematic Archive Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the generic grid layouts of Tours and Safaris pages into a high-end, cinematic archive with orchestrated motion and asymmetrical designs.

**Architecture:** We will use GSAP ScrollTrigger to coordinate full-page transitions and "Chapter" based navigation. Asymmetrical layouts will be achieved using Tailwind's grid and staggered Framer Motion animations.

**Tech Stack:** React, Framer Motion, GSAP + ScrollTrigger, Tailwind CSS.

---

### Task 1: Motion Infrastructure & Base Layouts

**Files:**
- Create: `src/components/MotionSection.tsx`
- Modify: `src/pages/Tours.tsx`
- Modify: `src/pages/Safaris.tsx`

- [ ] **Step 1: Create MotionSection component**
Create a reusable component for orchestrated entrance animations.

```tsx
import { motion } from "framer-motion";

export const MotionSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);
```

- [ ] **Step 2: Initialize GSAP in Tours.tsx**
Replace the simple header with a 100vh cinematic hero.

```tsx
// src/pages/Tours.tsx replacement for header
<section className="relative h-screen bg-charcoal flex items-center justify-center overflow-hidden">
  <div className="absolute inset-0 z-0">
    <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-40 grayscale">
      <source src="/videos/tours-hero.mp4" type="video/mp4" />
    </video>
    <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-transparent to-charcoal" />
  </div>
  <div className="relative z-10 text-center">
    <span className="text-[10px] font-bold tracking-[1em] uppercase text-amber mb-6 block">Chapter 01</span>
    <h1 className="text-white text-[12vw] font-display leading-[0.8] italic tracking-tighter">
      The Island <br /> <span className="text-amber/90">Series.</span>
    </h1>
  </div>
</section>
```

- [ ] **Step 3: Commit Infrastructure**
```bash
git add src/components/MotionSection.tsx src/pages/Tours.tsx
git commit -m "chore: setup motion infrastructure for tours"
```

---

### Task 2: Tours Redesign (Themed Chapters)

**Files:**
- Modify: `src/pages/Tours.tsx`

- [ ] **Step 1: Group Tours by Category**
Modify the logic to group tours into "Themed Chapters" as per the spec.

- [ ] **Step 2: Implement Split-Screen Chapter Layout**
Implement the split-screen layout where the left side is a fixed cinematic visual and the right side scrolls.

```tsx
// Inside Tours.tsx
{groupedTours.map((group, index) => (
  <section key={group.category} className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
    <div className="sticky top-0 h-screen overflow-hidden hidden lg:block border-r border-charcoal/5">
       <img src={group.featuredImage} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[2000ms]" />
       <div className="absolute inset-0 bg-charcoal/10" />
       <div className="absolute bottom-12 left-12">
          <span className="text-[8px] font-bold tracking-[0.5em] text-white/50 uppercase">Series {index + 1}</span>
          <h2 className="text-5xl text-white font-display italic mt-2">{group.category}</h2>
       </div>
    </div>
    <div className="py-24 px-12 lg:px-24 space-y-24">
       {group.items.map(tour => (
         <TourCard key={tour.id} tour={tour} />
       ))}
    </div>
  </section>
))}
```

- [ ] **Step 3: Refine TourCard design**
Make it more minimal and editorial.

- [ ] **Step 4: Verify and Commit**
Check responsive layout.
```bash
git add src/pages/Tours.tsx
git commit -m "feat: implement cinematic chapter layout for tours"
```

---

### Task 3: Safaris Redesign (Immersive Grid)

**Files:**
- Modify: `src/pages/Safaris.tsx`

- [ ] **Step 1: Implement 100vh Hero**
Similar to Tours, use a massive hero with parallax typography.

- [ ] **Step 2: Implement Asymmetrical Grid**
Instead of a 3-column grid, use a staggered layout where images have different aspect ratios.

```tsx
// src/pages/Safaris.tsx grid replacement
<div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
  {safaris.map((safari, i) => (
    <div key={safari.id} className={i % 3 === 0 ? "md:col-span-8" : "md:col-span-4"}>
       <SafariCard safari={safari} isLarge={i % 3 === 0} />
    </div>
  ))}
</div>
```

- [ ] **Step 3: Add Video Interstitials**
Insert full-width video sections between geographic collections.

- [ ] **Step 4: Verify and Commit**
```bash
git add src/pages/Safaris.tsx
git commit -m "feat: implement immersive asymmetrical grid for safaris"
```

---

### Task 4: Final Polish & Hover States

**Files:**
- Modify: `src/index.css`
- Modify: `src/components/Cursor.tsx`

- [ ] **Step 1: Enhance Global Hovers**
Ensure all `hover-trigger` elements interact with the custom cursor and use the grayscale-to-color bleed.

- [ ] **Step 2: Add Smooth Scroll**
Optionally add Lenis or a simple GSAP smooth scroll to enhance the "high-end" feel.

- [ ] **Step 3: Final Verification**
Run `npm run build` to ensure no production issues.
```bash
npm run build
```

- [ ] **Step 4: Final Commit**
```bash
git commit -m "style: final polish and cinematic enhancements"
```
