## 2025-05-14 - Adapting Focus States for High-Contrast Sections
**Learning:** In minimalist portfolios with alternating light/dark sections, global focus indicators often fail color contrast requirements on one of the backgrounds. Using CSS variables already defined in the design system (e.g., `--acc-light`) for `:focus-visible` overrides on dark containers ensures consistent accessibility without introducing new design tokens.
**Action:** Always check `:focus-visible` contrast on all section background variations and use existing theme variables for adaptive overrides.
