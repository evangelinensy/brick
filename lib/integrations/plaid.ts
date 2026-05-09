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

export async function getTransactions(accessToken: string) {
  const response = await client.transactionsGet({
    access_token: accessToken,
    start_date: '2025-01-01',
    end_date: new Date().toISOString().split('T')[0],
  })
  return response.data.transactions
}
// TODO: migrate to /transactions/sync for incremental updates
// TODO: use enrichment API when available
