// main.js — router and page interactions for Japan in Numbers.
//
// Hash routes: #/ (overview), #/population, #/economy, #/society,
// #/compare, #/sources. The router renders the matching view into #app,
// marks the active nav link, then wires up that page's controls:
// the indicator search on the home page, the year selectors on the
// Population and Economy pages, and the sortable tables everywhere.

import { NAV, POPULATION_SERIES, GDP_SERIES } from './data.js';
import { homeView, populationView, economyView, societyView, compareView, sourcesView } from './views.js';
import { lineChart } from './charts.js';

const app = document.getElementById('app');
const nav = document.getElementById('nav');

// Keep the chart range the visitor picked while they stay on a page.
let popRange = 'all';
let gdpRange = 'all';

const ROUTES = {
  '': homeView,
  '/': homeView,
  '/population': () => populationView(popRange),
  '/economy': () => economyView(gdpRange),
  '/society': societyView,
  '/compare': compareView,
  '/sources': sourcesView,
};

function route() {
  const hash = window.location.hash || '#/';
  const path = hash.slice(1) || '/';
  const render = ROUTES[path] || ROUTES['/'];
  app.innerHTML = render();
  for (const link of nav.querySelectorAll('a')) {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === `#${path}` || (path === '/' && href === '#/'));
  }
  window.scrollTo(0, 0);
  wirePage(path);
  document.title = `Japan in Numbers — ${navTitle(path)}`;
}

function navTitle(path) {
  const item = NAV.find((n) => n.route === `#${path}`);
  return item ? item.label : 'Overview';
}

// Sort a table body by column. Numbers sort numerically, text alphabetically;
// clicking the same heading again reverses the order.
function makeSortable(table) {
  const headers = [...table.querySelectorAll('thead th')];
  const body = table.querySelector('tbody');
  headers.forEach((th, index) => {
    th.tabIndex = 0;
    th.setAttribute('role', 'button');
    const sort = () => {
      const numeric = th.dataset.type === 'num';
      const ascending = th.dataset.dir !== 'asc';
      const rows = [...body.querySelectorAll('tr')];
      rows.sort((a, b) => {
        const av = a.children[index].textContent.trim();
        const bv = b.children[index].textContent.trim();
        let cmp;
        if (numeric) {
          cmp = parseFloat(av.replace(/[^0-9.\-]/g, '')) - parseFloat(bv.replace(/[^0-9.\-]/g, ''));
        } else {
          cmp = av.localeCompare(bv);
        }
        return ascending ? cmp : -cmp;
      });
      body.replaceChildren(...rows);
      headers.forEach((h) => { delete h.dataset.dir; h.classList.remove('sorted-asc', 'sorted-desc'); });
      th.dataset.dir = ascending ? 'asc' : 'desc';
      th.classList.add(ascending ? 'sorted-asc' : 'sorted-desc');
    };
    th.addEventListener('click', sort);
    th.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); sort(); }
    });
  });
}

function wirePage(path) {
  for (const table of app.querySelectorAll('table[data-sortable]')) makeSortable(table);

  if (path === '/' || path === '') {
    const input = document.getElementById('indicator-search');
    const cards = [...document.querySelectorAll('#indicator-cards .card')];
    const count = document.getElementById('search-count');
    const apply = () => {
      const query = input.value.trim().toLowerCase();
      let shown = 0;
      for (const card of cards) {
        const hit = !query || card.dataset.search.toLowerCase().includes(query);
        card.style.display = hit ? '' : 'none';
        if (hit) shown += 1;
      }
      count.textContent = query
        ? `${shown} of ${cards.length} indicators match “${input.value.trim()}”.`
        : '';
    };
    input.addEventListener('input', apply);
  }

  if (path === '/population') {
    const select = document.getElementById('pop-range');
    select.addEventListener('change', () => {
      popRange = select.value;
      document.getElementById('pop-chart').innerHTML = populationChartFor(popRange);
    });
  }

  if (path === '/economy') {
    const select = document.getElementById('gdp-range');
    select.addEventListener('change', () => {
      gdpRange = select.value;
      document.getElementById('gdp-chart').innerHTML = gdpChartFor(gdpRange);
    });
  }
}

// Re-render one chart without rebuilding the whole page.
function populationChartFor(range) {
  let series = POPULATION_SERIES;
  if (range === '2000') series = series.filter((p) => p.year >= 2000);
  if (range === '2010') series = series.filter((p) => p.year >= 2010);
  return lineChart(series.map((p) => ({ x: p.year, y: p.value })), {
    label: 'Total population of Japan, millions',
    format: (v) => v.toFixed(1),
    color: '#bc002d',
  });
}

function gdpChartFor(range) {
  let series = GDP_SERIES;
  if (range === '2018') series = series.filter((p) => p.year >= 2018);
  if (range === '2020') series = series.filter((p) => p.year >= 2020);
  return lineChart(series.map((p) => ({ x: p.year, y: p.gdp })), {
    label: 'Nominal GDP of Japan, trillion yen',
    format: (v) => `¥${Math.round(v)}`,
    color: '#1f3a5f',
  });
}

nav.innerHTML = NAV.map((n) => `<a href="${n.route}">${n.label}</a>`).join('');
window.addEventListener('hashchange', route);
route();
