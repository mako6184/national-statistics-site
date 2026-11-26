// views.js — one render function per page (hash route).
// Each view is a plain HTML string built from data.js and charts.js.
// Interactive bits (year selectors, sortable tables, the search box) are
// wired up by main.js after the view is inserted.

import {
  HEADLINE, POPULATION_SERIES, POPULATION_SERIES_SOURCE,
  AGE_STRUCTURE, AGE_STRUCTURE_SOURCE, VITALS, VITALS_SOURCE,
  PREFECTURES, PREFECTURES_SOURCE, GDP_SERIES, GDP_SERIES_SOURCE,
  CPI_SERIES, CPI_SERIES_SOURCE, UNEMPLOYMENT_SERIES, UNEMPLOYMENT_SERIES_SOURCE,
  TRADE_SERIES, TRADE_SERIES_SOURCE, LIFE_SERIES, LIFE_SERIES_SOURCE,
  SOCIETY_FACTS, COMPARE, COMPARE_SOURCE, SOURCES,
} from './data.js';
import { lineChart, barChart, hbarChart, donutChart } from './charts.js';

function sourceLine(text) {
  return `<p class="source">Source: ${text}</p>`;
}

function card(item) {
  return `<a class="card" href="${item.route}" data-search="${item.label} ${item.value} ${item.detail}">
    <span class="card-label">${item.label}</span>
    <span class="card-value">${item.value}</span>
    <span class="card-detail">${item.detail}</span>
    <span class="card-source">${item.source}</span>
  </a>`;
}

function statBlock(label, value, detail, source) {
  return `<div class="stat"><span class="stat-label">${label}</span>
    <span class="stat-value">${value}</span>
    <span class="stat-detail">${detail}</span>
    <span class="stat-source">${source}</span></div>`;
}

// ---- Home / overview -------------------------------------------------------

export function homeView() {
  const cards = HEADLINE.map(card).join('');
  return `
  <section class="hero">
    <p class="kicker">Japan · Updated November 2026 · All figures sourced</p>
    <h1>Japan in Numbers</h1>
    <p class="lede">The headline statistics of Japan — population, economy, society and health —
    each with its source and year, on one site that works offline, on a desktop and on a phone.</p>
    <div class="search-row">
      <label for="indicator-search">Find an indicator</label>
      <input id="indicator-search" type="search" placeholder="Try “population”, “GDP” or “unemployment”…" autocomplete="off">
    </div>
    <p class="search-hint" id="search-count"></p>
  </section>
  <section class="panel">
    <h2>Population: up, then down</h2>
    <p>Japan’s population grew from 84 million in 1950 to a peak of 128.1 million in 2008,
    then turned down. The chart below is the story of the whole site in one line.</p>
    ${lineChart(POPULATION_SERIES.map((p) => ({ x: p.year, y: p.value })), {
      label: 'Total population of Japan, millions, 1950 to 2024',
      format: (v) => v.toFixed(1),
      color: '#bc002d',
      height: 240,
    })}
    ${sourceLine(POPULATION_SERIES_SOURCE + '. Population in millions.')}
    <p><a href="#/population">Explore the population in detail →</a></p>
  </section>
  <section class="cards" id="indicator-cards" aria-label="Headline indicators">
    ${cards}
  </section>
  <section class="cards" id="indicator-cards" aria-label="Headline indicators">
    ${cards}
  </section>
  <section class="panel">
    <h2>Japan at a glance</h2>
    <p>Japan is the world’s fourth-largest economy and one of its oldest societies.
    Its population peaked in 2008 and has fallen every year since, while life expectancy
    has kept rising — the two facts that explain most of Japan’s statistics today.
    Use the pages above to explore the population, the economy, society and health,
    and to compare Japan with six other major economies.</p>
    <div class="quick-links">
      <a href="#/population">Population trend ↓</a>
      <a href="#/economy">GDP, prices and jobs ↓</a>
      <a href="#/society">Life expectancy ↑</a>
      <a href="#/compare">Japan vs the world ↓</a>
    </div>
  </section>
  <section class="panel">
    <h2>How to read this site</h2>
    <ul class="notes">
      <li>Every figure names its source and year, right under the figure.</li>
      <li>Charts are drawn from the same data as the tables, so they always agree.</li>
      <li>Tables sort when you click a column heading; the year selectors change the charts.</li>
      <li>Nothing here is fetched from the internet — the whole site is its own files.</li>
    </ul>
    ${sourceLine('Figures compiled November 2026 from the sources listed on the Sources &amp; methods page.')}
  </section>`;
}

