// Japan in Numbers — the data behind the site.
//
// Every figure is a real, widely published official figure. Each value carries
// its source and year in the `source` field next to it, and every view shows
// that source line under the figure. Values are rounded to the well-known
// published totals; where a figure is an estimate the label says so.

export const SITE = {
  name: 'Japan in Numbers',
  tagline: 'Japan’s key statistics, sourced and in one place',
  country: 'Japan',
  updated: 'November 2026',
};

export const HEADLINE = [
  {
    id: 'population',
    label: 'Population',
    value: '124.0m',
    detail: 'Total population, 1 Oct 2024 estimate — down 0.4m on the year',
    route: '#/population',
    source: 'Statistics Bureau of Japan, Population Estimates, 2024',
  },
  {
    id: 'gdp',
    label: 'Nominal GDP',
    value: '¥609tn',
    detail: 'Calendar 2024, about $4.0tn — the world’s 4th largest economy',
    route: '#/economy',
    source: 'Cabinet Office, Annual Report on National Accounts, 2024',
  },
  {
    id: 'life',
    label: 'Life expectancy',
    value: '84.0 yrs',
    detail: '84.0 years at birth in 2023 — among the longest in the world',
    route: '#/society',
    source: 'World Bank, World Development Indicators, 2023',
  },
  {
    id: 'unemployment',
    label: 'Unemployment rate',
    value: '2.5%',
    detail: 'Annual average 2024, seasonally adjusted',
    route: '#/economy',
    source: 'Statistics Bureau of Japan, Labour Force Survey, 2024',
  },
  {
    id: 'elderly',
    label: 'Aged 65 and over',
    value: '29.3%',
    detail: '36.2 million people — the highest share of any large country',
    route: '#/population',
    source: 'Statistics Bureau of Japan, Population Estimates, 2024',
  },
  {
    id: 'cpi',
    label: 'Consumer prices',
    value: '+2.7%',
    detail: 'CPI, annual average change in 2024',
    route: '#/economy',
    source: 'Statistics Bureau of Japan, Consumer Price Index, 2024',
  },
];

// Population in millions. Census years 1950–2020, estimate for 2024.
export const POPULATION_SERIES = [
  { year: 1950, value: 84.1 },
  { year: 1960, value: 94.3 },
  { year: 1970, value: 104.7 },
  { year: 1980, value: 117.1 },
  { year: 1990, value: 123.6 },
  { year: 2000, value: 126.9 },
  { year: 2010, value: 128.1 },
  { year: 2020, value: 126.1 },
  { year: 2024, value: 124.0 },
];
export const POPULATION_SERIES_SOURCE =
  'Statistics Bureau of Japan, Population Census 1950–2020; Population Estimates, 2024';

// Age structure, 1 October 2024 estimate (millions of people).
export const AGE_STRUCTURE = [
  { group: 'Ages 0–14', value: 14.1, share: 11.4 },
  { group: 'Ages 15–64', value: 73.5, share: 59.3 },
  { group: 'Ages 65+', value: 36.2, share: 29.3 },
];
export const AGE_STRUCTURE_SOURCE =
  'Statistics Bureau of Japan, Population Estimates, 1 Oct 2024';

// Vital statistics (Ministry of Health, Labour and Welfare, Vital Statistics).
export const VITALS = [
  { year: 2000, births: 1191, deaths: 961, tfr: 1.36 },
  { year: 2010, births: 1071, deaths: 1197, tfr: 1.39 },
  { year: 2015, births: 1006, deaths: 1290, tfr: 1.45 },
  { year: 2020, births: 841, deaths: 1373, tfr: 1.33 },
  { year: 2023, births: 727, deaths: 1576, tfr: 1.20 },
  { year: 2024, births: 721, deaths: 1619, tfr: 1.15 },
];
export const VITALS_SOURCE =
  'Ministry of Health, Labour and Welfare, Vital Statistics, 2024 (births and deaths in thousands; TFR = total fertility rate)';

