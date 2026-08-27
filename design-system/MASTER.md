# First Economy — Design System Master

Editorial agency + technology. These tokens are the **website system we have been using**, not necessarily the legally defined brand-master values. Verify exact production font names and official brand hex values from First Economy source files before a hard production lock.

## Product

Integrated growth partner site. Sharp, grid-based, campaign-led. Not SaaS UI.

## Locked tokens

```css
--color-paper: #F4F4F2;
--color-black: #0A0A0A;
--color-red: #D22525;
--color-white: #FFFFFF;
--color-muted: #8A8A8A;
--color-border: #C9C9C9;

--font-display: "Barlow Condensed", sans-serif;
--font-body: "Archivo", sans-serif;

--radius-sm: 4px;
--radius-md: 8px;

--space-xs: 8px;
--space-sm: 16px;
--space-md: 24px;
--space-lg: 48px;
--space-xl: 84px;
--space-section: 120px;
```

Implementation aliases in CSS:

| Alias | Maps to | Used for |
| --- | --- | --- |
| `--color-ink` | `--color-black` | Type, dark sections, primary CTA |
| `--color-line` | `--color-border` | Thin dividers and card borders |
| `--color-mist` | `#E5E5E5` | Alternate light bands |
| `--font-heading` | `--font-display` | Major statements |

## Typography

| Role | Font | Weight |
| --- | --- | --- |
| Primary display | Barlow Condensed | Bold / ExtraBold (700–800) |
| Secondary display (concepts only) | Archivo Narrow / Bebas-style | — |
| Body | Archivo | Regular / Medium (400–500) |
| Navigation | Archivo | SemiBold (600) |
| Fallback body | Inter / Manrope-type | — |

Rules:

1. Oversized condensed type for major statements.
2. Metrics use oversized condensed numbers.
3. Body stays a neutral sans. Do not set long-form copy in the display face.

## Color

| Token | Hex | Use |
| --- | --- | --- |
| Paper | `#F4F4F2` | Primary page canvas |
| Black | `#0A0A0A` | Type, dark sections, primary CTA |
| Red | `#D22525` | Emphasis, active states, numbers, arrows, key words only |
| White | `#FFFFFF` | True white surfaces and selection text |
| Muted | `#8A8A8A` | Secondary copy |
| Border | `#C9C9C9` | Thin dividers and card edges |
| Mist | `#E5E5E5` | Alternate light section band |

Light sections: paper + black type. Dark sections: black + white/paper type + red accents.

## Layout

12-column desktop grid. Use `.container-frame` for page-width sections and `.container-content` for reading/measure sections. Fluid until `xl`, then capped.

| Breakpoint | Viewport | Gutter | Frame | Content |
| --- | --- | --- | --- | --- |
| Default | <480px | 20px | 100% | 100% |
| xs | ≥480px | 24px | 100% | 100% |
| sm | ≥640px | 32px | 100% | 100% |
| md | ≥768px | 40px | 100% | 100% |
| lg | ≥1024px | 48px | 100% | 100% |
| xl | ≥1280px | 64px | 1440px | 1280px |
| 2xl | ≥1536px | 80px | 1600px | 1360px |
| 3xl | ≥1920px | 96px | 1800px | 1520px |
| 4xl | ≥2560px | 120px | 2100px | 1760px |

- Section spacing ~96–160px; token `--space-section: 120px`
- Header and footer stay consistent on every page
- Footer is always dark

## Components

| Element | Rule |
| --- | --- |
| Card radius | 0–8px, mostly sharp |
| Button radius | Minimal / square. Never pill-shaped |
| Primary CTA | Black background, white text, arrow. Hover: red, subtle arrow movement |
| Secondary CTA | Text link or outline with arrow |
| Cards | Thin border, flat surface, minimal shadow |
| Icons | Thin-line, monochrome, technical/editorial |
| Graphic motif | Radial / circular line system (Growth System) |
| Arrow motif | Circular arrow or simple right arrow |
| Images | Campaign-led, large editorial crops. No decorative stock |

## Motion

Typography moves, images reveal, numbers count, lines connect, arrows respond.

GSAP: hero timelines, section reveals, counters, pinned galleries, section-nav state.

On mobile: simplify motion and stack vertically. Respect `prefers-reduced-motion`.

## Page patterns

- Case studies: Overview → Objective → Approach → Execution → Results → Impact
- Make metrics visually dominant when showing results
- Radial graphic is the main visual metaphor for the Growth System

## Anti-patterns

- Large rounded cards
- Glassmorphism
- Blue/purple gradients
- Pill-shaped buttons
- Heavy shadows
- Generic SaaS dashboard patterns
- Decorative stock photography
- Using red as a fill color except CTA hover, active states, and emphasis
