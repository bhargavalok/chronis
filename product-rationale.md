# Product Rationale — Chronis

*Written as part of the Chronis Hiring Assessment — Task C, Component 4.*

---

## Three UX Decisions

### 1. Confidence is always visible, never hidden in a tooltip

Most analytics products show you a number and assume you trust it. Chronis does something different: every insight carries a visible confidence score rendered as a radial arc — not buried in a tooltip or footnote.

The reasoning is straightforward. Behavioral data is inherently messy. Sensors miss days. Self-reports are inconsistent. If a user acts on an insight that's only 52% confident, they may make a real change to their life based on weak evidence. That's a harm we can cause by omission.

Showing confidence visibly does two things:
- It teaches users that uncertainty is normal — not a failure of the product.
- It builds the kind of calibrated trust that keeps users engaged long-term. Users who understand what Chronis knows vs. doesn't know are far less likely to churn when a prediction misses.

The specific design choice — a radial arc rather than a percentage badge — was intentional. Arcs feel like an analog dial, something you read quickly and intuitively. A "72%" badge would invite over-precision. An arc at roughly three-quarters full reads as "mostly confident, not certain."

---

### 2. Missing data is surfaced as a first-class element, not hidden

Every place where data is absent in Chronis shows a visual gap marker — a faint dashed line on charts, a warning tag on insight cards, an explicit note in the insight detail view.

Most products fill gaps silently — interpolating, carrying forward the last value, or simply not rendering the missing point. This feels cleaner, but it's dishonest.

When behavioral data is missing, the reason often *matters*. A missing sleep reading on a Thursday might mean the user forgot to wear their device — or it might mean they had a genuinely unusual night they didn't want to log. Those two cases produce different interpretations of surrounding data. Chronis respects this ambiguity by not pretending the data exists.

The friction introduced by visible gaps is intentional. If a user sees three gap markers in a week, they're motivated to improve their data hygiene. The product improves by making incompleteness legible.

---

### 3. Narrative language instead of metric dashboards

The Narrative Timeline presents each week as a story — not a table. The week summary is written in plain language: *"The stress peak. Sleep fell to 4.9h on Nov 21st — your lowest point."*

This was a deliberate choice over a more typical approach (a heat map grid, a table of week-over-week metrics, a series of sparklines with labels).

Behavioral data becomes meaningful when it's placed in context. Raw numbers — "avg sleep 5.9h, avg mood 53" — don't create understanding. They create data anxiety. Narrative language does the interpretive work: it connects cause to effect, it names phases, it signals what was unusual and why.

The risk is that the narrative can feel presumptuous — the app "explaining" your own life back to you. We mitigate this with two choices:
- The language is always descriptive, not prescriptive. Chronis doesn't say "you should sleep more." It says "sleep fell to 4.9h — your lowest point."
- Each narrative week is paired with the raw metrics, visible in the same card. Users who want the numbers can always see them.

---

## One Tradeoff

**Showing individual data points vs. smoothed aggregates**

The Insight Explorer surfaces specific data points as evidence: *"Nov 19 → Nov 20: 5.1h sleep, +34% focus time."* This is specific and credible — users can verify it against their own memory.

But it introduces a tradeoff with privacy and comfort. Some users will be unsettled by how precisely Chronis remembers their life. Seeing a specific bad night named explicitly — *"Nov 21: lowest sleep (4.9h) and mood (38)"* — can feel clinical or even distressing.

The alternative — smoothing all evidence into aggregates — is softer, but it makes insights feel less grounded. "Your focus sessions were longer on low-sleep days" means more when illustrated with a real example.

We chose specificity, but with a deliberate softening of language. Data points are never framed as alarming events. They're framed as evidence for a pattern — the emotional weight is on the insight, not on the individual data point. "Your lowest point" names the trough without dwelling on it.

This is a tradeoff we'd continue to revisit with user research. If users frequently report feeling surveilled or distressed by specific recall, we'd move to blended evidence language. But we hypothesize that specificity builds trust faster.

---

## One Feature to Prioritize at Launch

**Contextual anchoring: "Is this normal for you?"**

The single most important missing feature is a personal baseline comparison engine — something that answers the question users actually ask when looking at their data: *"Is this week bad, or just different?"*

Right now, Chronis compares against a fixed baseline week (Week 1). That's better than nothing, but it's arbitrary. A real anchoring system would:

- Build a rolling personal baseline from the user's median week over 30–90 days
- Flag deviations that are statistically unusual for *that specific person*, not for a population norm
- Distinguish between "you're below your baseline" and "you're in your bottom 10% of weeks"

This matters because behavioral data is deeply individual. Seven hours of sleep is healthy for one person and chronically insufficient for another. A mood score of 65 could be someone's great week or someone's bad month. Population averages produce generic, often useless insights.

The feature is prioritized not because it's technically simple (it isn't) but because without it, Chronis risks becoming another app that tells people they're failing by standards that don't apply to them. Personal anchoring is the difference between a product that generates anxiety and one that generates understanding.

---

*End of document.*