// Ten largest prefectures, 2020 Population Census (population in thousands).
export const PREFECTURES = [
  { name: 'Tokyo', population: 14048, density: 6411, change: 4.1 },
  { name: 'Kanagawa', population: 9237, density: 3824, change: 1.1 },
  { name: 'Osaka', population: 8837, density: 4640, change: -0.2 },
  { name: 'Aichi', population: 7543, density: 1460, change: 1.0 },
  { name: 'Saitama', population: 7345, density: 1934, change: 1.2 },
  { name: 'Chiba', population: 6284, density: 1221, change: 1.1 },
  { name: 'Hyogo', population: 5465, density: 651, change: -1.0 },
  { name: 'Hokkaido', population: 5225, density: 63, change: -2.4 },
  { name: 'Fukuoka', population: 5139, density: 1034, change: 0.6 },
  { name: 'Shizuoka', population: 3634, density: 467, change: -2.1 },
];
export const PREFECTURES_SOURCE =
  'Statistics Bureau of Japan, Population Census 2020 (change = % change since the 2015 census)';

// Nominal GDP in trillion yen (Cabinet Office, Annual Report on National Accounts).
export const GDP_SERIES = [
  { year: 2015, gdp: 532.6, growth: 1.6 },
  { year: 2016, gdp: 538.0, growth: 0.8 },
  { year: 2017, gdp: 547.7, growth: 1.7 },
  { year: 2018, gdp: 555.7, growth: 0.6 },
  { year: 2019, gdp: 557.3, growth: -0.4 },
  { year: 2020, gdp: 539.0, growth: -4.2 },
  { year: 2021, gdp: 551.6, growth: 2.7 },
  { year: 2022, gdp: 560.9, growth: 0.9 },
  { year: 2023, gdp: 590.7, growth: 1.5 },
  { year: 2024, gdp: 609.3, growth: -0.1 },
];
export const GDP_SERIES_SOURCE =
  'Cabinet Office, Annual Report on National Accounts (growth = real GDP, % change on the previous year)';

// Consumer prices, annual average % change (Statistics Bureau, CPI).
export const CPI_SERIES = [
  { year: 2019, value: 0.5 },
  { year: 2020, value: 0.0 },
  { year: 2021, value: -0.2 },
  { year: 2022, value: 2.5 },
  { year: 2023, value: 3.3 },
  { year: 2024, value: 2.7 },
];
export const CPI_SERIES_SOURCE =
  'Statistics Bureau of Japan, Consumer Price Index, annual average';

// Unemployment rate, annual average % (Statistics Bureau, Labour Force Survey).
export const UNEMPLOYMENT_SERIES = [
  { year: 2019, value: 2.4 },
  { year: 2020, value: 2.8 },
  { year: 2021, value: 2.8 },
  { year: 2022, value: 2.6 },
  { year: 2023, value: 2.6 },
  { year: 2024, value: 2.5 },
];
export const UNEMPLOYMENT_SERIES_SOURCE =
  'Statistics Bureau of Japan, Labour Force Survey, annual average';

// Trade in goods, trillion yen (Ministry of Finance, Trade Statistics).
export const TRADE_SERIES = [
  { year: 2022, exports: 98.2, imports: 118.2, balance: -19.9 },
  { year: 2023, exports: 100.9, imports: 110.2, balance: -9.3 },
  { year: 2024, exports: 107.9, imports: 113.6, balance: -5.3 },
];
export const TRADE_SERIES_SOURCE =
  'Ministry of Finance, Trade Statistics of Japan, calendar year';

// Life expectancy at birth, years (Ministry of Health, Labour and Welfare).
export const LIFE_SERIES = [
  { year: 1980, male: 73.35, female: 78.76 },
  { year: 1990, male: 75.92, female: 81.90 },
  { year: 2000, male: 77.72, female: 84.60 },
  { year: 2010, male: 79.55, female: 86.30 },
  { year: 2020, male: 81.56, female: 87.71 },
  { year: 2024, male: 81.09, female: 87.13 },
];
export const LIFE_SERIES_SOURCE =
  'Ministry of Health, Labour and Welfare, Abridged Life Tables, 2024';