// ---- Population ------------------------------------------------------------

function populationChartRange(range) {
  let series = POPULATION_SERIES;
  if (range === '2000') series = POPULATION_SERIES.filter((p) => p.year >= 2000);
  if (range === '2010') series = POPULATION_SERIES.filter((p) => p.year >= 2010);
  return lineChart(series.map((p) => ({ x: p.year, y: p.value })), {
    label: 'Total population of Japan, millions',
    format: (v) => v.toFixed(1),
    color: '#bc002d',
  });
}

export function populationView(range = 'all') {
  const donut = donutChart(
    AGE_STRUCTURE.map((a, i) => ({
      share: a.share,
      color: ['#1f3a5f', '#4a7fb5', '#bc002d'][i],
    })),
    { label: 'Age structure of Japan, 2024', center: '29.3%', centerSub: 'aged 65+' },
  );
  const ageRows = AGE_STRUCTURE.map((a, i) => `<li><span class="swatch" style="background:${['#1f3a5f', '#4a7fb5', '#bc002d'][i]}"></span>
    <strong>${a.group}</strong> — ${a.value.toFixed(1)} million (${a.share.toFixed(1)}%)</li>`).join('');
  const vitalRows = VITALS.map((v) => `<tr><td>${v.year}</td><td>${v.births}</td><td>${v.deaths}</td><td>${(v.births - v.deaths).toLocaleString('en-US')}</td><td>${v.tfr.toFixed(2)}</td></tr>`).join('');
  const prefRows = PREFECTURES.map((p) => `<tr><td>${p.name}</td><td>${p.population.toLocaleString('en-US')}</td><td>${p.density.toLocaleString('en-US')}</td><td>${p.change > 0 ? '+' : ''}${p.change.toFixed(1)}%</td></tr>`).join('');

  return `
  <h1>Population</h1>
  <p class="lede">Japan’s population peaked at 128.1 million in 2008 and has fallen every year since.
  In 2024 there were about 721,000 births and 1,619,000 deaths — a natural decrease of
  roughly 898,000 people in a single year.</p>
  <div class="stats-row">
    ${statBlock('Total population', '124.0m', '1 October 2024 estimate', 'Statistics Bureau of Japan, Population Estimates, 2024')}
    ${statBlock('Change since peak', '−4.1m', 'Since the 2008 peak of 128.1 million', 'Statistics Bureau of Japan')}
    ${statBlock('Births, 2024', '721,000', 'Lowest on record; total fertility rate 1.15', 'Ministry of Health, Labour and Welfare, Vital Statistics, 2024')}
  </div>
  <section class="panel">
    <div class="panel-head">
      <h2>Total population, 1950–2024</h2>
      <label class="range-label">Show:
        <select id="pop-range" aria-label="Years shown on the population chart">
          <option value="all"${range === 'all' ? ' selected' : ''}>1950–2024</option>
          <option value="2000"${range === '2000' ? ' selected' : ''}>Since 2000</option>
          <option value="2010"${range === '2010' ? ' selected' : ''}>Since 2010</option>
        </select>
      </label>
    </div>
    <div id="pop-chart">${populationChartRange(range)}</div>
    ${sourceLine(POPULATION_SERIES_SOURCE + '. Population in millions.')}
  </section>
  <section class="panel split">
    <div>
      <h2>Age structure, 2024</h2>
      ${donut}
      <ul class="legend">${ageRows}</ul>
      ${sourceLine(AGE_STRUCTURE_SOURCE + '.')}
    </div>
    <div>
      <h2>An ageing society</h2>
      <p>Almost three in ten people in Japan are 65 or older — the highest share of any
      large country. The working-age population (15–64) has fallen from 87 million in
      1995 to 73.5 million in 2024, while the number of children under 15 has fallen
      below 14.1 million, the lowest since records began.</p>
      <p>The old-age dependency ratio — people 65 and over for every 100 people of
      working age — is about 49, roughly double what it was in 1990.</p>
      ${sourceLine('Statistics Bureau of Japan, Population Estimates, 2024.')}
    </div>
  </section>
  <section class="panel">
    <h2>Births, deaths and fertility</h2>
    <table class="sortable" data-sortable>
      <thead><tr><th data-type="num">Year</th><th data-type="num">Births (000s)</th><th data-type="num">Deaths (000s)</th><th data-type="num">Natural change (000s)</th><th data-type="num">Fertility rate</th></tr></thead>
      <tbody>${vitalRows}</tbody>
    </table>
    ${sourceLine(VITALS_SOURCE + '.')}
  </section>
  <section class="panel">
    <h2>Largest prefectures, 2020 census</h2>
    <p>Click a column heading to sort. Tokyo alone holds more than one in nine people in Japan.</p>
    <table class="sortable" data-sortable>
      <thead><tr><th>Prefecture</th><th data-type="num">Population (000s)</th><th data-type="num">Density (per km²)</th><th data-type="num">Change since 2015</th></tr></thead>
      <tbody>${prefRows}</tbody>
    </table>
    ${sourceLine(PREFECTURES_SOURCE + '.')}
  </section>`;
}

