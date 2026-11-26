// charts.js — small inline-SVG chart builders.
// Every chart is drawn from the data in data.js: no images, no libraries,
// no network. Each function returns an SVG string; views.js drops it into
// the page. All charts carry a text alternative via role="img" and aria-label.

function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function niceTicks(min, max, count) {
  const span = max - min || 1;
  const step = span / count;
  const mag = Math.pow(10, Math.floor(Math.log10(step)));
  const norm = step / mag;
  const nice = norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10;
  const size = nice * mag;
  const ticks = [];
  for (let v = Math.ceil(min / size) * size; v <= max + 1e-9; v += size) {
    ticks.push(Math.round(v * 1000) / 1000);
  }
  return ticks;
}

function fmtTick(v) {
  if (Math.abs(v) >= 1000) return String(Math.round(v));
  if (Number.isInteger(v)) return String(v);
  return String(Math.round(v * 10) / 10);
}

// A line chart with labelled axes. points: [{x, y}] where x is a year or a
// category label; options: {label, format, color, height}.
export function lineChart(points, options = {}) {
  const width = 720;
  const height = options.height || 300;
  const pad = { left: 56, right: 16, top: 14, bottom: 34 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;
  const ys = points.map((p) => p.y);
  let min = Math.min(...ys);
  let max = Math.max(...ys);
  if (min === max) { min -= 1; max += 1; }
  const padY = (max - min) * 0.12;
  min -= padY;
  max += padY;
  const ticks = niceTicks(min, max, 4);
  const xAt = (i) => pad.left + (plotW * i) / Math.max(points.length - 1, 1);
  const yAt = (v) => pad.top + plotH * (1 - (v - min) / (max - min));
  const fmt = options.format || ((v) => String(v));

  let out = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(options.label || 'Line chart')}">`;
  for (const t of ticks) {
    const y = yAt(t);
    out += `<line x1="${pad.left}" y1="${y.toFixed(1)}" x2="${width - pad.right}" y2="${y.toFixed(1)}" class="grid"/>`;
    out += `<text x="${pad.left - 8}" y="${(y + 4).toFixed(1)}" class="axis" text-anchor="end">${esc(fmtTick(t))}</text>`;
  }
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${xAt(i).toFixed(1)},${yAt(p.y).toFixed(1)}`).join(' ');
  const area = `${path} L${xAt(points.length - 1).toFixed(1)},${(pad.top + plotH).toFixed(1)} L${xAt(0).toFixed(1)},${(pad.top + plotH).toFixed(1)} Z`;
  out += `<path d="${area}" class="area" fill="${options.color || '#bc002d'}" fill-opacity="0.08"/>`;
  out += `<path d="${path}" class="line" stroke="${options.color || '#bc002d'}" fill="none"/>`;
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    // Keep the first and last value labels inside the plot instead of
    // letting them run over the y-axis or the right edge.
    const anchor = i === 0 ? 'start' : i === points.length - 1 ? 'end' : 'middle';
    const labelX = i === 0 ? xAt(i) + 2 : i === points.length - 1 ? xAt(i) - 2 : xAt(i);
    out += `<circle cx="${xAt(i).toFixed(1)}" cy="${yAt(p.y).toFixed(1)}" r="4" class="dot" fill="${options.color || '#bc002d'}"/>`;
    out += `<text x="${labelX.toFixed(1)}" y="${(yAt(p.y) - 10).toFixed(1)}" class="value" text-anchor="${anchor}">${esc(fmt(p.y))}</text>`;
    if (i % 2 === 0 || points.length <= 8) {
      out += `<text x="${xAt(i).toFixed(1)}" y="${height - 10}" class="axis" text-anchor="middle">${esc(p.x)}</text>`;
    }
  }
  out += '</svg>';
  return out;
}

// A vertical bar chart. points: [{x, y}]; negative values grow downwards.
export function barChart(points, options = {}) {
  const width = 720;
  const height = options.height || 280;
  const pad = { left: 56, right: 16, top: 26, bottom: 34 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;
  const ys = points.map((p) => p.y);
  let min = Math.min(0, ...ys);
  let max = Math.max(0, ...ys);
  if (min === max) { min -= 1; max += 1; }
  const span = max - min;
  const ticks = niceTicks(min, max, 4);
  const yAt = (v) => pad.top + plotH * (1 - (v - min) / span);
  const fmt = options.format || ((v) => String(v));
  const bw = Math.min(56, (plotW / points.length) * 0.6);

  let out = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(options.label || 'Bar chart')}">`;
  for (const t of ticks) {
    const y = yAt(t);
    out += `<line x1="${pad.left}" y1="${y.toFixed(1)}" x2="${width - pad.right}" y2="${y.toFixed(1)}" class="grid"/>`;
    out += `<text x="${pad.left - 8}" y="${(y + 4).toFixed(1)}" class="axis" text-anchor="end">${esc(fmtTick(t))}</text>`;
  }
  out += `<line x1="${pad.left}" y1="${yAt(0).toFixed(1)}" x2="${width - pad.right}" y2="${yAt(0).toFixed(1)}" class="axis-line"/>`;
  points.forEach((p, i) => {
    const cx = pad.left + (plotW * (i + 0.5)) / points.length;
    const y0 = yAt(0);
    const y1 = yAt(p.y);
    const top = Math.min(y0, y1);
    const h = Math.max(Math.abs(y1 - y0), 2);
    const color = p.y < 0 ? '#8a94a6' : options.color || '#1f3a5f';
    out += `<rect x="${(cx - bw / 2).toFixed(1)}" y="${top.toFixed(1)}" width="${bw.toFixed(1)}" height="${h.toFixed(1)}" rx="3" fill="${color}"/>`;
    out += `<text x="${cx.toFixed(1)}" y="${(p.y >= 0 ? top - 6 : top + h + 14).toFixed(1)}" class="value" text-anchor="middle">${esc(fmt(p.y))}</text>`;
    out += `<text x="${cx.toFixed(1)}" y="${height - 10}" class="axis" text-anchor="middle">${esc(p.x)}</text>`;
  });
  out += '</svg>';
  return out;
}

