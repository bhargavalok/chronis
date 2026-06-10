// ─── Chronis Chart Engine ────────────────────────────────────────────────────
// Pure SVG chart rendering. No external libraries.

const Charts = (() => {
  // ── Utilities ────────────────────────────────────────────────────────────

  function lerp(a, b, t) { return a + (b - a) * t; }

  function clamp(v, min, max) { return Math.min(Math.max(v, min), max); }

  function normalizeSeries(data, min, max) {
    const range = max - min || 1;
    return data.map(v => v === null ? null : (v - min) / range);
  }

  function svgPath(points, smooth = true) {
    if (!points.length) return "";
    const valid = points.filter(p => p !== null);
    if (!valid.length) return "";

    if (!smooth) {
      return points
        .filter(p => p !== null)
        .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
        .join(" ");
    }

    // Catmull-Rom to cubic bezier
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[Math.max(i - 1, 0)];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[Math.min(i + 2, points.length - 1)];
      const tension = 0.4;
      const cp1x = p1.x + (p2.x - p0.x) * tension;
      const cp1y = p1.y + (p2.y - p0.y) * tension;
      const cp2x = p2.x - (p3.x - p1.x) * tension;
      const cp2y = p2.y - (p3.y - p1.y) * tension;
      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  }

  function createSVG(width, height) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("preserveAspectRatio", "none");
    return svg;
  }

  function svgEl(tag, attrs = {}) {
    const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    return el;
  }

  // ── Sparkline ────────────────────────────────────────────────────────────

  function renderSparkline(container, data, color = "#D4A96A", showArea = true) {
    const W = 80, H = 28;
    const pad = 2;
    const svg = createSVG(W, H);

    const valid = data.filter(v => v !== null);
    const min = Math.min(...valid) * 0.95;
    const max = Math.max(...valid) * 1.05;

    const points = data.map((v, i) => {
      if (v === null) return null;
      const x = pad + (i / (data.length - 1)) * (W - pad * 2);
      const y = H - pad - ((v - min) / (max - min)) * (H - pad * 2);
      return { x, y };
    }).filter(Boolean);

    if (showArea && points.length > 1) {
      const areaPath = svgPath(points, true) +
        ` L ${points[points.length - 1].x} ${H} L ${points[0].x} ${H} Z`;
      const area = svgEl("path", {
        d: areaPath,
        fill: color,
        opacity: "0.12",
        "stroke-width": "0"
      });
      svg.appendChild(area);
    }

    if (points.length > 1) {
      const line = svgEl("path", {
        d: svgPath(points, true),
        fill: "none",
        stroke: color,
        "stroke-width": "1.5",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      });
      svg.appendChild(line);
    }

    // Latest point dot
    const last = points[points.length - 1];
    if (last) {
      const dot = svgEl("circle", {
        cx: last.x, cy: last.y, r: "2.5",
        fill: color
      });
      svg.appendChild(dot);
    }

    container.innerHTML = "";
    container.appendChild(svg);
  }

  // ── Main Line Chart (full-size) ──────────────────────────────────────────

  function renderLineChart(container, datasets, options = {}) {
    const W = options.width || 600;
    const H = options.height || 200;
    const padX = options.padX || 40;
    const padY = options.padY || 20;
    const innerW = W - padX * 2;
    const innerH = H - padY * 2;

    const svg = createSVG(W, H);

    // Grid lines
    const gridCount = 4;
    for (let i = 0; i <= gridCount; i++) {
      const y = padY + (i / gridCount) * innerH;
      const line = svgEl("line", {
        x1: padX, y1: y, x2: W - padX, y2: y,
        stroke: "rgba(255,255,255,0.04)", "stroke-width": "1"
      });
      svg.appendChild(line);
    }

    // Render each dataset
    datasets.forEach(({ data, color, label, dashed }) => {
      const valid = data.filter(v => v !== null);
      if (!valid.length) return;

      const min = options.min ?? Math.min(...valid) * 0.9;
      const max = options.max ?? Math.max(...valid) * 1.05;

      const points = data.map((v, i) => {
        if (v === null) return null;
        const x = padX + (i / (data.length - 1)) * innerW;
        const y = padY + innerH - ((v - min) / (max - min)) * innerH;
        return { x, y, v, i };
      });

      // Area fill
      const validPoints = points.filter(Boolean);
      if (validPoints.length > 1) {
        const areaPath = svgPath(validPoints, true) +
          ` L ${validPoints[validPoints.length - 1].x} ${padY + innerH} L ${validPoints[0].x} ${padY + innerH} Z`;
        svg.appendChild(svgEl("path", {
          d: areaPath,
          fill: color,
          opacity: "0.08"
        }));
      }

      // Line segments (handling nulls by breaking the line)
      let segment = [];
      points.forEach((p, i) => {
        if (p !== null) {
          segment.push(p);
        } else if (segment.length > 1) {
          svg.appendChild(svgEl("path", {
            d: svgPath(segment, true),
            fill: "none",
            stroke: color,
            "stroke-width": "2",
            "stroke-dasharray": dashed ? "4 3" : "none",
            "stroke-linecap": "round"
          }));
          segment = [];
        } else {
          segment = [];
        }
      });
      if (segment.length > 1) {
        svg.appendChild(svgEl("path", {
          d: svgPath(segment, true),
          fill: "none",
          stroke: color,
          "stroke-width": "2",
          "stroke-dasharray": dashed ? "4 3" : "none",
          "stroke-linecap": "round"
        }));
      }

      // Gap markers (missing data dashes)
      points.forEach((p, i) => {
        if (p === null) {
          const x = padX + (i / (data.length - 1)) * innerW;
          svg.appendChild(svgEl("line", {
            x1: x, y1: padY + innerH * 0.2,
            x2: x, y2: padY + innerH * 0.8,
            stroke: "rgba(255,255,255,0.12)",
            "stroke-width": "1",
            "stroke-dasharray": "2 2"
          }));
        }
      });
    });

    // Week dividers
    if (options.weekDividers) {
      options.weekDividers.forEach(xRatio => {
        const x = padX + xRatio * innerW;
        svg.appendChild(svgEl("line", {
          x1: x, y1: padY,
          x2: x, y2: padY + innerH,
          stroke: "rgba(255,255,255,0.06)",
          "stroke-width": "1",
          "stroke-dasharray": "3 3"
        }));
      });
    }

    container.innerHTML = "";
    container.appendChild(svg);
  }

  // ── Confidence Arc ───────────────────────────────────────────────────────

  function renderConfidenceArc(container, value, color = "#D4A96A") {
    const size = 56;
    const r = 22;
    const cx = size / 2;
    const cy = size / 2;
    const circumference = 2 * Math.PI * r;
    const arc = value * circumference * 0.75; // 270° sweep
    const startAngle = -225 * (Math.PI / 180);

    const svg = createSVG(size, size);

    // Background track
    const trackArc = describeArc(cx, cy, r, -225, 45);
    svg.appendChild(svgEl("path", {
      d: trackArc,
      fill: "none",
      stroke: "rgba(255,255,255,0.07)",
      "stroke-width": "3.5",
      "stroke-linecap": "round"
    }));

    // Value arc
    if (value > 0) {
      const endDeg = -225 + value * 270;
      const valueArc = describeArc(cx, cy, r, -225, endDeg);
      svg.appendChild(svgEl("path", {
        d: valueArc,
        fill: "none",
        stroke: color,
        "stroke-width": "3.5",
        "stroke-linecap": "round"
      }));
    }

    // Label
    const text = svgEl("text", {
      x: cx, y: cy + 4,
      "text-anchor": "middle",
      fill: color,
      "font-size": "10",
      "font-weight": "600",
      "font-family": "JetBrains Mono, monospace"
    });
    text.textContent = `${Math.round(value * 100)}%`;
    svg.appendChild(text);

    container.innerHTML = "";
    container.appendChild(svg);
  }

  function polarToCartesian(cx, cy, r, deg) {
    const rad = (deg * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  function describeArc(cx, cy, r, startDeg, endDeg) {
    const start = polarToCartesian(cx, cy, r, startDeg);
    const end = polarToCartesian(cx, cy, r, endDeg);
    const largeArc = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
  }

  // ── Phase Timeline bar ───────────────────────────────────────────────────

  function renderPhaseBar(container, weeks) {
    const W = 400;
    const H = 16;
    const svg = createSVG(W, H);
    const segW = W / weeks.length;

    weeks.forEach((week, i) => {
      const color = getPhaseColor(week.phase);
      const rx = i === 0 ? 4 : 0;
      const rx2 = i === weeks.length - 1 ? 4 : 0;

      svg.appendChild(svgEl("rect", {
        x: i * segW, y: 0,
        width: segW - 1, height: H,
        fill: color,
        opacity: "0.75",
        rx: 0
      }));
    });

    container.innerHTML = "";
    container.appendChild(svg);
  }

  // ── Radar / Dimension chart ──────────────────────────────────────────────

  function renderRadar(container, dimensions, options = {}) {
    const size = options.size || 160;
    const cx = size / 2;
    const cy = size / 2;
    const r = size * 0.38;
    const svg = createSVG(size, size);

    const n = dimensions.length;
    const angles = dimensions.map((_, i) => (i / n) * 2 * Math.PI - Math.PI / 2);

    // Grid rings
    [0.25, 0.5, 0.75, 1.0].forEach(t => {
      const pts = angles.map(a => ({
        x: cx + r * t * Math.cos(a),
        y: cy + r * t * Math.sin(a)
      }));
      const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
      svg.appendChild(svgEl("path", {
        d, fill: "none",
        stroke: "rgba(255,255,255,0.06)",
        "stroke-width": "1"
      }));
    });

    // Axes
    angles.forEach((a, i) => {
      svg.appendChild(svgEl("line", {
        x1: cx, y1: cy,
        x2: cx + r * Math.cos(a),
        y2: cy + r * Math.sin(a),
        stroke: "rgba(255,255,255,0.06)",
        "stroke-width": "1"
      }));
    });

    // Data shape
    const dataPts = dimensions.map((d, i) => ({
      x: cx + r * d.value * Math.cos(angles[i]),
      y: cy + r * d.value * Math.sin(angles[i])
    }));
    const shapePath = dataPts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
    svg.appendChild(svgEl("path", {
      d: shapePath,
      fill: "rgba(212, 169, 106, 0.15)",
      stroke: "#D4A96A",
      "stroke-width": "1.5",
      "stroke-linejoin": "round"
    }));

    // Points
    dataPts.forEach(p => {
      svg.appendChild(svgEl("circle", { cx: p.x, cy: p.y, r: "3", fill: "#D4A96A" }));
    });

    // Labels
    dimensions.forEach((d, i) => {
      const lx = cx + (r + 18) * Math.cos(angles[i]);
      const ly = cy + (r + 18) * Math.sin(angles[i]);
      const text = svgEl("text", {
        x: lx, y: ly + 4,
        "text-anchor": "middle",
        fill: "rgba(255,255,255,0.5)",
        "font-size": "9",
        "font-family": "DM Sans, sans-serif"
      });
      text.textContent = d.label;
      svg.appendChild(text);
    });

    container.innerHTML = "";
    container.appendChild(svg);
  }

  // ── Public API ────────────────────────────────────────────────────────────
  return { renderSparkline, renderLineChart, renderConfidenceArc, renderPhaseBar, renderRadar };
})();
