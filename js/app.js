// ─── Chronis Application Logic ───────────────────────────────────────────────

const App = (() => {
  // ── State ─────────────────────────────────────────────────────────────────
  let currentView = "dashboard";
  let selectedInsightId = null;
  let selectedWeekId = null;
  let expandedInsight = null;
  let timelineActiveWeek = "w3"; // default to stress-peak week

  // ── Router ────────────────────────────────────────────────────────────────

  function navigate(view, params = {}) {
    currentView = view;
    if (params.insightId) selectedInsightId = params.insightId;
    if (params.weekId) selectedWeekId = params.weekId;

    // Update nav
    document.querySelectorAll(".nav-item").forEach(el => {
      el.classList.toggle("active", el.dataset.view === view ||
        (view === "insight-detail" && el.dataset.view === "insights"));
    });

    renderView(view);

    // Scroll to top
    const main = document.getElementById("main-content");
    if (main) main.scrollTop = 0;
  }

  function renderView(view) {
    const container = document.getElementById("view-container");
    container.innerHTML = "";

    const views = {
      "dashboard": renderDashboard,
      "insights": renderInsights,
      "insight-detail": renderInsightDetail,
      "timeline": renderTimeline,
    };

    const fn = views[view];
    if (fn) fn(container);

    // Animate in
    container.style.opacity = "0";
    container.style.transform = "translateY(8px)";
    requestAnimationFrame(() => {
      container.style.transition = "opacity 0.25s ease, transform 0.25s ease";
      container.style.opacity = "1";
      container.style.transform = "translateY(0)";
    });
  }

  // ── Dashboard ─────────────────────────────────────────────────────────────

  function renderDashboard(container) {
    const { user, dashboard, insights } = CHRONIS_DATA;
    const topInsight = insights.find(i => i.confidence > 0.85);

    container.innerHTML = `
      <div class="view dashboard-view">
        <header class="view-header">
          <div class="view-header-left">
            <span class="view-label">Overview</span>
            <h1 class="view-title">Your week</h1>
          </div>
          <div class="data-health-badge ${dashboard.dataHealth >= 85 ? 'good' : 'warn'}">
            <span class="health-dot"></span>
            <span>${dashboard.dataHealth}% data</span>
          </div>
        </header>

        <!-- Period -->
        <div class="period-strip">
          <span class="period-text">${user.period.start} – ${user.period.end}</span>
          <span class="period-sep">·</span>
          <span class="period-text">${user.totalDays} days tracked</span>
          <span class="period-sep">·</span>
          <span class="period-text muted">${user.missingDays} gaps</span>
        </div>

        <!-- Radar chart + summary -->
        <div class="radar-card card">
          <div class="radar-card-inner">
            <div id="radar-chart-container" class="radar-container"></div>
            <div class="radar-labels">
              <div class="radar-summary">
                <div class="radar-title">Current profile</div>
                <div class="radar-subtitle">Based on Dec 2–8 avg vs. your own baseline</div>
              </div>
              <div class="radar-dims">
                <div class="rdim"><span class="rdim-label">Sleep</span><span class="rdim-bar"><span class="rdim-fill" style="width: 88%"></span></span><span class="rdim-val">88%</span></div>
                <div class="rdim"><span class="rdim-label">Focus</span><span class="rdim-bar"><span class="rdim-fill" style="width: 79%"></span></span><span class="rdim-val">79%</span></div>
                <div class="rdim"><span class="rdim-label">Social</span><span class="rdim-bar"><span class="rdim-fill" style="width: 72%"></span></span><span class="rdim-val">72%</span></div>
                <div class="rdim"><span class="rdim-label">Activity</span><span class="rdim-bar"><span class="rdim-fill" style="width: 83%"></span></span><span class="rdim-val">83%</span></div>
                <div class="rdim"><span class="rdim-label">Mood</span><span class="rdim-bar"><span class="rdim-fill" style="width: 85%"></span></span><span class="rdim-val">85%</span></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Metric tiles -->
        <div class="metrics-grid">
          ${dashboard.metrics.map(m => `
            <div class="metric-tile card" id="tile-${m.id}">
              <div class="metric-tile-top">
                <span class="metric-label">${m.label}</span>
                <span class="metric-delta ${m.deltaDir} ${m.sentiment}">${m.delta}</span>
              </div>
              <div class="metric-value">${m.value}</div>
              <div class="metric-sparkline" id="sparkline-${m.id}"></div>
              <div class="metric-subtext">${m.subtext}</div>
            </div>
          `).join('')}
        </div>

        <!-- Recent change callout -->
        <div class="callout-card card">
          <div class="callout-header">
            <span class="callout-tag">Notable shift</span>
            <div class="callout-confidence">
              <span class="conf-label">Confidence</span>
              <div id="conf-arc-dash" class="conf-arc-mini"></div>
            </div>
          </div>
          <p class="callout-title">${dashboard.recentChange.title}</p>
          <p class="callout-body">${dashboard.recentChange.body}</p>
        </div>

        <!-- Insights preview -->
        <div class="section-header">
          <span class="section-title">Active insights</span>
          <button class="section-action" onclick="App.navigate('insights')">See all →</button>
        </div>

        <div class="insight-previews">
          ${insights.slice(0, 3).map(ins => `
            <button class="insight-preview-card card" onclick="App.navigate('insight-detail', { insightId: '${ins.id}' })">
              <div class="ipc-top">
                <span class="ipc-category">${ins.categoryLabel}</span>
                <span class="ipc-confidence ${confidenceClass(ins.confidence)}">${Math.round(ins.confidence * 100)}%</span>
              </div>
              <p class="ipc-title">${ins.title}</p>
              <div class="ipc-bottom">
                <span class="ipc-evidence">${ins.evidence.length} data points</span>
                <span class="ipc-arrow">→</span>
              </div>
            </button>
          `).join('')}
        </div>

        <!-- Trend chart -->
        <div class="section-header" style="margin-top: 12px">
          <span class="section-title">Sleep over 5 weeks</span>
          <span class="section-note muted">— gaps = missing data</span>
        </div>
        <div class="trend-chart-card card">
          <div id="main-trend-chart" class="trend-chart-container"></div>
          <div class="trend-chart-legend">
            <span class="legend-item"><span class="legend-dot" style="background: #D4A96A"></span>Sleep (h)</span>
            <span class="legend-item"><span class="legend-dot" style="background: #5FADA8; opacity:0.7"></span>Mood /100</span>
          </div>
        </div>
      </div>
    `;

    // Render charts after DOM is ready
    requestAnimationFrame(() => {
      // Sparklines
      CHRONIS_DATA.dashboard.metrics.forEach(m => {
        const el = document.getElementById(`sparkline-${m.id}`);
        if (el) {
          const colors = { sleep: "#D4A96A", focus: "#5FADA8", mood: "#72B788", social: "#9B8FC0" };
          Charts.renderSparkline(el, m.sparkline, colors[m.id]);
        }
      });

      // Confidence arc
      const confArc = document.getElementById("conf-arc-dash");
      if (confArc) Charts.renderConfidenceArc(confArc, CHRONIS_DATA.dashboard.recentChange.confidence, "#D4A96A");

      // Radar
      const radarEl = document.getElementById("radar-chart-container");
      if (radarEl) {
        Charts.renderRadar(radarEl, [
          { label: "Sleep", value: 0.88 },
          { label: "Focus", value: 0.79 },
          { label: "Social", value: 0.72 },
          { label: "Activity", value: 0.83 },
          { label: "Mood", value: 0.85 },
        ]);
      }

      // Main trend chart
      const chartEl = document.getElementById("main-trend-chart");
      if (chartEl) {
        const sleepData = CHRONIS_DATA.daily.map(d => d.sleep_h);
        const moodData = CHRONIS_DATA.daily.map(d => d.mood ? d.mood / 12 : null); // scale mood to ~sleep range

        Charts.renderLineChart(chartEl, [
          { data: sleepData, color: "#D4A96A", label: "Sleep" },
          { data: moodData, color: "#5FADA8", label: "Mood", dashed: true }
        ], {
          width: 600, height: 140, padX: 12, padY: 16,
          weekDividers: [7/35, 14/35, 21/35, 28/35]
        });
      }

      // Stagger metric tiles
      document.querySelectorAll(".metric-tile").forEach((el, i) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(12px)";
        setTimeout(() => {
          el.style.transition = "opacity 0.3s ease, transform 0.3s ease";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }, i * 60);
      });
    });
  }

  // ── Insights List ─────────────────────────────────────────────────────────

  function renderInsights(container) {
    const { insights } = CHRONIS_DATA;

    container.innerHTML = `
      <div class="view insights-view">
        <header class="view-header">
          <div class="view-header-left">
            <span class="view-label">Patterns</span>
            <h1 class="view-title">Insights</h1>
          </div>
          <span class="badge-count">${insights.length}</span>
        </header>

        <p class="view-description">
          Each insight is a pattern Chronis detected across your data. Tap any to see 
          the evidence, what's uncertain, and what data is missing.
        </p>

        <div class="insight-filters">
          <button class="filter-chip active" data-filter="all">All</button>
          <button class="filter-chip" data-filter="sleep">Sleep</button>
          <button class="filter-chip" data-filter="social">Social</button>
          <button class="filter-chip" data-filter="focus">Focus</button>
        </div>

        <div class="insights-list" id="insights-list">
          ${insights.map((ins, idx) => renderInsightCard(ins, idx)).join('')}
        </div>
      </div>
    `;

    // Confidence arcs
    requestAnimationFrame(() => {
      insights.forEach(ins => {
        const arc = document.getElementById(`conf-arc-${ins.id}`);
        if (arc) {
          const colors = { negative: "#C97A72", positive: "#72B788", neutral: "#5FADA8" };
          Charts.renderConfidenceArc(arc, ins.confidence, colors[ins.direction] || "#D4A96A");
        }
      });

      // Filter chips
      document.querySelectorAll(".filter-chip").forEach(chip => {
        chip.addEventListener("click", () => {
          document.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
          chip.classList.add("active");
          const filter = chip.dataset.filter;
          document.querySelectorAll(".insight-card").forEach(card => {
            if (filter === "all" || card.dataset.category.includes(filter)) {
              card.style.display = "";
            } else {
              card.style.display = "none";
            }
          });
        });
      });

      // Stagger cards
      document.querySelectorAll(".insight-card").forEach((el, i) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(10px)";
        setTimeout(() => {
          el.style.transition = "opacity 0.3s ease, transform 0.3s ease";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }, i * 80);
      });
    });
  }

  function renderInsightCard(ins, idx) {
    const dirIcon = { negative: "↘", positive: "↗", neutral: "→" };
    const dirColor = { negative: "var(--negative)", positive: "var(--positive)", neutral: "var(--accent-teal)" };

    return `
      <button class="insight-card card" 
        data-category="${ins.category}" 
        onclick="App.navigate('insight-detail', { insightId: '${ins.id}' })">
        <div class="ic-top">
          <span class="ic-category">${ins.categoryLabel}</span>
          <div id="conf-arc-${ins.id}" class="ic-conf-arc"></div>
        </div>
        <p class="ic-title">${ins.title}</p>
        <div class="ic-bottom">
          <span class="ic-direction" style="color: ${dirColor[ins.direction]}">${dirIcon[ins.direction]} ${ins.direction}</span>
          <span class="ic-evidence-count">${ins.evidence.length} evidence pts</span>
          ${ins.missing_data_impact !== 'none' ? `<span class="ic-missing-badge ${ins.missing_data_impact}">⚠ ${ins.missing_data_impact} impact</span>` : ''}
        </div>
      </button>
    `;
  }

  // ── Insight Detail ────────────────────────────────────────────────────────

  function renderInsightDetail(container) {
    const ins = getInsight(selectedInsightId);
    if (!ins) { navigate("insights"); return; }

    const dirColor = { negative: "var(--negative)", positive: "var(--positive)", neutral: "var(--accent-teal)" };
    const strengthIcon = { strong: "●", moderate: "◑", weak: "○" };
    const evidenceTypeLabel = { "data-point": "Data point", aggregate: "Aggregate", comparison: "Comparison", contextual: "Context" };

    const related = ins.related.map(id => getInsight(id)).filter(Boolean);

    container.innerHTML = `
      <div class="view insight-detail-view">
        <button class="back-btn" onclick="App.navigate('insights')">
          <span>←</span> Insights
        </button>

        <div class="detail-hero card">
          <div class="detail-hero-top">
            <span class="detail-category">${ins.categoryLabel}</span>
            <div class="detail-confidence-wrap">
              <div id="detail-conf-arc" class="detail-conf-arc"></div>
              <span class="detail-conf-label">confidence</span>
            </div>
          </div>
          <h2 class="detail-title">${ins.title}</h2>
          <p class="detail-summary">${ins.summary}</p>
          <div class="detail-meta">
            <span>First detected ${formatDate(ins.first_seen)}</span>
            <span class="detail-direction" style="color: ${dirColor[ins.direction]}">
              ${ins.direction === 'negative' ? '↘ Negative correlation' : ins.direction === 'positive' ? '↗ Positive correlation' : '→ Neutral'}
            </span>
          </div>
        </div>

        <!-- Evidence -->
        <div class="section-header">
          <span class="section-title">Supporting evidence</span>
          <span class="section-note muted">${ins.evidence.length} points</span>
        </div>

        <div class="evidence-list">
          ${ins.evidence.map(ev => `
            <div class="evidence-item card">
              <div class="ev-left">
                <span class="ev-strength ${ev.strength}" title="${ev.strength} evidence">${strengthIcon[ev.strength]}</span>
                <span class="ev-type-label">${evidenceTypeLabel[ev.type] || ev.type}</span>
              </div>
              <p class="ev-label">${ev.label}</p>
            </div>
          `).join('')}
        </div>

        <!-- Uncertainty -->
        <div class="uncertainty-block card">
          <div class="ub-header">
            <span class="ub-icon">⚠</span>
            <span class="ub-title">What Chronis doesn't know</span>
          </div>
          <p class="ub-body">${ins.uncertainty}</p>
          <div class="ub-footer">
            <span class="ub-impact-label">Missing data impact</span>
            <span class="ub-impact-badge ${ins.missing_data_impact}">${ins.missing_data_impact}</span>
          </div>
        </div>

        <!-- Related -->
        ${related.length > 0 ? `
          <div class="section-header">
            <span class="section-title">Related patterns</span>
          </div>
          <div class="related-insights">
            ${related.map(r => `
              <button class="related-card card" onclick="App.navigate('insight-detail', { insightId: '${r.id}' })">
                <span class="related-category">${r.categoryLabel}</span>
                <p class="related-title">${r.title}</p>
                <span class="related-conf">${Math.round(r.confidence * 100)}% confident →</span>
              </button>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `;

    requestAnimationFrame(() => {
      const arc = document.getElementById("detail-conf-arc");
      if (arc) {
        const colors = { negative: "#C97A72", positive: "#72B788", neutral: "#5FADA8" };
        Charts.renderConfidenceArc(arc, ins.confidence, colors[ins.direction] || "#D4A96A");
      }

      // Stagger evidence items
      document.querySelectorAll(".evidence-item").forEach((el, i) => {
        el.style.opacity = "0";
        setTimeout(() => {
          el.style.transition = "opacity 0.25s ease";
          el.style.opacity = "1";
        }, 80 + i * 60);
      });
    });
  }

  // ── Timeline ──────────────────────────────────────────────────────────────

  function renderTimeline(container) {
    const { weeks, user } = CHRONIS_DATA;

    container.innerHTML = `
      <div class="view timeline-view">
        <header class="view-header">
          <div class="view-header-left">
            <span class="view-label">History</span>
            <h1 class="view-title">Narrative</h1>
          </div>
        </header>

        <p class="view-description">
          How your behavioral patterns shifted over ${user.period.start} – ${user.period.end}. 
          Select a week to read its story.
        </p>

        <!-- Phase strip -->
        <div class="phase-strip-wrap">
          <div id="phase-bar" class="phase-bar"></div>
          <div class="phase-labels">
            ${weeks.map(w => `<span class="phase-label">${w.shortLabel}</span>`).join('')}
          </div>
        </div>

        <!-- Week selector -->
        <div class="week-tabs">
          ${weeks.map(w => `
            <button class="week-tab ${w.id === timelineActiveWeek ? 'active' : ''}" 
              data-week="${w.id}" 
              onclick="App.selectTimelineWeek('${w.id}')">
              <span class="wt-label">${w.shortLabel}</span>
              <span class="wt-phase" style="color: ${getPhaseColor(w.phase)}">${getPhaseLabel(w.phase)}</span>
            </button>
          `).join('')}
        </div>

        <!-- Active week detail -->
        <div id="timeline-week-detail" class="timeline-week-detail"></div>

        <!-- Full 5-week trend -->
        <div class="section-header" style="margin-top: 8px">
          <span class="section-title">Full period: Sleep + Mood</span>
        </div>
        <div class="trend-chart-card card">
          <div id="timeline-full-chart" class="trend-chart-container" style="height: 160px"></div>
          <div class="trend-week-markers">
            ${weeks.map((w, i) => `<span class="twm-label" style="left:${(i/4)*100}%">${w.shortLabel}</span>`).join('')}
          </div>
          <div class="trend-chart-legend" style="margin-top:8px">
            <span class="legend-item"><span class="legend-dot" style="background: #D4A96A"></span>Sleep (h)</span>
            <span class="legend-item"><span class="legend-dot" style="background: #72B788; opacity:0.8"></span>Mood /100 (scaled)</span>
            <span class="legend-item"><span class="legend-dot legend-dash" style="background: #5FADA8; opacity:0.7"></span>Focus (scaled)</span>
          </div>
        </div>
      </div>
    `;

    requestAnimationFrame(() => {
      // Phase bar
      const phaseBar = document.getElementById("phase-bar");
      if (phaseBar) Charts.renderPhaseBar(phaseBar, weeks);

      // Render week detail
      selectTimelineWeek(timelineActiveWeek);

      // Full chart
      const fullChart = document.getElementById("timeline-full-chart");
      if (fullChart) {
        const sleepData = CHRONIS_DATA.daily.map(d => d.sleep_h);
        const moodData = CHRONIS_DATA.daily.map(d => d.mood ? d.mood / 13 : null);
        const focusData = CHRONIS_DATA.daily.map(d => d.focus_min ? d.focus_min / 28 : null);
        Charts.renderLineChart(fullChart, [
          { data: sleepData, color: "#D4A96A" },
          { data: moodData, color: "#72B788", dashed: false },
          { data: focusData, color: "#5FADA8", dashed: true }
        ], {
          width: 600, height: 160, padX: 12, padY: 16,
          weekDividers: [7/35, 14/35, 21/35, 28/35]
        });
      }
    });
  }

  function selectTimelineWeek(weekId) {
    timelineActiveWeek = weekId;

    // Update tab states
    document.querySelectorAll(".week-tab").forEach(t => {
      t.classList.toggle("active", t.dataset.week === weekId);
    });

    const week = CHRONIS_DATA.weeks.find(w => w.id === weekId);
    if (!week) return;

    const detailEl = document.getElementById("timeline-week-detail");
    if (!detailEl) return;

    detailEl.style.opacity = "0";
    detailEl.style.transform = "translateY(6px)";

    const moodChange = weekId === "w1" ? null :
      week.mood_avg - CHRONIS_DATA.weeks[0].mood_avg;

    detailEl.innerHTML = `
      <div class="week-detail-card card" style="border-left: 3px solid ${getPhaseColor(week.phase)}">
        <div class="wdc-header">
          <div>
            <div class="wdc-label">${week.label}</div>
            <div class="wdc-phase" style="color: ${getPhaseColor(week.phase)}">${getPhaseLabel(week.phase)}</div>
          </div>
          ${week.missing_days ? `<span class="wdc-missing">⚠ ${week.missing_days} day${week.missing_days > 1 ? 's' : ''} missing</span>` : ''}
        </div>

        <p class="wdc-summary">${week.summary}</p>

        <div class="wdc-metrics">
          <div class="wdm">
            <span class="wdm-label">Sleep</span>
            <span class="wdm-value">${week.sleep_avg}h</span>
            ${moodChange !== null ? `<span class="wdm-delta ${week.sleep_avg >= CHRONIS_DATA.weeks[0].sleep_avg ? 'pos' : 'neg'}">${week.sleep_avg >= CHRONIS_DATA.weeks[0].sleep_avg ? '+' : ''}${(week.sleep_avg - CHRONIS_DATA.weeks[0].sleep_avg).toFixed(1)}h vs baseline</span>` : '<span class="wdm-delta neu">— baseline</span>'}
          </div>
          <div class="wdm">
            <span class="wdm-label">Mood avg</span>
            <span class="wdm-value">${week.mood_avg.toFixed(0)}</span>
            ${moodChange !== null ? `<span class="wdm-delta ${moodChange >= 0 ? 'pos' : 'neg'}">${moodChange >= 0 ? '+' : ''}${moodChange.toFixed(0)} vs baseline</span>` : '<span class="wdm-delta neu">— baseline</span>'}
          </div>
          <div class="wdm">
            <span class="wdm-label">Focus / day</span>
            <span class="wdm-value">${week.focus_avg} min</span>
          </div>
          <div class="wdm">
            <span class="wdm-label">Social / day</span>
            <span class="wdm-value">${week.social_avg.toFixed(1)}</span>
          </div>
        </div>

        <div class="wdc-highlights">
          <span class="wdc-hl-label">Key moments</span>
          <ul class="wdc-hl-list">
            ${week.highlights.map(h => `<li>${h}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;

    requestAnimationFrame(() => {
      detailEl.style.transition = "opacity 0.25s ease, transform 0.25s ease";
      detailEl.style.opacity = "1";
      detailEl.style.transform = "translateY(0)";
    });
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  function confidenceClass(v) {
    if (v >= 0.85) return "conf-high";
    if (v >= 0.70) return "conf-mid";
    return "conf-low";
  }

  // ── Init ──────────────────────────────────────────────────────────────────

  function init() {
    // Nav
    document.querySelectorAll(".nav-item").forEach(el => {
      el.addEventListener("click", () => navigate(el.dataset.view));
    });

    navigate("dashboard");
  }

  return {
    init,
    navigate,
    selectTimelineWeek,
    confidenceClass
  };
})();

// ── Boot ─────────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => App.init());