// A horizontal bar chart for comparing a few labelled values.
export function hbarChart(rows, options = {}) {
  const rowH = 34;
  const width = 720;
  const height = rowH * rows.length + 16;
  const pad = { left: 150, right: 64, top: 8, bottom: 8 };
  const plotW = width - pad.left - pad.right;
  const max = Math.max(...rows.map((r) => r.value));
  const fmt = options.format || ((v) => String(v));
  let out = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(options.label || 'Comparison chart')}">`;
  rows.forEach((r, i) => {
    const y = pad.top + i * rowH;
    const w = Math.max((plotW * r.value) / max, 2);
    out += `<text x="${pad.left - 10}" y="${y + 17}" class="hbar-label" text-anchor="end">${esc(r.label)}</text>`;
    out += `<rect x="${pad.left}" y="${y + 4}" width="${w.toFixed(1)}" height="18" rx="3" fill="${r.highlight ? '#bc002d' : '#1f3a5f'}"/>`;
    out += `<text x="${pad.left + w + 8}" y="${y + 17}" class="value">${esc(fmt(r.value))}</text>`;
  });
  out += '</svg>';
  return out;
}

// A donut chart of shares that add up to about 100.
export function donutChart(slices, options = {}) {
  const size = 260;
  const cx = size / 2;
  const cy = size / 2;
  const r = 92;
  const inner = 58;
  const total = slices.reduce((s, x) => s + x.share, 0);
  let angle = -90;
  let out = `<svg viewBox="0 0 ${size} ${size}" role="img" aria-label="${esc(options.label || 'Donut chart')}">`;
  for (const s of slices) {
    const a0 = (angle * Math.PI) / 180;
    const a1 = ((angle + (s.share / total) * 360) * Math.PI) / 180;
    const large = (s.share / total) * 360 > 180 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    const xi1 = cx + inner * Math.cos(a1);
    const yi1 = cy + inner * Math.sin(a1);
    const xi0 = cx + inner * Math.cos(a0);
    const yi0 = cy + inner * Math.sin(a0);
    out += `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${large} 1 ${x1.toFixed(1)},${y1.toFixed(1)} L${xi1.toFixed(1)},${yi1.toFixed(1)} A${inner},${inner} 0 ${large} 0 ${xi0.toFixed(1)},${yi0.toFixed(1)} Z" fill="${s.color}"/>`;
    angle += (s.share / total) * 360;
  }
  out += `<text x="${cx}" y="${cy - 4}" class="donut-big" text-anchor="middle">${esc(options.center || '')}</text>`;
  out += `<text x="${cx}" y="${cy + 16}" class="donut-small" text-anchor="middle">${esc(options.centerSub || '')}</text>`;
  out += '</svg>';
  return out;
}