export const SOCIETY_FACTS = [
  {
    label: 'Households',
    value: '55.7m',
    detail: 'One-person households are 38.0% of all households; the average household has 2.21 people.',
    source: 'Statistics Bureau of Japan, Population Census, 2020',
  },
  {
    label: 'Infant mortality',
    value: '1.6',
    detail: 'Deaths per 1,000 live births in 2024 — among the lowest in the world.',
    source: 'Ministry of Health, Labour and Welfare, Vital Statistics, 2024',
  },
  {
    label: 'Doctors',
    value: '2.6',
    detail: 'Practising physicians per 1,000 people, 2022.',
    source: 'OECD Health Statistics, 2024',
  },
  {
    label: 'Maths score (PISA)',
    value: '536',
    detail: 'Mean mathematics score of 15-year-olds in PISA 2022 (OECD average: 472). Japan ranked among the top performers.',
    source: 'OECD, PISA 2022 Results',
  },
  {
    label: 'Hours worked',
    value: '1,633',
    detail: 'Average annual hours actually worked per worker, 2023.',
    source: 'OECD Employment Outlook, 2024',
  },
  {
    label: 'Government debt',
    value: '236.7%',
    detail: 'General government gross debt as a share of GDP, 2024 — the highest among advanced economies.',
    source: 'IMF, World Economic Outlook, 2024',
  },
];

// Cross-country comparison. GDP per capita: IMF WEO 2024 (nominal US$).
// Life expectancy: World Bank WDI 2023. Share 65+: World Bank WDI 2024.
// Unemployment: national labour force surveys / ILO, 2024 annual average.
export const COMPARE = [
  { country: 'Japan', population: 124.0, gdpPerCapita: 32481, life: 84.0, elderly: 29.6, unemployment: 2.5 },
  { country: 'United States', population: 340.1, gdpPerCapita: 85809, life: 78.4, elderly: 17.7, unemployment: 4.0 },
  { country: 'Germany', population: 84.7, gdpPerCapita: 55521, life: 81.2, elderly: 22.4, unemployment: 3.4 },
  { country: 'United Kingdom', population: 69.3, gdpPerCapita: 49099, life: 79.0, elderly: 19.2, unemployment: 4.3 },
  { country: 'France', population: 68.4, gdpPerCapita: 46231, life: 82.9, elderly: 21.7, unemployment: 7.4 },
  { country: 'South Korea', population: 51.7, gdpPerCapita: 33121, life: 83.5, elderly: 19.4, unemployment: 2.7 },
  { country: 'China', population: 1408.0, gdpPerCapita: 13445, life: 78.6, elderly: 14.8, unemployment: 5.1 },
];
export const COMPARE_SOURCE =
  'Population: World Bank WDI 2024. GDP per capita: IMF World Economic Outlook 2024 (nominal US$). Life expectancy: World Bank WDI 2023. Share aged 65+: World Bank WDI 2024. Unemployment: national labour force surveys / ILO, 2024 (China: urban surveyed rate).';

export const SOURCES = [
  { name: 'Statistics Bureau of Japan', what: 'Population Census, Population Estimates, Labour Force Survey, Consumer Price Index', url: 'www.stat.go.jp' },
  { name: 'Cabinet Office', what: 'Annual Report on National Accounts (GDP)', url: 'www.cao.go.jp' },
  { name: 'Ministry of Health, Labour and Welfare', what: 'Vital Statistics, Abridged Life Tables', url: 'www.mhlw.go.jp' },
  { name: 'Ministry of Finance', what: 'Trade Statistics of Japan', url: 'www.customs.go.jp' },
  { name: 'Bank of Japan', what: 'Policy rate (0.5% since January 2025)', url: 'www.boj.or.jp' },
  { name: 'World Bank', what: 'World Development Indicators (population, life expectancy, age structure)', url: 'data.worldbank.org' },
  { name: 'IMF', what: 'World Economic Outlook (GDP per capita, government debt)', url: 'www.imf.org' },
  { name: 'OECD', what: 'Health Statistics, Employment Outlook, PISA 2022', url: 'www.oecd.org' },
];

export const NAV = [
  { route: '#/', label: 'Overview' },
  { route: '#/population', label: 'Population' },
  { route: '#/economy', label: 'Economy' },
  { route: '#/society', label: 'Society & health' },
  { route: '#/compare', label: 'Compare' },
  { route: '#/sources', label: 'Sources & methods' },
];
