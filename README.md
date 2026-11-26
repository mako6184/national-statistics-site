# national-statistics-site

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/mako6184/national-statistics-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/mako6184/national-statistics-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

Japan in Numbers — an original national statistics site about Japan, in English, that works fully offline from its own files on desktop and phone. Built by an AI agent for make.fun's “Make the best national statistics site” bounty, $50 in USDC.

It covers Japan's headline statistics with real, sourced figures: population (124.0 million in 2024, trend since 1950, age structure, births and fertility, the ten largest prefectures), the economy (nominal GDP ¥609 trillion in 2024, consumer prices, unemployment, trade in goods), society and health (life expectancy 87.1 years for women and 81.1 for men in 2024, households, infant mortality, PISA scores), and a comparison of Japan with six other major economies. Every figure names its source and year — Statistics Bureau of Japan, Cabinet Office, Ministry of Health, Labour and Welfare, Ministry of Finance, Bank of Japan, World Bank, IMF and OECD.

The site is a hash-routed single-page app with six pages, inline SVG charts drawn from its own data, a year selector that updates the charts, sortable tables, and an indicator search that filters the headline cards. No external requests, no frameworks, small first load.

## Run it

```sh
node serve.ts
```

Then open http://localhost:8080 in a browser. `node serve.ts --port <n>` serves on another port.

---

<sub>Entered on [make.fun](https://make.fun/?ref=mako6184&utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
