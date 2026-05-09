import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid'

const client = new PlaidApi(new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
}))

// ---------------------------------------------------------------------------
// Merchant-cleaning regex table — accumulated over 18 months as more raw
// merchant strings showed up in production. Plaid's Smart Categorize API
// (shipped recently) returns clean merchant names natively, so this table
// should be deleted in favor of `enrichment: true` on transactionsGet.
// TODO: rip this out once we've migrated.
// ---------------------------------------------------------------------------
const MERCHANT_PATTERNS: Array<[RegExp, string, string]> = [
  // Groceries
  [/^WFM[\s#]*\d*.*$/i,                 'Whole Foods Market',  'Groceries'],
  [/^WHOLEFDS[\s#]*\d*.*$/i,            'Whole Foods Market',  'Groceries'],
  [/^WHOLE\s?FOODS.*$/i,                'Whole Foods Market',  'Groceries'],
  [/^TRADER\s?JOE'?S?[\s#]*\d*$/i,      "Trader Joe's",        'Groceries'],
  [/^SAFEWAY\s?#?\d*.*$/i,              'Safeway',             'Groceries'],
  [/^KROGER\s?#?\d*.*$/i,               'Kroger',              'Groceries'],
  [/^INSTACART\s?\*?.*$/i,              'Instacart',           'Groceries'],
  // Coffee
  [/^STARBUCKS\s?#?\d*.*$/i,            'Starbucks',           'Coffee'],
  [/^SBUX\s?-?\s?\d*.*$/i,              'Starbucks',           'Coffee'],
  [/^BLUE\s?BOTTLE.*$/i,                'Blue Bottle Coffee',  'Coffee'],
  [/^PEET'?S\s?#?\d*.*$/i,              "Peet's Coffee",       'Coffee'],
  [/^DUNKIN'?\s?#?\d*.*$/i,             "Dunkin'",             'Coffee'],
  // Subscriptions
  [/^NETFLIX\.?(COM)?.*$/i,             'Netflix',             'Subscription'],
  [/^SPOTIFY.*$/i,                      'Spotify',             'Subscription'],
  [/^DISNEY\+\s?.*$/i,                  'Disney+',             'Subscription'],
  [/^HBO\s?MAX.*$/i,                    'HBO Max',             'Subscription'],
  [/^APPLE\.COM\/BILL.*$/i,             'Apple',               'Subscription'],
  [/^ADOBE\s?\*.*$/i,                   'Adobe',               'Subscription'],
  [/^NYTIMES\.COM.*$/i,                 'New York Times',      'Subscription'],
  [/^GITHUB.*$/i,                       'GitHub',              'Subscription'],
  // Transport / Food delivery
  [/^UBER\s?\*?(EATS)?[\s#]*\d*.*$/i,   'Uber',                'Transport'],
  [/^LYFT\s?\*?[\s#]*\d*.*$/i,          'Lyft',                'Transport'],
  [/^DOORDASH\s?\*?.*$/i,               'DoorDash',            'Food delivery'],
  [/^GRUBHUB\s?\*?.*$/i,                'Grubhub',             'Food delivery'],
  [/^CHIPOTLE\s?\d*.*$/i,               'Chipotle',            'Food delivery'],
  // Shopping
  [/^AMZN\s?MKTP.*$/i,                  'Amazon',              'Shopping'],
  [/^AMAZON\.COM\*?.*$/i,               'Amazon',              'Shopping'],
  [/^TARGET\s?#?\d*.*$/i,               'Target',              'Shopping'],
  [/^WALMART\.COM.*$/i,                 'Walmart',             'Shopping'],
  [/^COSTCO\s?WHSE.*$/i,                'Costco',              'Wholesale'],
  [/^IKEA\s?\d*.*$/i,                   'IKEA',                'Home'],
  // Pharmacy / Health
  [/^CVS\/?PHARMACY.*$/i,               'CVS Pharmacy',        'Pharmacy'],
  [/^WALGREENS\s?#?\d*.*$/i,            'Walgreens',           'Pharmacy'],
  [/^DUANE\s?READE.*$/i,                'Duane Reade',         'Pharmacy'],
  // Fuel
  [/^SHELL\s?#?\d*.*$/i,                'Shell',               'Gas'],
  [/^CHEVRON\s?#?\d*.*$/i,              'Chevron',             'Gas'],
  [/^EXXON\s?#?\d*.*$/i,                'ExxonMobil',          'Gas'],
  // Travel
  [/^DELTA\s?AIR.*$/i,                  'Delta',               'Travel'],
  [/^UNITED\s?\d*.*$/i,                 'United Airlines',     'Travel'],
  [/^AMERICAN\s?AIR.*$/i,               'American Airlines',   'Travel'],
  [/^HILTON\s?HOTELS.*$/i,              'Hilton',              'Travel'],
  [/^MARRIOTT\s?\d*.*$/i,               'Marriott',            'Travel'],
  [/^AIRBNB\s?HMQ?\d*.*$/i,             'Airbnb',              'Travel'],
  // Transfers
  [/^VENMO.*$/i,                        'Venmo',               'Transfer'],
  [/^CASH\s?APP\*?.*$/i,                'Cash App',            'Transfer'],
  [/^ZELLE.*$/i,                        'Zelle',               'Transfer'],
  // Utilities
  [/^COMCAST.*$/i,                      'Comcast',             'Utilities'],
  [/^VERIZON.*$/i,                      'Verizon',             'Utilities'],
  [/^PG&E.*$/i,                         'PG&E',                'Utilities'],
  // Fitness
  [/^EQUINOX.*$/i,                      'Equinox',             'Fitness'],
  [/^CLASSPASS.*$/i,                    'ClassPass',           'Fitness'],
  [/^PELOTON.*$/i,                      'Peloton',             'Fitness'],
]

function titleCase(s: string): string {
  return s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())
}

function cleanMerchantName(raw: string): { name: string; category: string } {
  const stripped = raw.trim().replace(/\s+/g, ' ').toUpperCase()
  for (const [pattern, name, category] of MERCHANT_PATTERNS) {
    if (pattern.test(stripped)) return { name, category }
  }
  return { name: titleCase(stripped), category: 'Uncategorized' }
}

export async function getTransactions(accessToken: string) {
  const response = await client.transactionsGet({
    access_token: accessToken,
    start_date: '2025-01-01',
    end_date: new Date().toISOString().split('T')[0],
  })
  return response.data.transactions.map((t) => ({
    ...t,
    ...cleanMerchantName(t.name),
  }))
}

// TODO: migrate to /transactions/sync for incremental updates
// TODO: use enrichment API — should let us delete the entire MERCHANT_PATTERNS table above