// ---- Economy ---------------------------------------------------------------

function gdpChartRange(range) {
  let series = GDP_SERIES;
  if (range === '2020') series = GDP_SERIES.filter((p) => p.year >= 2020);
  if (range === '2018') series = GDP_SERIES.filter((p) => p.year >= 2018);
  return lineChart(series.map((p) => ({ x: p.year, y: p.gdp })), {
    label: 'Nominal GDP of Japan, trillion yen',
    format: (v) => `¥${Math.round(v)}`,
    color: '#1f3a5f',
  });
}

export function economyView(range = 'all') {
  const cpi = barChart(CPI_SERIES.map((p) => ({ x: p.year, y: p.value })), {
    label: 'Consumer price inflation, percent per year',
    format: (v) => `${v.toFixed(1)}%`,
    color: '#1f3a5f',
  });
  const unemp = barChart(UNEMPLOYMENT_SERIES.map((p) => ({ x: p.year, y: p.value })), {
    label: 'Unemployment rate, percent',
    format: (v) => `${v.toFixed(1)}%`,
    color: '#4a7fb5',
  });
  const tradeRows = TRADE_SERIES.map((t) => `<tr><td>${t.year}</td><td>¥${t.exports.toFixed(1)}tn</td><td>¥${t.imports.toFixed(1)}tn</td><td>¥${t.balance.toFixed(1)}tn</td></tr>`).join('');
  const growthRows = GDP_SERIES.map((g) => `<tr><td>${g.year}</td><td>¥${g.gdp.toFixed(1)}tn</td><td>${g.growth > 0 ? '+' : ''}${g.growth.toFixed(1)}%</td></tr>`).join('');

  return `
  <h1>Economy</h1>
  <p class="lede">Japan’s nominal GDP was ¥609.3 trillion in 2024 — about $4.0 trillion, the world’s
  fourth-largest economy. After decades of near-zero inflation, consumer prices rose 2.7% in 2024,
  and the Bank of Japan has lifted its policy rate to 0.5%.</p>
  <div class="stats-row">
    ${statBlock('Nominal GDP, 2024', '¥609.3tn', 'Real GDP change in 2024: −0.1%', 'Cabinet Office, Annual Report on National Accounts, 2024')}
    ${statBlock('GDP per person', '$32,481', 'Nominal, 2024', 'IMF, World Economic Outlook, 2024')}
    ${statBlock('Policy rate', '0.5%', 'Bank of Japan, since January 2025', 'Bank of Japan, 2025')}
  </div>
  <section class="panel">
    <div class="panel-head">
      <h2>Nominal GDP, 2015–2024</h2>
      <label class="range-label">Show:
        <select id="gdp-range" aria-label="Years shown on the GDP chart">
          <option value="all"${range === 'all' ? ' selected' : ''}>2015–2024</option>
          <option value="2018"${range === '2018' ? ' selected' : ''}>Since 2018</option>
          <option value="2020"${range === '2020' ? ' selected' : ''}>Since 2020</option>
        </select>
      </label>
    </div>
    <div id="gdp-chart">${gdpChartRange(range)}</div>
    ${sourceLine(GDP_SERIES_SOURCE + '.')}
  </section>
  <section class="panel split">
    <div>
      <h2>Consumer prices</h2>
      ${cpi}
      <p>Annual average change in the consumer price index. Prices fell slightly in 2021,
      then rose 2.5% in 2022 and 3.3% in 2023 — the fastest in four decades.</p>
      ${sourceLine(CPI_SERIES_SOURCE + '.')}
    </div>
    <div>
      <h2>Unemployment</h2>
      ${unemp}
      <p>Japan’s unemployment rate has stayed between 2.4% and 2.8% since 2019 — low by
      international standards, even through the pandemic year of 2020.</p>
      ${sourceLine(UNEMPLOYMENT_SERIES_SOURCE + '.')}
    </div>
  </section>
  <section class="panel">
    <h2>GDP and real growth by year</h2>
    <table class="sortable" data-sortable>
      <thead><tr><th data-type="num">Year</th><th data-type="num">Nominal GDP</th><th data-type="num">Real growth</th></tr></thead>
      <tbody>${growthRows}</tbody>
    </table>
    ${sourceLine(GDP_SERIES_SOURCE + '.')}
  </section>
  <section class="panel">
    <h2>Trade in goods</h2>
    <table class="sortable" data-sortable>
      <thead><tr><th data-type="num">Year</th><th data-type="num">Exports</th><th data-type="num">Imports</th><th data-type="num">Balance</th></tr></thead>
      <tbody>${tradeRows}</tbody>
    </table>
    <p>Japan has run a goods trade deficit since 2022, as energy import costs rose.
    Its largest export markets are the United States and China; its largest imports
    are fuels, machinery and food.</p>
    ${sourceLine(TRADE_SERIES_SOURCE + '.')}
  </section>`;
}

