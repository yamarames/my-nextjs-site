# Stabilized Cinematic Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the current "messy" cinematic layout into a high-quality, professional editorial experience with disciplined typography and orchestrated motion.

**Architecture:** Centralized design system in Tailwind and `index.css`. Orchestrated entrance animations using Framer Motion wrappers. Grid-anchored asymmetrical layouts.

**Tech Stack:** React, Tailwind CSS, Framer Motion, Lucide React.

---

### Task 1: Global Style Discipline

**Files:**
- Modify: `src/index.css`
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Update Tailwind font and color system**
Clamp the display sizes and refine the color secondary text.

```typescript
// tailwind.config.ts refinements
extend: {
  fontSize: {
    'huge': ['clamp(3rem, 8vw, 8rem)', { lineHeight: '0.85', letterSpacing: '-0.04em' }],
    'editorial': ['clamp(1.5rem, 4vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
  },
  colors: {
    'charcoal-muted': 'rgba(20, 20, 20, 0.6)',
  }
}
```

- [ ] **Step 2: Standardize global base styles**
Ensure consistent line heights and remove "noise" from the base body font.

```css
/* src/index.css */
@layer base {
  body {
    @apply bg-background text-foreground;
    font-family: 'Plus Jakarta Sans', sans-serif;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }
  
  h1, h2, h3, h4 {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-style: italic;
  }
}
```

- [ ] **Step 3: Commit global styles**
```bash
git add src/index.css tailwind.config.ts
git commit -m "style: discipline typography and color system"
```

---

### Task 2: Refined Motion Orchestrator

**Files:**
- Modify: `src/components/MotionSection.tsx`
- Modify: `src/components/Cursor.tsx`

- [ ] **Step 1: Standardize entrance animations**
Create a consistent, high-fidelity ease for all section reveals.

```tsx
// src/components/MotionSection.tsx
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

- [ ] **Step 2: Polish custom cursor feedback**
Ensure smooth scaling and "magnet" feel for professional interaction.

```tsx
// src/components/Cursor.tsx interaction update
// ... inside useEffect
const handleMouseOver = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (target.closest("a, button, .hover-trigger")) {
    setIsHovering(true);
  } else {
    setIsHovering(false);
  }
};
```

- [ ] **Step 3: Commit motion components**
```bash
git add src/components/MotionSection.tsx src/components/Cursor.tsx
git commit -m "feat: standardize motion orchestration and cursor feedback"
```

---

### Task 3: Index Page Grid Alignment

**Files:**
- Modify: `src/pages/Index.tsx`

- [ ] **Step 1: Re-anchor Hero content**
Clean up the hero typography and center it with better white space.

- [ ] **Step 2: Align "Selected Arc" to 12-column grid**
Ensure the cards follow a predictable pattern.

```tsx
// src/pages/Index.tsx - Selected Arc Section
<div className="grid grid-cols-12 gap-8">
  {safaris.slice(0, 3).map((safari, i) => (
    <div key={safari.id} className="col-span-12 md:col-span-4">
       <SafariCard safari={safari} />
    </div>
  ))}
</div>
```

- [ ] **Step 3: Commit Index polish**
```bash
git add src/pages/Index.tsx
git commit -m "style: align index page to 12-column grid"
```

---

### Task 4: Tours "Chapter" Stabilization

**Files:**
- Modify: `src/pages/Tours.tsx`

- [ ] **Step 1: Fix overlap in Chapter layout**
Ensure the sticky image and scrolling text have proper gutter spacing.

- [ ] **Step 2: Standardize Chapter typography**
Apply the new `huge` and `editorial` scales.

- [ ] **Step 3: Commit Tours polish**
```bash
git add src/pages/Tours.tsx
git commit -m "style: stabilize tours chapter layouts"
```

---

### Task 5: Safaris Asymmetrical Grid Refinement

**Files:**
- Modify: `src/pages/Safaris.tsx`

- [ ] **Step 1: Standardize asymmetrical ratios**
Ensure the grid feels intentional by using strict `col-span` combinations.

- [ ] **Step 2: Add clip-path reveal to large images**
Implement the professional "reveal" motion on scroll.

- [ ] **Step 3: Commit Safaris polish**
```bash
git add src/pages/Safaris.tsx
git commit -m "style: refine safaris asymmetrical grid"
```

---

### Task 6: Booking Page Density Cleanup

**Files:**
- Modify: `src/pages/Booking.tsx`

- [ ] **Step 1: Refine Calendar UI**
Increase spacing and reduce "visual noise" in the date selection grid.

- [ ] **Step 2: Align Summary sidebar**
Ensure the summary feels like a professional receipt/invoice.

- [ ] **Step 3: Commit Booking polish**
```bash
git add src/pages/Booking.tsx
git commit -m "style: cleanup booking page density and flow"
```

---

### Task 7: Final Visual Audit & Verification

- [ ] **Step 1: Verify mobile responsiveness**
Check that no headers overflow and the grid collapses cleanly.
- [ ] **Step 2: Run build and lint**
Run: `npm run build`
Expected: Success with no type errors.
- [ ] **Step 3: Final Commit**
```bash
git commit -m "chore: final visual audit and performance check"
```
