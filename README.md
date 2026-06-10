# Chronis — Behavioral Intelligence Prototype

A functional prototype of the Chronis mobile web application, built for the Product & App Engineer hiring assessment (Task C).

---

## Running Locally

No build step. No dependencies. Open it directly:

```bash
# Clone or download, then:
open chronis/index.html          # macOS
start chronis/index.html         # Windows
xdg-open chronis/index.html      # Linux
```

Or serve it with any static server if you prefer (avoids any browser file:// quirks with fonts):

```bash
npx serve chronis/
# then open http://localhost:3000
```

---

## What's Built

### Component 1 — Dashboard (`/`)

The home screen. Shows:
- A **behavioral radar** — 5 dimensions (sleep, focus, social, activity, mood) benchmarked against the user's own baseline week, not population norms.
- **4 metric tiles** with sparklines and week-over-week deltas. Each tile has a directional sentiment (positive/neutral/negative) rather than just up/down arrows.
- A **"Notable shift" callout** — the most significant change this week, with its confidence score shown as a radial arc.
- A **3-insight preview** with quick-tap to the full Insight Explorer.
- A **5-week trend chart** — sleep and mood overlaid, with visual gap markers where data is missing.

### Component 2 — Insight Explorer (`/insights`)

A filterable list of 5 detected behavioral patterns. Each insight card shows:
- The category pairing (e.g. "Sleep × Focus")
- A confidence arc — rendered consistently across the whole app
- A direction indicator (positive/negative/neutral correlation)
- Missing data impact badge where relevant

Tapping any card opens the **Insight Detail** view, which shows:
- Full narrative summary of the pattern
- Evidence list with strength indicators (strong/moderate/weak) and evidence type (data point / aggregate / comparison / contextual)
- An explicit **"What Chronis doesn't know"** block — the uncertainty explanation and its estimated impact on the insight
- Related insights

### Component 3 — Narrative Timeline (`/timeline`)

A 5-week behavioral timeline for the tracked period (Nov 4 – Dec 8, 2024). Features:
- A **color-coded phase bar** across the top — baseline → shifting → peak stress → recovering → stabilizing
- **Week tabs** showing each phase label in the phase's own color
- A detailed **week narrative card** with prose summary, 4 key metrics with baseline deltas, and a "Key moments" list of notable data points
- A **full-period overlay chart** showing sleep, mood, and focus across all 35 days with week dividers

### Component 4 — Product Rationale

See [`product-rationale.md`](./product-rationale.md) for:
- 3 UX decisions with reasoning
- 1 tradeoff and how it was navigated
- 1 future feature to prioritize at launch

---

## Technical Decisions

**No framework, no chart library.** Everything is vanilla HTML, CSS, and JavaScript. The chart engine (`js/charts.js`) renders pure SVG — Catmull-Rom smoothed line charts, radial confidence arcs, radar charts, sparklines — all from scratch. This keeps the bundle at zero kilobytes of dependencies and makes every visual element inspectable.

**Mobile-first, responsive.** The layout is designed as a 420px mobile shell. On wider screens it displays as a centered "phone" with ambient glow. It runs identically on desktop and mobile browsers.

**Separation of concerns:**
```
js/data.js    — all mock data + helper functions
js/charts.js  — pure SVG rendering engine (no state)
js/app.js     — routing, view rendering, event handling
css/styles.css — complete design system (custom properties, no utility classes)
```

**Data model.** 35 days of behavioral readings for a fictional user (Alex Chen) across 5 metrics. The data tells a coherent story — a stress peak in week 3 with clear upstream signals in week 2, followed by active recovery in weeks 4–5. Insights are derived from this data and cross-referenced with real evidence points. Missing data (3 days across the period) is surfaced everywhere it affects interpretation.

---

## File Structure

```
chronis/
├── index.html              ← entry point
├── css/
│   └── styles.css          ← full design system
├── js/
│   ├── data.js             ← mock data + helpers
│   ├── charts.js           ← SVG chart engine
│   └── app.js              ← router + views
└── product-rationale.md    ← Component 4 document
```

---

## Design Notes

The color system uses a warm dark palette — deep blue-black backgrounds with a gold accent (`#D4A96A`) and muted teal secondary (`#5FADA8`). The warmth is intentional: behavioral data is personal, and a cold corporate palette would feel out of place. Typography pairs Syne (display/headings) with DM Sans (body) and JetBrains Mono (data values).

The app avoids the word "healthy." It avoids prescriptive language entirely. Chronis describes patterns — it doesn't diagnose or advise. This is a deliberate product decision, not a limitation of the prototype.


## Screenshots
[./assets]