// ---- Society & health ------------------------------------------------------

export function societyView() {
  const life = lineChart(LIFE_SERIES.flatMap((p) => [
    { x: p.year, y: p.female },
  ]), {
    label: 'Female life expectancy at birth, years',
    format: (v) => v.toFixed(1),
    color: '#bc002d',
  });
  const lifeMale = lineChart(LIFE_SERIES.map((p) => ({ x: p.year, y: p.male })), {
    label: 'Male life expectancy at birth, years',
    format: (v) => v.toFixed(1),
    color: '#1f3a5f',
  });
  const facts = SOCIETY_FACTS.map((f) => `<div class="fact">
    <span class="fact-value">${f.value}</span>
    <span class="fact-label">${f.label}</span>
    <span class="fact-detail">${f.detail}</span>
    <span class="fact-source">Source: ${f.source}</span>
  </div>`).join('');

  return `
  <h1>Society &amp; health</h1>
  <p class="lede">Japanese people live longer than almost anyone else: 87.1 years for women and
  81.1 years for men in 2024. At the same time households keep shrinking — more than
  a third of them now have just one person.</p>
  <div class="stats-row">
    ${statBlock('Life expectancy, women', '87.13 yrs', '2024', 'Ministry of Health, Labour and Welfare, Abridged Life Tables, 2024')}
    ${statBlock('Life expectancy, men', '81.09 yrs', '2024', 'Ministry of Health, Labour and Welfare, Abridged Life Tables, 2024')}
    ${statBlock('One-person households', '38.0%', 'Of all households, 2020 census', 'Statistics Bureau of Japan, Population Census, 2020')}
  </div>
  <section class="panel split">
    <div>
      <h2>Life expectancy — women</h2>
      ${life}
      ${sourceLine(LIFE_SERIES_SOURCE + '.')}
    </div>
    <div>
      <h2>Life expectancy — men</h2>
      ${lifeMale}
      ${sourceLine(LIFE_SERIES_SOURCE + '.')}
    </div>
  </section>
  <section class="panel">
    <h2>Society in figures</h2>
    <div class="facts">${facts}</div>
  </section>
  <section class="panel">
    <h2>What the numbers mean</h2>
    <p>Long lives and few births pull in opposite directions: the population ages from
    both ends. That is why Japan’s health and pension systems, its labour shortages and
    its shrinking rural towns are all the same story told in different figures — and why
    the age-structure chart on the Population page is the one to watch.</p>
    ${sourceLine('Ministry of Health, Labour and Welfare; Statistics Bureau of Japan; OECD.')}
  </section>`;
}

// ---- Compare ---------------------------------------------------------------

