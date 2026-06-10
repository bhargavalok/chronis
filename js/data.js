// ─── Chronis Mock Behavioral Data ───────────────────────────────────────────
// Subject: Alex Chen | Period: Nov 4 – Dec 8, 2024

const CHRONIS_DATA = {
  user: {
    name: "Alex",
    period: { start: "Nov 4", end: "Dec 8, 2024" },
    totalDays: 35,
    missingDays: 3
  },

  // ── Daily readings. Each entry: { date, sleep_h, sleep_quality, steps, focus_min, social_interactions, mood_score }
  daily: [
    // Week 1: Nov 4–10 — strong baseline
    { date: "2024-11-04", sleep_h: 7.2, sleep_quality: 78, steps: 8420, focus_min: 142, social: 6, mood: 72 },
    { date: "2024-11-05", sleep_h: 7.5, sleep_quality: 81, steps: 9100, focus_min: 158, social: 8, mood: 75 },
    { date: "2024-11-06", sleep_h: 6.9, sleep_quality: 74, steps: 7800, focus_min: 135, social: 5, mood: 68 },
    { date: "2024-11-07", sleep_h: 7.8, sleep_quality: 85, steps: 10200, focus_min: 175, social: 9, mood: 80 },
    { date: "2024-11-08", sleep_h: 8.1, sleep_quality: 88, steps: 11000, focus_min: 190, social: 12, mood: 84 },
    { date: "2024-11-09", sleep_h: 8.4, sleep_quality: 90, steps: 6500, focus_min: 60, social: 15, mood: 88 },
    { date: "2024-11-10", sleep_h: 8.0, sleep_quality: 86, steps: 5200, focus_min: 45, social: 14, mood: 85 },

    // Week 2: Nov 11–17 — early signs of disruption
    { date: "2024-11-11", sleep_h: 6.8, sleep_quality: 71, steps: 8900, focus_min: 128, social: 7, mood: 66 },
    { date: "2024-11-12", sleep_h: 6.5, sleep_quality: 67, steps: 9200, focus_min: 145, social: 6, mood: 63 },
    { date: "2024-11-13", sleep_h: 6.2, sleep_quality: 63, steps: 8700, focus_min: 162, social: 4, mood: 58 },  // data missing next day
    { date: "2024-11-14", sleep_h: null, sleep_quality: null, steps: null, focus_min: null, social: null, mood: null }, // MISSING
    { date: "2024-11-15", sleep_h: 5.9, sleep_quality: 58, steps: 7600, focus_min: 168, social: 3, mood: 52 },
    { date: "2024-11-16", sleep_h: 7.1, sleep_quality: 72, steps: 4800, focus_min: 40, social: 11, mood: 68 },
    { date: "2024-11-17", sleep_h: 7.4, sleep_quality: 75, steps: 5100, focus_min: 35, social: 13, mood: 71 },

    // Week 3: Nov 18–24 — stress peak
    { date: "2024-11-18", sleep_h: 5.4, sleep_quality: 52, steps: 9800, focus_min: 195, social: 2, mood: 44 },
    { date: "2024-11-19", sleep_h: 5.1, sleep_quality: 48, steps: 10100, focus_min: 210, social: 1, mood: 41 },
    { date: "2024-11-20", sleep_h: 5.6, sleep_quality: 55, steps: 9400, focus_min: 188, social: 2, mood: 46 },
    { date: "2024-11-21", sleep_h: 4.9, sleep_quality: 44, steps: 8900, focus_min: 220, social: 1, mood: 38 }, // trough
    { date: "2024-11-22", sleep_h: 5.8, sleep_quality: 57, steps: 7800, focus_min: 175, social: 3, mood: 49 },
    { date: "2024-11-23", sleep_h: 7.6, sleep_quality: 79, steps: 4500, focus_min: 30, social: 10, mood: 72 },
    { date: "2024-11-24", sleep_h: 8.2, sleep_quality: 87, steps: 6200, focus_min: 25, social: 16, mood: 81 },

    // Week 4: Nov 25–Dec 1 — recovery begins
    { date: "2024-11-25", sleep_h: 6.8, sleep_quality: 70, steps: 8500, focus_min: 152, social: 5, mood: 65 },
    { date: "2024-11-26", sleep_h: 7.0, sleep_quality: 73, steps: 9100, focus_min: 158, social: 6, mood: 69 },
    { date: "2024-11-27", sleep_h: 7.3, sleep_quality: 77, steps: 9600, focus_min: 148, social: 7, mood: 72 },
    { date: "2024-11-28", sleep_h: null, sleep_quality: null, steps: null, focus_min: null, social: null, mood: null }, // MISSING
    { date: "2024-11-29", sleep_h: 7.6, sleep_quality: 80, steps: 10400, focus_min: 165, social: 8, mood: 76 },
    { date: "2024-11-30", sleep_h: 8.3, sleep_quality: 88, steps: 5800, focus_min: 55, social: 14, mood: 83 },
    { date: "2024-12-01", sleep_h: 8.0, sleep_quality: 85, steps: 5200, focus_min: 40, social: 17, mood: 82 },

    // Week 5: Dec 2–8 — new equilibrium
    { date: "2024-12-02", sleep_h: 7.4, sleep_quality: 79, steps: 9200, focus_min: 160, social: 7, mood: 74 },
    { date: "2024-12-03", sleep_h: 7.6, sleep_quality: 81, steps: 9800, focus_min: 155, social: 8, mood: 76 },
    { date: "2024-12-04", sleep_h: 7.5, sleep_quality: 80, steps: 10100, focus_min: 162, social: 7, mood: 75 },
    { date: "2024-12-05", sleep_h: 7.8, sleep_quality: 83, steps: 10500, focus_min: 170, social: 9, mood: 78 },
    { date: "2024-12-06", sleep_h: 7.7, sleep_quality: 82, steps: 9700, focus_min: 158, social: 8, mood: 77 },
    { date: "2024-12-07", sleep_h: null, sleep_quality: null, steps: null, focus_min: null, social: null, mood: null }, // MISSING
    { date: "2024-12-08", sleep_h: 8.1, sleep_quality: 86, steps: 5500, focus_min: 45, social: 15, mood: 82 },
  ],

  // ── Weekly aggregates
  weeks: [
    {
      id: "w1",
      label: "Nov 4–10",
      shortLabel: "Wk 1",
      summary: "A solid baseline. Sleep was consistent, social energy was high, and focus came easily. This week became the reference point Chronis uses when evaluating what 'good' looks like for you.",
      highlights: ["Best average sleep quality of the period (83)", "Highest weekend social engagement", "Focus sessions averaged 129 min/day"],
      mood_avg: 78.9,
      sleep_avg: 7.7,
      focus_avg: 129,
      steps_avg: 8489,
      social_avg: 9.9,
      phase: "baseline"
    },
    {
      id: "w2",
      label: "Nov 11–17",
      shortLabel: "Wk 2",
      summary: "Something shifted mid-week. Sleep started shortening while work focus sessions got longer — an early sign of the tradeoff that would peak the following week. One day of data is missing.",
      highlights: ["Sleep dropped 1.0h vs. week 1", "Focus sessions 14% longer than baseline", "Social interactions halved on weekdays"],
      mood_avg: 63.0,
      sleep_avg: 6.6,
      focus_avg: 113,
      steps_avg: 8700,
      social_avg: 7.3,
      phase: "early-decline",
      missing_days: 1
    },
    {
      id: "w3",
      label: "Nov 18–24",
      shortLabel: "Wk 3",
      summary: "The stress peak. Sleep fell to 4.9h on Nov 21st — your lowest point. Simultaneously, focus sessions hit their highest values, and social interactions nearly disappeared on weekdays. The weekend showed a sharp rebound, suggesting the pressure was external and time-bounded.",
      highlights: ["Nov 21: lowest sleep (4.9h) and mood (38)", "Focus sessions averaged 204 min Mon–Fri", "Weekend social interactions +68% vs. weekday avg"],
      mood_avg: 53.0,
      sleep_avg: 5.9,
      focus_avg: 139,
      steps_avg: 7900,
      social_avg: 5.0,
      phase: "stress-peak"
    },
    {
      id: "w4",
      label: "Nov 25–Dec 1",
      shortLabel: "Wk 4",
      summary: "Recovery mode. Sleep extended back toward baseline, focus sessions normalized, and social energy returned. One data gap on Nov 28. The pattern suggests an active recovery — not passive drift.",
      highlights: ["Sleep trending +0.2h each night", "Focus returned to baseline levels", "Social interactions back to week 1 range"],
      mood_avg: 74.5,
      sleep_avg: 7.5,
      focus_avg: 103,
      steps_avg: 8000,
      social_avg: 9.5,
      phase: "recovery",
      missing_days: 1
    },
    {
      id: "w5",
      label: "Dec 2–8",
      shortLabel: "Wk 5",
      summary: "A new equilibrium. Sleep, focus, and social patterns stabilized in a range slightly different from week 1 — more consistent, slightly less variable. Whether this is adaptation or settling is something Chronis will watch over the next 2–3 weeks.",
      highlights: ["Most consistent week: lowest day-to-day sleep variance", "Focus sessions stable at 160 min/day", "Mood sustained above 74 all measured days"],
      mood_avg: 76.5,
      sleep_avg: 7.7,
      focus_avg: 138,
      steps_avg: 9133,
      social_avg: 9.0,
      phase: "new-equilibrium",
      missing_days: 1
    }
  ],

  // ── Insights
  insights: [
    {
      id: "ins-001",
      title: "Your focus sessions extend when sleep drops below 6.5h",
      category: "sleep-focus",
      categoryLabel: "Sleep × Focus",
      confidence: 0.89,
      direction: "negative",
      summary: "On nights where you slept under 6.5 hours, the following day's focus sessions were 22–34% longer — but self-reported output quality was lower. This suggests compensating with time rather than efficiency.",
      evidence: [
        { label: "Nov 13 →14: 6.2h sleep, +28% focus time", type: "data-point", strength: "strong" },
        { label: "Nov 19 →20: 5.1h sleep, +34% focus time", type: "data-point", strength: "strong" },
        { label: "Nov 20 →21: 5.6h sleep, +25% focus time", type: "data-point", strength: "moderate" },
        { label: "Pattern holds across 8 of 9 qualifying nights", type: "aggregate", strength: "strong" }
      ],
      uncertainty: "One qualifying night (Nov 14) has no data. Pattern calculated from remaining 8 instances.",
      missing_data_impact: "low",
      related: ["ins-002", "ins-004"],
      first_seen: "2024-11-20"
    },
    {
      id: "ins-002",
      title: "Social interactions drop sharply during high-focus periods",
      category: "social-focus",
      categoryLabel: "Social × Focus",
      confidence: 0.83,
      direction: "negative",
      summary: "On days where focus sessions exceeded 180 minutes, your social interaction count fell by an average of 62%. This is one of Chronis's clearest detected correlations — but the causal direction is uncertain.",
      evidence: [
        { label: "Nov 18–21: avg 204 min focus, avg 1.5 social interactions", type: "aggregate", strength: "strong" },
        { label: "Baseline (Wk 1): avg 162 min focus, avg 8 social interactions", type: "comparison", strength: "strong" },
        { label: "Weekends consistently broke the pattern, suggesting it's situational", type: "contextual", strength: "moderate" }
      ],
      uncertainty: "Chronis can't determine if high focus caused social withdrawal, or shared stress caused both. Social data is self-reported and may undercount passive interactions.",
      missing_data_impact: "low",
      related: ["ins-001", "ins-003"],
      first_seen: "2024-11-22"
    },
    {
      id: "ins-003",
      title: "Weekend recovery is faster when Saturday social engagement is high",
      category: "social-recovery",
      categoryLabel: "Social × Recovery",
      confidence: 0.72,
      direction: "positive",
      summary: "In weeks 3 and 4, the speed of mood recovery from Sunday to Monday correlated with Saturday social interaction levels. Weeks with higher Saturday engagement showed Monday moods 12–18 points higher.",
      evidence: [
        { label: "Nov 23 (Sat): 10 interactions → Nov 25 (Mon) mood: 65", type: "data-point", strength: "moderate" },
        { label: "Nov 24 (Sat): 16 interactions → Nov 25 mood baseline strong", type: "data-point", strength: "moderate" },
        { label: "Trend consistent across 3 of 4 measured weekend pairs", type: "aggregate", strength: "moderate" }
      ],
      uncertainty: "Sample size is small (5 weekend pairs). Confidence will improve with 4+ more weeks of data. Weekend of Nov 28–Dec 1 partially missing.",
      missing_data_impact: "moderate",
      related: ["ins-002"],
      first_seen: "2024-11-28"
    },
    {
      id: "ins-004",
      title: "Steps above 10,000 consistently follow high-quality sleep nights",
      category: "sleep-activity",
      categoryLabel: "Sleep × Activity",
      confidence: 0.76,
      direction: "positive",
      summary: "On the day following a sleep quality score of 85+, your step count exceeded 10,000 in 5 of 6 instances. The pattern didn't hold in the reverse direction — high steps didn't predict better sleep the next night.",
      evidence: [
        { label: "Nov 7 (quality 85) → Nov 8: 11,000 steps", type: "data-point", strength: "strong" },
        { label: "Nov 8 (quality 88) → Nov 9: 10,200 steps (weekend)", type: "data-point", strength: "strong" },
        { label: "Nov 23 (quality 87) → Nov 24: 6,200 steps (weekend, reduced)", type: "data-point", strength: "weak" },
        { label: "Dec 5 (quality 83) → Dec 6: 9,700 steps", type: "data-point", strength: "moderate" }
      ],
      uncertainty: "Weekend days consistently show lower step counts regardless of sleep quality, which may confound this pattern. Weekday-only confidence is higher (~0.88).",
      missing_data_impact: "low",
      related: ["ins-001"],
      first_seen: "2024-11-25"
    },
    {
      id: "ins-005",
      title: "Mood recovery lagged sleep recovery by approximately 1.5 days",
      category: "sleep-mood",
      categoryLabel: "Sleep × Mood",
      confidence: 0.81,
      direction: "neutral",
      summary: "When your sleep improved after the stress peak, mood scores didn't follow immediately. There was a consistent 1–2 day lag before mood caught up. This is worth knowing: a single good night won't reset how you feel.",
      evidence: [
        { label: "Sleep improved Nov 22 → Mood improved Nov 23–24", type: "data-point", strength: "strong" },
        { label: "Sleep improved Nov 25–26 → Mood followed Nov 27", type: "data-point", strength: "moderate" },
        { label: "Pattern consistent across both recovery periods detected", type: "aggregate", strength: "strong" }
      ],
      uncertainty: "Mood scoring is subjective. The lag measurement assumes linear recovery, which may not be accurate.",
      missing_data_impact: "low",
      related: ["ins-001", "ins-003"],
      first_seen: "2024-11-29"
    }
  ],

  // ── Dashboard summary metrics
  dashboard: {
    currentWeekLabel: "This week",
    previousWeekLabel: "Last week",
    metrics: [
      {
        id: "sleep",
        label: "Avg Sleep",
        value: "7.7h",
        rawValue: 7.7,
        delta: "+0.2h",
        deltaDir: "up",
        sentiment: "positive",
        subtext: "vs last week",
        sparkline: [7.4, 7.6, 7.5, 7.8, 7.7, null, 8.1]
      },
      {
        id: "focus",
        label: "Focus Time",
        value: "161 min",
        rawValue: 161,
        delta: "+1.8%",
        deltaDir: "up",
        sentiment: "neutral",
        subtext: "vs last week",
        sparkline: [160, 155, 162, 170, 158, null, 45]
      },
      {
        id: "mood",
        label: "Mood Score",
        value: "76.5",
        rawValue: 76.5,
        delta: "+2.7",
        deltaDir: "up",
        sentiment: "positive",
        subtext: "vs last week",
        sparkline: [74, 76, 75, 78, 77, null, 82]
      },
      {
        id: "social",
        label: "Social",
        value: "9 / day",
        rawValue: 9,
        delta: "−0.5",
        deltaDir: "down",
        sentiment: "neutral",
        subtext: "vs last week",
        sparkline: [7, 8, 7, 9, 8, null, 15]
      }
    ],
    activeInsights: 5,
    newInsights: 1,
    dataHealth: 88, // percent of expected data points collected
    recentChange: {
      title: "Sleep variance is at its lowest point",
      body: "Your night-to-night sleep variation dropped to ±18 min this week — the most consistent stretch since Chronis started tracking. This stability tends to precede steady mood scores.",
      confidence: 0.84
    }
  }
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function getWeeklyData(weekId) {
  const week = CHRONIS_DATA.weeks.find(w => w.id === weekId);
  if (!week) return null;
  
  const weekIndex = CHRONIS_DATA.weeks.indexOf(week);
  const startIndex = weekIndex * 7;
  return {
    ...week,
    days: CHRONIS_DATA.daily.slice(startIndex, startIndex + 7)
  };
}

function getInsight(insightId) {
  return CHRONIS_DATA.insights.find(i => i.id === insightId);
}

function getValidDaily(field) {
  return CHRONIS_DATA.daily
    .filter(d => d[field] !== null)
    .map(d => ({ date: d.date, value: d[field] }));
}

function getPhaseColor(phase) {
  const map = {
    "baseline": "var(--accent-teal)",
    "early-decline": "var(--warning)",
    "stress-peak": "var(--negative)",
    "recovery": "var(--accent-gold)",
    "new-equilibrium": "var(--positive)"
  };
  return map[phase] || "var(--text-secondary)";
}

function getPhaseLabel(phase) {
  const map = {
    "baseline": "Baseline",
    "early-decline": "Shifting",
    "stress-peak": "Peak Stress",
    "recovery": "Recovering",
    "new-equilibrium": "Stabilizing"
  };
  return map[phase] || phase;
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