export function compareView(sortKey = 'gdpPerCapita', sortDir = -1) {
  const rows = [...COMPARE].sort((a, b) => (a[sortKey] - b[sortKey]) * sortDir);
  const body = rows.map((c) => `<tr${c.country === 'Japan' ? ' class="japan-row"' : ''}>
    <td>${c.country}</td><td>${c.population.toFixed(1)}</td><td>$${c.gdpPerCapita.toLocaleString('en-US')}</td>
    <td>${c.life.toFixed(1)}</td><td>${c.elderly.toFixed(1)}%</td><td>${c.unemployment.toFixed(1)}%</td></tr>`).join('');
  const gdpChart = hbarChart(
    [...COMPARE].sort((a, b) => b.gdpPerCapita - a.gdpPerCapita)
      .map((c) => ({ label: c.country, value: c.gdpPerCapita, highlight: c.country === 'Japan' })),
    { label: 'GDP per capita, nominal US dollars, 2024', format: (v) => `$${v.toLocaleString('en-US')}` },
  );
  const lifeChart = hbarChart(
    [...COMPARE].sort((a, b) => b.life - a.life)
      .map((c) => ({ label: c.country, value: c.life, highlight: c.country === 'Japan' })),
    { label: 'Life expectancy at birth, years, 2023', format: (v) => `${v.toFixed(1)} yrs` },
  );

  return `
  <h1>Compare: Japan vs the world</h1>
  <p class="lede">Japan against six other major economies. Click a column heading to sort the table —
  Japan is highlighted in red. Japan is the oldest and longest-lived of the group, with
  the lowest unemployment, but its GDP per person is now below South Korea’s and well
  below the United States’.</p>
  <section class="panel">
    <h2>Seven economies side by side</h2>
    <table class="sortable" data-sortable id="compare-table">
      <thead><tr>
        <th data-key="country">Country</th>
        <th data-key="population" data-type="num">Population (m)</th>
        <th data-key="gdpPerCapita" data-type="num">GDP per person (US$)</th>
        <th data-key="life" data-type="num">Life expectancy (yrs)</th>
        <th data-key="elderly" data-type="num">Aged 65+ (%)</th>
        <th data-key="unemployment" data-type="num">Unemployment (%)</th>
      </tr></thead>
      <tbody>${body}</tbody>
    </table>
    ${sourceLine(COMPARE_SOURCE)}
  </section>
  <section class="panel split">
    <div>
      <h2>GDP per person, 2024</h2>
      ${gdpChart}
      ${sourceLine('IMF, World Economic Outlook, 2024 (nominal US$).')}
    </div>
    <div>
      <h2>Life expectancy, 2023</h2>
      ${lifeChart}
      ${sourceLine('World Bank, World Development Indicators, 2023.')}
    </div>
  </section>
  <section class="panel">
    <h2>Reading the comparison</h2>
    <ul class="notes">
      <li><strong>Oldest:</strong> 29.6% of Japan’s people are 65 or older — about 7 points above Germany, the next oldest.</li>
      <li><strong>Longest-lived:</strong> 84.0 years at birth, half a year ahead of South Korea.</li>
      <li><strong>Lowest joblessness:</strong> 2.5% unemployment, the lowest of the seven.</li>
      <li><strong>Middle income:</strong> GDP per person of $32,481 sits just below South Korea and far below the United States’ $85,809 — the yen’s weakness is part of the story.</li>
    </ul>
  </section>`;
}

// ---- Sources & methods -----------------------------------------------------

export function sourcesView() {
  const rows = SOURCES.map((s) => `<tr><td><strong>${s.name}</strong></td><td>${s.what}</td><td>${s.url}</td></tr>`).join('');
  return `
  <h1>Sources &amp; methods</h1>
  <p class="lede">Every figure on this site comes from an official publisher. Figures are rounded
  to the published totals; where a value is an estimate or a survey result, the page
  says so next to the figure.</p>
  <section class="panel">
    <h2>Sources</h2>
    <table>
      <thead><tr><th>Publisher</th><th>What we used</th><th>Site</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </section>
  <section class="panel">
    <h2>Methods and notes</h2>
    <ul class="notes">
      <li><strong>Population:</strong> census counts for 1950–2020; the 2024 figure is the Statistics Bureau’s 1 October population estimate.</li>
      <li><strong>GDP:</strong> nominal GDP in yen from the Cabinet Office’s national accounts; GDP per person in US dollars from the IMF.</li>
      <li><strong>Prices and jobs:</strong> annual averages from the Statistics Bureau’s Consumer Price Index and Labour Force Survey.</li>
      <li><strong>Trade:</strong> calendar-year goods trade from the Ministry of Finance; the balance is exports minus imports.</li>
      <li><strong>Health:</strong> life expectancy from the Ministry of Health, Labour and Welfare’s abridged life tables; cross-country life expectancy from the World Bank.</li>
      <li><strong>Comparison:</strong> countries are the G7 members Japan, the United States, Germany, the United Kingdom and France, plus South Korea and China.</li>
      <li><strong>Rounding:</strong> figures are shown rounded to one decimal or to the nearest whole unit; totals may not add exactly because of rounding.</li>
    </ul>
  </section>
  <section class="panel">
    <h2>About this site</h2>
    <p>“Japan in Numbers” is an original site built for make.fun’s “Make the best national
    statistics site” bounty. It is a static site: its pages, data, styles and charts are
    its own files, it makes no network requests, and it works offline in a desktop or
    phone browser. Figures were compiled in November 2026.</p>
  </section>`;
}
